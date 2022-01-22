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
} from "@chakra-ui/react";
import {
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import Logo from "../../assets/logo.svg";
import { useProvider } from "../../providers/UserContext";
import { theme } from "../../styles/theme";
import { Cart } from "../Cart";
import { IconBase } from "../IconBase";
import { SearchInput } from "./SearchInput";

export const Header = () => {
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
  const { signOut } = useProvider();

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  return (
    <>
      <Flex
        bg={theme.colors.grey["0"]}
        padding={["15px", "15px", "15px 25px", "15px 25px"]}
        align="center"
        justifyContent="space-between"
        h="90px"
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
                placement="top"
                onClose={drawerOnClose}
                isOpen={drawerIsOpen}
              >
                <DrawerOverlay bg="transparent" />
                <DrawerContent h="90px">
                  <DrawerBody
                    bg={theme.colors.grey["0"]}
                    alignItems="center"
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
          <IconBase
            icon={FaShoppingCart}
            onClick={cartOnOpen}
            label="Carrinho de compras"
          />
          <IconBase icon={FaSignOutAlt} onClick={signOut} label="Deslogar" />
        </HStack>
      </Flex>

      <Cart cartIsOpen={cartIsOpen} cartOnClose={cartOnClose} />
    </>
  );
};
