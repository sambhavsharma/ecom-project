import { Card } from "./ui/card";
import { Image } from "./ui/image";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import { Link } from "expo-router";

export default function ProductListItem({product: product}) {
 
    return (
        <Link href={`product/${product.id}`}>
            <Card className="p-5 rounded-lg mx-auto max-w-[360px] m-3 flex-1">
                <Image
                    source={{
                        uri: product.media[0] && product.media[0].url,
                    }}
                    className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
                    alt="image"
                />
                <Text className="text-sm font-normal mb-2 text-typography-700">
                    {product.name}
                </Text>
                
                    <Heading size="md" className="mb-4">
                        ${product.price}
                    </Heading>
                    {/* <Text size="sm">
                    {product.description}
                    </Text> */}

            </Card>
        </Link>
    )
}