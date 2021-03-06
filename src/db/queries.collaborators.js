const Collaborator = require("./models").Collaborator;
const User = require("./models").User;

module.exports = {
  add(req, callback) {
    console.log('adding collaborator');
    User.findOne({
      where: {
        email: req.body.addCollaborator
      }
    })

      .then(user => {
        console.log("this is the user:" + user);
        if (!user) {
          return callback("User not found, please ensure the user has signed up for an account.");
        } else if (user.id === req.user.id) {
          return callback("You cannot add yourself");
        }
        Collaborator.findOne({
          where: {
            userId: user.id,
            wikiId: req.params.id
          }
        })
          .then(collaborator => {
            if (collaborator) {
              return callback("User is already a collaborator");
            }
            return Collaborator.create({
              wikiId: req.params.id,
              userId: user.id
            })
              .then(collaborator => {
                callback(null, collaborator);
              })
              .catch(err => {
                callback(null, err);
              });
          })
          .catch(err => {
            console.log(err);
            callback(null, err);
          });
      })
      .catch(err => {
        console.log(err);
        callback(err);
      });
  },

  remove(req, callback) {
    Collaborator.destroy({
      where: {
        userId: req.params.userId
      }
    })
      .then(deleted => {
        callback(null, deleted);
      })
      .catch(err => {
        callback(err);
      });
  }
};
