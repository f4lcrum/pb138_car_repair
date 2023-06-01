import { FC } from "react";
import BasePageBar from "./BasePageBar";
import { Outlet } from "react-router-dom";

const BasePage: FC = () => {
  return (
    <>
      <BasePageBar />
      <Outlet />
    </>
  );
};

export default BasePage;
