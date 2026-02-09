import {
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonToolbar,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React, { useState } from "react";
import card from "./passenger-img/Vector (6).svg";
import CustomToolbar from "../../components/customToolbar/CustomToolbar";

const Passenger = () => {
  const [passengerExist, setPassengerExist] = useState(false);
  return (
    <IonPage>
      <IonHeader>
        <CustomToolbar
          className="text-white bg-[#242528]"
          
        >
          <div className="flex justify-between w-[60%] py-5 items-center !text-xl ml-5">
            <IonIcon icon={chevronBack} color="light" />
            <p>Пассажиры</p>
          </div>
        </CustomToolbar>
      </IonHeader>

      {passengerExist ? (
        <IonContent style={{ "--background": "#1B1A1E" }}>
          <div className="flex flex-col gap-5 justify-center items-center h-full w-[70%] m-auto text-white text-center">
            <IonImg src={card} />
            <h1 className="text-lg">Здесь пока ничего нет</h1>
            <p className="text-base">
              После покупки данные <br /> сохранятся и заполнятся <br />
              автоматически в следующий раз.
            </p>
          </div>
        </IonContent>
      ) : (
        <IonContent style={{ "--background": "#1B1A1E" }}>
          <div className="text-white mx-5 mt-5 flex flex-col gap-5">
            <p className="text-xl">Сохраненные пассажиры</p>
            <div className="bg-[#242528] rounded-xl pl-3 py-2">
              <p>Меденов Эрнис</p>
              <p className="!text-[#999999]">№ документа ID2849016</p>
            </div>
            <div className="bg-[#242528] rounded-xl pl-3 py-2">
              <p>Меденов Эрнис</p>
              <p className="!text-[#999999]">№ документа ID2849016</p>
            </div>
          </div>
        </IonContent>
      )}
    </IonPage>
  );
};

export default Passenger;
