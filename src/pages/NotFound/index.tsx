import { Flex, Box, Heading, Button, Image } from "@chakra-ui/react";
import { theme } from "../../styles/theme";
import { useHistory } from "react-router";
import ImgNotFound from "../../assets/error.gif";

export const NotFound = () => {
  const history = useHistory();

  return (
    <Flex
      alignItems="center"
      flexDirection={["column", "column", "row", "row"]}
      height="100vh"
      justifyContent="space-evenly"
      padding={["15px", "15px", "0px", "0px"]}
    >
      <Box mt="4">
        <Heading textAlign="center" fontSize="1.5rem">
          Página não encontrada
        </Heading>
        <Button
          bg={theme.colors.primaryPalette.primary}
          color="white"
          h="60px"
          mt="30px"
          onClick={() => history.push("/")}
          w="100%"
          _hover={{ bg: theme.colors.primaryPalette["primary.50"] }}
        >
          Voltar para a home
        </Button>
      </Box>
      <Image
        alt="Sorry, page not found"
        h="auto"
        maxW="600px"
        src={ImgNotFound}
        w="50vw"
      />
    </Flex>
  );
};
