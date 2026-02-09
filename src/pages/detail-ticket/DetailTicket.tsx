import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import {
  arrowBack,
  arrowForward,
  chevronBack,
  chevronUp,
} from "ionicons/icons";
import logoPlane from "./detail-img/Frame 359.svg";
import handBuggage from "./detail-img/Frame (3).svg";
import handLuggage from "./detail-img/icon hand luggage.svg";
import baggage from "./detail-img/􀊯.svg";
import plane from "./detail-img/ChatGPT Image 11 янв. 2026 г 2.svg";
import React from "react";
import CustomToolbar from "../../components/customToolbar/CustomToolbar";
import { useLocation } from "react-router";

const DetailTicket = () => {
  const location = useLocation();
  const { segment, group } = location.state || {};
  console.log(segment, group);

  const router = useIonRouter();

  const goBack = () => {
    router.goBack();
  };
  return (
    <IonPage>
      <IonHeader>
        <CustomToolbar>
          <div className="flex w-[60%] justify-between items-center ml-3 bg-[#FFFFFF] pt-20 pb-7 ">
            <IonIcon
              icon={chevronBack}
              onClick={goBack}
              className="flex justify-center items-center"
            />
            <p className="font-bold text-xl">Детали полета</p>
          </div>
        </CustomToolbar>
      </IonHeader>
      <IonContent style={{ "--background": "#F0F0F0" }}>
        <p className="font-bold ml-5 mt-5 text-lg">Что входит в тариф</p>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <div className="flex flex-col gap-3 bg-white">
                <p className="text-lg">
                  {segment.flights_info[0]?.service_class}
                </p>
                <p>{segment?.min_price}</p>
              </div>
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <div className="flex gap-2 whitespace-nowrap ">
                  <IonImg src={handLuggage} />
                  <p className="text-gray-600">10кг ручной клади</p>
                </div>
                <div className="text-gray-400">40×20×30</div>
              </div>
              <div className="flex gap-2 whitespace-nowrap text-sm ">
                <IonImg src={handBuggage} className="w-5 h-5 -ml-1" />
                <p className="text-gray-600">{segment?.baggage} багаж</p>
              </div>
              <div className="flex gap-2 whitespace-nowrap text-sm">
                <IonImg src={baggage} />
                <p className="text-gray-600">Платный обмен</p>
              </div>
            </div>
          </IonCardContent>
        </IonCard>
        <p className="font-bold ml-5 mt-5 text-lg">Информация о рейсе</p>
        <IonCard>
          <IonCardHeader>
            <div className="flex justify-between items-start border-b-2 pb-5">
              <div className="bg-[#EEEDFE] p-3 rounded-lg flex justify-center items-center ">
                <IonImg src={plane} />
              </div>
              <div>
                <p className="text-gray-600 font-bold">
                  {segment?.departure_city_name}-{segment?.arrival_city_name}
                </p>
                <p className="text-gray-600">
                  {segment?.departure_date} • прямой •{" "}
                  {segment?.duration_formated}
                  пути
                </p>
              </div>
              <div className="bg-[#00AAFF33] flex justify-center items-center p-2  rounded-lg">
                <IonIcon icon={chevronUp} />
              </div>
            </div>
          </IonCardHeader>

          <IonCardContent>
            <div className="  ml-5 rounded-lg flex flex-col gap-4 justify-start items-start">
              <div className="flex bg-[#F0F0F5] justify-center px-2 py-1  rounded-lg  items-center gap-2">
                <IonImg
                  src={group?.carrier_logo}
                  className="w-10 h-10 object-contain"
                />
                <p className="text-black font-semibold text-gray-600">
                  {group?.carrier_code}
                </p>
              </div>
              <p className="whitespace-nowrap !text-lg">{segment?.pcc_name}</p>
            </div>
            <div className="flex pb-2 mt-5 gap-10">
              <div className="flex flex-col items-center mt-3 text-start">
                <div className="w-2.5 h-2.5 bg-sky-500 rounded-full" />
                <div className="w-[2px] h-[68px] bg-sky-500" />
                <div className="w-2.5 h-2.5 bg-sky-500 rounded-full" />
              </div>
              <div className="flex flex-col gap-5 ">
                <div className="flex gap-10 items-start">
                  <div>
                    <p className="font-semibold !text-xl text-black ">
                      {segment?.departure_time}
                    </p>
                    <p>{segment?.departure_date}</p>
                  </div>
                  <div>
                    <p className="font-semibold !text-xl text-black">
                      {segment?.departure_city_name}
                    </p>
                    <p>{segment?.departure_airport}</p>
                  </div>
                </div>
                <div className="flex gap-10 items-start text-black">
                  <div>
                    <p className="font-semibold !text-xl ">
                      {segment?.arrival_time}
                    </p>
                    <p className="text-gray-500">{segment?.arrival_date}</p>
                  </div>
                  <div>
                    <p className="font-semibold !text-xl">
                      {segment?.arrival_city_name}
                    </p>
                    <p className="text-gray-500">
                      {segment?.arrival_airport_name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </IonCardContent>
        </IonCard>
        <div className=" mx-5 pt-4 pb-10">
          <IonButton expand="block" style={{ "--background": "#06A7F2" }}>
            Купить билет за 20 245
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DetailTicket;
