const { GoogleSpreadsheet } = require('google-spreadsheet');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);

    await doc.useServiceAccountAuth({
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    });

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    const { email } = JSON.parse(event.body);
    await sheet.addRow({ Email: email, Timestamp: new Date().toISOString() });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error('Error adding to sheet:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error adding to sheet' })
    };
  }
};
