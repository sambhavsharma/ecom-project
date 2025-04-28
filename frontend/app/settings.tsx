import {useState} from "react";
import { ScrollView } from "react-native";
import { HStack } from "@/components/ui/hstack";
import WebSettingsMenu from "@/components/settings/WebSettingsMenu";
import ProfileSettings from "@/components/settings/ProfileSettings";
import AddressSettings from "@/components/settings/AddressSettings";

import { Redirect } from "expo-router";
import Loader from "@/components/widgets/Loader";
import AuthLoader from "@/components/widgets/AuthLoader";
import { useAuth } from "@/providers/AuthProvider";

export default function Settings(){

    const [activeTab, setActiveTab] = useState("profile");
    const { user, isLoading} = useAuth();

    // <AuthLoader user={user} isLoading={isLoading} />

    if(isLoading) {
        return (<Loader/>);
    }

    if(!user){
        return <Redirect href="/login" />;
    }

    return (
        <ScrollView>
            <HStack className="w-full md:flex flex-1">
                <WebSettingsMenu activeTab={activeTab} setActiveTab={setActiveTab} />
                { activeTab === "profile" && <ProfileSettings user={user}/> }
                { activeTab === "addresses" && <AddressSettings user={user}/> }
            </HStack>
        </ScrollView>
    );
}