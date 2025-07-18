# Email Setup Guide (with Resend)

We have switched to using **Resend** for sending emails, as it is more reliable and developer-friendly.

## Environment Variables Required

To enable email functionality, you need a **Resend API Key**.

### For Local Development (.env file):
```
RESEND_API_KEY=your_resend_api_key_here
```

### For Netlify Deployment:
1. Go to your Netlify dashboard
2. Navigate to Site Settings → Environment Variables
3. Add the following variable:
   - `RESEND_API_KEY`: your_resend_api_key_here

## How to Get Your Resend API Key

1.  **Sign up for Resend:** Go to [resend.com](https://resend.com) and create a free account.
2.  **Verify Your Domain:**
    *   In your Resend dashboard, go to the "Domains" section.
    *   Add your domain (`sheandsoul.co.in`).
    *   Resend will give you a few DNS records to add to your domain provider (where you bought your domain). This is to verify ownership and improve email deliverability.
3.  **Create an API Key:**
    *   Once your domain is verified, go to the "API Keys" section.
    *   Click "Create API Key".
    *   Give it a name (e.g., "SheAndSoulApp") and set the permissions to "Full Access".
    *   **Copy the key immediately.** You won't be able to see it again.

## Using the Email Function

-   Once you've set the `RESEND_API_KEY` in your `.env` file and restarted the server (`npm run dev:email`), everything will work automatically.
-   The "from" address is now hardcoded as `hello@sheandsoul.co.in`. Make sure this address is set up in your domain.
-   The beautiful HTML email template remains the same!

## Testing the Email Function

Once deployed, you can test the email function by:
1. Visiting your countdown page
2. Entering a valid email address
3. Clicking "Join Waitlist"
4. Check the provided email for the welcome message

## Email Template Features

The generated email includes:
- Beautiful HTML design matching your brand colors
- Personalized greeting
- Information about what to expect
- Call-to-action button
- Social media links
- Professional footer with contact information

## Troubleshooting

- **Authentication failed**: Check your Zoho app password
- **SMTP connection issues**: Verify Zoho SMTP settings
- **Email not received**: Check spam folder, verify email address
- **Function timeout**: Check Netlify function logs for errors 