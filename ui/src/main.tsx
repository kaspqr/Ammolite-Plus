import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { App } from "./app";
import { store } from "./redux/app";

import "@/assets/css/argon-dashboard-pro-react.css";
import "@/assets/vendor/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-datepicker/dist/react-datepicker.min.css";
import "@/views/components/widgets/react-table/styles/reactTable.css";
import "simplebar-react/dist/simplebar.min.css";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
