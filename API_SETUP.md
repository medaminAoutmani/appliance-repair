# API Setup Guide

This guide explains how to set up the form submission API with MongoDB and WhatsApp integration.

## Prerequisites

1. MongoDB Atlas account and cluster
2. WhatsApp Business API access (Meta/Facebook) or alternative WhatsApp API provider

## Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
# MongoDB Connection String
# Replace <db_password> with your actual MongoDB password
MONGODB_URI=mongodb+srv://admin:<db_password>@appliance-repair-cluste.8fooyrx.mongodb.net/?appName=appliance-repair-cluster

# WhatsApp Business API Configuration
WHATSAPP_TOKEN=your_generated_token
WHATSAPP_PHONE_ID=your_phone_number_id
ADMIN_WHATSAPP_NUMBER=2126XXXXXXXX  # your own WhatsApp number
WHATSAPP_TEMPLATE_NAME=service_request  # Your approved WhatsApp template name
WHATSAPP_TEMPLATE_LANGUAGE=en  # Template language code (default: en)
```

## MongoDB Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster (if you haven't already)
3. Get your connection string
4. Replace `<db_password>` with your database password
5. Add the connection string to `.env.local` as `MONGODB_URI`

## WhatsApp API Setup

### Option 1: Meta WhatsApp Business API

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Create a new app or use an existing one
3. Add WhatsApp product to your app
4. Get your:
   - **Access Token** → `WHATSAPP_TOKEN`
   - **Phone Number ID** → `WHATSAPP_PHONE_ID`
   - **Your Business WhatsApp Number** (your WhatsApp number that will receive ALL form submissions) → `ADMIN_WHATSAPP_NUMBER`
     - Format: Include country code without the `+` sign (e.g., `2126XXXXXXXX` for Morocco, `1234567890` for US)
     - **Important:** All form submissions from both `SeventhSection` and `FormCard` will be sent to this single number

5. **Create and Approve a WhatsApp Template:**
   - Go to your WhatsApp Business Manager
   - Navigate to "Message Templates"
   - Create a new template with the following structure:
     - **Template Name:** (e.g., `service_request`) → Set this as `WHATSAPP_TEMPLATE_NAME`
     - **Category:** Choose "UTILITY" or "MARKETING"
     - **Language:** Select your language (e.g., English) → Set code as `WHATSAPP_TEMPLATE_LANGUAGE`
     - **Template Body:** Use variables for dynamic content:
       ```
       🔧 New Service Request
       
       Customer Name: {{1}}
       Phone Number: {{2}}
       Email: {{3}}
       Service Needed: {{4}}
       Message: {{5}}
       Source: {{6}}
       ```
     - **Note:** The template must be approved by WhatsApp before you can use it
     - The code currently sends 6 parameters in this order:
       1. Customer Name
       2. Phone Number
       3. Email
       4. Service
       5. Message
       6. Source & Timestamp

### Option 2: Alternative WhatsApp API Providers

If you're using a different provider (like Twilio, MessageBird, etc.), you'll need to modify the `sendWhatsAppMessage` function in `src/app/api/submit-form/route.ts` to match their API format.

## API Endpoint

The API endpoint is available at:
- **URL**: `/api/submit-form`
- **Method**: `POST`
- **Content-Type**: `application/json`

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "service": "refrigerator-repair",
  "message": "My refrigerator is not working",
  "source": "seventhSection" // or "formCard"
}
```

### Response

**Success (200)**:
```json
{
  "success": true,
  "message": "Form submitted successfully",
  "submissionId": "507f1f77bcf86cd799439011",
  "whatsappSent": true
}
```

**Error (400/500)**:
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

## Database Schema

The form submissions are stored in MongoDB with the following schema:

```typescript
{
  name: string (required)
  email: string (optional)
  phone: string (required)
  service: string (optional)
  message: string (optional)
  source: 'seventhSection' | 'formCard' (required)
  whatsappSent: boolean (default: false)
  whatsappMessageId: string (optional)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

## Testing

1. Start your development server: `npm run dev`
2. Fill out a form in either `SeventhSection` or `FormCard`
3. Submit the form
4. Check the console for any errors
5. Verify the submission in MongoDB Atlas
6. Check if the WhatsApp message was sent (if configured)

## Troubleshooting

### MongoDB Connection Issues

- Verify your connection string is correct
- Check that your IP address is whitelisted in MongoDB Atlas
- Ensure your database password doesn't contain special characters that need URL encoding

### WhatsApp API Issues

- Verify all WhatsApp environment variables are set correctly
- Check that your access token is valid and not expired
- Ensure your phone number ID is correct
- Verify the recipient phone number is in the correct format (with country code, e.g., +1234567890)
- **Template Issues:**
  - Ensure your template is approved by WhatsApp (check status in Business Manager)
  - Verify the template name matches exactly (case-sensitive)
  - Check that the number of parameters in your template matches the code (currently 6 parameters)
  - Ensure the template language code matches (e.g., "en" for English)
  - If you need a different number of parameters, modify the `templateParameters` array in `src/app/api/submit-form/route.ts`

### Form Submission Issues

- Check browser console for errors
- Verify the API route is accessible
- Check server logs for detailed error messages

