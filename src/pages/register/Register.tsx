import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  useIonRouter,
} from "@ionic/react";
import { chevronDown, close } from "ionicons/icons";
import React from "react";
import checkFalse from "./register-icon/Frame 2147225317.svg";
import checkTrue from "./register-icon/Frame 2147225317 (1).svg";
import CustomToolbar from "../../components/customToolbar/CustomToolbar";

const Register = () => {
  const router = useIonRouter();
  const navigateCode = () => {
    router.push("/code", "forward", "push");
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
      <IonContent>
        <div className=" flex flex-col gap-3 w-[90%] m-auto">
          <p className="text-3xl font-bold leading-tight mb-5">Регистрация</p>
          <div className="flex flex-col gap-3">
            <IonItem
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                // border: "1px solid #ccc",
                "--background": "#F0F0F5",
              }}
            >
              <IonInput
                placeholder="Type here"
                style={{ borderRadius: "0", "--border-width": "0" }}
              />
            </IonItem>

            <div className="flex  gap-3 items-center justify-center">
              <IonButton size="large" color="light">
                <span className="pr-2"> +996</span>
                <IonIcon src={chevronDown} size="small" />
              </IonButton>

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
                    "--border-radius": "20px",
                  }}
                ></IonInput>
              </IonItem>
            </div>

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
            <div className="flex gap-3 items-center text-[#999999] pb-3">
              <IonCheckbox />
              <p>
                Я принимаю условия использования и политику конфиденциальности
              </p>
            </div>
            <IonButton
              size="large"
              className=""
              style={{ "--background": "#06A7F2" }}
              onClick={navigateCode}
            >
              Войти
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
