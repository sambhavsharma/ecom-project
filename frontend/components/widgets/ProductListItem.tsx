import { Card } from "@/components/ui/card";
import { Image } from "@/components/ui/image";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Link } from "expo-router";

export default function ProductListItem({product: product}) {
 
    return (
        <Link href={`product/${product.id}`}>
            <Card className="p-1 rounded-lg mx-auto w-auto max-w-[240px] m-1 flex-1">
                <Image
                    source={{
                        uri: product.media[0] && product.media[0].url,
                    }}
                    className="mb-6 h-[240px] w-full rounded-md aspect-[4/3]"
                    alt="image"
                />

                <Heading size="sm" className="mb-4">
                    {product.brand.name}
                </Heading>

                <Text className="text-sm font-normal mb-2 text-typography-700 capitalize">
                    {product.condition.split('_').join(' ')} {product.name}
                </Text>

                <Text className="text-sm font-normal mb-2 text-typography-700">
                    {product.category.name}
                </Text>
                
                <Heading size="xs" className="mb-4">
                    ${product.price}
                </Heading>
                    {/* <Text size="sm">
                    {product.description}
                    </Text> */}

            </Card>
        </Link>
    )
}