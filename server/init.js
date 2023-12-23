const { Command, Option } = require("commander");
const program = new Command();
const log = require("./logger");
const options = program
  .addOption(
    new Option("-e, --env-name <string>", "env name")
      .makeOptionMandatory(true))
  .parse().opts();

log.info(options);

const {
  envName
} = options;

require("dotenv-expand").expand(require("dotenv").config({
  path: `./envs/.env.${envName}`
}));

module.exports = { envName };
