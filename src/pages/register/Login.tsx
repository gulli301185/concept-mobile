import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonInput,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { chevronDown, close } from "ionicons/icons";
import google from "./register-icon/Icons.svg";
import React from "react";
import CustomToolbar from "../../components/customToolbar/CustomToolbar";

const Login = () => {
  const router = useIonRouter();

  const navigateForgotPassword = () => {
    router.push("/forgot-password", "forward", "push");
  };

  const navigateRegister = () => {
    router.push("/register", "forward", "push");
  };
  return (
    <IonPage>
      <CustomToolbar>
        <div>
          <div>
            <div className="flex justify-end mx-5 py-5">
              <div className=" flex justify-end w-5 h-5 p-1  items-center rounded-full">
                {" "}
                <IonIcon icon={close} />
              </div>
            </div>
          </div>
        </div>
      </CustomToolbar>
      <IonContent fullscreen scrollEvents={true}>
        <div className=" flex justify-between flex-col min-h-screen">
          <div className="mx-5 flex flex-col gap-7">
            <div className=" flex flex-col gap-3 ">
              <p className="text-2xl font-bold leading-tight">
                Войдите или <br /> создайте аккаунт
              </p>
              <p className="text-lg text-[#787878] leading-tight">
                Чтобы купить билет, сохранить данные пассажиров и получать
                поддержку
              </p>
            </div>{" "}
            <div className="flex bg-slate-100 py-3 rounded-xl gap-3 justify-center items-center">
              <IonImg src={google} />
              <p>Войти с помощью Google</p>
            </div>
            <div className="flex gap-3 text-gray-400 items-center">
              <div className="w-full border-b-2"></div>
              <div>или</div>
              <div className="w-full border-b-2"></div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex  gap-3 items-center justify-center">
                <IonButton size="large" color="light">
                  <span className="pr-2"> +996</span>
                  <IonIcon src={chevronDown} size="small" />
                </IonButton>
                <IonInput
                  label="Номер телефона"
                  color="#F0F0F5"
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
              </div>
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
              <p
                className="text-end text-[#178BD3] font-[600]"
                onClick={navigateForgotPassword}
              >
                Забыли пароль?
              </p>
              <IonButton
                size="large"
                className=""
                style={{ "--background": "#06A7F2" }}
              >
                Войти
              </IonButton>
            </div>
          </div>
          <div
            className="text-[#00AAFF] text-center mb-20 font-bold leading-loose"
            onClick={navigateRegister}
          >
            Нет аккаунта? Зарегистрируйтесь
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
