const User = require("./models").User;
const Wiki = require("./models").Wiki;
const Authorizer = require("../policies/application");
const Collaborator = require("./models").Collaborator;
const Private = require("../policies/wiki");
const Public = require("../policies/application");

module.exports = {

  getAllWikis(callback){
    return Wiki.all({
      include: [
        {
          model: Collaborator,
          as: "collaborators"
        }
      ]
    })

    .then((wikis) => {
      callback(null, wikis);
    })
    .catch((err) => {
      callback(err);
    })
  },

  addWiki(newWiki, callback) {
    return Wiki.create(newWiki)
    .then( wiki => {
      wiki.setCollaborators(wiki.private ? [wiki.userId] : null)
      .then( collaborators => {
        callback(null, wiki);
      })
      .catch( err => {
        callback(err);
      });
    })
    .catch( err => {
      console.log(err);
      callback(err);
    });
  },

  getWiki(id, callback) {
      return Wiki.findById(id)
      .then( wiki => {
        wiki.getCollaborators()
        .then( collaborators => {
          callback(null, wiki, collaborators);
        })
        .catch( err => {
          callback(err);
        });
      })
      .catch( err => {
        callback(err);
      });
    },

  deleteWiki(id, callback){
  return Wiki.destroy({
    where: {id}
  })
  .then((wiki) => {
    callback(null, wiki);
  })
  .catch((err) => {
    callback(err);
    })
  },

  updateWiki(id, updatedWiki, callback){
      return Wiki.findById(id)
      .then((wiki) => {
          if(!wiki){
              return callback("Wiki not found");
          }

          wiki.update(updatedWiki, {
              fields: Object.keys(updatedWiki)
          })
          .then(() => {
              callback(null, wiki);
          })
          .catch((err) => {
              callback(err);
          });
      });
  },

 downgradePrivateWikis(id){
   return Wiki.all()
   .then((wikis) => {
       wikis.forEach((wiki) => {
           if(wiki.userId == id && wiki.private == true){
               wiki.update({
                   private: false
               })
           }
       })
   })
   .catch((err) => {
       callback(err);
   })
 },
}
