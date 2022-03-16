import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppLayout from "layouts/AppLayout";

import { LoginPage } from "./login";
import { HomePage } from "./home";
import { CategoriesPage } from "./categories";
import { ProductPage } from "./product";
import { NotFoundPage } from "./NotFound";
import { CustomerPage } from "./customer";
import { BrandPage } from "./brand";
import { TransationPage } from "./transation";
import { MessagesPage } from "./messages";
import { SettingsPage } from "./settings";

import SidebarContext from "context/SidebarContext";
import { PrivateRoute } from "components";

function App() {
  const [sidebar, setSidebar] = useState({ key: "home", value: "dashboard" });
  const sidebarValue = useMemo(() => ({ sidebar, setSidebar }), [sidebar]);

  return (
    <SidebarContext.Provider value={sidebarValue}>
      <Router>
        <AppLayout>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <Switch>
              <PrivateRoute exact path="/home" component={HomePage} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/categories"
                component={CategoriesPage}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/product" component={ProductPage} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/customer" component={CustomerPage} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/brand" component={BrandPage} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/messages" component={MessagesPage} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/transaction"
                component={TransationPage}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/settings" component={SettingsPage} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="*" component={NotFoundPage} />
            </Switch>
          </Switch>
        </AppLayout>
      </Router>
    </SidebarContext.Provider>
  );
}

export default App;
