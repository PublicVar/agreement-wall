const email = require("emailjs");

class Mailer {
    constructor(transport){
      this.transport = transport;
    }

    sendConfirmOptIn(to,host, hash) {
      const htmlMessage = `
      <html>
      <p>Bonjour,</p>

      <p>Vous recevez cet email car vous avez souhaité signaler votre soutien au CSFR Numérique.</p>

      <p>Pour finaliser cette action, cliquez sur le lien suivant : <a href="http://${host}/agree/opt-in/${hash}">http://${host}/opt-in/${hash}</a></p>

      <p>Cordialement.</p>

      <br/><br/>
      <p>(*Veuillez ne pas répondre à cet email automatique. Cette adresse email, csfr-numerique@outlook.fr, n'est utilisée qu'a des fins d'envoie d'email pour ses applications numériques. 
      Ce n'est en aucun cas l'adresse à utiliser pour contacter le CSFR Numérique)</p>
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
        subject: "Soutien au CSFR Numérique",
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