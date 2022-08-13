const chalk = require("chalk");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");
const { SERVER } = require("../config/variables");

const message = {
  success(str) {
    console.log(chalk.greenBright(`[✔️] ${str}`) + "\n");
  },

  error(str, err = null) {
    console.error(chalk.redBright(`[❌] ${str}`) + "\n");
    err && console.error(chalk.redBright(`[❌] Error message: ${err}`) + "\n");
  },

  warn(str) {
    console.warn(chalk.yellowBright(`[⚠️] ${str}`) + "\n");
  },
};

function getSessionTokenInfo(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SERVER.API.SECRET_TOKEN, (err, payload) => {
      if (err) return reject(new Error(err));
      resolve(payload);
    });
  });
}

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(parseInt(SERVER.API.SALT_BCRYPT));
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}

function isInvalidPassword(hashedPassword, password) {
  const result = bcrypt.compareSync(hashedPassword, password);
  return !result;
}

function createSessionToken(payload) {
  const token = jwt.sign(payload, SERVER.API.SECRET_TOKEN, {
    expiresIn: "1h",
  });
  return token;
}

function isRequestAjaxOrApi(req) {
  return !req.accepts("html") || req.xhr;
}

function createEmailVerifyToken(user) {
  const token = jwt.sign(user, SERVER.SECRET_TOKEN_VERIFY_EMAILS, {
    expiresIn: "10m",
  });
  return token;
}

function compileTemplate(url, variables) {
  const filePath = path.join(__dirname, url);
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const htmlToSend = template(variables);
  return htmlToSend;
}

module.exports = {
  message,
  getSessionTokenInfo,
  hashPassword,
  compileTemplate,
  isInvalidPassword,
  isRequestAjaxOrApi,
  createSessionToken,
  createEmailVerifyToken,
};
