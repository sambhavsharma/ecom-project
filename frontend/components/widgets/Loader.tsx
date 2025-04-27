import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Center } from "@/components/ui/center";
import { Spinner } from "@/components/ui/spinner";

export default function Loader(){

    return (
        <Center className="h-full">
            <VStack space="sm" >
                <Spinner />
                <Text size="md">Loading</Text>
            </VStack>
        </Center>
    );
}