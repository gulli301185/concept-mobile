// import {
//   IonButton,
//   IonCard,
//   IonCardContent,
//   IonCardHeader,
//   IonCardTitle,
//   IonContent,
//   IonHeader,
//   IonIcon,
//   IonImg,
//   IonPage,
//   IonToolbar,
//   useIonRouter,
// } from "@ionic/react";
// import { chevronBack, chevronUp } from "ionicons/icons";
// import handBuggage from "./detail-img/Frame (3).svg";
// import handLuggage from "./detail-img/icon hand luggage.svg";
// import baggage from "./detail-img/􀊯.svg";
// import plane from "./detail-img/ChatGPT Image 11 янв. 2026 г 2.svg";
// import React, { useEffect, useState } from "react";
// import CustomToolbar from "../../components/customToolbar/CustomToolbar";
// import { useQuery } from "@tanstack/react-query";
// import { getSmartOffers } from "../../constants/getSmartOffers";
// import { useLocation } from "react-router";

// const DetailTicket = () => {
//   const router = useIonRouter();
//   const location = useLocation();
//   const { segment, group } = location.state || {};
//   const [selectedCard, setSelectedCard] = useState(null);
//   const buy_uid = segment.buy_id;
//   const goBack = () => {
//     router.goBack();
//   };

//   const { data } = useQuery({
//     queryKey: ["smart-offer", buy_uid],
//     queryFn: () => getSmartOffers(buy_uid),
//     enabled: !!buy_uid,
//   });
//   console.log(data);
//   const selectedOffer =
//     data?.offers?.find((o) => o.buy_id === selectedCard) || data?.offers?.[0];

//   const selectedPrice = selectedOffer?.price;
//   const selectedCurrency = selectedOffer?.currency;
//   useEffect(() => {
//     if (!selectedCard && data?.offers?.[0]?.buy_id) {
//       setSelectedCard(data.offers[0].buy_id);
//     }
//   }, [data, selectedCard]);
//   return (
//     <IonPage>
//       <IonHeader className="shadow-none">
//         <CustomToolbar>
//           <IonToolbar>
//             <div className="flex w-[60%] justify-between items-center ml-3 bg-[#FFFFFF]  py-5 ">
//               <IonIcon
//                 icon={chevronBack}
//                 onClick={goBack}
//                 className="flex justify-center items-center"
//               />
//               <p className="font-bold text-xl">Детали полета</p>
//             </div>
//           </IonToolbar>
//         </CustomToolbar>
//       </IonHeader>
//       <IonContent style={{ "--background": "#F0F0F0" }}>
//         <p className="font-bold ml-5 mt-5 text-lg ">Что входит в тариф</p>
//         <div className="overflow-x-auto">
//           <div className="flex flex-nowrap  pb-2">
//             {data?.offers?.map((el) => (
//               <IonCard
//                 key={el.buy_id}
//                 className={`
//                            min-w-[300px]
//                            max-w-[300px]
//                            flex-shrink-0
//                            pb-5
//                            cursor-pointer
//                            transition-all
//                            ${
//                              selectedCard === el.buy_id
//                                ? "outline outline-2 outline-[#06A7F2]"
//                                : "border border-transparent"
//                            }
//                              `}
//                 onClick={() => setSelectedCard(el.buy_id)}
//               >
//                 <IonCardHeader>
//                   <IonCardTitle>
//                     <div className="flex justify-between items-center gap-3 bg-white">
//                       <p className="text-lg">
//                         <p className="text-[#06A7F2]">
//                           {" "}
//                           {el.legs[0]?.category}
//                         </p>
//                         <p>
//                           {" "}
//                           {el.legs[0]?.segments[0]?.service_class_label
//                             ? el.legs[0]?.segments[0]?.service_class_label
//                             : "-"}
//                         </p>
//                       </p>
//                       <p>{el?.price}</p>
//                     </div>
//                   </IonCardTitle>
//                 </IonCardHeader>

//                 <IonCardContent>
//                   <div className="flex flex-col gap-2">
//                     <div className="flex justify-between text-sm">
//                       <div className="flex gap-2 whitespace-nowrap">
//                         <IonImg src={handLuggage} />
//                         <p className="text-gray-600">
//                           {el?.legs[0]?.segments[0]?.ff_data?.name !== null
//                             ? `Багаж: ${el?.legs[0]?.segments[0]?.ff_data?.name}`
//                             : el?.legs[0]?.segments[0]?.ff_data?.services
//                               ? el?.legs[0]?.segments[0]?.ff_data?.services[0]
//                                   ?.name
//                               : "Ручная кладь:не включен"}
//                         </p>
//                       </div>
//                       <div className="text-gray-400 whitespace-nowrap">
//                         40×20×30
//                       </div>
//                     </div>

