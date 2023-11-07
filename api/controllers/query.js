const asyncErrorWrapper = require("express-async-handler");
const { sslQuery } = require("../helpers/ssl/sslQuery");
const { PrismaClient } = require("@prisma/client");
const CustomError = require("../helpers/error/CustomError");

const prisma = new PrismaClient();

const addMail = asyncErrorWrapper(async (req, res) => {
  const { mail } = req.body;

  const data = {
    mail: mail,
    userId: req.user.id,
  };

  const newMail = await prisma.mails.create({
    data,
  });

  return res.status(201).json({
    success: true,
    data: newMail,
  });
});

const deleteMail = asyncErrorWrapper(async (req, res) => {
  const mail = await prisma.mails.delete({
    where:{
      userId:req.user.id
    },
  });

  return res.status(201).json({
    success: true,
  });
});


const addWebsite = asyncErrorWrapper(async (req, res, next) => {
  const { website } = req.body;
  const certificate = await sslQuery(website).catch(e => console.log(e))
  let data = {}
  if(!certificate){
    let hasExpired = await prisma.sSLProviders.findFirst({
      where: {
          name: "Has Expired",
      },
      select:{
        websites:true,
        id:true
      }
    });
    if (!hasExpired){
      hasExpired = await prisma.sSLProviders.create({
        data: {
          name: "Has Expired",
        }
      });
    }
     data = {
      link: website,
      sslProvider: {
        connect: {
          id: hasExpired.id,
        },
      },
      user: {
        connect: {
          id: req.user.id,
        },
      },
    };
  }else{
  
    let provider = await prisma.sSLProviders.findFirst({
      where: {
          name: certificate?.issuer?.O,
      },
      select:{
        websites:true,
        id:true
      }
    });
  
    if (!provider) {
      provider = await prisma.sSLProviders.create({
        data: {
          name: certificate?.issuer?.O,
        }
      });
    }

    data = {
      link: website,
      sslProvider: {
        connect: {
          id: provider.id,
        },
      },
      user: {
        connect: {
          id: req.user.id,
        },
      },
    };
  }

  
  

  const newWebsite = await prisma.websites.create({data});
 
  return res.status(201).json({
    success: true,
    data: newWebsite
  });

});

const deleteWebsite = asyncErrorWrapper(async (req, res, next) => {
  const { websiteId } = req.params.id;
  

  const website = await prisma.websites.delete({
    where:{
      id:websiteId,
      userId:req.user.id
    }
  });

  if(!website) new CustomError("Website doesn't exist!", 400)
 
  return res.status(201).json({
    success: true,
  });
});

const sslResults = asyncErrorWrapper(async (req, res) => {
  const userId = req.user.id;

  let sslResults = await prisma.websites.findMany({
    where: {
        userId:userId
    },
    include:{
      sslResults: {
        orderBy: {
          createdAt: 'desc',
        },
        take: 5,
    }
  }});
  
  return res.status(200).json({
    success: true,
    data: sslResults,
  });
});

module.exports = {
  addMail,
  addWebsite,
  sslResults,
  deleteMail,
  deleteWebsite,
};
