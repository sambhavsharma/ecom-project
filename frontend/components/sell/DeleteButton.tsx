import { useState } from "react";

import { Button, ButtonText } from "@/components/ui/button";

import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "@/api/products";

import { Redirect } from "expo-router";


export default function DeleteButton({
    setShowMessage: setShowMessage, setAlertMessage: setAlertMessage, productId: productId, user: user,
    setRedirectLogin: setRedirectLogin, logout: logout
}){

    const [redirectDeleted, setRedirectDeleted] = useState(false);

    const deleteProductMutation = useMutation({
        mutationFn: () => {
            return deleteProduct(productId)
        },
        onSuccess: (data) => {
            setShowMessage(true);
            
            let message = "Product deleted!";
            setAlertMessage(
                {
                    type: "success",
                    title: message
                }
            )
            
            setTimeout(() => {
                setRedirectDeleted(true);
            }, "500");
            
        },
        onError: async (err) => {

            if(err.status === 401){
            
                await logout();
                setRedirectLogin(true);
            
            } else {
                let message = "Could not delete product!";

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

    if(redirectDeleted){
        return <Redirect href= {`/profile/${user.id}`}/>
    }

    return (
        <Button className="w-fit self-end mt-4" size="sm" 
            onPress= {() => {deleteProductMutation.mutate()}}
        >
            <ButtonText> Delete </ButtonText>
        </Button>
    );
}