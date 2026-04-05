import {
  IonButton,
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  useIonRouter,
  IonSpinner,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import checkFalse from "../register/register-icon/Frame 2147225317.svg";
import checkTrue from "../register/register-icon/Frame 2147225317 (1).svg";
import React, { useMemo, useState } from "react";
import CustomToolbar from "../../components/customToolbar/CustomToolbar";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { postNewPasswordAsync } from "../../constants/postNewPassword";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const NewPassword = () => {
  const router = useIonRouter();
  const location = useLocation<{
    email?: string;
    code?: string;
    token?: string;
  }>();

  const [openedSuccess, { open: openSuccess, close: closeSuccess }] =
    useDisclosure(false);

  const email = location.state?.email;
  const code = location.state?.code;
  const token = location.state?.token;

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const hasMinLength = password.length >= 8;
  const passwordsMatch =
    password.length > 0 &&
    repeatPassword.length > 0 &&
    password === repeatPassword;

  const isFormValid = useMemo(() => {
    return hasMinLength && passwordsMatch;
  }, [hasMinLength, passwordsMatch]);

  const newPasswordMutation = useMutation({
    mutationFn: postNewPasswordAsync,
    onSuccess: (data: any) => {
      toast.success(data?.message || "Пароль успешно обновлен");
      openSuccess();
    },
    onError: (error: any) => {
      const data = error?.response?.data;
      toast.error(data?.message || "Не удалось обновить пароль");
    },
  });

  const handleSubmit = () => {
    if (!email) {
      toast.error("Email не найден");
      return;
    }

    if (!token) {
      toast.error("Токен не найден");
      return;
    }

    if (!password || !repeatPassword) {
      toast.error("Заполните оба поля");
      return;
    }

    if (password.length < 8) {
      toast.error("Пароль должен содержать минимум 8 символов");
      return;
    }

    if (password !== repeatPassword) {
      toast.error("Пароли не совпадают");
      return;
    }

    const payload = {
      email,
      password,
      confirm_password: repeatPassword,
      token,
      code,
    };

    newPasswordMutation.mutate(payload);
  };

  const goBack = () => {
    router.goBack();
  };

  const goToLogin = () => {
    closeSuccess();
    router.push("/app/profile", "forward", "replace");
  };

  return (
    <IonPage>
      <CustomToolbar>
        <div className="p-5 pt-10">
          <IonIcon icon={chevronBack} size="large" onClick={goBack} />
        </div>
      </CustomToolbar>

      <IonContent fullscreen>
        <div className="w-[90%] m-auto flex flex-col justify-between h-[90%] py-4">
          <div className="space-y-5">
            <p className="text-2xl font-bold">Введите новый пароль</p>

            <IonItem
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                "--background": "#F0F0F5",
              }}
              className="w-full"
            >
              <IonInput
                type="password"
                value={password}
                onIonInput={(e) => setPassword(e.detail.value || "")}
                label="Введите пароль"
                labelPlacement="floating"
                placeholder="Новый пароль"
                style={{
                  "--color": "#141414",
                  "--highlight-color-focused": "#06A7F2",
                  "--border-width": "0",
                  "--background": "#F0F0F5",
                }}
              />
            </IonItem>

            <p className="text-[#787878] flex items-center">
              <IonIcon
                src={hasMinLength ? checkTrue : checkFalse}
                className="mr-3"
              />
              Минимум 8 символов
            </p>

            <p className="text-[#787878] flex items-center">
              <IonIcon
                src={passwordsMatch ? checkTrue : checkFalse}
                className="mr-3"
              />
              Пароли должны совпадать
            </p>

            <IonItem
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                "--background": "#F0F0F5",
              }}
              className="w-full"
            >
              <IonInput
                type="password"
                value={repeatPassword}
                onIonInput={(e) => setRepeatPassword(e.detail.value || "")}
                label="Повторите пароль"
                labelPlacement="floating"
                placeholder="Повторите пароль"
                style={{
                  "--color": "#141414",
                  "--highlight-color-focused": "#06A7F2",
                  "--border-width": "0",
                  "--background": "#F0F0F5",
                }}
              />
            </IonItem>
          </div>

          <IonButton
            className="w-full lowercase"
            style={{ "--background": "#06A7F2" }}
            onClick={handleSubmit}
            disabled={newPasswordMutation.isPending || !isFormValid}
          >
            {newPasswordMutation.isPending ? (
              <IonSpinner name="crescent" />
            ) : (
              "Сохранить пароль"
            )}
          </IonButton>
        </div>
      </IonContent>

      <Modal
        opened={openedSuccess}
        onClose={closeSuccess}
        closeOnClickOutside={false}
        centered
        withCloseButton={false}
        radius="24px"
        size={420}
        styles={{
          overlay: {
            zIndex: 10000,
            backgroundColor: "rgba(0,0,0,0.35)",
          },
          inner: {
            zIndex: 10001,
          },
          content: {
            backgroundColor: "#F2F6FC",
          },
          body: {
            padding: "24px",
          },
        }}
      >
        <div className="text-center">
          <div className="flex justify-center mb-5">
            <img
              src="/success-password.png"
              alt="success"
              className="w-[120px] h-[120px] object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          <p className="text-[22px] font-bold text-[#2B2B2B] mb-2">
            Пароль обновлён!
          </p>

          <p className="text-[#7B7B7B] text-sm leading-5 mb-6">
            Ваш пароль был успешно изменён. Теперь вы можете войти с новым
            паролем!
          </p>

          <button
            onClick={goToLogin}
            className="w-full bg-[#1198D5] text-white rounded-xl h-12 font-semibold"
          >
            Войти
          </button>
        </div>
      </Modal>
    </IonPage>
  );
};

export default NewPassword;
