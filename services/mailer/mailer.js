const email = require("emailjs");

class Mailer {
    constructor(transport){
      this.transport = transport;
    }

    sendConfirmOptIn(to,host, hash) {
      const htmlMessage = `
      <html>
      <p>Bonjour,</p>

      <p>Cliquer sur le lien suivant pour confirmer votre action : <a href="http://${host}/agree/opt-in/${hash}">http://${host}/opt-in/${hash}</a></p>

      <p>Cordialement,</p>
      </html>
      `;
      const server = this.transport.server.connect({
        user: process.env.SMTP_OUTLOOK_USER,
        password: process.env.SMTP_OUTLOOK_PASSWORD,
        host: "smtp-mail.outlook.com",
        tls: {
          ciphers: "SSLv3"
        }
      });

      const message = {
        text: htmlMessage,
        from: "csfr.numerique@outlook.fr",
        to: to,
        subject: "CSFR Numérique",
        attachment: [{
          data: htmlMessage,
          alternative: true
        }]
      };
      server.send(message, (err) => {
        console.log(err)
      });
    }
   
}

module.exports = new Mailer(email);