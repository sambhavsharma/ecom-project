import passport from "passport";

import { Strategy } from "passport-google-oauth20";


const googleStrategy =  passport.use(
    new Strategy(
        {  
            clientID: process.env.GOOGLE_CLIENT_ID,  
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,  
            callbackURL: '/auth/google/callback',  
        }, 
        (accessToken, refreshToken, profile, done) => {  
            // 🗂️ In a real app, you'd save the user info to your DB here  
            console.log('Google profile:', profile);  
            done(null, profile);  
        }
    )
)

// 🚀 Serialize user into session  
passport.serializeUser((user, done) => {  
  done(null, user);  
});  
passport.deserializeUser((user, done) => {  
  done(null, user);  
}); 

export default googleStrategy;