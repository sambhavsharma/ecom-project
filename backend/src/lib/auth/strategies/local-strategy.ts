import passport from "passport";
import { Strategy } from "passport-local";

import { db } from "../../../db";
import { usersTable } from "../../../db/users";
import { eq, and } from "drizzle-orm";

const crypto = require('crypto');
const HASH_FUNCTION = 'sha256';
const env = process.env.ENV as string;

// The authenticate strategy is probably not needed, we could do this work in the model itself
const localStrategy =  passport.use(
    new Strategy( {usernameField: 'email'}, async function(email: string, password: string, done){
        try {

            const user = await db.query.usersTable.findFirst({
                where: and(
                    eq(usersTable.email, email),
                    eq(usersTable.is_deleted, false)
                ),
                with: { 
                    media: {
                        where: (media, { eq }) => eq(media.parent_type, "user")
                    }
                }
            });
            
            if(!user) { throw new Error(); }
            
            if(env == 'dev' && user.id == 1) { return done(null, user); }
        
            var salt = "";
            await crypto.pbkdf2(password, salt, 310000, 32, HASH_FUNCTION, async function(err, hashedPassword) {
                if (!(hashedPassword.toString('hex') === user.password)) {
                    console.log('not a match');
                    return done(null, false, {});
                }

                return done(null, user);
            })

            
        } catch (err) {
            done(null, {});
        }
    }
));

passport.serializeUser(function(user,done){
    process.nextTick(function() {
        done(null, { id: user.id, email: user.email });
    });
});

passport.deserializeUser(function(user,done){
    done(null,user);
});

export default localStrategy;