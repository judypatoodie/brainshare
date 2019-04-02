const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/wikis/";
const sequelize = require('../../src/db/models/index').sequelize;
const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;

describe("routes : wikis", () => {
  beforeEach((done) => {
    this.user;
    this.wiki;

    sequelize.sync({force: true}).then((res) => {
      User.create({
         username: "user_name",
         email: "user@example.com",
         password: "123456",
 	       role: "standard"
         })
         .then((user) => {
           this.user = user;
           request.get({
             url: "http://localhost:3000/auth/fake",
             form: {
               role: user.role,
               userId: user.id,
               email: user.email
             }
           });
        Wiki.create({
          title: "Oranges" ,
          description: "They provide vitamin C.",
          userId: user.id,
          private: false

        })
        .then((wiki) => {
          this.wiki = wiki;
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        })
      })
      .catch((err) => {
        console.log(err);
        done();
      })
    });

});

  describe("standard user should only see public wikis", () => {
    describe("GET /wikis", () => {

      it("should return a status code 200 and all wikis", (done) => {
        request.get(base, (err, res, body) => {
              expect(err).toBeNull();
          Wiki.all()
          .then((wikis) => {
          expect(this.user.role).toBe("standard");
          expect(this.wiki.private).toBe(false);
          done();
            });
          });
          })
        });
});


  describe("premium user creating and downgrading actions", () => {

    beforeEach((done) => {
      this.wiki;
      this.user;
      User.create({
        email: "premium@example.com",
        password: "123456",
        role: "premium"
      })
      .then((res) => {
        this.user = res;

      Wiki.create({
        title: "Mangos" ,
        description: "They provide vitamin C.",
        userId:this.user.id,
        private: true

      })
      .then((res) => {
        this.wiki = res.wiki;
        done();
      })
    });
    describe("POST /users/:id/downgrade", () => {
      request.get(base, (err, res, body) => {
      Wiki.findOne({where: {title: "Mangos"}})
      .then((wikis) => {
          expect(this.wiki.private).toBe(false);
          done();
          })
        });
       });
     });
  });


});
