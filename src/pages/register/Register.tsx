import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonSpinner,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { chevronDown, close } from "ionicons/icons";
import React from "react";
import checkFalse from "./register-icon/Frame 2147225317.svg";
import checkTrue from "./register-icon/Frame 2147225317 (1).svg";
import CustomToolbar from "../../components/customToolbar/CustomToolbar";
import { postRegisterAsync } from "../../constants/postRegister";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(2, "Минимум 2 символа").required("Введите имя"),
  phone: Yup.string()
    .matches(/^\d{9}$/, "Номер должен содержать 9 цифр")
    .required("Введите номер телефона"),
  email: Yup.string().email("Неверный формат почты").required("Введите почту"),
  password: Yup.string()
    .min(8, "Минимум 8 символов")
    .matches(/[A-Z]/, "Минимум одна заглавная буква")
    .required("Введите пароль"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Пароли не совпадают")
    .required("Повторите пароль"),
  agree: Yup.boolean().oneOf([true], "Необходимо принять условия"),
});

const Register = () => {
  const router = useIonRouter();

  const goBack = () => {
    router.push("/", "forward", "push");
  };
  const registerPlugin = useMutation({
    mutationFn: postRegisterAsync,
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("register_email", formik.values.email);
      toast.success(data?.message);
      router.push("/code", "forward", "push", {
        state: {
          email: formik.values.email,
          mode: "register",
        },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      agree: false,
    },

    validationSchema: RegisterSchema,
    validateOnMount: true,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      setSubmitting(true);
      const payload={
          full_name: values.name,
          phone: `+996${values.phone}`,
          email: values.email,
          password: values.password,
          confirm_password: values.confirmPassword,
        }
console.log("REGISTER PAYLOAD:", payload);
      try {
        await registerPlugin.mutateAsync(payload);
      } catch (err) {
        const data = err?.response?.data;

        if (data?.error?.email?.[0]) {
          setFieldError("email", data.error.email[0]);
        }

        if (data?.error?.phone?.[0]) {
          setFieldError("phone", data.error.phone[0]);
        }

        if (data?.error?.password?.[0]) {
          setFieldError("password", data.error.password[0]);
        }

        if (data?.error?.confirm_password?.[0]) {
          setFieldError("confirmPassword", data.error.confirm_password[0]);
        }

        if (data?.error) {
          Object.values(data.error).forEach((fieldErrors) => {
            fieldErrors.forEach((message) => {
              toast.error(message);
            });
          });
        } else {
          toast.error(data?.message || "Ошибка");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const hasMinLength = formik.values.password.length >= 8;
  const hasUppercase = /[A-Z]/.test(formik.values.password);

  return (
    <IonPage>
      <CustomToolbar>
        <IonHeader className="shadow-none p-5">
          <IonToolbar>
            <div className="shadow-none flex justify-end">
              <div
                className=" flex justify-center w-7 h-7 p-1 bg-gray-100 items-center rounded-full"
                onClick={goBack}
              >
                {" "}
                <IonIcon icon={close} />
              </div>
            </div>
          </IonToolbar>
        </IonHeader>
      </CustomToolbar>
      <IonContent>
        <form className=" flex flex-col gap-3 w-[90%] m-auto">
          <p className="text-2xl font-bold leading-tight mb-5">Регистрация</p>
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
                placeholder="Ваше имя"
                name="name"
                value={formik.values.name}
                onIonInput={(e) => formik.setFieldValue("name", e.detail.value)}
                onIonBlur={() => formik.setFieldTouched("name")}
              />
            </IonItem>
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm -mt-2 ml-1">
                {formik.errors.name}
              </p>
            )}
            <div className="flex  gap-3 items-center justify-center">
              <IonButton size="large" color="light">
                <span className="pr-2"> +996</span>
                <IonIcon icon={chevronDown} size="small" />
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
                  name="phone"
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
                  value={formik.values.phone}
                  onIonInput={(e) => {
                    const raw = e.detail.value ?? "";
                    const onlyDigits = String(raw)
                      .replace(/\D/g, "")
                      .slice(0, 9);
                    formik.setFieldValue("phone", onlyDigits);
                  }}
                  onIonBlur={() => formik.setFieldTouched("phone")}
                ></IonInput>
              </IonItem>
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm -mt-2 ml-1">
                {formik.errors.phone}
              </p>
            )}
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
                name="email"
                labelPlacement="floating"
                fill="solid"
                placeholder="(999) 99-99-99"
                style={{
                  "--color": "#ADADAD", // label түсү
                  "--highlight-color-focused": "#ADADAD",
                  "--border-width": "0",
                  "--background": "#F0F0F5",
                }}
                value={formik.values.email}
                onIonInput={(e) =>
                  formik.setFieldValue("email", e.detail.value)
                }
                onIonBlur={() => formik.setFieldTouched("email")}
              ></IonInput>
            </IonItem>
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm -mt-2 ml-1">
                {formik.errors.email}
              </p>
            )}
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
                type="password"
                name="password"
                labelPlacement="floating"
                fill="solid"
                placeholder="(999) 99-99-99"
                style={{
                  "--color": "#ADADAD", // label түсү
                  "--highlight-color-focused": "#ADADAD",
                  "--border-width": "0",
                  "--background": "#F0F0F5",
                }}
                value={formik.values.password}
                onIonInput={(e) =>
                  formik.setFieldValue("password", e.detail.value)
                }
                onIonBlur={() => formik.setFieldTouched("password")}
              ></IonInput>
            </IonItem>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm -mt-2 ml-1">
                {formik.errors.password}
              </p>
            )}
            <p className="text-[#787878] flex items-center gap-2">
              <IonIcon src={hasMinLength ? checkTrue : checkFalse} />
              Минимум 8 символов
            </p>
            <p className="text-[#787878] flex items-center gap-2">
              <IonIcon src={hasUppercase ? checkTrue : checkFalse} />
              Минимум одна заглавная буква
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
                type="password"
                name="confirmPassword"
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
                value={formik.values.confirmPassword}
                onIonInput={(e) =>
                  formik.setFieldValue("confirmPassword", e.detail.value)
                }
                onIonBlur={() => formik.setFieldTouched("confirmPassword")}
              ></IonInput>
            </IonItem>
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm -mt-2 ml-1">
                  {formik.errors.confirmPassword}
                </p>
              )}
            <div className="flex gap-3 items-center text-[#999999] pb-3">
              <IonCheckbox
                checked={formik.values.agree}
                onIonChange={(e) => {
                  formik.setFieldValue("agree", e.detail.checked);
                  formik.setFieldTouched("agree", true);
                }}
              />
              <p>
                Я принимаю условия использования и политику конфиденциальности
              </p>
            </div>
            {formik.touched.agree && formik.errors.agree && (
              <p className="text-red-500 text-sm -mt-2 ml-1">
                {formik.errors.agree}
              </p>
            )}
            <IonButton
              size="large"
              style={{ "--background": "#06A7F2" }}
              onClick={() => formik.submitForm()}
              className="text-base lowercase"
            >
              {registerPlugin.isPending ? (
                <IonSpinner name="crescent" />
              ) : (
                "Зарегистрироваться"
              )}
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Register;
