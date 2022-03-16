import React from "react";
import { UserAvatar, UserLogoWrapper, UserName } from "./UserLogo.styles";

import userImg from "assets/image/user.png";

const UserLogo: React.FC<any> = ({ onClick }) => {
  return (
    <UserLogoWrapper onClick={onClick}>
      <UserAvatar src={userImg} alt="userImg" />
      <UserName>Admin</UserName>
    </UserLogoWrapper>
  );
};

export default UserLogo;
