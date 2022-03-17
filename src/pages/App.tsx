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
import { PrivateRoute } from "components";

import {
  BrandContext,
  CategoryContext,
  LanguageContext,
  SidebarContext,
} from "context";

function App() {
  const [sidebar, setSidebar] = useState({ key: "home", value: "dashboard" });
  const [language, setLanguage] = useState(null);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const sidebarValue = useMemo(() => ({ sidebar, setSidebar }), [sidebar]);
  const languageValue = useMemo(() => ({ language, setLanguage }), [language]);
  const brandValue = useMemo(() => ({ brand, setBrand }), [brand]);
  const categoryValue = useMemo(() => ({ category, setCategory }), [category]);

  return (
    <LanguageContext.Provider value={languageValue}>
      <BrandContext.Provider value={brandValue}>
        <CategoryContext.Provider value={categoryValue}>
          <SidebarContext.Provider value={sidebarValue}>
            <Router>
              <AppLayout>
                <Switch>
                  <Route exact path="/" component={LoginPage} />
                  <Switch>
                    <PrivateRoute
                      exact
                      path="/categories"
                      component={CategoriesPage}
                    />
                    <PrivateRoute exact path="/home" component={HomePage} />
                    <PrivateRoute
                      exact
                      path="/product"
                      component={ProductPage}
                    />
                    <PrivateRoute
                      exact
                      path="/customer"
                      component={CustomerPage}
                    />
                    <PrivateRoute exact path="/brand" component={BrandPage} />
                    <PrivateRoute
                      exact
                      path="/messages"
                      component={MessagesPage}
                    />
                    <PrivateRoute
                      exact
                      path="/transaction"
                      component={TransationPage}
                    />
                    <PrivateRoute
                      exact
                      path="/settings"
                      component={SettingsPage}
                    />
                    <PrivateRoute exact path="*" component={NotFoundPage} />
                  </Switch>
                </Switch>
              </AppLayout>
            </Router>
          </SidebarContext.Provider>
        </CategoryContext.Provider>
      </BrandContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;
