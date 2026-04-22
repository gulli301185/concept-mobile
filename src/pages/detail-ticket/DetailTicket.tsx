import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,
  IonModal,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { chevronBack, chevronUp } from "ionicons/icons";
import handBuggage from "./detail-img/Frame (3).svg";
import handLuggage from "./detail-img/icon hand luggage.svg";
import baggage from "./detail-img/􀊯.svg";
import plane from "./detail-img/ChatGPT Image 11 янв. 2026 г 2.svg";
import React, { useEffect, useState } from "react";
import CustomToolbar from "../../components/customToolbar/CustomToolbar";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSmartOffers } from "../../constants/getSmartOffers";
import { useLocation } from "react-router";
import { arrowForward } from "ionicons/icons";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getPersonalInfoAsync } from "../../constants/getPersonalInfo";
import { getDocTypeAsync } from "../../constants/getDoceType";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DateInput } from "@mantine/dates";

const validationSchema = Yup.object({
  email: Yup.string().email("Неверный email").required("Email обязателен"),

  phone: Yup.string()
    .min(6, "Слишком короткий номер")
    .required("Телефон обязателен"),

  doc_number: Yup.string().required("Номер документа обязателен"),

  doc_type: Yup.string().required("Выберите тип документа"),

  first_name: Yup.string()
    .trim()
    .min(2, "Имя слишком короткое")
    .required("Имя обязательно"),

  last_name: Yup.string()
    .trim()
    .min(2, "Фамилия слишком короткая")
    .required("Фамилия обязательна"),

  birth_date: Yup.string().required("Дата рождения обязательна"),

  gender: Yup.string().required("Пол обязателен"),

  date_expiration: Yup.string().required("Срок действия обязателен"),
});

