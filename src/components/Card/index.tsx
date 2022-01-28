import { Button, Flex, Heading, Img, Text, VStack } from "@chakra-ui/react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IconBase } from "../IconBase";
import { Product } from "../../types/Product";
import { theme } from "../../styles/theme";
import { useProductsProvider } from "../../providers/ProductsContext";
import { useState } from "react";
import { useUserProvider } from "../../providers/UserContext";

interface CardProps {
  product: Product;
}

export const Card = ({ product }: CardProps) => {
  const [click, setClick] = useState<boolean>(false);
  const { cartProducts, addOneToCart, addToCart } = useProductsProvider();

  const { accessToken, user } = useUserProvider();

  const handleAddToCart = () => {
    cartProducts.length === 0
      ? addToCart(product, Number(user.id), accessToken)
      : addOneToCart(product, Number(user.id), accessToken, false);
  };

  return (
    <Flex
      alignItems="flex-start"
      bg="white"
      border={`2px solid ${theme.colors.grey["100"]}`}
      borderRadius="5px"
      flexDir="column"
      h="350px"
      w="300px"
      _hover={{
        borderColor: theme.colors.primaryPalette.primary,
        transform: "scale(1.1)",
        transition: "border 0.4s,ease 0s,transform 0.4s",
      }}
      sx={{
        "&::-webkit-scrollbar": {
          width: "16px",
          borderRadius: "8px",
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: `rgba(0, 0, 0, 0.05)`,
        },
      }}
    >
      <Flex
        alignItems="center"
        bg={theme.colors.grey["0"]}
        h="50%"
        justifyContent="center"
        w="100%"
      >
        <Img src={product.img} width="auto" h="90%" />
      </Flex>
      <VStack
        alignItems="flex-start"
        h="50%"
        justifyContent="space-evenly"
        m="15px"
        w="85%"
      >
        <Flex justifyContent="space-between" w="100%">
          <Heading as="h2" fontSize="18px" color={theme.colors.grey["600"]}>
            {product.name}
          </Heading>
          <IconBase
            icon={click ? FaHeart : FaRegHeart}
            isGreen={true}
            label="Adicionar aos favoritos"
            onClick={() => setClick(!click)}
          />
        </Flex>
        <Text fontSize="12px" color={theme.colors.grey["300"]}>
          {product.category}
        </Text>
        <Text
          color={theme.colors.primaryPalette.primary}
          fontSize="14px"
          fontWeight="semibold"
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(product.price)}
        </Text>

        <Button
          bg={theme.colors.grey["150"]}
          borderRadius="8px"
          color="white"
          h="40px"
          onClick={() => handleAddToCart()}
          w="106px"
          _hover={{ bg: theme.colors.primaryPalette.primary }}
        >
          Adicionar
        </Button>
      </VStack>
    </Flex>
  );
};
