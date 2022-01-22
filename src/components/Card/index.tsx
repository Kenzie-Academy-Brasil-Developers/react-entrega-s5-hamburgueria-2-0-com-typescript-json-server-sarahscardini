import { Button, Flex, Heading, Img, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { IconBase } from "../IconBase";

export const Card = () => {
  const [click, setClick] = useState<boolean>(false);

  return (
    <Flex
      flexDir="column"
      alignItems="flex-start"
      bg="white"
      borderRadius="5px"
      border={`2px solid ${theme.colors.grey["100"]}`}
      w="300px"
      h="350px"
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
        bg={theme.colors.grey["0"]}
        w="100%"
        h="50%"
        justifyContent="center"
        alignItems="center"
      >
        <Img
          src="https://i.ibb.co/fpVHnZL/hamburguer.png"
          width="auto"
          h="90%"
        />
      </Flex>
      <VStack
        h="50%"
        m="15px"
        alignItems="flex-start"
        justifyContent="space-evenly"
        w="85%"
      >
        <Flex justifyContent="space-between" w="100%">
          <Heading as="h2" fontSize="18px" color={theme.colors.grey["600"]}>
            Hamburguer
          </Heading>
          <IconBase
            onClick={() => setClick(!click)}
            icon={click ? FaHeart : FaRegHeart}
            label="Adicionar aos favoritos"
            isGreen={true}
          />
        </Flex>
        <Text fontSize="12px" color={theme.colors.grey["300"]}>
          Sanduíches
        </Text>
        <Text
          color={theme.colors.primaryPalette.primary}
          fontWeight="semibold"
          fontSize="14px"
        >
          {Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(14.5)}
        </Text>

        <Button
          bg={theme.colors.grey["150"]}
          color="white"
          borderRadius="8px"
          h="40px"
          w="106px"
          _hover={{ bg: theme.colors.primaryPalette.primary }}
        >
          Adicionar
        </Button>
      </VStack>
    </Flex>
  );
};
