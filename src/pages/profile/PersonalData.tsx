import React, { useState } from "react";
import {
  IonContent,
  IonIcon,
  IonPage,
  IonModal,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import {
  chevronForward,
  settingsOutline,
  cardOutline,
  close,

} from "ionicons/icons";
import { Button } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getPersonalInfoAsync } from "../../constants/getPersonalInfo";
import { getCittezenShipAsync } from "../../constants/getCittezenShip";
import { getDocTypeAsync } from "../../constants/getDoceType";
import { patchDocInfoAsync } from "../../constants/patchDocInfo";

interface City {
  id: number;
  code: string;
  country: string;
}

interface DocumentType {
  id: number;
  citizen: string;
  name: string;
}

interface PersonalInfo {
  email: string;
  phone: string;
}

interface DocumentsResponse {
  data: DocumentType[];
}

interface FormValues {
  citizenship: string;
  documentType: string | number;
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  gender: string;
  documentNumber: string;
  expiryDate: Date | null;
}

const validationSchema = Yup.object({
  citizenship: Yup.string().required("Выберите гражданство"),
  documentType: Yup.mixed().required("Выберите тип документа"),
  firstName: Yup.string().required("Введите имя"),
  lastName: Yup.string().required("Введите фамилию"),
  birthDate: Yup.date().nullable().required("Выберите дату рождения"),
  gender: Yup.string().required("Выберите пол"),
  documentNumber: Yup.string().required("Введите номер документа"),
  expiryDate: Yup.date().nullable().required("Выберите срок действия"),
});

