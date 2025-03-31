import passport from "passport";
import { Strategy } from "passport-local";

import { db } from "../../../db";
import { usersTable } from "../../../db/users";
import { eq, and } from "drizzle-orm";

const crypto = require('crypto');
const HASH_FUNCTION = 'sha256';

const localStrategy =  passport.use(
    new Strategy({usernameField: 'email'}, 
    async (email: string, password: string, done) => {
        try {

            const [user] = await db.select()
                .from(usersTable)
                .where(and(
                    eq(usersTable.email, email),
                    eq(usersTable.is_deleted, false)
                ));

            if(!user) { throw new Error(); }
            
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