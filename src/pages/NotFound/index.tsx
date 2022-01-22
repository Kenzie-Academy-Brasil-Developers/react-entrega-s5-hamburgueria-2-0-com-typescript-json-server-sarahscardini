import { Flex, Box, Heading, Button, Image } from "@chakra-ui/react";
import { useHistory } from "react-router";
import ImgNotFound from "../../assets/error.gif";
import { theme } from "../../styles/theme";

export const NotFound = () => {
  const history = useHistory();

  return (
    <Flex
      padding={["15px", "15px", "0px", "0px"]}
      alignItems="center"
      justifyContent="space-evenly"
      height="100vh"
      flexDirection={["column", "column", "row", "row"]}
    >
      <Box mt="4">
        <Heading textAlign="center" fontSize="1.5rem">
          Página não encontrada
        </Heading>
        <Button
          mt="30px"
          bg={theme.colors.primaryPalette.primary}
          h="60px"
          color="white"
          w="100%"
          _hover={{ bg: theme.colors.primaryPalette["primary.50"] }}
          onClick={() => history.push("/")}
        >
          Voltar para a home
        </Button>
      </Box>
      <Image
        src={ImgNotFound}
        alt="Sorry, page not found"
        w="50vw"
        h="auto"
        maxW="600px"
      />
    </Flex>
  );
};
