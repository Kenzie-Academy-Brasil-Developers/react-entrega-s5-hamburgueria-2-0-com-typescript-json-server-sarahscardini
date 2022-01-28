import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { NotFound } from "../pages/NotFound";
import { Route } from "./Route";
import { Signup } from "../pages/Signup";
import { Switch } from "react-router-dom";
import { useUserProvider } from "../providers/UserContext";

export const Routes = () => {
  const { accessToken } = useUserProvider();

  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/home" component={Home} isPrivate />
      <Route component={NotFound} isPrivate={!!accessToken} />
    </Switch>
  );
};
