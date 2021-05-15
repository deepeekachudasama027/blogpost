const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Article = mongoose.model("Article");


router.get("/", (req, res) => {
  res.render("article/addOrEdit", {
    viewTitle: "New Blog",
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
});

function insertRecord(req, res) {
  var article = new Article();
  article.Title = req.body.Title;
  article.CreatedBy = req.body.CreatedBy;
  article.Description = req.body.Description;
  article.save((err, doc) => {
    if (!err) res.redirect("article/list");
    else {
      if (err.name == "ValidationError") {
        handleValidationError(err, req.body);
        res.render("article/addOrEdit", {
          viewTitle: "New Blog",
          article: req.body,
        });
      } else console.log("Error during record insertion : " + err);
    }
  });
}

function updateRecord(req, res) {
  Article.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("article/list");
      } else {
        if (err.name == "ValidationError") {
          handleValidationError(err, req.body);
          res.render("article/addOrEdit", {
            viewTitle: "Edit Blog",
            article: req.body,
          });
        } else console.log("Error during record update : " + err);
      }
    }
  );
}

router.get("/list", (req, res) => {
  Article.find((err, docs) => {
    if (!err) {
      res.render("article/list", {
        list: docs,
      });
    } else {
      console.log("Error in retrieving article list :" + err);
    }
  });
});

function handleValidationError(err, body) {
  for (field in err.errors) {
    switch (err.errors[field].path) {
      case "Title":
        body["TitleError"] = err.errors[field].message;
        break;
      case "CreatedBy":
        body["CreatedByError"] = err.errors[field].message;
        break;
      default:
        break;
    }
  }
}

router.get("/:id", (req, res) => {
  Article.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("article/addOrEdit", {
        viewTitle: "Update Blog",
        article: doc,
      });
    }
  });
});

router.get("/delete/:id", (req, res) => {
  Article.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/article/list");
    } else {
      console.log("Error in article delete :" + err);
    }
  });
});

router.get("/find/:id", (req, res) => {
  Article.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("article/show", {
        article: doc,
      });
    }
  });
});

module.exports = router;
