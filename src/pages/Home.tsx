import { IonContent, IonHeader, IonPage } from "@ionic/react";
import React from "react";
import Main from "../components/main/Main";

const Home = () => {
  return (
    <IonPage >
      <IonHeader>
      </IonHeader>
      <IonContent style={{ "--background":"#F0F0F5" }}>
        <Main />
        
      </IonContent>
    </IonPage>
  );
};

export default Home;
