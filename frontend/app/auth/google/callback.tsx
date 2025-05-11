import { useEffect, useState } from "react";

import { Button, ButtonText } from "@/components/ui/button";

import { useMutation } from "@tanstack/react-query";
import { deleteProduct } from "@/api/products";

import { Redirect } from "expo-router";


export default function DeleteButton(){

    useEffect(
        () => {
            window.close()
        }
    )


    return (
        <></>
    );
}