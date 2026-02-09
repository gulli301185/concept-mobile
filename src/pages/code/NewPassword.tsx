import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import checkFalse from "../register/register-icon/Frame 2147225317.svg";
import checkTrue from "../register/register-icon/Frame 2147225317 (1).svg";
import React from "react";
import CustomToolbar from "../../components/customToolbar/CustomToolbar";

const NewPassword = () => {
  return (
    <IonPage>
      <CustomToolbar>
        <div className=" p-5">
          {" "}
          <IonIcon icon={chevronBack} size="large" />
        </div>
      </CustomToolbar>
      <IonContent>
        <div className="w-[90%] m-auto flex flex-col justify-between h-[90%] ">
          <div className="space-y-5">
            <p className=" text-2xl font-bold">Введите новый пароль</p>

            <IonItem
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                // border: "1px solid #ccc",
                "--background": "#F0F0F5",
              }}
              className=" w-full"
            >
              <IonInput
                label="Введите пароль"
                color="light"
                labelPlacement="floating"
                fill="solid"
                placeholder="(999) 99-99-99"
                style={{
                  "--color": "#ADADAD", // label түсү
                  "--highlight-color-focused": "#ADADAD",
                  "--border-width": "0",
                  "--background": "#F0F0F5",
                }}
              ></IonInput>
            </IonItem>
            <p className="text-[#787878]">
              <IonIcon src={checkFalse} className="mr-3" />
              Минимум 8 символов
            </p>
            <p className="text-[#787878]">
              {" "}
              <IonIcon src={checkTrue} className="mr-3" />
              Минимум 8 символов
            </p>
            <IonItem
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                // border: "1px solid #ccc",
                "--background": "#F0F0F5",
              }}
              className=" w-full"
            >
              <IonInput
                label="Повторите пароль"
                color="light"
                labelPlacement="floating"
                fill="solid"
                placeholder="(999) 99-99-99"
                style={{
                  "--color": "#ADADAD", // label түсү
                  "--highlight-color-focused": "#ADADAD",
                  "--border-width": "0",
                  "--background": "#F0F0F5",
                }}
              ></IonInput>
            </IonItem>
          </div>
          <IonButton
            className="w-full"
            style={{ "--background": "#06A7F2" }}
            // onClick={navigateCode}
          >
            Получить код
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NewPassword;
