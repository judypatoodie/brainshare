const collaboratorQueries = require("../../src/db/queries.collaborators.js");


module.exports = {
  add(req, res, next) {
    console.log('adding collaborator');
    if (req.user) {
      collaboratorQueries.add(req, (err, collaborator) => {
        if (err) {
          console.log(err);

          req.flash("error", {param: '', msg: err});
          console.log(err);
        }
        res.redirect(req.headers.referer);
      });
    } else {
      req.flash("notice", "Please sign in to do that.");
      res.redirect(req.headers.referer);
    }
  },

  remove(req, res, next) {
    if (req.user) {
      collaboratorQueries.remove(req, (err, collaborator) => {
        if (err) {
          req.flash("error", err);
        }
        req.flash("notice", "This user is no longer a collaborator");
        res.redirect(req.headers.referer);
      });
    } else {
      req.flash("notice", "Please sign in to start collaborating.");
      res.redirect(req.headers.referer);
    }
  }
};
