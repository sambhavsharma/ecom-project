import axios from "axios";

const User = require("../models/user");

export async function googleLogin(code) {

    try {

        const client_id = process.env.GOOGLE_CLIENT_ID;
        const client_secret = process.env.GOOGLE_CLIENT_SECRET;
        const redirect_uri = process.env.GOOGLE_REDIRECT_URI;
    
        const { data } = await axios.post('https://oauth2.googleapis.com/token', {
            client_id: client_id,
            client_secret: client_secret,
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code',
            access_type: "offline"
        });

        const { access_token, id_token } = data;

        // Use access_token or id_token to fetch user profile
        const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const user = await User.findOrCreate({
            email: profile.email,
            first_name: profile.given_name,
            last_name: profile.family_name,
            email_verified: profile.verified_email,
            image: {
                type: "image",
                url: profile.picture
            }
        });

        return user;

    } catch (error) { 
        // console.log(error);
        //console.log(error.response.data);
        return {error};
    }
}