import {
  IonModal,
  IonContent,
  IonLabel,
  IonList,
  IonItem,
  IonImg,
  IonInput,
} from "@ionic/react";
import React, { useRef } from "react";
import close from "../components/main/main-img/􀅾.svg";
import { useFromCountry } from "../store/useFromCounty";
const ModalDropTo = ({ isOpenTo, setIsOpenTo, data }) => {
  const modal = useRef<HTMLIonModalElement>(null);
  const { setTo } = useFromCountry();

  return (
    <IonModal
      ref={modal}
      isOpen={isOpenTo}
      initialBreakpoint={1}
      breakpoints={[0, 1, 0.75]}
    >
      <IonContent
        className="ion-padding "
        style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
      >
        <div className="flex justify-between ">
          <p className="font-bold">Куда?</p>
          <div
            onClick={() => setIsOpenTo(false)}
            className="bg-slate-200 w-6 h-6 flex justify-center items-center  rounded-full"
          >
            <IonImg src={close} />
          </div>
        </div>
        <IonInput
          placeholder="Откуда летим?"
          className="border-2 border-[#00AAFF] rounded-xl my-8 pl-5"
          style={{ "--padding-start": "16px" }}
        ></IonInput>
        <IonList>
          {data?.slice(0, 20)?.map((el) => {
            return (
              <IonItem
                key={el.id}
                button
                onClick={() => {
                  setTo(el); // ⬅️ zustand'ка сакталды
                  setIsOpenTo(false); // ⬅️ modal жабылат
                }}
              >
                <IonLabel>
                  <div className="flex justify-between items-center">
                    <div>
                      <p>{el.city}</p>
                      <p className="text-gray-400">
                        {el.city}, {el.country}
                      </p>
                    </div>
                    <div>{el.city_code}</div>
                  </div>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default ModalDropTo;
