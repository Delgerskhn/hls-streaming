const express = require("express");
var cors = require("cors");
require("dotenv").config();

const videoRouter = require("./lib/core/api/routes/video");
const publicVideoRouter = require("./lib/core/api/routes/publicVideos");
const imgRouter = require("./lib/core/api/routes/image");
const fileRouter = require("./lib/core/api/routes/file");
const v2Routes = require("./lib/core/api/routes/v2/index");
const { exceptionHandler } = require("./lib/core/errors/exceptHandler");
const app = express();
var whitelist = [process.env.ELEARN_APP_HOST, "http://localhost:3535"];
const corsConfig = {
  credentials: true,
  origin: (origin, callback) => {
    if (origin === undefined || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
};
app.use(
  cors()
  // exceptionHandler
  // corsConfig
);

app.use("/video", videoRouter);
app.use("/public/video", publicVideoRouter);
app.use("/img", imgRouter);
app.use("/file", fileRouter);
app.use("/v2", v2Routes);

app.get("/player", (req, res) => {
  res.sendFile(`${__dirname}/client.html`);
});

app.get("/enc.key", (req, res) => {
  res.sendFile(path.join(__dirname, "../enc.key"));
});

module.exports = app;
