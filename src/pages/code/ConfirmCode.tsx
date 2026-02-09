import {
  IonButton,
  IonContent,
  IonIcon,
  IonInputOtp,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React from "react";
import CustomToolbar from "../../components/customToolbar/CustomToolbar";

const ConfirmCode = () => {
  const router = useIonRouter();

  const navigateNewPassword = () => {
    router.push("/new-password", "forward", "push");
  };
  return (
    <IonPage>
      <CustomToolbar>
        <div className="p-5">
          <div className=" ">
            {" "}
            <IonIcon icon={chevronBack} size="large" />
          </div>
        </div>
      </CustomToolbar>
      <IonContent>
        <div className="w-[90%] m-auto ">
          <div className="space-y-5">
            <p className=" text-2xl font-bold">Подтверждение кода</p>
            <p className="text-[#787878]">
              Введите код, который мы прислали <br /> на почту
              <span className="font-bold text-[#141414]">
                {" "}
                ernismedenov05@gmail.com
              </span>
            </p>
            <IonInputOtp separators="3" length={6}>
              <div className="mt-10 text-lg"></div>
            </IonInputOtp>
          </div>
          <IonButton
            className="w-full"
            style={{ "--background": "#06A7F2" }}
            onClick={navigateNewPassword}
          >
            Получить код
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ConfirmCode;
