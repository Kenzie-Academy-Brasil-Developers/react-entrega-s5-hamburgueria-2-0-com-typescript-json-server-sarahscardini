import {
  Flex,
  HStack,
  Image,
  useBreakpointValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Box,
} from "@chakra-ui/react";
import {
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { Badge } from "@chakra-ui/react";
import { Cart } from "../Cart";
import { IconBase } from "../IconBase";
import { SearchInput } from "./SearchInput";
import { theme } from "../../styles/theme";
import { useProductsProvider } from "../../providers/ProductsContext";
import { useUserProvider } from "../../providers/UserContext";
import Logo from "../../assets/logo.svg";

export const Header = () => {
  const { cartProducts } = useProductsProvider();

  const {
    isOpen: cartIsOpen,
    onOpen: cartOnOpen,
    onClose: cartOnClose,
  } = useDisclosure();

  const {
    isOpen: drawerIsOpen,
    onOpen: drawerOnOpen,
    onClose: drawerOnClose,
  } = useDisclosure();
  const { signOut } = useUserProvider();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <>
      <Flex
        align="center"
        bg={theme.colors.grey["0"]}
        h="90px"
        justifyContent="space-between"
        padding={["15px", "15px", "15px 25px", "15px 25px"]}
      >
        <Image src={Logo} h={["20px", "20px", "25px", "25px"]} />
        <HStack align="center" spacing="4">
          {!isWideVersion ? (
            <>
              <IconBase
                icon={FaSearch}
                label="Pesquisar"
                onClick={drawerOnOpen}
              />
              <Drawer
                isOpen={drawerIsOpen}
                onClose={drawerOnClose}
                placement="top"
              >
                <DrawerOverlay bg="transparent" />
                <DrawerContent h="90px">
                  <DrawerBody
                    alignItems="center"
                    bg={theme.colors.grey["0"]}
                    display="flex"
                    justifyContent="center"
                  >
                    <SearchInput />
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            </>
          ) : (
            <SearchInput />
          )}
          <IconBase icon={FaHeart} label="Favoritos" />
          <Box>
            <Badge
              as="span"
              borderRadius="5px"
              colorScheme="green"
              marginLeft="12px"
              position="absolute"
              top="25px"
              variant="solid"
            >
              {cartProducts.reduce((acc, item) => acc + item.quantity, 0)}
            </Badge>
            <IconBase
              icon={FaShoppingCart}
              label="Carrinho de compras"
              onClick={cartOnOpen}
            />
          </Box>
          <IconBase icon={FaSignOutAlt} onClick={signOut} label="Deslogar" />
        </HStack>
      </Flex>

      <Cart cartIsOpen={cartIsOpen} cartOnClose={cartOnClose} />
    </>
  );
};
