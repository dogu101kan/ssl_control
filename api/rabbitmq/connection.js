const amqp = require("amqplib");

module.exports = async()=>{
    const connection = await amqp.connect("amqp://localhost:5672");
    return connection;
}