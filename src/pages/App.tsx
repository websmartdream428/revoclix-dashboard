import AppLayout from "layouts/AppLayout";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginPage } from "./login";
import { HomePage } from "./home";

function App() {
  return (
    <Router>
      <Route exact path="/" component={LoginPage} />
      <AppLayout>
        <Route exact path="/home" component={HomePage} />
      </AppLayout>
    </Router>
  );
}

export default App;
