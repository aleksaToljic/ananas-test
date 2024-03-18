import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./components/router";
import "./styles/index.scss";
import { HelloFromContainer } from "./containers/HelloFromContainer";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <HelloFromContainer.Provider>
      <Router />
    </HelloFromContainer.Provider>
  </BrowserRouter>,
);
