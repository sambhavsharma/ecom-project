import Loader from "@/components/widgets/Loader";
import { useAuth } from "@/providers/AuthProvider";
import {Redirect} from "expo-router";

export default function AuthLoader({user, isLoading}){

    if(isLoading) {
        return (<Loader/>);
    }

    if(!user){

        return <Redirect href="/login" />;
    }

    return (<></>) ;
}