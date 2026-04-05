import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonPage,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { chevronDown, close } from "ionicons/icons";
import google from "./register-icon/Icons.svg";
import React from "react";
import CustomToolbar from "../../components/customToolbar/CustomToolbar";
import { useKeyboardOffset } from "../../hooks/useKeyboardOffset";
import { useMutation } from "@tanstack/react-query";
import { postLoginAsync } from "../../constants/postLogin";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { loginGoogleAsync } from "../../constants/postLoginGoogle";
import { GoogleLogin } from "@react-oauth/google";

const LoginSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^\d{9}$/, "Номер должен содержать 9 цифр")
    .required("Введите номер телефона"),
  password: Yup.string()
    .min(8, "Минимум 8 символов")
    .matches(/[A-Z]/, "Минимум одна заглавная буква")
    .required("Введите пароль"),
});

const Login = () => {
  const router = useIonRouter();
  const keyboardH = useKeyboardOffset();

  const navigateForgotPassword = () => {
    router.push("/forgot-password", "forward", "push");
  };

  const navigateRegister = () => {
    router.push("/register", "forward", "push");
  };

  const goBack = () => {
    router.goBack();
  };

  const loginMutation = useMutation({
    mutationFn: postLoginAsync,
    onSuccess: (data) => {
      console.log("login success:", data);

      if (data?.response === false) {
        toast.error(data?.message || "Ошибка входа");
        return;
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      if (data?.first_name) {
        localStorage.setItem("first_name", data.first_name);
      }

      toast.success(data?.message || "Успешный вход");
      router.push("/", "forward", "push");
    },
    onError: (err) => {
      const data = err?.response?.data;
      toast.error(data?.message || "Ошибка входа");
    },
  });

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      setSubmitting(true);

      try {
        await loginMutation.mutateAsync({
          phone: `+996${values.phone}`,
          password: values.password,
        });
      } catch (err: any) {
        const data = err?.response?.data;

        if (data?.error?.phone?.[0]) {
          setFieldError("phone", data.error.phone[0]);
        }

        if (data?.error?.password?.[0]) {
          setFieldError("password", data.error.password[0]);
        }

        if (data?.error && typeof data.error === "object") {
          Object.values(data.error).forEach((fieldErrors: any) => {
            if (Array.isArray(fieldErrors)) {
              fieldErrors.forEach((message: string) => {
                toast.error(message);
              });
            }
          });
        } else {
          toast.error(data?.message || "Ошибка");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const googleLoginMutation = useMutation({
    mutationFn: loginGoogleAsync,
    onSuccess: (data, credentialResponse) => {
      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      console.log(credentialResponse);

      toast.success("Успешный вход через Google");
      router.push("/app/profile", "forward", "push");
    },
    onError: (err) => {
      const msg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Ошибка Google входа";

      toast.error(msg);
    },
  });

  return (
    <IonPage>
      <CustomToolbar>
        <IonHeader className="shadow-none">
          <IonToolbar>
            <div className="flex justify-end p-5">
              <div
                className="flex justify-center w-7 h-7 p-1 bg-gray-100 items-center rounded-full"
                onClick={goBack}
              >
                <IonIcon icon={close} />
              </div>
            </div>
          </IonToolbar>
        </IonHeader>
      </CustomToolbar>

      <IonContent fullscreen scrollEvents={true}>
        <div className="flex justify-between flex-col">
          <div className="mx-5 flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <p className="text-2xl font-bold leading-tight">
                Войдите или <br /> создайте аккаунт
              </p>
              <p className="text-lg text-[#787878] leading-tight">
                Чтобы купить билет, сохранить данные пассажиров и получать
                поддержку
              </p>
            </div>

            {/* <div
              className="flex bg-[#F0F0F5] py-3 rounded-xl gap-3 justify-center items-center"
              onClick={googleLogin}
            >
              <IonImg src={google} />
              <p>Войти с помощью Google</p>
            </div> */}

            <div className=" scale-y-125 ">
              <GoogleLogin
                size="large"
                shape="pill"
                theme="outline"
                onSuccess={(credentialResponse) => {
                  const idToken = credentialResponse?.credential;
                  console.log(
                    "google credential response:",
                    credentialResponse,
                  );
                  console.log("google id_token:", idToken);

                  if (!idToken) {
                    toast.error("Google token не получен");
                    return;
                  }

                  googleLoginMutation.mutate(idToken);
                }}
                onError={() => {
                  toast.error("Ошибка авторизации Google");
                }}
              />
            </div>

            <div className="flex gap-3 text-gray-400 items-center">
              <div className="w-full border-b-2"></div>
              <div>или</div>
              <div className="w-full border-b-2"></div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex gap-3 items-start">
                <IonButton
                  size="large"
                  color="light"
                  style={{ "--border-radius": "16px" }}
                  // className="flex items-start justify-start"
                >
                  <span className="pr-2 text-base">+996</span>
                  <IonIcon src={chevronDown} size="small" />
                </IonButton>

                <div>
                  <IonItem
                    style={{
                      "--background": "#F0F0F5",
                      "--border-radius": "16px",
                      "--inner-border-width": "0",
                      overflow: "hidden",
                    }}
                    className="mt-1"
                  >
                    <IonInput
                      label="Номер телефона"
                      labelPlacement="floating"
                      fill="solid"
                      placeholder="(999) 99-99-99"
                      style={{
                        "--color": "#ADADAD",
                        "--highlight-color-focused": "#ADADAD",
                        "--border-width": "0",
                        "--background": "#F0F0F5",
                        "--border-radius": "16px",
                      }}
                      value={formik.values.phone}
                      onIonInput={(e) =>
                        formik.setFieldValue("phone", e.detail.value || "")
                      }
                      onIonBlur={() => formik.setFieldTouched("phone", true)}
                    />
                  </IonItem>
                  <p className="whitespace-nowrap">
                    {formik.touched.phone && formik.errors.phone && (
                      <p className="text-red-500 text-sm ">
                        {formik.errors.phone}
                      </p>
                    )}
                  </p>
                </div>
              </div>

              <div>
                <IonItem
                  style={{
                    "--background": "#F0F0F5",
                    "--border-radius": "16px",
                    "--inner-border-width": "0",
                    overflow: "hidden",
                  }}
                >
                  <IonInput
                    label="Введите пароль"
                    labelPlacement="floating"
                    type="password"
                    fill="solid"
                    placeholder="Введите пароль"
                    style={{
                      "--color": "#ADADAD",
                      "--highlight-color-focused": "#ADADAD",
                      "--border-width": "0",
                      "--background": "#F0F0F5",
                    }}
                    value={formik.values.password}
                    onIonInput={(e) =>
                      formik.setFieldValue("password", e.detail.value || "")
                    }
                    onIonBlur={() => formik.setFieldTouched("password", true)}
                  />
                </IonItem>
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <p
                className="text-end text-[#178BD3] font-[600]"
                onClick={navigateForgotPassword}
              >
                Забыли пароль?
              </p>

              <button
                className="p-3 rounded-2xl bg-[#1e88ff] text-white font-semibold active:scale-[0.99]"
                onClick={() => formik.submitForm()}
                disabled={formik.isSubmitting || loginMutation.isPending}
              >
                {formik.isSubmitting || loginMutation.isPending
                  ? "Вход..."
                  : "Войти"}
              </button>
            </div>
          </div>
        </div>
      </IonContent>
      <IonFooter className="shadow-none">
        <IonToolbar>
          <div
            className="text-[#00AAFF] text-center p-5 font-bold leading-loose"
            onClick={navigateRegister}
            style={{
              bottom: keyboardH ? keyboardH + 10 : 14,
            }}
          >
            Нет аккаунта? Зарегистрируйтесь
          </div>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Login;
