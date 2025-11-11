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

interface WhatsAppErrorResponse {
  error?: {
    message?: string;
    error_user_msg?: string;
    code?: number;
    error_subcode?: number;
    type?: string;
  };
}

interface WhatsAppSuccessResponse {
  messages?: Array<{
    id?: string;
  }>;
}

interface WhatsAppTemplateParameter {
  type: 'text';
  text: string;
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
    components?: Array<{
      type: 'body';
      parameters: WhatsAppTemplateParameter[];
    }>;
  };
}

// WhatsApp API configuration
// You'll need to set these in your .env.local file
const WHATSAPP_API_VERSION = 'v22.0'; // WhatsApp Business API version
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || '';
// FROM number: The WhatsApp Business phone number ID that will send the message
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_PHONE_ID || '';
// TO number: The recipient WhatsApp number that will receive the form submissions
const ADMIN_WHATSAPP_NUMBER = process.env.ADMIN_WHATSAPP_NUMBER || '';
// Template name: The approved WhatsApp template name (e.g., "service_request", "hello_world")
const WHATSAPP_TEMPLATE_NAME = process.env.WHATSAPP_TEMPLATE_NAME || 'service_request';
// Template language: Language code for the template (e.g., "fr" or "fr_FR")
const WHATSAPP_TEMPLATE_LANGUAGE = process.env.WHATSAPP_TEMPLATE_LANGUAGE || 'fr';
// Template parameter count: Determines how many form fields will be injected into the template body
const WHATSAPP_TEMPLATE_PARAMETER_COUNT = Number.parseInt(process.env.WHATSAPP_TEMPLATE_PARAMETER_COUNT || '0', 10);

