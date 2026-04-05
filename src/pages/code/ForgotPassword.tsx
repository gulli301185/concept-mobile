import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonSpinner,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { chevronBack } from "ionicons/icons";
import React from "react";
import CustomToolbar from "../../components/customToolbar/CustomToolbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { postForgetPasswordAsync } from "../../constants/postForgetPassword";
import { useHistory } from "react-router";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Неверный формат почты").required("Введите почту"),
});

const ForgotPassword = () => {
  const router = useIonRouter();
  const history = useHistory();
  const goLogin = () => {
    router.push("/login", "back", "push");
  };

  const forgotPasswordMutation = useMutation({
    mutationFn: postForgetPasswordAsync,
    onSuccess: (data, variables) => {
      console.log(data, variables);

      toast.success(data?.message || "Код отправлен на почту");

      history.push("/code", {
        email: variables.email,
        mode: "forgot-password",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      setSubmitting(true);

      try {
        await forgotPasswordMutation.mutateAsync({
          email: values.email,
        });
      } catch (err) {
        const data = err?.response?.data;

        if (data?.error?.email?.[0]) {
          setFieldError("email", data.error.email[0]);
        }

        if (data?.error) {
          Object.values(data.error).forEach((fieldErrors) => {
            fieldErrors.forEach((message) => {
              toast.error(message);
            });
          });
        } else {
          toast.error(data?.message || "Ошибка при отправке кода");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <IonPage>
      <CustomToolbar>
        <IonHeader className=" px-4 border-none shadow-none ">
          <IonToolbar className="border-none shadow-none">
            <IonIcon icon={chevronBack} onClick={goLogin} />
          </IonToolbar>
        </IonHeader>
      </CustomToolbar>

      <IonContent fullscreen scrollEvents={true}>
        <div className="w-[90%] m-auto flex flex-col justify-between">
          <div className="space-y-5">
            <p className="text-xl font-bold">Забыли пароль?</p>

            <IonItem
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                "--background": "#F0F0F5",
              }}
              className="w-full"
            >
              <IonInput
                label="Эл. почта"
                color="light"
                labelPlacement="floating"
                fill="solid"
                placeholder="example@gmail.com"
                style={{
                  "--color": "#ADADAD",
                  "--highlight-color-focused": "#ADADAD",
                  "--border-width": "0",
                  "--background": "#F0F0F5",
                }}
                value={formik.values.email}
                onIonInput={(e) =>
                  formik.setFieldValue("email", e.detail.value)
                }
                onIonBlur={() => formik.setFieldTouched("email", true)}
              />
            </IonItem>

            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm -mt-3 ml-1">
                {formik.errors.email}
              </p>
            )}

            <p className="text-[#999999]">
              Введите адрес электронной почты, чтобы получить код для сброса
              пароля.
            </p>
          </div>
        </div>
      </IonContent>
      <IonFooter className="px-2 shadow-none">
        {" "}
        <IonToolbar className="shadow-none">
          <IonButton
            className="w-full lowercase"
            style={{ "--background": "#06A7F2" }}
            onClick={() => formik.submitForm()}
            disabled={forgotPasswordMutation.isPending}
          >
            {forgotPasswordMutation.isPending ? (
              <IonSpinner name="crescent" />
            ) : (
              "Получить код"
            )}
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ForgotPassword;