const DetailTicket = () => {
  const router = useIonRouter();
  const location = useLocation();
  const { segment, group, obratno } = location.state || {};
  const [selectedCard, setSelectedCard] = useState(null);
  const [checkCard, setCheckCard] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [openedDoc, setOpenedDoc] = useState(false);
  const [docType, setDocType] = useState("");
  const [check, setCheck] = useState(false);
  const [checked, setChecked] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const buy_uid = segment?.segment_id;
  console.log(segment);

  const goBack = () => {
    router.goBack();
  };

  const { data } = useQuery({
    queryKey: ["smart-offer", buy_uid],
    queryFn: () => getSmartOffers(buy_uid),
    enabled: !!buy_uid,
  });

  const { data: personalInfo, isLoading } = useQuery({
    queryKey: ["personal-info"],
    queryFn: getPersonalInfoAsync,
  });
  console.log(personalInfo);

  const selectedOffer =
    data?.offers?.find((o) => o.buy_id === selectedCard) || data?.offers?.[0];

  const selectedPrice = selectedOffer?.price;
  const selectedCurrency = selectedOffer?.currency;

  useEffect(() => {
    if (!selectedCard && data?.offers?.[0]?.buy_id) {
      setSelectedCard(data.offers[0].buy_id);
    }
  }, [data, selectedCard]);

  const formatFlightDate = (dateString: string) => {
    if (!dateString) return "";

    const date = new Date(dateString);

    const day = new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
    }).format(date);

    const month = new Intl.DateTimeFormat("ru-RU", {
      month: "short",
    }).format(date);

    const weekday = new Intl.DateTimeFormat("ru-RU", {
      weekday: "short",
    }).format(date);

    return `${day} ${month}, ${weekday.charAt(0).toUpperCase() + weekday.slice(1)}`;
  };

  const { data: documents } = useQuery<DocumentsResponse>({
    queryKey: ["doc-type"],
    queryFn: () => getDocTypeAsync(segment?.pcc_id),
  });
  console.log(documents);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: personalInfo?.email || "",
      phone: personalInfo?.phone || "",
      doc_number: personalInfo?.doc_number || "",
      doc_type: personalInfo?.doc_type || "",
      first_name: personalInfo?.first_name || "",
      last_name: personalInfo?.last_name || "",
      birth_date: personalInfo?.birth_date || "",
      gender: personalInfo?.gender || "",
      date_expiration: personalInfo?.date_expiration || "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("submit values:", values);
      setSuccessModal(true);
    },
  });

  useEffect(() => {
    formik.setFieldValue("doc_type", docType);
  }, [docType]);

  return (
    <IonPage>
      <IonHeader className="shadow-none" style={{ "--background": "white" }}>
        {/* <CustomToolbar> */}
        <IonToolbar style={{ "--background": "white" }}>
          <div className="flex w-[60%] justify-between items-center ml-3 bg-[#FFFFFF] py-5">
            <IonIcon
              icon={chevronBack}
              onClick={goBack}
              className="flex justify-center items-center"
            />
            <p className="font-bold text-xl">Детали полета</p>
          </div>
        </IonToolbar>
        {/* </CustomToolbar> */}
      </IonHeader>

      <IonContent style={{ "--background": "#F0F0F0" }}>
        <p className="font-bold ml-5 mt-5 text-lg">Что входит в тариф</p>

        <div className="overflow-x-auto">
          <div className="flex flex-nowrap pb-2">
            {data?.offers?.map((el) => (
              <IonCard
                key={el.buy_id}
                className={`
                  min-w-[300px] 
                  max-w-[300px] 
                  flex-shrink-0 
                rounded-2xl
                  pb-5 
                  cursor-pointer
                  transition-all
                  ${
                    selectedCard === el.buy_id
                      ? "outline outline-2 outline-[#06A7F2]"
                      : "border border-transparent"
                  }
                `}
                onClick={() => setSelectedCard(el.buy_id)}
              >
                <IonCardHeader>
                  <IonCardTitle>
                    <div className="flex justify-between items-center gap-3 bg-white">
                      <p className="text-lg">
                        <p className="text-[#06A7F2]">{el.legs[0]?.category}</p>
                        <p>
                          {el.legs[0]?.segments[0]?.service_class_label
                            ? el.legs[0]?.segments[0]?.service_class_label
                            : "-"}
                        </p>
                      </p>
                      <p>{el?.price}</p>
                    </div>
                  </IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                      <div className="flex gap-2 whitespace-nowrap">
                        <IonImg src={handLuggage} />
                        <p className="text-gray-600">
                          {el?.legs[0]?.segments[0]?.ff_data?.name !== null
                            ? `Багаж: ${el?.legs[0]?.segments[0]?.ff_data?.name}`
                            : el?.legs[0]?.segments[0]?.ff_data?.services
                              ? el?.legs[0]?.segments[0]?.ff_data?.services[0]
                                  ?.name
                              : "Ручная кладь:не включен"}
                        </p>
                      </div>
                      <div className="text-gray-400 whitespace-nowrap">
                        40×20×30
                      </div>
                    </div>

                    <div className="flex gap-2 whitespace-nowrap text-sm">
                      <IonImg src={handBuggage} className="w-5 h-5 -ml-1" />
                      <p className="text-gray-600">
                        {el?.legs[0]?.segments[0]?.baggage
                          ? `Багаж:${el?.legs[0]?.segments[0]?.baggage}`
                          : el?.legs[0]?.segments[0]?.ff_data?.services[0]
                                ?.scode
                            ? el?.legs[0]?.segments[0]?.ff_data?.services[0]
                                ?.scode
                            : "Багаж:не включен"}
                      </p>
                    </div>

                    <div className="flex gap-2 whitespace-nowrap text-sm">
                      <IonImg src={baggage} />
                      <p className="text-gray-600">Платный обмен</p>
                    </div>
                  </div>
                </IonCardContent>

                <div className="mx-4">
                  {selectedCard === el.buy_id && (
                    <button className="mt-4 w-full bg-sky-100 text-[#06A7F2] py-2 rounded-xl">
                      Выбрать
                    </button>
                  )}
                </div>
              </IonCard>
            ))}
          </div>
        </div>

        <p className="font-bold ml-5 mt-5 text-lg">Информация о рейсе</p>

        <IonCard className="rounded-2xl">
          <IonCardHeader>
            <div className="flex flex-col justify-between items-start  pb-5">
              <div className="flex justify-between items-center pb-10 w-full border-b-2 ">
                <div className="bg-[#EEEDFE] p-3 rounded-lg flex justify-center items-center">
                  <div>
                    <IonImg src={plane} />
                  </div>
                </div>

                <div className="">
                  <p className="text-gray-600 font-bold">
                    {segment?.departure_city_name || "-"}
                    <span className="mx-1">-</span>
                    {segment?.arrival_city_name || "-"}
                  </p>
                  <p className="text-gray-600">
                    {formatFlightDate(
                      segment?.[0]?.departure_date || segment?.departure_date,
                    )}{" "}
                    •<span className="mr-2"> {segment?.duration_formated}</span>
                    в пути
                  </p>
                </div>
                <div
                  className="bg-[#00AAFF33] flex justify-center items-center p-2 rounded-lg"
                  onClick={() => setCheckCard(!checkCard)}
                >
                  <IonIcon icon={chevronUp} />
                </div>
              </div>
              {checkCard && (
                <div className=" w-full">
                  <div className="inline-flex gap-2 items-center  bg-[#F0F0F5] px-3 py-1 rounded-lg my-3  ">
                    <div>
                      <IonImg src={group?.carrier_logo} className="w-8 h-8" />
                    </div>
                    <p className="text-lg whitespace-nowrap">
                      {group?.carrier_name}
                    </p>
                  </div>
                  <div>
                    {segment?.arrival_date} - {segment?.departure_date}
                  </div>
                  <div className="w-full">
                    <div>
                      <p className="text-[#00AAFF] mt-5">Туда</p>
                      {segment?.flights_info.map((flight, index) => (
                        <div key={index} className="w-full mt-3">
                          <div className="flex gap-3 items-center">
                            <div>
                              <IonImg
                                src={group?.carrier_logo}
                                className="w-8 h-8 object-contain mt-1"
                              />
                            </div>
                            <div className="flex flex-col items-center  text-start">
                              <div className="w-2.5 h-2.5 bg-sky-500 rounded-full" />
                              <div className="w-[2px] h-[78px] bg-sky-500" />
                              <div className="w-2.5 h-2.5 bg-sky-500 rounded-full" />
                            </div>
                            <div className=" w-full grid grid-cols-2">
                              <div className=" flex flex-col gap-5 ">
                                <div>
                                  <p className="font-semibold text-black">
                                    {flight?.departure_local_time}
                                  </p>
                                  <p>
                                    {formatFlightDate(flight?.departure_date)}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-semibold text-black">
                                    {" "}
                                    {flight?.arrival_local_time}
                                  </p>

                                  <p>
                                    {formatFlightDate(flight?.arrival_date)}
                                  </p>
                                </div>
                              </div>
                              <div className=" flex flex-col gap-5 ">
                                <div>
                                  <p className="font-semibold text-black">
                                    {flight?.departure_city}
                                  </p>
                                  <p>{flight?.departure_airport}</p>
                                </div>
                                <div>
                                  <p className="font-semibold text-black">
                                    {flight?.arrival_city}
                                  </p>
                                  <p>{flight?.arrival_airport}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5  w-full ">
                      {obratno && <p className="text-[#00AAFF] ">Обратно</p>}

                      {obratno?.flights_info.map((flight, index) => (
                        <div key={index} className="w-full">
                          <div className="flex gap-3 items-center">
                            <div>
                              <IonImg
                                src={group?.carrier_logo}
                                className="w-8 h-8 object-contain "
                              />
                            </div>
                            <div className="flex flex-col items-center mt-3 text-start">
                              <div className="w-2.5 h-2.5 bg-sky-500 rounded-full" />
                              <div className="w-[2px] h-[78px] bg-sky-500" />
                              <div className="w-2.5 h-2.5 bg-sky-500 rounded-full" />
                            </div>
                            <div className=" w-full grid grid-cols-2 mt-5">
                              <div className=" flex flex-col gap-5 ">
                                <div className="">
                                  <p className="font-semibold text-black">
                                    {flight?.departure_local_time}
                                  </p>
                                  <p>
                                    {" "}
                                    {formatFlightDate(flight?.departure_date)}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-semibold text-black">
                                    {flight?.arrival_local_time}
                                  </p>
                                  <p>
                                    {formatFlightDate(flight?.arrival_date)}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-col gap-5">
                                <div>
                                  <p className="font-semibold text-black">
                                    {flight?.departure_city}
                                  </p>
                                  <p>{flight?.departure_airport}</p>
                                </div>
                                <div>
                                  <p className="font-semibold text-black">
                                    {flight?.arrival_city} <br />
                                  </p>
                                  <p>{flight?.arrival_airport}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </IonCardHeader>
        </IonCard>

        <div className="mx-5 pt-4 pb-10 ">
          <button
            expand="block"
            style={{ "--background": "#06A7F2" }}
            className="mt-4 w-full py-3 rounded-xl text-sm bg-[#1e88ff] text-white font-semibold active:scale-[0.99]"
            onClick={open}
          >
            Купить билет за {selectedPrice}
            <span className="uppercase text-sm"> {selectedCurrency}</span>
          </button>
        </div>
      </IonContent>

      <IonModal
        isOpen={opened}
        onDidDismiss={close}
        fullScreen
        withCloseButton={false}
        classNames={{ body: "p-0" }}
        styles={{
          root: { backgroundColor: "rgba(0,0,0,0.5)" },
          content: { backgroundColor: "#F0F0F5", borderRadius: 0 },
          body: { padding: "0" },
        }}
      >
        {/* Header */}
        <IonHeader className="shadow-none">
          <IonToolbar
            style={{
              "--background": "white",
              "--border-radius": "0 0 16px 16px",
              borderRadius: "0 0 16px 16px",
            }}
          >
            <div className="bg-white rounded-b-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4">
                <button onClick={close} className="text-2xl font-normal">
                  ←
                </button>
                <h2 className="font-semibold text-lg">Бронирование</h2>
                <div className="w-6"></div> {/* Баланс үчүн */}
              </div>
            </div>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          {/* Content */}
          <div className="p-5 space-y-6 bg-[#F0F0F5] min-h-screen">
            {/* Банков — Москва */}
            <div className="bg-white rounded-2xl py-2">
              <div className="flex justify-center items-center">
                <div>
                  <h3 className="font-bold text-lg">Бишкек — Москва</h3>
                  <div className="flex gap-3 mt-1">
                    <span className="text-sm text-gray-600">✅ 10 январь</span>
                    <span className="text-sm text-gray-600">🏦 1 Бизнес</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Данные покупателя */}
            <div className="bg-white rounded-2xl p-4">
              <h3 className="font-bold text-lg mb-3">Данные покупателя</h3>
              <div className="space-y-2 text-sm">
                <input
                  // label="Эл. почта"
                  placeholder="ernismedenov@gmail.com"
                  className="bg-[#F0F0F5] w-full py-4 rounded-md pl-3"
                  styles={{
                    input: {
                      backgroundColor: "#e9e9eb",
                      border: "none",
                      fontSize: "17px",
                    },
                    label: {
                      color: "#8e8e93",
                      fontSize: "13px",
                      marginBottom: "4px",
                    },
                  }}
                  value={formik.values.email}
                  onChange={(e) =>
                    formik.setFieldValue("email", e.target.value)
                  }
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}

                <input
                  className="bg-[#F0F0F5] w-full py-4 rounded-md pl-3"
                  placeholder="Номер телефона"
                  value={formik.values.phone}
                  onChange={(e) =>
                    formik.setFieldValue("phone", e.target.value)
                  }
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Данные пассажиров */}
            <div className="bg-white rounded-2xl p-4">
              <h3 className="font-bold text-lg mb-3">Данные пассажиров</h3>
              <div className="border-t border-gray-200 pt-3">
                <h4 className="font-semibold text-md mb-2">Пассажир</h4>
                <div className="space-y-2 text-sm">
                  <input
                    className="bg-[#F0F0F5] w-full py-5 rounded-md pl-3"
                    placeholder="Номер документа"
                    value={formik.values.doc_number}
                    onChange={(e) =>
                      formik.setFieldValue("doc_number", e.target.value)
                    }
                    onBlur={() => formik.setFieldTouched("doc_number", true)}
                  />
                  {formik.touched.doc_number && formik.errors.doc_number && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.doc_number}
                    </p>
                  )}
                  <div
                    onClick={() => setOpenedDoc(true)}
                    className="bg-[#F0F0F5] w-full py-4 rounded-xl px-3"
                  >
                    {docType || "Выберите тип документа"}
                  </div>

                  {formik.touched.doc_type && formik.errors.doc_type && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.doc_type}
                    </p>
                  )}
                </div>

                <IonModal
                  isOpen={openedDoc}
                  onDidDismiss={() => setOpenedDoc(false)}
                  initialBreakpoint={0.5}
                  breakpoints={[0, 0.8, 1]}
                  style={{ zIndex: 9999, "--border-radius": "28px 28px 0 0" }}
                >
                  <div className="p-5 flex flex-col gap-3 text-md font-semibold">
                    <h1 className="text-lg font-bold">
                      Выберите тип документа
                    </h1>

                    {documents?.data.map((doc) => (
                      <p
                        className="py-2 border-gray-200 border-b-2"
                        onClick={() => {
                          setDocType(doc?.name);
                          formik.setFieldValue(
                            "doc_type",
                            doc?.code || doc?.name,
                          );

                          formik.setFieldTouched("doc_type", true);

                          setOpenedDoc(false);
                        }}
                      >
                        {doc?.name}
                      </p>
                    ))}
                  </div>
                </IonModal>
              </div>

              {/* Данные паспорта */}
              <p className="font-bold  mb-2">Данные паспорта:</p>
              <div className="flex flex-col gap-3">
                <input
                  name="first_name"
                  className="bg-[#F0F0F5] w-full py-4 rounded-md pl-3"
                  placeholder="Имя"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.first_name && formik.errors.first_name && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.first_name}
                  </p>
                )}
                <input
                  name="last_name"
                  className="bg-[#F0F0F5] w-full py-4 rounded-md pl-3"
                  placeholder="Фамилия"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.last_name && formik.errors.last_name && (
                  <p className="text-red-500 text-xs">
                    {formik.errors.last_name}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-1">
                  <DateInput
                    valueFormat="DD.MM.YY"
                    placeholder="Дата рождения"
                    classNames={{
                      input:
                        "!min-h-[48px] !rounded-xl !bg-[#F0F0F5] !border-none placeholder:![rgb(238, 241, 244)] !text-base !pl-4",
                    }}
                    value={formik.values.birth_date}
                    onChange={(value) =>
                      formik.setFieldValue("birth_date", value)
                    }
                  />

                  <IonSelect
                    // value={formik.values.gender}
                    // onIonChange={(e) =>
                    //   formik.setFieldValue("gender", e.detail.value)
                    // }
                    // onIonBlur={() => formik.setFieldTouched("gender", true)}
                    interface="action-sheet"
                    interfaceOptions={{ cssClass: "custom-action-sheet" }}
                    placeholder="Пол"
                    radioGroup="20px"
                    className="bg-[#F0F0F5] rounded-xl pl-3 min-h-[48px]"
                    value={formik.values.gender}
                    onIonChange={(e) =>
                      formik.setFieldValue("gender", e.detail.value)
                    }
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
                <DateInput
                  valueFormat="DD.MM.YY"
                  type="text"
                  placeholder="Действителен до"
                  // className="bg-[#F0F0F5] w-full py-4 rounded-md pl-3"
                  classNames={{
                    input:
                      "!min-h-[52px] !rounded-xl !bg-[#F0F0F5] !border-none placeholder:![rgb(238, 241, 244)] !text-base !pl-4",
                  }}
                  value={formik.values.date_expiration}
                  onChange={(value) =>
                    formik.setFieldValue("date_expiration", value)
                  }
                />
              </div>
            </div>
          </div>

          {/* Стоимость и чекбоксы */}
          <div className="space-y-4 p-5 mb-20">
            <div className="bg-white rounded-2xl p-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-2xl">Стоимость</span>
                <span className="font-bold text-xl text-[#00AAFF]">
                  13 350₽
                </span>
              </div>

              {/* Чекбоксы */}
              <div className="space-y-3 text-[#787878] pt-5 font-semibold ">
                <label className="flex items-start justify-start gap-3 text-sm">
                  <input
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                    type="checkbox"
                    className="mt- w-5 h-5 rounded border-gray-300"
                  />
                  <span>Даю согласие на обработку персональных данных</span>
                </label>
                <label className="flex items-start justify-start gap-3 text-sm ">
                  <input
                    checked={check}
                    onChange={(e) => setCheck(e.target.checked)}
                    type="checkbox"
                    className=" w-7 h-7  rounded border-gray-300 "
                  />
                  <span>
                    Даю согласие на получение информации об интересующих мне
                    местах, социальных сетях и о новых предложениях
                  </span>
                </label>
              </div>
              <button
                disabled={!(check && checked)}
                className="w-full bg-[#06A7F2] text-white py-3 rounded-2xl font-semibold text-lg mt-4"
                onClick={() => formik.handleSubmit()}
              >
                К оплате
              </button>
            </div>

            {/* Кнопка */}
          </div>
        </IonContent>
      </IonModal>
      <IonModal
        isOpen={successModal}
        onDidDismiss={() => setSuccessModal(false)}
      >
        <div className="p-5 flex flex-col items-center justify-center h-full gap-4">
          <h2 className="text-xl font-bold">Успешно 🎉</h2>
          <p className="text-gray-600 text-center">
            Бронирование прошло успешно
          </p>

          <button
            className="w-full bg-[#06A7F2] text-white py-3 rounded-2xl"
            onClick={() => setSuccessModal(false)}
          >
            Закрыть
          </button>
        </div>
      </IonModal>
    </IonPage>
  );
};

export default DetailTicket;
