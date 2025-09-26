const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendSMS(to, body) {
  if (!process.env.TWILIO_PHONE_NUMBER) {
    console.warn('TWILIO_PHONE_NUMBER is not set. SMS not sent.');
    return;
  }
  try {
    await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
  } catch (error) {
    console.error('Erreur envoi SMS:', error.message);
  }
}

module.exports = { sendSMS };