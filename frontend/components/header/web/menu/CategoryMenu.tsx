import { Grid } from "@/components/ui/grid";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
//import { Link } from "@/components/ui/link";
import { Link } from "expo-router";

export default function CategoryMenu({category}){

    return (
        <HStack space="4xl">
            {
                category.map(
                    (categoryObj) => {
                        return(
                            <VStack space="2xl" className="mr-4">
                                <Heading
                                    size="sm"
                                    key={categoryObj.code}
                                    className="text-typography-600 mr-4 cursor-pointer"
                                >
                                    {categoryObj.title || categoryObj.name}
                                </Heading>
                                {
                                    categoryObj.children.map(
                                        (childCategory) => {
                                            return (
                                                <Link href="#" className="">
                                                    {childCategory.title || childCategory.name}
                                                </Link>
                                            )
                                        }
                                    )
                                }
                            </VStack>
                        )
                    }
                )
            }
        </HStack>

        // <Grid
        //     className="gap-5"
        //     _extra={{
        //         className: "grid-cols-8 grid-rows-3 grid-flow-col",
        //     }}
        // >
        //     {
        //         category.map(
        //             (categoryObj) => {
        //                 return(
        //                     <Link
        //                         href="#"
        //                         key={categoryObj.code}
        //                         className="text-typography-600 mr-4 pointer"
        //                     >
        //                         {categoryObj.title || categoryObj.name}
        //                     </Link>
        //                 )
        //             }
        //         )
        //     }
        // </Grid>
    );
}