const PersonalData = ({ docInfoUser }) => {
  const router=useIonRouter()
  const [openModal, setOpenModal] = useState(false);

  const { data } = useQuery<PersonalInfo>({
    queryKey: ["personal-info"],
    queryFn: getPersonalInfoAsync,
  });

  const { data: cities } = useQuery<City[]>({
    queryKey: ["citizenship"],
    queryFn: getCittezenShipAsync,
  });

  const { data: documents } = useQuery<DocumentsResponse>({
    queryKey: ["doc-type"],
    queryFn: () => getDocTypeAsync(1),
  });

  const handleCloseModal = () => {
    setOpenModal(false);
    formik.resetForm();
  };

  const { mutate, isPending } = useMutation({
    mutationFn: patchDocInfoAsync,
    onSuccess: () => {
      toast.success("Документ успешно сохранён");
      handleCloseModal();
    },
    onError: (error) => {
      console.error("PUT ERROR:", error);
      toast.error("Ошибка при сохранении документа");
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      doc_number: "",
      doc_type: "",
      date_expiration: "",
      country: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const payload = {
        doc_number: values.documentNumber,
        doc_type: String(values.documentType),
        date_expiration: values.expiryDate
          ? new Date(values.expiryDate).toISOString().split("T")[0]
          : null,
        country: values.citizenship,
      };

      mutate(payload);
    },
  });


  const personalPage=()=>{
    router.push("/app/personal-page","forward","push")
  }
  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div className="min-h-screen flex flex-col">
          <div className="px-4 pt-14 pb-6">
            <h1 className="text-2xl font-bold">Профиль</h1>
          </div>

          <div className="px-4 flex-1 space-y-4">
            <div className="bg-gray-200 rounded-2xl px-4 py-4 flex items-center justify-between" onClick={personalPage}>
              <div>
                <h2 className="text-sm font-semibold text-gray-500">
                  Личные данные
                </h2>
                <p className="text-xs text-[#8E95A5] mt-1">{data?.email}</p>
                <p className="text-xs text-[#8E95A5] mt-1">{data?.phone}</p>
              </div>

              <IonIcon
                icon={chevronForward}
                className="text-[#8E95A5] text-lg"
              />
            </div>

            <div className="bg-gray-200 rounded-2xl px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <IonIcon
                    icon={settingsOutline}
                    className="text-gray-500 text-base"
                  />
                </div>
                <h2 className="text-sm font-semibold text-gray-500">
                  Настройки
                </h2>
              </div>

              <IonIcon
                icon={chevronForward}
                className="text-[#8E95A5] text-lg"
              />
            </div>
            {docInfoUser ? (
              <div className="bg-gray-200 rounded-2xl px-4 py-4">
                <h2 className="text-sm font-semibold text-gray-500">
                  Заполняем за вас
                </h2>
                <p className="text-xs text-[#8E95A5] mt-1 leading-5">
                  Сохраните документы, и данные подставятся автоматически при
                  покупке
                </p>

                <div className="mt-4">
                  <Button
                    fullWidth
                    radius="md"
                    leftSection={<IonIcon icon={cardOutline} />}
                    className="!bg-[#0A95FF] hover:!bg-[#0986e3] !h-11 !text-sm !font-medium"
                    onClick={() => setOpenModal(true)}
                  >
                    Добавить документ
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-[#ECECEC] rounded-2xl p-3">
                <h2 className="text-[14px] font-semibold text-[#3D3D3D] mb-3">
                  Документы
                </h2>

                <div className="grid grid-cols-2 gap-2 text-gray-500 text-sm">
                  <div className=" bg-[#DCDCDC] rounded-xl px-3 py-2 ">
                    <IonIcon icon={cardOutline} className="text-[18px] " />
                    <div>Тип документа: {docInfoUser?.doc_type}</div>

                    <div>Страна: {docInfoUser?.country}</div>
                    <p>{docInfoUser?.doc_number}</p>
                    <p> Действителен до: {docInfoUser?.date_expiration}</p>
                  </div>
                  <div className=" bg-[#DCDCDC] rounded-xl px-3 py-2 ">

                    
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <IonModal
          initialBreakpoint={0.8}
          breakpoints={[0, 0.8, 1]}
          isOpen={openModal}
          onDidDismiss={handleCloseModal}
        >
          <IonContent className="bg-gray-200">
            <form onSubmit={formik.handleSubmit} className="p-5">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Новый документ</h2>

                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center"
                >
                  <IonIcon icon={close} className="text-white text-lg" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <IonSelect
                    value={formik.values.citizenship}
                    onIonChange={(e) =>
                      formik.setFieldValue("citizenship", e.detail.value)
                    }
                    onIonBlur={() =>
                      formik.setFieldTouched("citizenship", true)
                    }
                    label="Гражданство"
                    labelPlacement="stacked"
                    placeholder="Выберите страну"
                    interface="action-sheet"
                    interfaceOptions={{ cssClass: "half-sheet" }}
                    className="big-label text-gray-500 w-full bg-gray-300 rounded-xl px-3"
                  >
                    {cities?.map((city) => (
                      <IonSelectOption key={city.id} value={city.code}>
                        {city.country}
                      </IonSelectOption>
                    ))}
                  </IonSelect>

                  {formik.touched.citizenship && formik.errors.citizenship && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.citizenship}
                    </p>
                  )}
                </div>

                <div>
                  <IonSelect
                    value={formik.values.documentType}
                    onIonChange={(e) =>
                      formik.setFieldValue("documentType", e.detail.value)
                    }
                    onIonBlur={() =>
                      formik.setFieldTouched("documentType", true)
                    }
                    label="Тип документа"
                    labelPlacement="stacked"
                    placeholder="Тип документа"
                    interface="action-sheet"
                    interfaceOptions={{ cssClass: "half-sheet" }}
                    className="big-label text-gray-500 w-full bg-gray-300 rounded-xl px-3"
                  >
                    {documents?.data?.map((doc) => (
                      <IonSelectOption key={doc.id} value={doc.id}>
                        {doc.name}
                      </IonSelectOption>
                    ))}
                  </IonSelect>

                  {formik.touched.documentType &&
                    formik.errors.documentType && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.documentType as string}
                      </p>
                    )}
                </div>

                <p className="text-sm text-gray-500 pt-2">Данные паспорта</p>

                <div>
                  <IonInput
                    value={formik.values.firstName}
                    onIonInput={(e) =>
                      formik.setFieldValue("firstName", e.detail.value ?? "")
                    }
                    onIonBlur={() => formik.setFieldTouched("firstName", true)}
                    placeholder="Имя"
                    className="bg-gray-300 rounded-xl"
                    style={{ "--padding-start": "16px" }}
                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <IonInput
                    value={formik.values.lastName}
                    onIonInput={(e) =>
                      formik.setFieldValue("lastName", e.detail.value ?? "")
                    }
                    onIonBlur={() => formik.setFieldTouched("lastName", true)}
                    placeholder="Фамилия"
                    className="bg-gray-300 rounded-xl"
                    style={{ "--padding-start": "16px" }}
                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.lastName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <DateInput
                      value={formik.values.birthDate}
                      onChange={(value) =>
                        formik.setFieldValue("birthDate", value)
                      }
                      onBlur={() => formik.setFieldTouched("birthDate", true)}
                      valueFormat="DD.MM.YY"
                      placeholder="Дата рождения"
                      classNames={{
                        input:
                          "!min-h-[48px] !rounded-xl !bg-gray-300 !border-none placeholder:!font-bold placeholder:!text-gray-500",
                      }}
                    />
                    {formik.touched.birthDate && formik.errors.birthDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.birthDate as string}
                      </p>
                    )}
                  </div>

                  <div>
                    <IonSelect
                      value={formik.values.gender}
                      onIonChange={(e) =>
                        formik.setFieldValue("gender", e.detail.value)
                      }
                      onIonBlur={() => formik.setFieldTouched("gender", true)}
                      interface="action-sheet"
                      placeholder="Пол"
                      className="bg-gray-300 rounded-xl pl-3 min-h-[48px]"
                    >
                      <IonSelectOption value="male">Мужской</IonSelectOption>
                      <IonSelectOption value="female">Женский</IonSelectOption>
                    </IonSelect>

                    {formik.touched.gender && formik.errors.gender && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.gender}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <IonInput
                    value={formik.values.documentNumber}
                    onIonInput={(e) =>
                      formik.setFieldValue(
                        "documentNumber",
                        e.detail.value ?? "",
                      )
                    }
                    onIonBlur={() =>
                      formik.setFieldTouched("documentNumber", true)
                    }
                    placeholder="№ документа"
                    className="bg-gray-300 rounded-xl"
                    style={{ "--padding-start": "16px" }}
                  />
                  {formik.touched.documentNumber &&
                    formik.errors.documentNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {formik.errors.documentNumber}
                      </p>
                    )}
                </div>

                <div>
                  <DateInput
                    value={formik.values.expiryDate}
                    onChange={(value) =>
                      formik.setFieldValue("expiryDate", value)
                    }
                    onBlur={() => formik.setFieldTouched("expiryDate", true)}
                    valueFormat="DD.MM.YY"
                    placeholder="Действителен до"
                    classNames={{
                      input:
                        "!min-h-[48px] !rounded-xl !bg-gray-300 placeholder:!font-bold !border-none placeholder:!text-gray-500",
                    }}
                  />
                  {formik.touched.expiryDate && formik.errors.expiryDate && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.expiryDate as string}
                    </p>
                  )}
                </div>

                <IonButton
                  type="submit"
                  expand="block"
                  shape="round"
                  className="mt-6"
                  disabled={isPending}
                >
                  {isPending ? "Сохранение..." : "Сохранить"}
                </IonButton>
              </div>
            </form>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default PersonalData;
