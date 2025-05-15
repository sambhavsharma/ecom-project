import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { ScrollView } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";
    
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";

import { useQuery, useMutation } from "@tanstack/react-query";
import { listCategories } from "@/api/categories";
import { getProduct, updateProduct } from "@/api/products";

import ProductForm from "@/components/sell/ProductForm";
import DeleteButton from "@/components/sell/DeleteButton";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";

import Loader from "@/components/widgets/Loader";
import ToastMessage from "@/components/widgets/ToastMessage";

export default function SellProduct () {

    const {product_id} = useLocalSearchParams();
    const [redirectLogin, setRedirectLogin] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    const {logout, user, isLoading} = useAuth();

    
    const [formData, setFormData] = useState({});
    const [selectedCategory, setSelectedCategory] = useState({});
    const [attributes, setAttributes] = useState({});

    const {data: product, isLoading: isProductLoading} = useQuery({
        queryKey: ['products',product_id ], 
        queryFn:() => getProduct(String(product_id)),
        retry: false
    });

    useEffect(
        () => {
            const updateFormData = () => {
            
                setFormData({
                    name: product.name,
                    description: product.description,
                    status: product.status,
                    condition: product.condition,
                    brand: product.brand,
                    currency: product.currency,
                    price: product.price,
                    department_id: product.department.id,
                    category_id: product.category?.id,
                    subcategory_id: product.subcategory?.id,
                    attributes: product.attributes,
                    media: product.media
                })

                setSelectedCategory(product.category);
            }

            if(product) 
                updateFormData()
        }, [product]
    )
    
    const handleSubmit = async (status: string) => {

        let media = [];

        for (let image of formData.media) {
            let imageObj = {
                fileName: image.fileName,
                mimeType: image.mimeType,
                type: "image",
                uri: image.base64
            };
            
            media.push(imageObj);
        }

        const product = {
            ...formData,
            media: media,
            status: status
        }

        updateProductMutation.mutate({ media, product});
    };

    const attributesUpdate = (attribute_id: number, value: string) => {

        attributes[attribute_id] = value
        setAttributes(attributes);
    }

    const {data, isLoading: isLoadingCategories} = useQuery({queryKey: ['categories'], queryFn:() => listCategories()});

    const updateProductMutation = useMutation({
        mutationFn: (productObj: object) => {
            return updateProduct(productObj, product_id)
        },
        onSuccess: (data) => {
            setShowMessage(true);
            
            let message = "Product updated!";
            setAlertMessage(
                {
                    type: "success",
                    title: message
                }
            )
        },
        onError: async (err) => {

            if(err.status === 401){
            
                await logout();
                setRedirectLogin(true);
            
            } else {
                let message = "Could not update product!";

                setAlertMessage(
                    {
                        type: "error",
                        title: message
                    }
                )
                setShowMessage(true);
            }
        }
    })

    const getSelectedAttribute = (attribute) => {

        let selectedValue = "";

        let matchedAttribute = formData.attributes.filter((obj) => {
            return obj.name === attribute.name
        })

        if(matchedAttribute[0]) {
            selectedValue = matchedAttribute[0].value;
        }

        return selectedValue;
    }

    if(isLoading || isProductLoading || isLoadingCategories) {
        return ( <Loader /> );
    }

    if(!user || redirectLogin){
        return <Redirect href="/login"/>
    }
    
    return (
        <ScrollView>

            <ToastMessage 
                showMessage={showMessage} 
                setShowMessage={setShowMessage}
                alertMessage={alertMessage}
                setAlertMessage={setAlertMessage}
            />

            <Center>
                <VStack  space="lg" className="w-full max-w-[800px] rounded-md border-background-200 p-4">
                    <Heading>
                        Sell your product
                    </Heading>
                    
                    <ProductForm formData={formData} setFormData={setFormData} />

                    <HStack className="mt-[20px] z-[-1]" space="md">

                        <Button className="w-fit self-end mt-4" size="sm" 
                            onPress= {() => {handleSubmit("draft")}}
                        >
                            <ButtonText>Save Draft</ButtonText>
                        </Button>

                        <Button className="w-fit self-end mt-4" size="sm" 
                            onPress= {() => {handleSubmit("live")}}
                        >
                            <ButtonText> Publish </ButtonText>
                        </Button>
                        
                        <DeleteButton setShowMessage={setShowMessage} setAlertMessage={setAlertMessage} 
                            productId={product_id} user={user} setRedirectLogin={setRedirectLogin} logout={logout}
                        />
                        
                    </HStack>
                    
                </VStack>
            </Center>
        </ScrollView>
    );
};