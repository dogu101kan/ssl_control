const { PrismaClient } = require("@prisma/client");
const publisher = require("../rabbitmq/publisher");

const prisma = new PrismaClient();

const sendSSLResults = async()=>{
  let websites = await prisma.websites.findMany({
    include:{
      user:true,
      sslResults: {
        orderBy: {
          createdAt: 'desc',
        },
        take: 1,
      },
    }
  });
  
  
  if(!websites){
    return false
  }
  websites.forEach(async e => {
    if(e.sslResults.length < 1) return false;

    let mail = await prisma.mails.findUnique({
      where:{
        userId:e.user.id
      }
    });

    publisher({
      mail:mail.mail,
      website: e.link,
      sslResults: e.sslResults,
    }, "mail");
  });
};


module.exports = {
  sendSSLResults
}