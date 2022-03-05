import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AppLayout from "layouts/AppLayout";

import { LoginPage } from "./login";
import { HomePage } from "./home";
import { NotFoundPage } from "./NotFound";

function App() {
  return (
    <Router>
      <AppLayout>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/home" component={HomePage} />
        <Route exact path="*" component={NotFoundPage} />
      </AppLayout>
    </Router>
  );
}

export default App;
