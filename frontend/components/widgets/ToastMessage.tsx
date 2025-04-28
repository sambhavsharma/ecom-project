import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Pressable } from "@/components/ui/pressable";
import { useToast, Toast, ToastTitle, ToastDescription } from "@/components/ui/toast";
import { VStack } from "@/components/ui/vstack";
import { Icon, CloseIcon, HelpCircleIcon } from "@/components/ui/icon";
import React, { useEffect } from "react";
	
const ToastMessage = ({showMessage, setShowMessage, alertMessage, setAlertMessage}) => {
    const toast = useToast();
    const [toastId, setToastId] = React.useState(0);

    useEffect(
        () => {
            if(showMessage) {
                showNewToast();
            }
            
            setShowMessage(false)
        },[showMessage]
    )
    
    const handleToast = () => {
        if (!toast.isActive(toastId)) {
            showNewToast();
        }
    };
    
    const showNewToast = () => {
        
        const newId = Math.random();
        setToastId(newId);

        toast.show({
            id: newId,
            placement: 'top',
            duration: 3000,
            render: ({ id }) => {
                
                const uniqueToastId = "toast-" + id;
                
                return (
                    <Toast
                        action={alertMessage.type}
                        variant="outline"
                        nativeID={uniqueToastId}
                        className={`p-4 gap-6 border-${alertMessage.type}-500 w-full shadow-hard-5 max-w-[443px] flex-row justify-between`}
                    >
                
                        <HStack space="md">
                            {/* <Icon
                                as={HelpCircleIcon}
                                className="stroke-error-500 mt-0.5"
                            /> */}
                            
                            <VStack space="xs">
                                <ToastTitle className={`font-semibold text-${alertMessage.type}-500`}>
                                    {alertMessage.title}
                                </ToastTitle>
                                <ToastDescription size="sm">
                                    {alertMessage.message}
                                </ToastDescription>
                            </VStack>
                        </HStack>
                
                        <HStack className="min-[450px]:gap-3 gap-1">
                            <Pressable onPress={() => toast.close(id)}>
                                <Icon as={CloseIcon} />
                            </Pressable>
                        </HStack>
                    </Toast>
                );
            },
        });
    };
          
    return ( <></> );
}
export default ToastMessage;