import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { Flex, Box, Text, Img, HStack, Button } from "@chakra-ui/react";
import { theme } from "../../styles/theme";
import { useProductsProvider } from "../../providers/ProductsContext";
import { useUserProvider } from "../../providers/UserContext";
import { IconBase } from "../IconBase";

export const CartWithProducts = () => {
  const { cartProducts, addOneToCart, decrementOneFromCart, deleteOneProduct } =
    useProductsProvider();

  const { accessToken, user } = useUserProvider();

  const calculateTotal = () => {
    return cartProducts.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );
  };

  return (
    <Flex flexDir="column">
      {cartProducts.map((item) => (
        <Flex
          direction="row"
          justifyContent="space-between"
          key={item.id}
          margin="8px 0"
        >
          <Flex direction="row">
            <Flex
              alignItems="center"
              bg={theme.colors.grey[100]}
              borderRadius="10px"
              h="70px"
              justifyContent="center"
              w="85px"
            >
              <Img src={item.img} alt={item.name} h="45px" w="45px" />
            </Flex>
            <Flex
              h="100%"
              alignItems="flex-start"
              flexDir="column"
              justifyContent="space-between"
              marginLeft="10px"
            >
              <Text bt="color" fontWeight="bold" fontSize="14px">
                {item.name}
              </Text>

              <HStack
                border={`2px solid ${theme.colors.grey["100"]}`}
                borderRadius="2px"
              >
                <Button
                  bg={theme.colors.grey["100"]}
                  borderRadius="0px"
                  h="25px"
                  onClick={() =>
                    decrementOneFromCart(item, Number(user.id), accessToken)
                  }
                  padding="0px"
                  width="10px"
                >
                  <FaMinus
                    color={
                      item.quantity > 1
                        ? theme.colors.primaryPalette.secondary
                        : theme.colors.grey["150"]
                    }
                    fontSize="10px"
                  />
                </Button>
                <Text w="20px" textAlign="center" fontSize="14px">
                  {item.quantity}
                </Text>
                <Button
                  bg={theme.colors.grey["100"]}
                  borderRadius="0px"
                  h="25px"
                  onClick={() =>
                    addOneToCart(item, Number(user.id), accessToken, true)
                  }
                  padding="10px"
                  width="8px"
                >
                  <FaPlus
                    color={theme.colors.primaryPalette.secondary}
                    fontSize="10px"
                  />
                </Button>
              </HStack>
            </Flex>
          </Flex>
          <Flex
            alignItems="flex-end"
            flexDir="column"
            justifyContent="space-between"
          >
            <IconBase
              icon={FaTrash}
              label="Remover produto do carrinho"
              onClick={() =>
                deleteOneProduct(item, Number(user.id), accessToken)
              }
            />

            <Text color={theme.colors.grey["300"]} fontWeight="medium">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(item.price * item.quantity)}
            </Text>
          </Flex>
        </Flex>
      ))}
      <Flex
        borderTop={`2px solid ${theme.colors.grey[100]}`}
        justifyContent="space-between"
        mt="30px"
      >
        <Text mt="10px" fontWeight="semibold">
          Total
        </Text>
        <Text mt="10px" color={theme.colors.grey[300]} fontWeight="semibold">
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(calculateTotal())}
        </Text>
      </Flex>
    </Flex>
  );
};
