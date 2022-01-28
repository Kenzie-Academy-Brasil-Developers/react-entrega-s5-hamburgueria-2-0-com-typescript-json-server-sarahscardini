import {
  Flex,
  InputGroup,
  InputRightElement,
  Input as ChackraInput,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { useForm } from "react-hook-form";
import { useProductsProvider } from "../../providers/ProductsContext";
import { useUserProvider } from "../../providers/UserContext";

interface SearchItem {
  itemTitle: string;
}

export const SearchInput = () => {
  const { searchItem } = useProductsProvider();
  const { accessToken } = useUserProvider();
  
  const { register, handleSubmit, reset } = useForm<SearchItem>();
  
  const handleSearch = ({ itemTitle }: SearchItem) => {
    searchItem(itemTitle, accessToken);
    reset()
  };


  return (
    <InputGroup
      alignItems="center"
      as="form"
      display="flex"
      justifyContent="center"
      maxW="365px"
      minW="220px"
      onSubmit={handleSubmit(handleSearch)}
      w="32vw"
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
        padding="8px"
        placeholder="Digitar pesquisa"
        variant="outline"
        {...register("itemTitle")}
        _hover={{ borderColor: theme.colors.grey["0"] }}
        _placeholder={{ color: theme.colors.grey["100"] }}
      />
      <InputRightElement
        right="10px"
        top="unset"
        children={
          <Flex
            alignItems="center"
            as="button"
            bg={theme.colors.primaryPalette.primary}
            borderRadius="8px"
            cursor="pointer"
            h="40px"
            justifyContent="center"
            w="50px"
            _hover={{ bg: theme.colors.primaryPalette["primary.50"] }}
          >
            <FaSearch color="white" />
          </Flex>
        }
      />
    </InputGroup>
  );
};
