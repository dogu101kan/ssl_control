const { PrismaClient } = require("@prisma/client");
const publisher = require("../rabbitmq/publisher");

const prisma = new PrismaClient();

const getWebsitesSSL = async()=>{
  let website = await prisma.websites.findMany();
  
  if(!website){
    return false
  }
  website.forEach(e => {
    publisher(e, "query");
  });
};


module.exports = {
    getWebsitesSSL
}