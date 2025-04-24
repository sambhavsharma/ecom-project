import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import { db } from "../../../db";
import { usersTable } from "../../../db/users";
import { eq, and } from "drizzle-orm";

var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret',
    // issuer: 'accounts.examplesoft.com',
    // audience: 'yoursite.net'
};


const jwtStrategy =  passport.use(
    new Strategy(opts, async function(jwt_payload, done) {
        const [user] = await db.select()
            .from(usersTable)
            .where(and(
                eq(usersTable.id, jwt_payload.id),
                eq(usersTable.is_deleted, false)
            ));
        
            if(!user) { throw new Error(); }

            return done(null, user);
    }
));

passport.serializeUser(function(user, done){
    process.nextTick(function() {
        done(null, { id: user.id, email: user.email });
    });
});

passport.deserializeUser(function(user,done){
    done(null,user);
});

export default jwtStrategy;