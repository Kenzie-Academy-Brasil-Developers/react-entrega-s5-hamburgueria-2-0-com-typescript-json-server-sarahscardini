import { ComponentType } from "react";
import { Redirect, Route as ReactRoute, RouteProps } from "react-router-dom";
import { useUserProvider } from "../providers/UserContext";

interface Props extends RouteProps {
  isPrivate?: boolean;
  component: ComponentType;
}

export const Route = ({
  isPrivate = false,
  component: Component,
  ...rest
}: Props) => {
  const { accessToken } = useUserProvider();
  return (
    <ReactRoute
      {...rest}
      render={() =>
        isPrivate === !!accessToken ? (
          <Component />
        ) : (
          <Redirect to={isPrivate ? "/" : "/home"} />
        )
      }
    />
  );
};
