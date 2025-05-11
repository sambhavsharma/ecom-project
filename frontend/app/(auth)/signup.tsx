import { Button, ButtonText } from "../../components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import React, { useState } from "react";
import { HStack } from "@/components/ui/hstack";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/api/users";
import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Link } from "expo-router";
import { ScrollView } from "react-native";

import Loader from "@/components/widgets/Loader";
import ToastMessage from "@/components/widgets/ToastMessage";
	
export default function SignupScreen() {
  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const [redirectLogin, setRedirectLogin] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

  const { signin, user, isLoading} = useAuth();

  const createAccountMutation = useMutation({
    
    mutationFn: () => createUser({email: email, password: password}),
    onSuccess: async (data) => {

        setShowMessage(true);   
        let message = "Account created!";
        setAlertMessage(
            {
                type: "success",
                title: message
            }
        )

        setRedirectLogin(true);
    },
    onError: (e) => {

        setShowMessage(true); 
        let message = "Could not create account!";
        setAlertMessage(
            {
                type: "error",
                title: message
            }
        )
    }
  })
  
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState;
    });
  };

    if(isLoading) {
        return ( <Loader /> );
    }

    if(user)
        return (<Redirect href="/"/>);

    if(redirectLogin)
        return (<Redirect href="/login"/>);

  return (
    <ScrollView>
        <ToastMessage 
            showMessage={showMessage} 
            setShowMessage={setShowMessage}
            alertMessage={alertMessage}
            setAlertMessage={setAlertMessage}
        />

      <FormControl className="p-4 border rounded-lg border-outline-300 max-w-[600px] mx-auto mt-5">
        <VStack space="xl">
          <Heading className="text-typography-900">Create an Account</Heading>
          <VStack space="xs">
            <Text className="text-typography-500">Email</Text>
            <Input className="min-w-[250px]">
              <InputField value={email} onChangeText={setEmail} type="text" />
            </Input>
          </VStack>
          <VStack space="xs">
            <Text className="text-typography-500">Password</Text>
            <Input className="text-center">
              <InputField type={showPassword ? "text" : "password"} value={password} onChangeText={setPassword}  />
              <InputSlot className="pr-3" onPress={handleState}>
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                />
              </InputSlot>
            </Input>
          </VStack>
          <HStack space="sm">
            <Button className="flex-1" onPress={() => createAccountMutation.mutate()}>
              <ButtonText className="text-typography-0">
                Create Account
              </ButtonText>
            </Button>
          </HStack>
          <Box>
            <Text size="sm">
              Already have an account? <Link className="underline" href="/login"> Sign in</Link>
            </Text>
          </Box>
        </VStack>
      </FormControl>
    </ScrollView>
   
  );
}