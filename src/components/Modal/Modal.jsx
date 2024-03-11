import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react"

const Modal = ({ children, isOpen, onClose }) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={"900px"} borderRadius={"50px"} padding={"100px"}>
        <ModalCloseButton top={"25px"} right={"25px"} size={"lg"} />
        <ModalBody
          style={{ display: "flex", justifyContent: "center" }}
          padding={0}
        >
          {children}
        </ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
