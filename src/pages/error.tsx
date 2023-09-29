import { FC } from "react";
import { useRouteError } from "react-router-dom";

type RouterErrorObject = {
  message: string;
};

export const Error: FC = () => {
  const error = useRouteError() as RouterErrorObject;

  return (
    <div>
      <h1>{error.message}</h1>
    </div>
  );
};
