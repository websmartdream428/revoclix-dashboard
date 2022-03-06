import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppLayout from "layouts/AppLayout";

import { LoginPage } from "./login";
import { HomePage } from "./home";
import { CategoriesPage } from "./categories";
import { NotFoundPage } from "./NotFound";
import { CustomerPage } from "./customer";
import { TransationPage } from "./transation";
import { MessagesPage } from "./messages";
import { SettingsPage } from "./settings";

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
            <Route exact path="/categories" component={CategoriesPage} />
            <Route exact path="/customer" component={CustomerPage} />
            <Route exact path="/messages" component={MessagesPage} />
            <Route exact path="/transaction" component={TransationPage} />
            <Route exact path="/settings" component={SettingsPage} />
            <Route exact path="*" component={NotFoundPage} />
          </Switch>
        </AppLayout>
      </Router>
    </SidebarContext.Provider>
  );
}

export default App;
