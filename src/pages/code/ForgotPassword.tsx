import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React from "react";
import CustomToolbar from "../../components/customToolbar/CustomToolbar";

const ForgotPassword = () => {
  const router = useIonRouter();
  const navigateCode = () => {
    router.push("/code", "forward", "push");
  };
  return (
    <IonPage>
      <CustomToolbar>
        <div className=" p-5">
          {" "}
          <IonIcon icon={chevronBack} size="large" />
        </div>
      </CustomToolbar>
         <IonContent fullscreen scrollEvents={true}>
        <div className="w-[90%] m-auto flex flex-col justify-between min-h-screen ">
          <div className="space-y-5">
            <p className=" text-2xl font-bold">Забыли пароль?</p>

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
                label="Эл. почта"
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
            <p className="text-[#999999]">
              Введите адрес электронной почты, чтобы получить код для сброса
              пароля.
            </p>
          </div>
          <IonButton
            className="w-full"
            style={{ "--background": "#06A7F2" }}
            onClick={navigateCode}
          >
            Получить код
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
