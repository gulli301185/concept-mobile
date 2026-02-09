import {
  IonContent,
  IonHeader,
  IonIcon,
  IonInputOtp,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import React from "react";
import { close } from "ionicons/icons";
import CustomToolbar from "../../components/customToolbar/CustomToolbar";

const Code = () => {
  const router = useIonRouter();

  const navigateConfirmCode = () => {
    router.push("/confirm-code", "forward", "push");
  };
  return (
    <IonPage style={{ "--background": "black" }}>
      <IonHeader
        className="flex justify-end  p-5 bg-black"
        style={{ "--background": "--black" }}
      >
        <CustomToolbar
          style={{ "--background": "#000000", "--border-width": "0" }}
        >
          <div className=" flex justify-end w-5 h-5 p-1  items-center rounded-full bg-gray-500">
            {" "}
            <IonIcon icon={close} color="white" />
          </div>
        </CustomToolbar>
      </IonHeader>
      <IonContent
        style={{ "--background": "black" }}
        fullscreen
        scrollEvents={true}
      >
        <div className="w-[90%] m-auto ">
          <div className="space-y-5">
            <p className="text-[#F5F5F5] text-2xl">
              Мы отправили вам <br /> письмо на почту
            </p>
            <p className="text-[#EBEBEB]">
              Введите код, который мы прислали <br /> на почту
              ernismedenov05@gmail.com
            </p>
            <IonInputOtp separators="3" length={6}>
              <div className="mt-10 text-lg" onClick={navigateConfirmCode}>
                <button className="text-[#2CBDFF]">
                  Отправить код ещё раз
                </button>
                <p className="text-[#EBEBEB]">
                  Отправить код ещё раз ­­· 00:48
                </p>
              </div>
            </IonInputOtp>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Code;
