import React from "react";
import { UserAvatar, UserLogoWrapper, UserName } from "./UserLogo.styles";

import userImg from "assets/image/user.png";

const UserLogo = () => {
  return (
    <UserLogoWrapper>
      <UserAvatar src={userImg} alt="userImg" />
      <UserName>Admin</UserName>
    </UserLogoWrapper>
  );
};

export default UserLogo;
