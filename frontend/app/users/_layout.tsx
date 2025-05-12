import {useState, useEffect} from "react";
import { usePathname } from "expo-router";
import { ScrollView } from "react-native";
import { HStack } from "@/components/ui/hstack";
import { Stack } from "expo-router";

import WebSettingsMenu from "@/components/settings/WebSettingsMenu";

import { Redirect } from "expo-router";
import Loader from "@/components/widgets/Loader";
import { useAuth } from "@/providers/AuthProvider";

export default function Settings(){

    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState(pathname.split('/')[2] || "profile");
    const { user, isLoading} = useAuth();

    // <AuthLoader user={user} isLoading={isLoading} />

    useEffect(
        () => {
            console.log(pathname);
        },[]
    )

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
                <Stack
                    screenOptions={{headerShown: false}}
                >
                    
                </Stack>
                {/* { activeTab === "profile" && <ProfileSettings user={user}/> }
                { activeTab === "addresses" && <AddressSettings user={user}/> } */}
            </HStack>
        </ScrollView>
    );
}