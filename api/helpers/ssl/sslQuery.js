const https = require("https");
const customError = require("../../helpers/error/CustomError");


const sslQuery = async (websiteURL) => {
  return new Promise((resolve, reject) => {
    https
      .get(`https://${websiteURL}`, (res) => {
        const certificate = res.connection.getPeerCertificate();
        if (!certificate) {
          reject('SSL sertifikası yok veya geçersiz');
        } else {
          resolve(certificate);
        }
      })
      .on('error', (err) => {
        reject('Hata: ' + err.message);
      });
  });
};

module.exports = {
  sslQuery
};