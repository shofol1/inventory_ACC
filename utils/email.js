const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

exports.sendMailWithMailGun = async (data) => {
  const result = await mg.messages.create(
    "sandbox479ccf7e8cba4ca9955c823f76778db1.mailgun.org",
    {
      from: "Mailgun Sandbox <postmaster@sandbox479ccf7e8cba4ca9955c823f76778db1.mailgun.org>",
      to: data.to,
      subject: data.subject,
      text: data.text,
    }
  );
  return result.id;
};
