import {
  IonContent,
  IonHeader,
  IonIcon,
  IonInputOtp,
  IonPage,
  useIonRouter,
  IonSpinner,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { close } from "ionicons/icons";
import CustomToolbar from "../../components/customToolbar/CustomToolbar";
import { useMutation } from "@tanstack/react-query";
import { confirmCodeAsync } from "../../constants/postConfirmCode";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { postForgetPasswordAsync } from "../../constants/postForgetPassword";

const Code = () => {
  const router = useIonRouter();
  const location = useLocation();
  const history = useHistory();
  const email =
    location.state?.email || localStorage.getItem("register_email") || "";
  const mode = location.state?.mode || "register";
  const [timer, setTimer] = useState(48);
  const [token, setToken] = useState("");

  const [code, setCode] = useState("");
  console.log(location);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (time) => {
    const seconds = time.toString().padStart(2, "0");
    return `00:${seconds}`;
  };
  const confirmMutation = useMutation({
    mutationFn: confirmCodeAsync,
    onSuccess: (data, variables) => {
      toast.success(data?.message || "Код подтверждён");
      setCode("");
      setToken(data?.token);
      localStorage.setItem("token", data?.token);

      if (mode === "register") {
        router.push("/", "forward", "replace");
      }
      if (mode === "forgot-password") {
        history.push("/new-password", {
          email,
          code,
          token: data?.token,
        });
      }
    },
    onError: (error) => {
      const data = error?.response?.data;
      toast.error(data?.message || "Ошибка подтверждения кода");
    },
  });

  const resendMutation = useMutation({
    mutationFn: postForgetPasswordAsync,
    onSuccess: (data) => {
      toast.success(data?.message || "Код отправлен повторно");
    },
    onError: (error) => {
      console.log(error);

      const data = error?.response?.data;
      toast.error(data?.message || "Ошибка при повторной отправке");
    },
  });

  const closeCode = () => {
    router.goBack();
  };

  const handleConfirmCode = () => {
    if (!code || code.length !== 6) {
      toast.error("Введите 6-значный код");
      return;
    }

    confirmMutation.mutate({
      email,
      code,
    });
  };

  const handleResendCode = () => {
    if (timer > 0 || resendMutation.isPending) return;

    if (!email) {
      toast.error("Email не найден");
      return;
    }

    setTimer(48); // 👈 ушул жерде башталат
    setCode("");
    resendMutation.mutate({ email });
  };

  return (
    <IonPage style={{ "--background": "black" }}>
      <IonHeader className="flex justify-end p-5 bg-black pt-10">
        <CustomToolbar
          style={{ "--background": "#000000", "--border-width": "0" }}
        >
          <div
            className="flex justify-end w-5 h-5 p-1 text-white items-center rounded-full bg-gray-400"
            onClick={closeCode}
          >
            <IonIcon icon={close} color="white" />
          </div>
        </CustomToolbar>
      </IonHeader>

      <IonContent
        style={{ "--background": "black" }}
        fullscreen
        scrollEvents={true}
      >
        <div className="w-[90%] m-auto">
          <div className="space-y-5">
            <p className="text-[#F5F5F5] text-2xl">
              Мы отправили вам <br /> письмо на почту
            </p>

            <p className="text-[#EBEBEB]">
              Введите код, который мы прислали <br />
              на почту {email || "example@gmail.com"}
            </p>

            <IonInputOtp
              length={6}
              value={code}
              onIonInput={(e) => setCode(e.detail.value)}
              style={{
                "--color": "#FFFFFF",
                fontSize: "24px",
              }}
            />

            <div className="mt-10 text-lg space-y-3">
              <button
                className="text-[#2CBDFF]"
                onClick={handleConfirmCode}
                disabled={confirmMutation.isPending}
              >
                {confirmMutation.isPending ? (
                  <IonSpinner name="crescent" />
                ) : (
                  "Отправить код"
                )}
              </button>{" "}
              <br />
              <button
                type="button"
                className={`text-[#EBEBEB] ${
                  timer > 0 || resendMutation.isPending
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={handleResendCode}
                disabled={timer > 0 || resendMutation.isPending}
              >
                {resendMutation.isPending
                  ? "Отправка..."
                  : timer > 0
                    ? `Отправить код ещё раз · ${formatTime(timer)}`
                    : "Отправить код ещё раз"}
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Code;
