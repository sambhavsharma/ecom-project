import passport from "passport";
import { Strategy } from "passport-local";

import { db } from "../../../db";
import { usersTable } from "../../../db/users";
import { eq, and } from "drizzle-orm";

import {getHashedPassword} from "../password";

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

            let hashedPassword = await getHashedPassword(password);
            
            if (!(hashedPassword === user.password)) {
                return done(null, false, {});
            }

            return done(null, user);
            
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