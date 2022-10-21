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

function getPayloadFromToken(token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(new Error(err));
      resolve(payload);
    });
  });
}

async function getUserSessionFromToken(token) {
  const data = await getPayloadFromToken(token, SERVER.API.SECRET_TOKEN);
  return data;
}

async function getAccountFromVerifyToken(token) {
  const data = await getPayloadFromToken(
    token,
    SERVER.SECRET_TOKEN_VERIFY_EMAILS
  );
  return data;
}

function createToken(payload, secret, expiresIn) {
  const token = jwt.sign(payload, secret, {
    expiresIn,
  });
  return token;
}

function createSessionToken(payload) {
  const token = createToken(payload, SERVER.API.SECRET_TOKEN, "1h");
  return token;
}

function createEmailVerifyToken(user) {
  const token = createToken(user, SERVER.SECRET_TOKEN_VERIFY_EMAILS, "10m");
  return token;
}

function createRecoryPasswordToken(user) {
  const token = createToken(user, SERVER.SECRET_TOKEN_RECOVERY_PASSWORD, "10m");
  return token;
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

function isRequestAjaxOrApi(req) {
  return !req.accepts("html") || req.xhr;
}

function escapeToken(token) {
  const tokenEscaped = encodeURIComponent(token).replace(/\./g, "$");
  return tokenEscaped;
}

function unescapeToken(tokenEscaped) {
  const token = encodeURIComponent(tokenEscaped).replace(/\$/g, ".");
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
  getUserSessionFromToken,
  hashPassword,
  escapeToken,
  unescapeToken,
  compileTemplate,
  isInvalidPassword,
  isRequestAjaxOrApi,
  getPayloadFromToken,
  createSessionToken,
  createEmailVerifyToken,
  createRecoryPasswordToken,
  getAccountFromVerifyToken,
};