//                     <div className="flex gap-2 whitespace-nowrap text-sm">
//                       <IonImg src={handBuggage} className="w-5 h-5 -ml-1" />
//                       <p className="text-gray-600">
//                         {el?.legs[0]?.segments[0]?.baggage
//                           ? `Багаж:${el?.legs[0]?.segments[0]?.baggage}`
//                           : el?.legs[0]?.segments[0]?.ff_data?.services[0]
//                                 ?.scode
//                             ? el?.legs[0]?.segments[0]?.ff_data?.services[0]
//                                 ?.scode
//                             : "Багаж:не включен"}
//                       </p>
//                     </div>

//                     <div className="flex gap-2 whitespace-nowrap text-sm">
//                       <IonImg src={baggage} />
//                       <p className="text-gray-600">Платный обмен</p>
//                     </div>
//                   </div>
//                 </IonCardContent>
//                 <div className="mx-4">
//                   {selectedCard === el.buy_id && (
//                     <button className="mt-4 w-full bg-sky-100 text-[#06A7F2]  py-2 rounded-xl">
//                       Выбрать
//                     </button>
//                   )}
//                 </div>
//               </IonCard>
//             ))}
//           </div>
//         </div>{" "}
//         <p className="font-bold ml-5 mt-5 text-lg">Информация о рейсе</p>
//         <IonCard>
//           <IonCardHeader>
//             <div className="flex justify-between items-start border-b-2 pb-5">
//               <div className="bg-[#EEEDFE] p-3 rounded-lg flex justify-center items-center ">
//                 <IonImg src={plane} />
//               </div>
//               <div>
//                 <p className="text-gray-600 font-bold">
//                   {data?.offers[0]?.legs[0]?.segments[0]?.departure_airport_name
//                     ? data?.offers[0]?.legs[0]?.segments[0]
//                         ?.departure_airport_name
//                     : "-"}
//                   <span className="mx-1">-</span>
//                   {data?.offers[0]?.legs[0]?.segments[0]?.arrival_airport_name}
//                 </p>
//                 <p className="text-gray-600">
//                   {segment?.departure_date} •
//                   <span className=" mr-2"> {segment?.duration_formated}</span>в
//                   пути
//                 </p>
//               </div>
//               <div className="bg-[#00AAFF33] flex justify-center items-center p-2  rounded-lg">
//                 <IonIcon icon={chevronUp} />
//               </div>
//             </div>
//           </IonCardHeader>

//           <IonCardContent>
//             <div className="  ml-5 rounded-lg flex flex-col gap-4 justify-start items-start">
//               <div className="flex bg-[#F0F0F5] justify-center px-2 py-1  rounded-lg  items-center gap-2">
//                 <IonImg
//                   src={group?.carrier_logo}
//                   className="w-10 h-10 object-contain"
//                 />
//                 <p className=" font-semibold text-gray-600">
//                   {/* {data?.offers[0]?.legs[0]?.segments[0]?.marketing_airline} */}
//                 </p>
//               </div>
//               <p className="whitespace-nowrap !text-lg">{segment?.pcc_name}</p>
//             </div>
//             <div className="flex pb-2 mt-5 gap-10">
//               <div className="flex flex-col items-center mt-3 text-start">
//                 <div className="w-2.5 h-2.5 bg-sky-500 rounded-full" />
//                 <div className="w-[2px] h-[68px] bg-sky-500" />
//                 <div className="w-2.5 h-2.5 bg-sky-500 rounded-full" />
//               </div>
//               <div className="flex flex-col gap-5 ">
//                 <div className="flex gap-10 items-start">
//                   <div>
//                     <p className="font-semibold !text-xl text-black ">
//                       {segment?.departure_time}
//                     </p>
//                     <p>{segment?.departure_date}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold !text-xl text-black">
//                       {
//                         data?.offers[0]?.legs[0]?.segments[0]
//                           ?.departure_airport_name
//                       }
//                     </p>
//                     {data?.offers[0]?.legs[0]?.segments[0]?.departure_airport}
//                   </div>
//                 </div>
//                 <div className="flex gap-10 items-start text-black">
//                   <div>
//                     <p className="font-semibold !text-xl ">
//                       {segment?.arrival_time}
//                     </p>
//                     <p className="text-gray-500">{segment?.arrival_date}</p>
//                   </div>
//                   <div>
//                     <p className="font-semibold !text-xl">
//                       {
//                         data?.offers[0]?.legs[0]?.segments[0]
//                           ?.arrival_airport_name
//                       }
//                     </p>
//                     <p className="text-gray-500">
//                       {data?.offers[0]?.legs[0]?.segments[0]?.arrival_airport}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </IonCardContent>
//         </IonCard>
//         <div className=" mx-5 pt-4 pb-10 lowercase">
//           <IonButton
//             expand="block"
//             style={{ "--background": "#06A7F2" }}
//             className="lowercase"
//           >
//             Купить билет за {selectedPrice}
//             <span className="uppercase">{selectedCurrency}</span>
//           </IonButton>
//         </div>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default DetailTicket;

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
import { chevronBack, chevronUp } from "ionicons/icons";
import handBuggage from "./detail-img/Frame (3).svg";
import handLuggage from "./detail-img/icon hand luggage.svg";
import baggage from "./detail-img/􀊯.svg";
import plane from "./detail-img/ChatGPT Image 11 янв. 2026 г 2.svg";
import React, { useEffect, useState } from "react";
import CustomToolbar from "../../components/customToolbar/CustomToolbar";
import { useQuery } from "@tanstack/react-query";
import { getSmartOffers } from "../../constants/getSmartOffers";
import { useLocation } from "react-router";

