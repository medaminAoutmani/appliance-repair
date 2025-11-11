// src/app/api/submit-form/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FormSubmission from '@/models/FormSubmission';

interface FormData {
  name: string;
  email?: string;
  phone: string;
  service?: string;
  message?: string;
  source: 'seventhSection' | 'formCard';
}

interface WhatsAppRequestBody {
  messaging_product: 'whatsapp';
  recipient_type: 'individual';
  to: string;
  type: 'template';
  template: {
    name: string;
    language: {
      code: string;
    };
    components: Array<{
      type: 'body';
      parameters: Array<{
        type: 'text';
        text: string;
      }>;
    }>;
  };
}

// Environment variables - UPDATED FOR hello_world
const WHATSAPP_API_VERSION = process.env.WHATSAPP_API_VERSION || 'v22.0';
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || '';
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID || '';
const ADMIN_WHATSAPP_NUMBER = process.env.ADMIN_WHATSAPP_NUMBER || '';
const WHATSAPP_TEMPLATE_NAME = process.env.WHATSAPP_TEMPLATE_NAME || 'hello_world';
const WHATSAPP_TEMPLATE_LANGUAGE = process.env.WHATSAPP_TEMPLATE_LANGUAGE || 'en_US';

// Simple in-memory rate limiting (use Redis in production)
const requestCounts = new Map<string, { count: number; lastReset: number }>();

function rateLimit(ip: string, limit = 5, windowMs = 60000): boolean {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (!requestCounts.has(ip) || requestCounts.get(ip)!.lastReset < windowStart) {
    requestCounts.set(ip, { count: 1, lastReset: now });
    return true;
  }

  const ipData = requestCounts.get(ip)!;
  if (ipData.count >= limit) {
    return false;
  }

  ipData.count++;
  return true;
}

async function sendWhatsAppMessage(formData: FormData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // Validate configuration
    if (!WHATSAPP_TOKEN || !WHATSAPP_PHONE_ID || !ADMIN_WHATSAPP_NUMBER) {
      return {
        success: false,
        error: 'WhatsApp API not properly configured. Check environment variables.'
      };
    }

    // Format recipient number
    let recipientNumber = ADMIN_WHATSAPP_NUMBER.replace(/[\s-]/g, '');
    recipientNumber = recipientNumber.startsWith('+') ? recipientNumber : `+${recipientNumber}`;

    // UPDATED: Prepare template parameters for hello_world (only 1 parameter)
    const templateParameters = [
      {
        type: 'text' as const,
        text: `📋 NEW SERVICE REQUEST

👤 Customer: ${formData.name}
📞 Phone: ${formData.phone}
📧 Email: ${formData.email || 'Not provided'}
🛠️ Service: ${formData.service || 'Not specified'}
💬 Message: ${formData.message || 'No additional message'}
⏰ Submitted: ${new Date().toLocaleString()}
🔗 Source: ${formData.source}`
      }
    ];

    // Build WhatsApp API request
    const requestBody: WhatsAppRequestBody = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: recipientNumber,
      type: 'template',
      template: {
        name: WHATSAPP_TEMPLATE_NAME,
        language: {
          code: WHATSAPP_TEMPLATE_LANGUAGE,
        },
        components: [
          {
            type: 'body',
            parameters: templateParameters,
          },
        ],
      },
    };

    const apiUrl = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_ID}/messages`;

    console.log('📤 Sending WhatsApp message with hello_world template:', {
      template: WHATSAPP_TEMPLATE_NAME,
      language: WHATSAPP_TEMPLATE_LANGUAGE,
      parameterCount: templateParameters.length,
      parameterContent: templateParameters[0].text.substring(0, 100) + '...'
    });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('❌ WhatsApp API error:', responseData);

      // If template fails, try text message as fallback
      console.log('🔄 Trying text message as fallback...');
      return await sendTextMessage(formData, recipientNumber);
    }

    console.log('✅ WhatsApp message sent successfully with hello_world template');
    return {
      success: true,
      messageId: responseData.messages?.[0]?.id
    };

  } catch (error) {
    console.error('❌ Error sending WhatsApp message:', error);
    return {
      success: false,
      error: `Exception: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// Fallback text message function
async function sendTextMessage(formData: FormData, recipientNumber: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const apiUrl = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_ID}/messages`;

    const textMessage = `📋 New Service Request:
