import { Flex } from "@chakra-ui/react";
import { SignupInfo } from "./SignupInfo";
import { SigupForm } from "./SignupForm";
import { useForm } from "react-hook-form";
import { useProvider } from "../../providers/UserContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const formSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup
    .string()
    .required("E-mail obrigatório")
    .email("Digite um email válido"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(6, "No mínimo 6 caracteres"),
  confirmPass: yup
    .string()
    .required("Confirme sua senha")
    .oneOf([yup.ref("password")], "Senhas diferentes"),
});

interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPass: string;
}

export const Signup = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignUpData>({ resolver: yupResolver(formSchema) });

  const { signUp } = useProvider();

  const handleSignUp = (data: SignUpData) => signUp(data);
  // const handleSignUp = (data: SignUpData) => console.log(data);

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
        width="100%"
      >
        <SignupInfo />
        <SigupForm
          errors={errors}
          handleSignUp={handleSubmit(handleSignUp)}
          register={register}
        />
      </Flex>
    </Flex>
  );
};
