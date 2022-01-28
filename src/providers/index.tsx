import { ChakraProvider } from "@chakra-ui/react";
import { ProductsProvider } from "./ProductsContext";
import { ReactNode } from "react";
import { theme } from "../styles/theme";
import { UserLogProvider } from "./UserContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <UserLogProvider>
    <ProductsProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </ProductsProvider>
  </UserLogProvider>
);
