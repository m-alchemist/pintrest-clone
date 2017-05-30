const mongoose = require('mongoose');
const User=require('./models/user');
const Image=require('./models/image');
const passport=require('passport');
const TwitterStrategy=require('passport-twitter').Strategy
const Secret = require('./config/secret.js');
const flash = require('connect-flash');
const logger=require('express-logger');
const session = require('express-session');
const path=require('path');
mongoose.Promise = global.Promise;
module.exports= function(app){
  require('./config/passport')(passport); // pass passport for configuration

  app.use(session({
    secret: Secret.secret

  }))
  	app.use(passport.initialize());
  	app.use(passport.session()); // persistent login sessions
  	app.use(flash()); // use connect-flash for flash messages stored in session



  app.get('/login',
    passport.authenticate('twitter'))

  app.get('/authentication',function(req,res,next){
    if(req.user){
      res.send({token:req.user.twitter.token})
    }
    else{
        res.send({token:null})
    }

  })
  app.get('/user',function(req,res,next){
    if(req.user){
      User.findById(req.user._id).populate('likedImages').populate('images')
      .then((user)=>{
          res.send({user:user})
      })

    }

  })
  app.get('/login/return',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {

      res.redirect('/');
    });
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {

          // successRedirect : '/profile',

          successRedirect : '/',
          failureRedirect : '/'
        }));
        app.get('/logout', function(req, res) {

  							req.logout();
  							res.redirect('/');
  						});
              app.post('/add', function(req,res,next){


                if(req.user){
                  const imageData={
                      url:req.body.url,
                      description:req.body.description,
                      user:req.user,
                      date:Date.now()
                  }
                  const newImage=new Image(imageData)
                  newImage.save()
                  .then(()=>
                    User.findByIdAndUpdate(req.user._id,{ $push: { images: {$each: [newImage], $position: 0 } } }))
                    .then(()=>  Image.find({}).populate('user').populate('likes').sort({date: -1}))
                    .then((images)=>res.send({images}))


                }
              })
          app.get('/publicimages',function(req,res,next){
            Image.find({}).populate('user').populate('likes').sort({date: -1})
            .then((images)=>res.send({images}))
          })
          app.post('/likeimage',function(req,res,next){
              if(req.user){
                var clickedImage=req.body;
                User.findById(req.user._id).populate({path:'likedImages',path:'images'})
                .then((user)=>{
                  var liked=false;
                  user.likedImages.map((likedImage)=>{

                    if(likedImage==clickedImage._id){
                      liked=true;

                    }
                  })
                  if(liked){

                    User.findByIdAndUpdate(req.user._id,{$pull:{likedImages:clickedImage._id}})
                    .then(()=>Image.findByIdAndUpdate(clickedImage._id,{$pull:{likes:req.user._id}}))

                  }
                  else{

                      User.findByIdAndUpdate(req.user._id,{$push:{likedImages:clickedImage}})
                      .then(()=>Image.findByIdAndUpdate(clickedImage._id,{$push:{likes:req.user}}))


                  }

                })
                .then(()=>User.findById(req.user._id).populate({path:'likedImages',path:'images'}))
                .then((user)=>{res.send({user})})
              }

          })
          app.post('/removeimage',function(req,res,next){
            var clickedImage=req.body;
            if(req.user){
              User.findById(req.user._id).populate('likedImages').populate('images')
              .then((user)=>User.findByIdAndUpdate(user._id,{$pull:{images:clickedImage._id}}))
              .then(()=>Image.findByIdAndRemove(clickedImage._id))
              .then(()=>User.findById(req.user._id))
              .then((user)=>res.send({user}))
            }
          })
          app.post('/userwall',function(req,res,next){
            const userId=req.body.userId;

            User.findById(userId).populate('likedImages').populate('images')
            .then((user)=>res.send({user}))
          })

          app.get('*',(req,res)=>{
            res.sendFile(path.resolve(__dirname,'index.html'))
          });
  }
