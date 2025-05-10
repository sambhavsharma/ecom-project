import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Divider } from "@/components/ui/divider";
import { Center } from "@/components/ui/center";
import { Image } from "@/components/ui/image";
import { Link, LinkText } from "@/components/ui/link";
import { Icon, ArrowRightIcon, AddIcon, ChevronDownIcon } from "@/components/ui/icon";
import { Button, ButtonText, ButtonIcon } from "@/components/ui/button";

export default function ProductCreated({
    createdProduct: createdProduct, 
    resetPage: resetPage
}){
    
    return (
        <Center>
            <Card className="p-5 w-full rounded-lg max-w-[460px] m-3" size="lg">
                <Image
                    source={{
                        uri:  createdProduct.media ? createdProduct.media[0].url : 
                            "https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png"
                    }}
                    className="mb-6 h-[240px] w-full rounded-md aspect-[263/240]"
                    alt="image"
                />
                
                <Heading size="md" className="mb-2`">
                    {createdProduct.name}
                </Heading>
                
                <Text className="text-sm font-normal mb-2 text-typography-700">
                    {createdProduct.description}
                </Text>

                <Link href={`product/${createdProduct.id}`}>
                    <HStack className="items-center">
                        <LinkText
                            size="sm"
                            className="font-semibold text-info-600 no-underline"
                        >
                            Visit Product Page
                        </LinkText>
                        <Icon
                            as={ArrowRightIcon}
                            size="sm"
                            className="text-info-600 mt-0.5 ml-0.5"
                        />
                    </HStack>
                </Link>
                <Center>

                <HStack className="mt-2 z-[-1]" space="md">
                    
                        <Button className="w-fit self-end mt-4" size="sm" 
                            onPress= {() => {resetPage();}}
                        >
                            <ButtonText>Sell Another Product</ButtonText>
                        </Button>
                    
                </HStack>
                </Center>
            </Card>
        </Center>
    );
}