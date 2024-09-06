var express = require("express");
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const passport = require("passport");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));
const upload = require("./multer");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index",{nav:false,});
});
router.get("/login", function (req, res, next) {
  res.render("index",{nav:false,});
});
router.get("/register", function (req, res, next) {
  res.render("register",{nav:false,});
});
router.get("/profile", isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user }).populate("posts");
  console.log(user);

  res.render("profile", { user, nav: true });
});

router.get("/feed", isLoggedIn, async function (req, res, next) {
  const user=await userModel.findOne({username:req.session.passport.user});
  const posts=await postModel.find().populate("user")

  res.render("feed",{user,posts,nav:true})
  
});
router.get("/show/posts", isLoggedIn, async function (req, res, next) {
  const user=await userModel.findOne({username:req.session.passport.user}).populate("posts");
  console.log(user);

  res.render("show",{user,nav:true,});
});
router.get("/add", isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  res.render("add", { user, nav: true });
});

router.post("/createpost", isLoggedIn, upload.single("image"), async function (req, res, next) {
    const user = await userModel.findOne({ username: req.session.passport.user });
    const post = await postModel.create({
      user: user._id,
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename,
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
  });

router.post("/fileupload",isLoggedIn,upload.single("image"),async function (req, res, next) {
    const user=await userModel.findOne({
      username:req.session.passport.user,
    })
    user.profileImage=req.file.filename;
    await user.save();
    res.redirect('/profile');
  }
);

router.post("/register", function (req, res) {
  const { username, email, contact,nameuser } = req.body;
  // username:req.body.username
  const userData = new userModel({ username,nameuser, email, contact });

  userModel.register(userData, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    });
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/", // Redirect back to login page on failure
    // failureFlash: true // Enable flash messages (optional)
  })
);

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

// router.get("/login/success", (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       success: true,
//       message: "Successful",
//       user: req.user,
//     });
//   }
// });
// router.get("/login/error", (req, res) => {
//   if (req.user) {
//     res.status().json({
//       success: false,
//       message: "failure",
//       // user: req.user,
//     });
//   }
// });


// // google
// router.get("/google",passport.authenticate("google",{scope:["profile"]}));
// // router.get('/auth/google',
// //   passport.authenticate('google', { scope: ['profile'] }));

// router.get("/google/callback",passport.authenticate("google",{
//   successRedirect:"http:localhost:3000/profile",
//   failureRedirect:"/",
// }))
module.exports = router;

