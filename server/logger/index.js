const pino = require("pino").default;
const pretty = require("pino-pretty");
const moment = require("moment");
const stream = pretty({
  colorize: true,
  singleLine: true,
  translateTime: "SYS:yyyy-mm-dd HH:MM:ss",
  customColors: "err:red,info:blue"
});
const {
  LOG_LEVEL = "info",
  LOG_STYLE = "yes"
} = process.env;

const levels = {
  fatal: 60,
  error: 50,
  warn: 40,
  info: 30,
  debug: 20
};

const logger = pino({
  level: LOG_LEVEL,
  customLevels: levels,
  useOnlyCustomLevels: true,
  customColors: "err:red,info:green",
  timestamp: () => `, "time":"${moment().format("YYYY-MM-DD HH:mm:ss")}"`

}, LOG_STYLE == "yes" ? stream : undefined);

module.exports = logger;
