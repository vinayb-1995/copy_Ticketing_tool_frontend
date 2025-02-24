import { useToast } from "@chakra-ui/react";

const Toast = () => {
  const toast = useToast();

  const showToast = ({ title, message, duration = 2000, status }) => {
    toast({
      title: title,
      description: message,
      position:"top",
      duration: duration,
      isClosable: true,
      status:status
    });
  };

  return { showToast };
};

export default Toast;
