import {
  Flex,
  InputGroup,
  InputRightElement,
  Input as ChackraInput,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { theme } from "../../styles/theme";

export const SearchInput = () => {
  const handleSearch = () => {};

  return (
    <InputGroup
      alignItems="center"
      display="flex"
      justifyContent="center"
      minW="220px"
      w="32vw"
      maxW="365px"
    >
      <ChackraInput
        bg="white"
        borderColor={theme.colors.grey["0"]}
        borderRadius="8px"
        boxShadow={`0 0 0 2px ${theme.colors.grey["0"]}`}
        color={theme.colors.grey["600"]}
        focusBorderColor={theme.colors.grey["600"]}
        fontSize="14px"
        h="60px"
        name="Search"
        padding="8px"
        placeholder="Digitar pesquisa"
        variant="outline"
        _hover={{ borderColor: theme.colors.grey["0"] }}
        _placeholder={{ color: theme.colors.grey["100"] }}
      />
      <InputRightElement
        top="unset"
        right="10px"
        children={
          <Flex
            cursor="pointer"
            bg={theme.colors.primaryPalette.primary}
            h="40px"
            w="50px"
            borderRadius="8px"
            alignItems="center"
            justifyContent="center"
            _hover={{ bg: theme.colors.primaryPalette["primary.50"] }}
            onClick={handleSearch}
          >
            <FaSearch color="white" />
          </Flex>
        }
      />
    </InputGroup>
  );
};
