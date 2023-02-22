//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const mongoose = require("mongoose");

const {Schema} = mongoose;
const uri = "mongodb+srv://Ken_oshimoto:80eK1UhzUTftTTJp@cluster0.i7qdtbw.mongodb.net/journalDB";

mongoose.connect(uri);

const postsSchema = new Schema({
  title: String,
  body: String,
  date: String
});

const Post = mongoose.model("Post", postsSchema);


const date = require(__dirname + "/date.js");





const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));





app.get("/", function(req, res){
    Post.find({},(err,foundPosts)=>{
      if(!err){
        res.render('home', {
          newPosts: foundPosts,
          _:_,
        });
      }
    });



    
});

app.get("/about", function(req, res){
  res.render('about', {});
});

app.get("/contact", function(req, res){
  res.render('contact', {});
});

app.get("/compose", function(req, res){
  res.render('compose', {});
});


//below is to create a new post from the make post page
app.post("/compose", function(req,res){
  let day = date.getDate();
  const newpost = new Post({
    title: req.body.postTitle,
    body: req.body.postBody,
    date: day
  });

  newpost.save(function(err){

    if (!err){
 
      res.redirect("/");
 
    }
 
  });
  
 
 
});



    
app.get("/posts/:postName", function(req,res) {
 
  const requestedUrl = req.params.postName;
  Post.findOne({'_id': requestedUrl},(err, foundPost)=>{
    if (!err) {
      res.render('post', {title: foundPost.title, txt: foundPost.body, date: foundPost.date});
    } 
    else{
      res.render('notfound');
    }
    
    
  });
});





app.listen(3000, function() {
  console.log("Server started");
});
