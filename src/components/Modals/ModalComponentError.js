import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const ModalComponentError = ({ isOpen, onClose, title, bodyText, onOk }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={{ base: "90%", md: "60%", lg: "40%" }} p={4}>
        <ModalHeader fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>{bodyText}</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onOk} size={{ base: "sm", md: "md", lg: "lg" }}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponentError;
