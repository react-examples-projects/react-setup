const axios = require("axios").default;
const FormData = require("form-data");
const {
  createEmailVerifyToken,
  compileTemplate,
  message,
} = require("../helpers/utils");
const {
  transporterEmails,
  API: { API_UPLOAD_IMAGES, API_UPLOAD_IMAGES_KEY },
} = require("../config/variables").SERVER;

async function uploadImages(image) {
  const data = new FormData();
  const dataImage = Buffer.from(image).toString("base64");
  data.append("key", API_UPLOAD_IMAGES_KEY);
  data.append("image", dataImage);
  const res = await axios.post(API_UPLOAD_IMAGES, data, {
    headers: data.getHeaders(),
  });
  return res.data.data;
}

function sendEmail({ email, subject, text, html }) {
  const mailOptions = {
    from: "libardojesusrengifo129@gmail.com",
    to: email,
    subject,
    text,
    html,
  };

  return new Promise((resolve, reject) => {
    transporterEmails.sendMail(mailOptions, (error, info) => {
      if (error) return reject(error);
      message.success("Email sent: " + info.response);
      resolve(info);
    });
  });
}

async function sendVerificationEmail({ email, name }) {
  const token = createEmailVerifyToken({ email, name });
  const tokenEscaped = encodeURIComponent(token).replace(/\./g, "$");
  console.log(tokenEscaped)
  return sendEmail({
    email,
    subject: "Verificar su cuenta en React Dashboard",
    html: compileTemplate("../templates/verify-email.html", {
      name,
      verifyLink: `http://localhost:3000/verify/${tokenEscaped}`,
    }),
  });
}

module.exports = { uploadImages, sendEmail, sendVerificationEmail };
