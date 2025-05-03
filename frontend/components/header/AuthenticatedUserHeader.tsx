import React, { useState, useEffect } from "react";

import { HStack } from "@/components/ui/hstack";
import { Icon, FavouriteIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { Link } from "expo-router";
import UserMenu from "./UserMenu";

const AuthenticatedUserHeader = () => {
  
  const { isLoading, user, logout } = useAuth();

  if(isLoading)
    return (<></>);

  return (
    <>
       <HStack space="lg" className="p-1.5 items-center min-w-[240px] justify-end">

        <Link href='/wishlist'>
          <Icon
            as={FavouriteIcon}
            className= "text-typography-900"
          />
        </Link>

       <Link href='/sell'>
        <Button size="sm" variant="outline" className="font-medium hidden md:flex">
          <ButtonText className="text-typography-1">Sell</ButtonText>
        </Button>
        </Link>

        {
          user &&
          < UserMenu user={user} logout={logout} />
        }

        {
          !user &&
          <Link href="/login">
            <Button size="sm" className="font-medium ml-1">
              <ButtonText className="text-typography-0">Log In | Sign Up</ButtonText>
            </Button>
          </Link>
        }
      </HStack>
    
    </>
  );
};

export default AuthenticatedUserHeader;
