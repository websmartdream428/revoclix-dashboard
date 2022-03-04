import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginPage } from "./login";

function App() {
  return (
    <Router>
      <Route exact path="/" component={LoginPage} />
    </Router>
  );
}

export default App;
