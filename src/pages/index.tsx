import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  useIonRouter,
} from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import Home from "./Home";
import {
  chatboxEllipses,
  person,
  receipt,
  search,

} from "ionicons/icons";
import Help from "./help/Help";
import ProfilePage from "./profile/ProfilePage";
// import PersonalData from "./profile/PersonalData";
import SearchPage from "./search/SearchPage";
import PersonalPage from "./profile/PersonalPage";

const AppPage = () => {
  const router = useIonRouter();
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/app/home">
          <Home />
        </Route>
        <Route exact path="/app/search">
          <SearchPage />
        </Route>
        <Route exact path="/app/help">
          <Help />
        </Route>
        <Route exact path="/app/profile">
          <ProfilePage />
        </Route>
        <Route path="/app/personal-page">
          <PersonalPage />
        </Route>
        <Route exact path="/app">
          <Redirect to="/app/home" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar
        slot="bottom"
        style={{ "--background": "white" }}
          className="app-tabbar"
      >
        <IonTabButton tab="search" href="/app/home" className=" text-gray-400 ">
          <IonIcon aria-hidden="true" icon={search} />
          <IonLabel className="text-[14px] ">Поиск</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="personal-data"
          href="/app/search"
          className="text-[#ADADAD] mt-1 "
        >
          <IonIcon icon={receipt} color={"#ADADAD"} />
          <IonLabel className="text-[14px] text-[#ADADAD] ">Заказы</IonLabel>
        </IonTabButton>
        <IonTabButton
          tab="support"
          href="/app/help"
          onClick={(e) => {
            e.preventDefault();
            router.push("/app/help", "root");
          }}
          className=" text-gray-400"
        >
          <IonIcon icon={chatboxEllipses} />
          <IonLabel className="text-[14px]  ">Поддержка</IonLabel>
        </IonTabButton>
        <IonTabButton
          tab="profile"
          href="/app/profile"
          className=" text-[#ADADAD] "
        >
          <IonIcon aria-hidden="true" icon={person} />
          <IonLabel className="text-[14px] text-[#ADADAD] ">Профиль</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppPage;
