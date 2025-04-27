import { ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Stack } from "expo-router";
import { Center } from "@/components/ui/center";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Divider } from "@/components/ui/divider";
import { Icon, StarIcon } from "@/components/ui/icon";
import { Link } from "expo-router";

export default function Settings(){

    return (
        <ScrollView>
            <Center>
                <VStack>
                    <HStack className="max-w-[1300px]">
                    </HStack>
                </VStack>
            </Center>
        </ScrollView>
    );
}