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
import { CartWithProducts } from "./CartWithProducts";
import { theme } from "../../styles/theme";
import { useProductsProvider } from "../../providers/ProductsContext";
import { useUserProvider } from "../../providers/UserContext";

interface CartProps {
  cartIsOpen: boolean;
  cartOnClose: () => void;
}

export const Cart = ({ cartIsOpen, cartOnClose }: CartProps) => {
  const { cartProducts, buy, deleteAll } = useProductsProvider();

  const { accessToken } = useUserProvider();

  const handleClose = () => {
    deleteAll(accessToken, false);
    cartOnClose();
  };

  return (
    <>
      <Modal isOpen={cartIsOpen} onClose={cartOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            bg={theme.colors.primaryPalette.primary}
            borderRadius="5px 5px 0 0"
            color="white"
            fontSize="18px"
            fontWeight="bold"
          >
            Carrinho de Compras
          </ModalHeader>
          <ModalCloseButton
            color="rgba(255, 255, 255, 0.5)"
            _hover={{ color: "white" }}
          />
          <ModalBody h="100%">
            {cartProducts.length !== 0 ? (
              <CartWithProducts />
            ) : (
              <Flex direction="column" textAlign="center">
                <Text
                  color={theme.colors.grey["600"]}
                  fontSize="18px"
                  fontWeight="bold"
                >
                  Sua sacola está vazia
                </Text>
                <Text color={theme.colors.grey["300"]} fontSize="14px">
                  Adicione itens
                </Text>
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            {cartProducts.length !== 0 ? (
              <Flex flexDir="column" w="100%">
                <Button
                  bg={theme.colors.grey[100]}
                  color={theme.colors.grey[300]}
                  h="60px"
                  marginBottom="8px"
                  onClick={handleClose}
                >
                  Remover Todos
                </Button>
                <Button
                  bg={theme.colors.primaryPalette.primary}
                  color={theme.colors.grey["0"]}
                  h="60px"
                  onClick={() => buy(accessToken)}
                  _hover={{ bg: theme.colors.primaryPalette["primary.50"] }}
                >
                  Comprar
                </Button>
              </Flex>
            ) : (
              <></>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