👤 Name: ${formData.name}
📞 Phone: ${formData.phone}
📧 Email: ${formData.email || 'Not provided'}
🛠️ Service: ${formData.service || 'Not specified'}
💬 Message: ${formData.message || 'No additional message'}
📅 Date: ${new Date().toLocaleString()}
🔗 Source: ${formData.source}`;

    const textBody = {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: recipientNumber,
      type: 'text',
      text: {
        body: textMessage
      }
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(textBody),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('❌ Text message also failed:', responseData);
      const errorMessage = responseData.error?.message || 'Unknown error';
      return {
        success: false,
        error: `Both template and text failed: ${errorMessage}`
      };
    }

    console.log('✅ Text message sent successfully');
    return {
      success: true,
      messageId: responseData.messages?.[0]?.id
    };
  } catch (error) {
    console.error('❌ Error sending text message:', error);
    return {
      success: false,
      error: `Text message exception: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    // SECURITY: Log and analyze incoming requests
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || '';
    const contentType = request.headers.get('content-type');

    console.log('🔍 Incoming Request:', {
      ip: clientIP,
      userAgent: userAgent.substring(0, 100),
      contentType: contentType,
      timestamp: new Date().toISOString()
    });

    // SECURITY: Rate limiting - max 5 requests per minute per IP
    if (!rateLimit(clientIP, 5, 60000)) {
      console.log('🚫 Rate limit exceeded for IP:', clientIP);
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // SECURITY: Validate content type
    if (contentType !== 'application/json') {
      console.log('🚫 Invalid content type:', contentType);
      return NextResponse.json(
        { error: 'Invalid content type' },
        { status: 400 }
      );
    }

    // SECURITY: Block obvious bots and empty user agents
    if (!userAgent || userAgent.length < 10 || /bot|crawl|spider|scanner/i.test(userAgent)) {
      console.log('🚫 Blocked bot request:', userAgent);
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const body: FormData = await request.json();

    // Validate required fields
    if (!body.name || !body.phone || !body.source) {
      return NextResponse.json(
        { error: 'Missing required fields: name, phone, and source are required' },
        { status: 400 }
      );
    }

    // SECURITY: Validate field lengths to prevent abuse
    if (body.name.length > 100 || body.phone.length > 20 || (body.email && body.email.length > 100) ||
      (body.service && body.service.length > 100) || (body.message && body.message.length > 500)) {
      return NextResponse.json(
        { error: 'Invalid field lengths' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    console.log('🔄 Connecting to MongoDB...');
    let dbConnected = false;
    let savedSubmission = null;

    try {
      await connectDB();
      console.log('✅ MongoDB connection established');
      dbConnected = true;
    } catch (dbError) {
      console.error('❌ MongoDB connection failed:', dbError);
      dbConnected = false;
    }

    // Save to database if connected
    if (dbConnected) {
      try {
        console.log('💾 Saving form submission to database...');
        const submission = new FormSubmission({
          name: body.name,
          email: body.email || undefined,
          phone: body.phone,
          service: body.service || undefined,
          message: body.message || undefined,
          source: body.source,
          whatsappSent: false,
        });

        savedSubmission = await submission.save();
        console.log('✅ Form submission saved to database:', savedSubmission._id);
      } catch (saveError) {
        console.error('❌ Failed to save to database:', saveError);
        dbConnected = false;
      }
    }

    // Send WhatsApp message
    console.log('📱 Attempting to send WhatsApp message with hello_world template...');
    const whatsappResult = await sendWhatsAppMessage(body);
    console.log('📱 WhatsApp result:', whatsappResult);

    // Update submission with WhatsApp status if database was used
    if (dbConnected && savedSubmission) {
      if (whatsappResult.success && whatsappResult.messageId) {
        savedSubmission.whatsappSent = true;
        savedSubmission.whatsappMessageId = whatsappResult.messageId;
        await savedSubmission.save();
      }
    }

    // Return response
    if (whatsappResult.success) {
      return NextResponse.json(
        {
          success: true,
          message: 'Form submitted successfully',
          submissionId: savedSubmission?._id,
          whatsappSent: true,
          databaseSaved: dbConnected && !!savedSubmission,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to send form submission',
          details: whatsappResult.error,
          databaseSaved: dbConnected && !!savedSubmission,
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Fixed: Remove unused parameters by using underscore or omitting
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}