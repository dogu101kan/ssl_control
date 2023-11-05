const amqp = require("amqplib");
const connection = require("./connection");
const saveSSLResults = require("../helpers/ssl/sslResultSave");
const sendMail = require("../helpers/nodemailer/mail");


const consumer = async(queueName) => {
    const connect = await connection();
    const channel = await connect.createChannel();
    await channel.assertQueue(queueName);
    
    channel.consume(queueName, (message) => {
        messageString = message.content.toString()
        if(queueName==="query"){
            saveSSLResults(messageString);
        }
        if(queueName==="mail"){
            sendMail(messageString)
        }
        channel.ack(message);
    });
}
module.exports = consumer;