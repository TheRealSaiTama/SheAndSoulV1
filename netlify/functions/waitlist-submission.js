const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

function generateEmailHTML(userEmail) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to She&Soul Waitlist</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #e0bbff 0%, #9092ff 100%);
          }
          .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 15px 35px rgba(144, 146, 255, 0.3);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .logo {
            font-family: 'Playfair Display', serif;
            font-size: 48px;
            font-weight: 400;
            margin: 0;
            background: linear-gradient(135deg, #9092ff 0%, #e0bbff 100%);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .subtitle {
            color: #666;
            font-size: 16px;
            margin: 10px 0;
          }
          .welcome-message {
            background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
            border-radius: 15px;
            padding: 30px;
            margin: 30px 0;
            border-left: 4px solid #9092ff;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #9092ff 0%, #e0bbff 100%);
            color: white;
            padding: 15px 30px;
            text-decoration: none;
            border-radius: 10px;
            font-weight: 600;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #888;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo">She&Soul</h1>
            <p class="subtitle">Women's Health Platform</p>
          </div>
          <div class="welcome-message">
            <h2 style="color: #333; margin-top: 0;">🎉 Welcome to the She&Soul Family!</h2>
            <p>Dear Wellness Warrior,</p>
            <p>Thank you for joining our exclusive waitlist! We're thrilled to have you as part of the She&Soul community.</p>
            <p>You're now among the first to know when we launch our revolutionary women's health platform. Get ready for:</p>
            <ul style="margin: 20px 0;">
              <li>✨ Personalized wellness tracking</li>
              <li>🌙 Cycle syncing insights</li>
              <li>💪 Empowering health tools</li>
              <li>🤝 Supportive community features</li>
            </ul>
          </div>
          <div style="text-align: center;">
            <a href="https://sheandsoul.co.in" class="cta-button">Visit Our Website</a>
          </div>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 30px 0;">
            <h3 style="color: #9092ff; margin-top: 0;">What's Next?</h3>
            <p>We're working hard to create something truly special for you. Keep an eye on your inbox for:</p>
            <ul>
              <li>Exclusive updates on our development progress</li>
              <li>Early access opportunities</li>
              <li>Wellness tips and insights</li>
              <li>Special launch day surprises</li>
            </ul>
          </div>
          <div class="footer">
            <p>💜 With love from the She&Soul Team</p>
            <p>Follow us on social media for the latest updates!</p>
            <p>Questions? Reply to this email or contact us at support@sheandsoul.co.in</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse JSON body sent from frontend
    const { email } = JSON.parse(event.body || '{}');

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email address' })
      };
    }

    // Send email using Resend
    await resend.emails.send({
      from: 'She&Soul <hello@sheandsoul.co.in>',
      to: email,
      subject: '🌟 Welcome to She&Soul Waitlist - Your Wellness Journey Begins!',
      html: generateEmailHTML(email),
    });

    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: true,
        message: 'Successfully joined waitlist'
      })
    };
  } catch (error) {
    console.error('Error in waitlist submission:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      })
    };
  }
};