const { PrismaClient } = require("@prisma/client");
const {sslQuery} = require("./sslQuery");
const CustomError = require("../error/CustomError");


const prisma = new PrismaClient();

const saveSSLResults = async(website) => {
    const { id, link } = JSON.parse(website);
    let data = {}
    console.log("website link " , link)
    const certificate = await sslQuery(link).then().catch((e) => new CustomError(e, 500))
    console.log(certificate, "save")
    
    if(certificate){
        data = {
            website :{
                connect :{
                    id
                }
            },
            serialNumber: certificate.serialNumber,
            fingerPrint: certificate.fingerprint,
            validFrom: certificate.valid_from,
            validTo: certificate.valid_to,
            infoAccess: certificate.infoAccess
        }
    }else{
        data = {
            website :{
                connect :{
                    id
                }
            },
            serialNumber: "certificate has expired",
            fingerPrint: "certificate has expired",
            validFrom: "certificate has expired",
            validTo: "certificate has expired",
            infoAccess: "certificate has expired"
        }    
    }
    
    await prisma.sSLResults.create({ data }).catch(err => new CustomError(err, 500))
}

module.exports = saveSSLResults;