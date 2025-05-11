import { useState } from "react";

import { Button, ButtonText } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { googleLogin } from "@/api/auth";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";

import Loader from "@/components/widgets/Loader";

export default function GoogleLogin() {

    const url = "https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?gsiwebsdk=3&client_id=76979374927-7888jgik59qtcfj37at2mgibdk7e5352.apps.googleusercontent.com&scope=openid profile email email profile&redirect_uri=http://localhost:8081/auth/google/callback&prompt=consent&access_type=offline&response_type=code&include_granted_scopes=true&enable_granular_consent=true&service=lso&o2v=2&flowName=GeneralOAuthFlow";
    const { signin, user, isLoading} = useAuth();

    const getPopupWindowSettings = (win) => {

        let h = 600;
        let w = 500;

        const y = win.top.outerHeight / 2 + win.top.screenY - ( h / 2);
        const x = win.top.outerWidth / 2 + win.top.screenX - ( w / 2);

        return `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`;
    }

    const openPopup = () => {

        const popup = window.open(url, "Google Login",getPopupWindowSettings(window));
        const checkPopup = setInterval(() => {
            
            if(popup.closed) {

                clearInterval(checkPopup);

                const url = new URL(popup?.window.location);
                let code = url.searchParams.get('code');
                googleLoginMutation.mutate(code);
            }
        }, 1000);
    }

    const googleLoginMutation = useMutation({
        mutationFn: (authCode) => googleLogin(authCode),
        onSuccess: async (user) => {
            
            if(user.id)
                await signin(user);
        },
        onError: (e) => {
    
          //console.log("error: "+e);
        }
    })

    if(isLoading) {
        return ( <Loader /> );
      }
    
    if(user)
        return (<Redirect href="/"/>);
    
    return (
        <Button className="w-full mt-4" size="md" 
            onPress= {() => { 
                openPopup() 
            }}
        >
            <ButtonText> Sign in with Google </ButtonText>
        </Button>
    );
}