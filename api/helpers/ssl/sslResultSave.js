const { PrismaClient } = require("@prisma/client");
const {sslQuery} = require("./sslQuery");


const prisma = new PrismaClient();

const saveSSLResults = async(website) => {
    const { id, link } = JSON.parse(website);


    const certificate = await sslQuery(link).then().catch(e=>{
        console.log(e)
    })
    
    const data = {
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

    await prisma.sSLResults.create({ data }).catch(err => console.log(err))
}

module.exports = saveSSLResults;