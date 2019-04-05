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

  addWiki(newWiki, callback){
        return Wiki.create({
            title: newWiki.title,
            description: newWiki.description,
            private: newWiki.private,
            userId: newWiki.userId
        })
        .then((wiki) => {
            callback(null, wiki);
        })
        .catch((err) => {
            callback(err);
        })
    },
    getWiki(id, callback) {
      console.log("Getting wikis");

      return Wiki.findById(id, {

        include: [
          { model: Collaborator, as: 'collaborators', include: [{ model: User }] }
        ]
      })
        .then(wiki => {
          console.log(wiki.collaborators);
          callback(null, wiki);
        })
        .catch(err => {
          console.log(err);
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
