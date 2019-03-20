const User = require("./models").User;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

module.exports = {

  createUser(newUser, callback){
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);
    return User.create({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      const msg = {
        to: newUser.email,
        from: 'info@blocipedia.com',
        subject: 'Welcome to blocipedia',
        text: 'Thank you for signing up - start sharing your knowledge with other members in the community!',
        html: '<strong>Let the fun begin!</strong>',
      };
      sgMail.send(msg);
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  }

}
