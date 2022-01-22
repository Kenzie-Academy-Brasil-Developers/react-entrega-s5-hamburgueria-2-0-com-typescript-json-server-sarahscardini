import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { theme } from "../../styles/theme";

interface CartProps {
  cartIsOpen: boolean;
  cartOnClose: () => void;
}

export const Cart = ({ cartIsOpen, cartOnClose }: CartProps) => {
  return (
    <Modal isOpen={cartIsOpen} onClose={cartOnClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontSize="18px"
          fontWeight="bold"
          bg={theme.colors.primaryPalette.primary}
          color="white"
          borderRadius='5px 5px 0 0'
        >
          Carrinho de Compras
        </ModalHeader>
        <ModalCloseButton
          color="rgba(255, 255, 255, 0.5)"
          _hover={{ color: "white" }}
        />
        <ModalBody h='100%'>
          <Flex direction='column' textAlign='center'>
            <Text
              color={theme.colors.grey["600"]}
              fontSize="18px"
              fontWeight="bold"
            >
              Sua sacola está vazia
            </Text>
            <Text color={theme.colors.grey["300"]} fontSize="14px">Adicione itens</Text>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button onClick={cartOnClose}>Remover Todos</Button>
          <Button>Comprar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
