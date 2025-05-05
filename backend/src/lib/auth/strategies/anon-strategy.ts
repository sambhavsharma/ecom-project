import passport from "passport";
import { Strategy } from "passport-anonymous";


const anonStrategy =  passport.use(
    new Strategy()
);

passport.serializeUser(function(user, done){
    process.nextTick(function() {
        done(null, { id: user.id, email: user.email });
    });
});

passport.deserializeUser(function(user,done){
    done(null,user);
});

export default anonStrategy;