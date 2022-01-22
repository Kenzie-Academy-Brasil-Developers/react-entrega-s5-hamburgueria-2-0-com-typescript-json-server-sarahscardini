import { ChakraProvider } from "@chakra-ui/react";
import { ReactNode } from "react";
import { theme } from "../styles/theme";
import { UserLogProvider } from "./UserContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <UserLogProvider>
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  </UserLogProvider>
);
