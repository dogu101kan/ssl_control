const amqp = require("amqplib");
const connection = require("./connection");

module.exports = async(website, queueName) => {
    try{
        const connect = await connection();
        const channel = await connect.createChannel();
        await channel.assertQueue(queueName);
        await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(website)))
    }
    catch(err){
        console.log(err);
    }
} 