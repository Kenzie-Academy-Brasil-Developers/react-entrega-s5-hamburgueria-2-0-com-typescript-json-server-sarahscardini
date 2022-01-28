import { Flex } from "@chakra-ui/react";
import { LoginForm } from "./LoginForm";
import { LoginInfo } from "./LoginInfo";
import { useForm } from "react-hook-form";
import { useUserProvider } from "../../providers/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const formSchema = yup.object().shape({
  email: yup
    .string()
    .required("Email obrigatório")
    .email("Insira um email válido"),
  password: yup.string().required("Senha obrigatória"),
});

interface SignInData {
  email: string;
  password: string;
}

export const Login = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignInData>({ resolver: yupResolver(formSchema) });

  const { signIn } = useUserProvider();

  const handleSignIn = (data: SignInData) => signIn(data);

  return (
    <Flex
      alignItems="center"
      height={["auto", "auto", "100vh", "100vh"]}
      justifyContent="center"
      margin={["25px", "25px", "20px", "0"]}
      marginTop={["35px", "35px", "0", "0"]}
    >
      <Flex
        alignItems="center"
        flexDirection={["column-reverse", "column-reverse", "row", "row"]}
        justifyContent="center"
      >
        <LoginForm
          errors={errors}
          handleSignIn={handleSubmit(handleSignIn)}
          register={register}
        />
        <LoginInfo />
      </Flex>
    </Flex>
  );
};
