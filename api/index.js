const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers/index");
const customErrorHandler = require("./middlewares/errors/customErrorHandler");
const path = require("path");
let cors = require("cors");
const scheduler = require("node-schedule");
const expressWinston = require("express-winston");
const { transports, format } = require("winston");
const logger = require("./logger");
const { getWebsitesSSL } = require("./service/sslQuery");
const consumer = require("./rabbitmq/consumer");
const { sendSSLResults } = require("./service/mailService");

dotenv.config({
  path: "./config/env/config.env",
});

const app = express();

app.use(
  expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true,
  })
);

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   methods: 'GET,POST, DELETE',
// };

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT;

scheduler.scheduleJob("0 */2 * * *", function () {
  getWebsitesSSL();
  sendSSLResults();
});

consumer("query");
consumer("mail");

app.use("/api", routers);

app.use(express.static(path.join(__dirname, "public")));

const myFormat = format.printf(({ level, meta, timestamp }) => {
  return `${timestamp} ${level}: ${meta.message}`;
});

app.use(
  expressWinston.errorLogger({
    transports: [
      new transports.File({
        filename: "logsInternalErrors.log",
      }),
    ],
    format: format.combine(format.json(), format.timestamp(), myFormat),
  })
);

app.use(customErrorHandler);

app.listen(PORT, () => {
  console.log(`API started on ${PORT}`);
});
