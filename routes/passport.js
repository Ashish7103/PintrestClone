// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const passport=require("passport")
// const GOOGLE_CLIENT_ID="3633109161-939jfk7epcjcm6jhikop7es3d1m89ufb.apps.googleusercontent.com";
// const GOOGLE_CLIENT_SECRET="AIzaSyCks08jPJlEaYA6UdSsanso9BGY-6QXL0M";
// const userModel = require("./users");

// passport.use(new GoogleStrategy({
//     clientID: GOOGLE_CLIENT_ID,
//     clientSecret: GOOGLE_CLIENT_SECRET,
//     callbackURL: "/auth/google/callback"
//   },
//   async function(accessToken, refreshToken, profile, done) {
// //    await userModel.findOrCreate({ googleId: profile.id }, function (err, user) {
// //       return cb(err, user);
// //     });

// // cosnt user={
//     // username:profile.displayNam,
//     // avatar:profile.photos[0]
// // }
// // user.save()
// done(null,profile)
//   }
// ));
// passport.serializeUser((user,done)=>{
//     done(null,user)
// })
// passport.deserializeUser((user,done)=>{
//     done(null,user)
// })
// module.exports=passport;