import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppLayout from "layouts/AppLayout";

import { LoginPage } from "./login";
import { HomePage } from "./home";
import { NotFoundPage } from "./NotFound";

import SidebarContext from "context/SidebarContext";

function App() {
  const [sidebar, setSidebar] = useState({ key: "home", value: "dashboard" });
  const sidebarValue = useMemo(() => ({ sidebar, setSidebar }), [sidebar]);

  return (
    <SidebarContext.Provider value={sidebarValue}>
      <Router>
        <AppLayout>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/home" component={HomePage} />
            <Route exact path="*" component={NotFoundPage} />
          </Switch>
        </AppLayout>
      </Router>
    </SidebarContext.Provider>
  );
}

export default App;
