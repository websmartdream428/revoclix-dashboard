import { CustomButton } from "components";
import SidebarContext from "context/SidebarContext";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { NotFoundWrapper } from "./NotFound.styles";

const NotFoundPage: React.FC = () => {
  const history = useHistory();
  const { setSidebar } = useContext<any>(SidebarContext);

  const handleClick = () => {
    setSidebar({ key: "home", value: "Dashboard" });
    history.push("/home");
  };

  return (
    <NotFoundWrapper>
      <h1>404</h1>
      <h3>PAGE NOT FOUND !</h3>
      <p>YOU SEEM TO BE TRYING TO FIND HIS WAY HOME</p>
      <CustomButton
        onClick={handleClick}
        label="Back to home"
        bgColor="primary"
        radius="full"
      />
    </NotFoundWrapper>
  );
};

export default NotFoundPage;
