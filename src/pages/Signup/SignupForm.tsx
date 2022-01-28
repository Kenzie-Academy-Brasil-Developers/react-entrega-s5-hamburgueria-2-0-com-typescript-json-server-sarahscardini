import { Box, Button, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { Input } from "../../components/Input";
import { theme } from "../../styles/theme";

import { useHistory } from "react-router-dom";
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPass: string;
}

interface LoginFormProps {
  handleSignUp: () => void;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<SignUpData>;
}

export const SigupForm = ({
  handleSignUp,
  errors,
  register,
}: LoginFormProps) => {
  const history = useHistory();

  return (
    <Grid
      alignContent="space-evenly"
      as="form"
      border={`2px solid ${theme.colors.grey["0"]}`}
      borderRadius="5px"
      boxShadow="0px 0px 30px -20px rgba(0, 0, 0, 0.25)"
      h="70vh"
      maxH="527px"
      maxW="500px"
      minHeight="527px"
      onSubmit={handleSignUp}
      padding={["10px 15px", "10px 15px", "15px 20px", "15px 20px"]}
      w={["100%", "100%", "48vw", "48vw"]}
    >
      <Box display="inline-flex" justifyContent="space-between">
        <Heading as="h2" fontSize="18px">
          Cadastro
        </Heading>
        <Text
          _hover={{ color: theme.colors.grey["600"] }}
          color={theme.colors.grey["300"]}
          cursor="pointer"
          fontSize="14px"
          onClick={() => history.push("/")}
          textDecor="underline"
          w="fit-content"
        >
          Retornar para o login
        </Text>
      </Box>
      <VStack spacing="4">
        <Input placeholder="Nome" error={errors.name} {...register("name")} />
        <Input
          error={errors.email}
          placeholder="Email"
          type="email"
          {...register("email")}
        />
        <Input
          error={errors.password}
          placeholder="Senha"
          type="password"
          {...register("password")}
        />
        <Input
          error={errors.confirmPass}
          placeholder="Confirmar Senha"
          type="password"
          {...register("confirmPass")}
        />
        <Button
          bg={theme.colors.grey["0"]}
          borderRadius="8px"
          color={theme.colors.grey["300"]}
          h="60px"
          type="submit"
          w="100%"
          _hover={{
            bg: theme.colors.grey["300"],
            color: theme.colors.grey["100"],
          }}
        >
          Cadastrar
        </Button>
      </VStack>
    </Grid>
  );
};
