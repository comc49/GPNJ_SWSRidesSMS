'use strict';

const twilio = require('twilio');
const listOfDrivers = require('./listOfDrivers.json');
const config = require('./config.json');


exports.reply = (req, res) => {
  console.log(res);

  const client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
  const sentMessages = [];

  console.log("request");
  console.log(req);

  const sendMessage = (message, phoneNumber) => {
    client.messages.create({
      body: message,
      to: `+1${phoneNumber}`,
      from: `+1${config.TWILIO_PHONE_NUMBER}`
    }).then( (msg) => {console.log(msg)}, (err)=> {console.err(err)});
    sentMessages.push(`${message} to ${phoneNumber}`);
    console.log(sentMessages)
  }

  const createMessage = (name, lot, time) => {
    return `Hey ${name}! This is a reminder to give rides at ${lot}. Please be there by ${time}.
     Send me a text when you leave and text me the time when you arrive. Thank you`;
  }

  req.body.rides.drivers.forEach( (driver) => {
    listOfDrivers.forEach((person) => {
      const matchedName = person.name.find((val) => {
        return driver.name.toLowerCase() === val.toLowerCase();
      })
      if (matchedName) {
        console.log(
          `Sending text '
          ${createMessage(driver.name, driver.location, req.body.rides.time)}' to ${person.phoneNumber}`
        );
        sendMessage(createMessage(driver.name, driver.location, req.body.rides.time), person.phoneNumber);
      }
    })
  })

  sendMessage('Messages sent', config.KOO_NUMBER);

  // Send the response
  res
    // .status(200)
    .end(sentMessages);
};
