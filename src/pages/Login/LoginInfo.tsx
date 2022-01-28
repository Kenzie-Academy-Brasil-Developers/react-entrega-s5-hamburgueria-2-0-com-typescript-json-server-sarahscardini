import {
  Flex,
  Grid,
  Image,
  Img,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiShoppingBag } from "react-icons/fi";
import { theme } from "../../styles/theme";
import Ellipses from "../../assets/ellipses.svg";
import Logo from "../../assets/logo.svg";

export const LoginInfo = () => {
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <Grid
      alignContent="space-around"
      h={["180px", "180px", "50vh", "50vh"]}
      marginLeft={["0", "0", "35px", "35px"]}
      maxH="300px"
      maxW={["458px", "458px", "400px", "400px"]}
      w={["100%", "100%", "48vw", "48vw"]}
    >
      <Image src={Logo} alt="doit" />
      <Flex
        alignItems="center"
        border={`1px solid ${theme.colors.grey["0"]}`}
        borderRadius="5px"
        boxShadow="0px 4px 40px -20px rgba(0, 0, 0, 0.25)"
        flexDir="row"
        h="95px"
        padding="10px"
        w="100%"
      >
        <Flex
          alignItems="center"
          bg="rgba(39, 174, 96, 0.1)"
          borderRadius="5px"
          h="60px"
          justifyContent="space-evenly"
          w="100px"
        >
          <FiShoppingBag
            color={theme.colors.primaryPalette.primary}
            fontSize="25px"
          />
        </Flex>
        <Text
          color={theme.colors.grey["300"]}
          fontSize="14px"
          marginLeft="10px"
        >
          A vida é como um sanduíche, é preciso recheá-la com os <b>melhores</b>{" "}
          ingredientes.
        </Text>
      </Flex>
      {isWideVersion && <Img src={Ellipses} />}
    </Grid>
  );
};