async function sendWhatsAppMessage(formData: FormData): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // Check if WhatsApp API is configured
    const missingConfig = [];
    if (!WHATSAPP_TOKEN) missingConfig.push('WHATSAPP_TOKEN');
    if (!WHATSAPP_PHONE_ID) missingConfig.push('WHATSAPP_PHONE_ID');
    if (!ADMIN_WHATSAPP_NUMBER) missingConfig.push('ADMIN_WHATSAPP_NUMBER');

    if (missingConfig.length > 0) {
      const errorMsg = `WhatsApp API not configured. Missing: ${missingConfig.join(', ')}`;
      console.error('❌', errorMsg);
      return { success: false, error: errorMsg };
    }

    console.log('📱 WhatsApp Configuration Check:', {
      hasToken: !!WHATSAPP_TOKEN,
      tokenLength: WHATSAPP_TOKEN.length,
      phoneId: WHATSAPP_PHONE_ID,
      recipientNumber: ADMIN_WHATSAPP_NUMBER,
      templateName: WHATSAPP_TEMPLATE_NAME,
      templateLanguage: WHATSAPP_TEMPLATE_LANGUAGE,
    });

    // Send message via WhatsApp Business API
    // Format: https://graph.facebook.com/v18.0/{phone-number-id}/messages
    // The phone-number-id in the URL is the FROM number (sender)
    const apiUrl = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_ID}/messages`;

    // Format the recipient number (TO number)
    // Ensure phone number has country code prefix (add + if not present)
    // Remove any spaces or dashes from the number
    let recipientNumber = ADMIN_WHATSAPP_NUMBER.replace(/[\s-]/g, '');
    recipientNumber = recipientNumber.startsWith('+')
      ? recipientNumber
      : `+${recipientNumber}`;

    // Prepare template parameters
    // Build the message content for template
    const serviceInfo = formData.service || 'Not specified';
    const emailInfo = formData.email || 'Not provided';
    const messageInfo = formData.message || 'No additional message';
    const timestamp = new Date().toLocaleString();

    // Create template body parameters
    // Adjust the number of parameters based on your template structure
    const availableParameters: WhatsAppTemplateParameter[] = [
      { type: 'text', text: formData.name },           // Parameter 1: Customer Name
      { type: 'text', text: formData.phone },          // Parameter 2: Phone Number
      { type: 'text', text: emailInfo },               // Parameter 3: Email
      { type: 'text', text: serviceInfo },             // Parameter 4: Service
      { type: 'text', text: messageInfo },             // Parameter 5: Message
      { type: 'text', text: `${timestamp}` },             // Parameter 6: Date/Time
    ];

    const desiredParameterCount = Number.isFinite(WHATSAPP_TEMPLATE_PARAMETER_COUNT)
      ? Math.max(0, WHATSAPP_TEMPLATE_PARAMETER_COUNT)
      : availableParameters.length;

    const templateParameters = availableParameters.slice(0, desiredParameterCount);

    // Build template message request body
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
        ...(templateParameters.length > 0 && {
          components: [
            {
              type: 'body',
              parameters: templateParameters,
            },
          ],
        }),
      },
    };

    console.log('📤 Sending WhatsApp template message:', {
      url: apiUrl,
      from: `Phone ID: ${WHATSAPP_PHONE_ID}`,
      to: recipientNumber,
      templateName: WHATSAPP_TEMPLATE_NAME,
      templateLanguage: WHATSAPP_TEMPLATE_LANGUAGE,
      parametersCount: templateParameters.length,
    });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const responseText = await response.text();
    let errorData: WhatsAppErrorResponse = {};

    try {
      errorData = JSON.parse(responseText) as WhatsAppErrorResponse;
    } catch {
      console.warn('Could not parse error response as JSON:', responseText);
    }

    if (!response.ok) {
      const errorMessage = errorData?.error?.message || errorData?.error?.error_user_msg || 'Unknown error';
      const errorCode = errorData?.error?.code || errorData?.error?.error_subcode || 'N/A';
      const errorType = errorData?.error?.type || 'N/A';

      console.error('❌ WhatsApp API error:', {
        status: response.status,
        statusText: response.statusText,
        errorCode: errorCode,
        errorType: errorType,
        errorMessage: errorMessage,
        fullError: errorData,
        url: apiUrl,
        recipientNumber: recipientNumber,
      });

      return {
        success: false,
        error: `Failed to send WhatsApp message (${response.status}): ${errorMessage}`
      };
    }

    let data: WhatsAppSuccessResponse = {};
    try {
      data = JSON.parse(responseText) as WhatsAppSuccessResponse;
    } catch {
      console.error('❌ Could not parse success response as JSON:', responseText);
      return { success: false, error: 'Invalid response from WhatsApp API' };
    }

    const messageId = data?.messages?.[0]?.id;
    console.log('✅ WhatsApp message sent successfully:', {
      messageId: messageId,
      recipient: recipientNumber,
    });

    return { success: true, messageId: messageId };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Exception while sending WhatsApp message:', {
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });
    return { success: false, error: `Error sending WhatsApp message: ${errorMessage}` };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: FormData = await request.json();

    // Validate required fields
    if (!body.name || !body.phone || !body.source) {
      return NextResponse.json(
        { error: 'Missing required fields: name, phone, and source are required' },
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
      console.log('📱 Falling back to WhatsApp...');
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
        console.log('📱 Falling back to WhatsApp...');
        dbConnected = false;
      }
    }

    // Send WhatsApp message (always attempt, especially if DB failed)
    console.log('📱 Attempting to send WhatsApp message...');
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

    // Return response based on whether DB was used or not
    if (dbConnected && savedSubmission) {
      return NextResponse.json(
        {
          success: true,
          message: 'Form submitted successfully',
          submissionId: savedSubmission._id,
          whatsappSent: whatsappResult.success,
        },
        { status: 200 }
      );
    } else {
      // Database failed, but WhatsApp was attempted
      if (whatsappResult.success) {
        return NextResponse.json(
          {
            success: true,
            message: 'Form sent to WhatsApp (database unavailable)',
            whatsappSent: true,
            databaseSaved: false,
            warning: 'Form was sent to WhatsApp but could not be saved to database',
          },
          { status: 200 }
        );
      } else {
        // Both database and WhatsApp failed
        console.error('❌ Both database and WhatsApp failed:', {
          whatsappError: whatsappResult.error,
        });
        return NextResponse.json(
          {
            error: 'Failed to save form submission',
            details: 'Both database and WhatsApp delivery failed',
            whatsappError: whatsappResult.error,
            debug: {
              whatsappConfigured: !!(WHATSAPP_TOKEN && WHATSAPP_PHONE_ID && ADMIN_WHATSAPP_NUMBER),
              recipientNumber: ADMIN_WHATSAPP_NUMBER,
            },
          },
          { status: 500 }
        );
      }
    }
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

