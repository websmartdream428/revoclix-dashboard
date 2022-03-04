import React from "react";

import { AppLogoWrapper, LogoTitle } from "./AppLogo.styles";

const AppLogo: React.FC = () => {
  return (
    <AppLogoWrapper>
      <LogoTitle to="/home">
        Revo<span>clix</span>
      </LogoTitle>
    </AppLogoWrapper>
  );
};

export default AppLogo;
