import { Button, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { Input } from "../../components/Input";
import { theme } from "../../styles/theme";

import { useHistory } from "react-router-dom";
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface SignInData {
  email: string;
  password: string;
}

interface LoginFormProps {
  handleSignIn: () => void;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<SignInData>;
}

export const LoginForm = ({
  handleSignIn,
  errors,
  register,
}: LoginFormProps) => {
  const history = useHistory();

  return (
    <Grid
      as="form"
      onSubmit={handleSignIn}
      padding="15px 20px"
      border={`2px solid ${theme.colors.grey["0"]}`}
      boxShadow="0px 0px 30px -20px rgba(0, 0, 0, 0.25)"
      borderRadius="5px"
      maxW="500px"
      maxH="460px"
      minHeight="460px"
      w={["100%", "100%", "48vw", "48vw"]}
      h="70vh"
      alignContent="space-around"
    >
      <Heading as="h2" fontSize="18px">
        Login
      </Heading>
      <VStack mt="4" spacing="4">
        <Input
          {...register("email")}
          error={errors.email}
          placeholder="Email"
          type="email"
        />
        <Input
          placeholder="Senha"
          type="password"
          error={errors.password}
          {...register("password")}
        />
      </VStack>
      <VStack>
        <Button
          bg={theme.colors.primaryPalette.primary}
          borderRadius="8px"
          color="white"
          h="60px"
          type="submit"
          w="100%"
          _hover={{ bg: theme.colors.primaryPalette["primary.50"] }}
        >
          Logar
        </Button>
        <Text
          color={theme.colors.grey["300"]}
          textAlign="center"
          fontSize="14px"
          padding="10px 0"
          lineHeight="1.1rem"
        >
          Crie sua conta para saborear muitas delícias e matar sua fome!
        </Text>
        <Button
          bg={theme.colors.grey["0"]}
          borderRadius="8px"
          color={theme.colors.grey["300"]}
          h="60px"
          w="100%"
          _hover={{
            bg: theme.colors.grey["300"],
            color: theme.colors.grey["100"],
          }}
          onClick={() => history.push("/signup")}
        >
          Cadastrar
        </Button>
      </VStack>
    </Grid>
  );
};
