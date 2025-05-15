import { useState, useEffect } from "react";
import {  ScrollView, StyleSheet } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";

import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Center } from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";

import { authCheck } from "@/api/auth";

import { useQuery, useMutation } from "@tanstack/react-query";
import { listCategories } from "@/api/categories";
import { createProduct } from "@/api/products";

import ProductForm from "@/components/sell/ProductForm";

import ProductCreated from "@/components/sell/ProductCreated";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect } from "expo-router";
import Loader from "@/components/widgets/Loader";

export default function Sell () {

    const [createdProduct, setCreatedProduct] = useState(null);
    const {logout, user, isLoading} = useAuth();

    const {data: authCheckData, error: authCheckError} = useQuery({
        queryKey: ['auth' ], 
        queryFn: authCheck,
        retry: false
    });

    // Form Values
    const [formData, setFormData] = useState({});
    const [selectedCategory, setSelectedCategory] = useState({});
    const [attributes, setAttributes] = useState({});

    useEffect(
        () => {
            const handleAuthCheckError = async () => {

                if(authCheckError && authCheckError.status === 401){
                    await logout();
                    return <Redirect href="/login"/>;
                }
            }

            handleAuthCheckError();
        }, [authCheckError]
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
            currency: "INR",
            status: status,
            media: media
        }

        createProductMutation.mutate({ media, product});
    };

    const attributesUpdate = (attribute_id: number, value: string) => {

        attributes[attribute_id] = value
        setAttributes(attributes);
    }

    const {data} = useQuery({queryKey: ['categories'], queryFn:() => listCategories()});

    const createProductMutation = useMutation({
        mutationFn: (productObj: object) => {
            return createProduct(productObj)
        },
        onSuccess: (data) => {
            if(data.id)
                setCreatedProduct(data);
        },
        onError: async (err) => {
            if(err.status === 401){
                await logout();
                return <Redirect href="/login"/>;
            }
        }
    })

    const resetPage = () => {
        setCreatedProduct(null);
        setFormData({});
    }

    if(isLoading) {
        return ( <Loader /> );
    }

    if(!user){
        return <Redirect href="/login"/>
    }

    return (
        <ScrollView>
            <Center>

                { createdProduct && <ProductCreated createdProduct={createdProduct} resetPage={resetPage} />}

                { !createdProduct &&
                    <VStack  space="lg" className="w-full max-w-[800px] rounded-md border-background-200 p-4">
                        <Heading size="xl">
                            Add a product to your closet
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
                        </HStack>
                        
                    </VStack>
                }
            </Center>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 400,
        height: 400,
    },
});