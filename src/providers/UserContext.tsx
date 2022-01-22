import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
import { api } from "../services/api";
import toast from "react-hot-toast";

interface UserLogProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserSignIn {
  email: string;
  password: string;
}

interface UserSignUp {
  name: string;
  email: string;
  password: string;
  confirmPass: string;
}

interface LocalData {
  accessToken: string;
  user: User;
}

interface UserContextData {
  user: User;
  accessToken: string;
  signIn: (userInfo: UserSignIn) => Promise<void>;
  signOut: () => void;
  signUp: (userInfo: UserSignUp) => Promise<void>;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

const useProvider = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("O hook useProvider precisa do UserLogProvider");
  } else {
    return context;
  }
};

const UserLogProvider = ({ children }: UserLogProviderProps) => {
  const [localData, setLocalData] = useState<LocalData>(() => {
    const accessToken = localStorage.getItem("@Hamburgueria: token");
    const user = localStorage.getItem("@Hamburgueria: user");

    return accessToken && user
      ? { accessToken, user: JSON.parse(user) }
      : ({} as LocalData);
  });

  const history = useHistory();

  const signIn = useCallback(async ({ email, password }: UserSignIn) => {
    await api
      .post("/login", { email, password })
      .then((res) => {
        const { accessToken, user } = res.data;

        localStorage.setItem("@Hamburgueria:token", accessToken);
        localStorage.setItem("@Hamburgueria:user", JSON.stringify(user));

        setLocalData({ accessToken, user });

        toast.success("Bem vindo(a)!");

        history.push("/home");
      })
      .catch((_err) => {
        toast.error("Senha ou nome inválido, verifique as informações");
      });
  }, []);

  const signUp = async ({ name, email, password, confirmPass }: UserSignUp) => {
    await api
      .post("/register", { name, email, password })
      .then((_res) => {
        toast.success(
          "Cadastro realizado com sucesso! Você será redirecionado para o Login"
        );
        history.push("/");
      })
      .catch((_err) => {
        toast.error("Email já cadastrado");
      });
  };

  const signOut = () => {
    localStorage.removeItem("@Hamburgueria:token");
    localStorage.removeItem("@Hamburgueria:user");

    toast("Volte sempre!");

    setLocalData({} as LocalData);

    history.push("/");
  };

  return (
    <UserContext.Provider
      value={{
        accessToken: localData.accessToken,
        user: localData.user,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserLogProvider, useProvider };
