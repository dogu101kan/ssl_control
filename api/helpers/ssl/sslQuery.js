const https = require("https");

const sslQuery = (hostname, port = 443) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname,
      port,
      rejectUnauthorized: false,
    };

    const req = https.request(options, (res) => {
      const certificate = res.connection.getPeerCertificate();
      console.log(certificate)
      if (!certificate || Object.keys(certificate).length === 0) {
        resolve(false);
      } else {
        resolve(certificate);
      }
    });

    req.on('error', (error) => {
      reject('Hata: ' + error.message);
    });

    req.end();
  });
}
module.exports = {
  sslQuery
};
