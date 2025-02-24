// ConformationModal.js

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
import { Col, Row } from "react-bootstrap";

const ConformationModal = ({ title, bodyText, isOpen, onClose, onOk }) => {
  // console.log("bodytext>>",bodyText)
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {bodyText && typeof bodyText === "object" ? (
            Object.entries(bodyText)
              .filter(([key]) => key !== "createdByAdmin") // Filter out createdByAdmin
              .map(([key, value], index) => (
                <Row key={index} style={{ marginBottom: "8px" }}>
                  <Col lg={6}>
                    <strong>{key}:</strong>
                  </Col>
                  <Col lg={6} className="d-flex align-items-end">
                    {value}
                  </Col>
                </Row>
              ))
          ) : (
            <p>No details available</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={onOk}>
            OK
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConformationModal;