const DetailTicket = () => {
  const router = useIonRouter();
  const location = useLocation();
  const { segment, group } = location.state || {};
  const [selectedCard, setSelectedCard] = useState(null);

  const buy_uid = segment?.buy_id;

  const goBack = () => {
    router.goBack();
  };

  const { data } = useQuery({
    queryKey: ["smart-offer", buy_uid],
    queryFn: () => getSmartOffers(buy_uid),
    enabled: !!buy_uid,
  });

  const selectedOffer =
    data?.offers?.find((o) => o.buy_id === selectedCard) || data?.offers?.[0];

  const selectedPrice = selectedOffer?.price;
  const selectedCurrency = selectedOffer?.currency;

  useEffect(() => {
    if (!selectedCard && data?.offers?.[0]?.buy_id) {
      setSelectedCard(data.offers[0].buy_id);
    }
  }, [data, selectedCard]);

  const routeSegments = selectedOffer?.legs?.[0]?.segments || [];
  const timeSegments = segment?.flights_info || [];

  const mergedSegments =
    routeSegments.length > 0
      ? routeSegments.map((item, index) => ({
          ...item,
          departure_time:
            timeSegments[index]?.departure_local_time ||
            timeSegments[index]?.departure_time ||
            (index === 0 ? segment?.departure_time : "--:--"),
          arrival_time:
            timeSegments[index]?.arrival_local_time ||
            timeSegments[index]?.arrival_time ||
            (index === routeSegments.length - 1
              ? segment?.arrival_time
              : "--:--"),
          departure_date:
            timeSegments[index]?.departure_date ||
            segment?.departure_date ||
            "",
          arrival_date:
            timeSegments[index]?.arrival_date || segment?.arrival_date || "",
        }))
      : [
          {
            departure_airport_name: segment?.departure_airport_name || "-",
            departure_airport: segment?.departure_airport || "-",
            arrival_airport_name: segment?.arrival_airport_name || "-",
            arrival_airport: segment?.arrival_airport || "-",
            departure_time: segment?.departure_time || "--:--",
            arrival_time: segment?.arrival_time || "--:--",
            departure_date: segment?.departure_date || "",
            arrival_date: segment?.arrival_date || "",
          },
        ];

  return (
    <IonPage>
      <IonHeader className="shadow-none">
        <CustomToolbar>
          <IonToolbar>
            <div className="flex w-[60%] justify-between items-center ml-3 bg-[#FFFFFF] py-5">
              <IonIcon
                icon={chevronBack}
                onClick={goBack}
                className="flex justify-center items-center"
              />
              <p className="font-bold text-xl">Детали полета</p>
            </div>
          </IonToolbar>
        </CustomToolbar>
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
            <div className="flex justify-between items-start border-b-2 pb-5">
              <div className="bg-[#EEEDFE] p-3 rounded-lg flex justify-center items-center">
                <IonImg src={plane} />
              </div>

              <div>
                <p className="text-gray-600 font-bold">
                  {mergedSegments?.[0]?.departure_airport_name || "-"}
                  <span className="mx-1">-</span>
                  {mergedSegments?.[mergedSegments.length - 1]
                    ?.arrival_airport_name || "-"}
                </p>
                <p className="text-gray-600">
                  {mergedSegments?.[0]?.departure_date ||
                    segment?.departure_date}{" "}
                  •<span className="mr-2"> {segment?.duration_formated}</span>в
                  пути
                </p>
              </div>

              <div className="bg-[#00AAFF33] flex justify-center items-center p-2 rounded-lg">
                <IonIcon icon={chevronUp} />
              </div>
            </div>
          </IonCardHeader>

          <IonCardContent>
            <div className="ml-5  flex flex-col gap-4 justify-start items-start">
              <div className="flex bg-[#F0F0F5] justify-center px-2 py-1 rounded-lg items-center gap-2">
                <IonImg
                  src={group?.carrier_logo}
                  className="w-10 h-10 object-contain"
                />
                <p className="font-semibold text-gray-600">
                  {/* {selectedOffer?.legs?.[0]?.segments?.[0]?.marketing_airline} */}
                </p>
              </div>
              <p className="whitespace-nowrap !text-lg">{segment?.pcc_name}</p>
            </div>

            <div className="flex pb-2 mt-5 gap-10">
              {mergedSegments.length === 1 ? (
                <>
                  <div className="flex flex-col items-center mt-3 text-start">
                    <div className="w-2.5 h-2.5 bg-sky-500 rounded-full" />
                    <div className="w-[2px] h-[68px] bg-sky-500" />
                    <div className="w-2.5 h-2.5 bg-sky-500 rounded-full" />
                  </div>

                  <div className="flex flex-col gap-5">
                    <div className="flex gap-5 items-start">
                      <div>
                        <p className="font-semibold !text-lg text-black">
                          {mergedSegments[0]?.departure_time}
                        </p>
                        <p>{mergedSegments[0]?.departure_date}</p>
                      </div>
                      <div>
                        <p className="font-semibold !text-lg text-black">
                          {mergedSegments[0]?.departure_airport_name}
                        </p>
                        <p>{mergedSegments[0]?.departure_airport}</p>
                      </div>
                    </div>

                    <div className="flex gap-5 items-start text-black">
                      <div>
                        <p className="font-semibold !text-lg">
                          {mergedSegments[0]?.arrival_time}
                        </p>
                        <p className="text-gray-500">
                          {mergedSegments[0]?.arrival_date}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold !text-lg">
                          {mergedSegments[0]?.arrival_airport_name}
                        </p>
                        <p className="text-gray-500">
                          {mergedSegments[0]?.arrival_airport}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-5">
                  {mergedSegments.map((flight, index) => (
                    <div className="flex gap-5" key={index}>
                      <div className="flex flex-col items-center mt-3 text-start">
                        <div className="w-2.5 h-2.5 bg-sky-500 rounded-full" />
                        <div className="w-[2px] h-[68px] bg-sky-500" />
                        <div className="w-2.5 h-2.5 bg-sky-500 rounded-full" />
                      </div>

                      <div>
                        <div className="flex gap-10 items-start">
                          <div>
                            <p className="font-semibold !text-xl text-black">
                              {flight?.departure_time}
                            </p>
                            <p>{flight?.departure_date}</p>
                          </div>
                          <div>
                            <p className="font-semibold !text-xl text-black">
                              {flight?.departure_airport_name}
                            </p>
                            <p>{flight?.departure_airport}</p>
                          </div>
                        </div>

                        <div className="flex gap-10 items-start text-black">
                          <div>
                            <p className="font-semibold !text-xl">
                              {flight?.arrival_time}
                            </p>
                            <p className="text-gray-500">
                              {flight?.arrival_date}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold !text-xl">
                              {flight?.arrival_airport_name}
                            </p>
                            <p className="text-gray-500">
                              {flight?.arrival_airport}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </IonCardContent>
        </IonCard>

        <div className="mx-5 pt-4 pb-10 lowercase">
          <button
            expand="block"
            style={{ "--background": "#06A7F2" }}
            className="mt-4 w-full py-4 rounded-xl bg-[#1e88ff] text-white font-semibold active:scale-[0.99]"
          >
            Купить билет за {selectedPrice}
            <span className="uppercase">{selectedCurrency}</span>
          </button>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DetailTicket;
