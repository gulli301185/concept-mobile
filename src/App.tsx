import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import SearchPage from "./pages/search/SearchPage";
import DetailTicket from "./pages/detail-ticket/DetailTicket";
import Passenger from "./pages/passenger/Passenger";
import Login from "./pages/register/Login";
import Register from "./pages/register/Register";
import Code from "./pages/code/Code";
import ConfirmCode from "./pages/code/ConfirmCode";
import ForgotPassword from "./pages/code/ForgotPassword";
import NewPassword from "./pages/code/NewPassword";
import AppPage from "./pages";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/app">
          <AppPage />
        </Route>

        <Route exact path="/search">
          <SearchPage />
        </Route>

        <Route exact path="/detail-ticket">
          <DetailTicket />
        </Route>

        <Route path="/passenger">
          <Passenger />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/code">
          <Code />
        </Route>
        <Route path="/confirm-code">
          ~
          <ConfirmCode />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/new-password">
          <NewPassword />
        </Route>
        <Route exact path="/">
          <Redirect to="/app" />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
