import {
  IonIcon,
  IonImg,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import React from "react";
import { Redirect, Route } from "react-router";
import Home from "./Home";
import { person, search } from "ionicons/icons";
import support from "../components/main/footer-img/Union.svg";
import ticketOutlines from "../components/main/footer-img/Frame (2).svg";

const AppPage = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/app/home">
          <Home />
        </Route>

        <Route exact path="/app">
          <Redirect to="/app/home" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar
        slot="bottom"
        className="mb-12"
        style={{ "--background": "white" }}
      >
        <IonTabButton
          tab="search"
          href="/app/home"
          className="bg-white text-[#00AAFF] mt-2"
        >
          <IonIcon aria-hidden="true" icon={search} className="w-6 h-6" />
          <IonLabel className="text-[14px] ">Поиск</IonLabel>
        </IonTabButton>

        <IonTabButton tab="order" href="/search" className="text-[#ADADAD] mt-1 ">
          <IonImg
            src={ticketOutlines}
            className="w-full h-8 "
            color={"#ADADAD"}
          />
          <IonLabel className="text-[14px] text-[#ADADAD] ">Заказы</IonLabel>
        </IonTabButton>
        <IonTabButton tab="support" href="/app/home" className="mt-2.5">
          <IonIcon icon={support} className="w-6 h-6" />
          <IonLabel className="text-[14px] text-[#ADADAD] ">Поддержка</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab1" href="/login" className="mt-2 text-[#ADADAD] ">
          <IonIcon aria-hidden="true" icon={person} className="w-7 h-7" />
          <IonLabel className="text-[14px] text-[#ADADAD] ">Профиль</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppPage;
