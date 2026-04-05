import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonModal,
  IonPage,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import {
  arrowBack,
  arrowDown,
  arrowForward,
  arrowUp,
  calendar,
  person,
  search,
} from "ionicons/icons";
import React, { useState } from "react";
import plane from "../../components/main/main-img/Vector (1).svg";
import planeTo from "../../components/main/main-img/Vector (5).svg";
import logoPlane from "./search-img/Frame 359.svg";
import "react-day-picker/dist/style.css";
import { useQuery } from "@tanstack/react-query";
import { getTicketsCharts } from "../../constants/getTicketsCharts";
import { getOffers } from "../../constants/getOffers";
import CustomToolbar from "../../components/customToolbar/CustomToolbar";

const SearchPage = () => {
  const router = useIonRouter();
  const [bronTicket, setBronTicket] = useState(false);
  const [someConditional, setSomeConditional] = useState(true);

  const searchParams = new URLSearchParams(router.routeInfo.search);
  const requestId = searchParams.get("request_id");
  console.log(searchParams);

  const detailTicketHandler = (params: { segment: any; group: any }) => {
    const { segment, group } = params;
    router.push(
      {
        pathname: "/detail-ticket",
        state: { segment, group },
      },
      "forward",
      "push",
    );
  };

  const goBack = () => {
    router.goBack();
  };

  const { data } = useQuery({
    queryKey: ["search-tickets"],
    queryFn: getTicketsCharts,
  });

  const { data: offers } = useQuery({
    queryKey: ["offers", requestId],
    queryFn: async () => {
      if (!requestId) return null;

      const response = await getOffers({
        request_id: requestId,
      });

      return response;
    },

    enabled: Boolean(requestId) && someConditional,

    refetchInterval: (query) => {
      if (query.state.data?.status === "Ready") {
        return false; // остановить polling
      }
      return 1000; // опрос каждую секунду
    },

    onSuccess: (response) => {
      if (response?.status === "Ready") {
        setSomeConditional(false);
      }
    },
  });

  console.log(offers);

  return (
    <IonPage>
      <CustomToolbar>
        <IonHeader className="shadow-none rounded-2xl">
          <IonToolbar className="my-5">
            <div className="flex items-center flex-col gap-3">
              <div className="flex justify-between  w-[90%]">
                <IonButtons slot="start">
                  <IonButton onClick={goBack}>
                    <IonIcon icon={arrowBack} className="text-gray-800" />
                  </IonButton>
                </IonButtons>

                <div className="flex w-full justify-between items-center bg-gray-100 rounded-full px-4 py-2">
                  <div>
                    <p className="text-sm font-semibold leading-none">
                      Бишкек — Москва
                    </p>
                    <p className="text-xs text-gray-500">
                      10 января · 1 пассажир · Эконом
                    </p>
                  </div>
                  <IonButton fill="clear">
                    <IonIcon icon={search} />
                  </IonButton>
                </div>
              </div>
              <div className="flex gap-10">
                <div
                  className="hover:bg-[#64A7FF] rounded-lg p-1 hover:text-white font-bold cursor-pointer whitespace-nowrap"
                  onClick={() => setBronTicket(!bronTicket)}
                >
                  <p>от 3800</p>
                  <p>21-января</p>
                </div>
                <div className="hover:bg-[#64A7FF] rounded-lg p-1 hover:text-white font-bold cursor-pointer whitespace-nowrap">
                  {" "}
                  <p>от 3800</p>
                  <p>21-января</p>
                </div>
                <div className="hover:bg-[#64A7FF] rounded-lg p-1 hover:text-white font-bold cursor-pointer whitespace-nowrap">
                  {" "}
                  <p>от 3800</p>
                  <p>21-января</p>
                </div>
              </div>
            </div>
          </IonToolbar>
        </IonHeader>
      </CustomToolbar>
      <IonContent style={{ "--background": "#F0F0F5" }}>
        {offers?.offers?.map((group, i) =>
          group?.offers?.map((offer, j) => {
            const segment = offer?.segments?.find(
              (elem) => elem.dir_number === 1,
            );
            if (!segment) return null;
            const obratno = offer?.segments?.find((el) => el?.dir_number === 2);
            // if(!obratno) return
            console.log(obratno);
            console.log(offer);

            return (
              <IonCard
                key={`${i}-${j}`}
                onClick={() => detailTicketHandler({ segment, group })}
                style={{ borderRadius: "20px" }}
              >
                <IonCardHeader>
                  <IonCardTitle>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="px-2 py-1 text-sm rounded-xl bg-[#845FD9] text-white text-center">
                        Самый оптимальный
                      </div>
                      <div className="px-2 py-1 text-sm rounded-xl bg-[#216DC4] text-white text-center">
                        Самый быстрый
                      </div>
                    </div>
                  </IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <h1>{group.min_price}</h1>

                  <div className="grid grid-cols-2 gap-4">
                    <IonLabel className="bg-gray-100 px-2 py-1 rounded-xl">
                      С багажом 1×{segment.baggage}
                    </IonLabel>
                    <IonLabel className="bg-gray-100 px-2 py-1 rounded-xl">
                      С ручной кладью 1×8кг
                    </IonLabel>
                  </div>

                  {segment?.flights_info?.length > 1 ? (
                    <div className=" flex flex-col gap-5">
                      {segment.flights_info.map((flight, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-2 mt-2 gap-5"
                        >
                          <div className="flex gap-3">
                            <IonImg
                              src={group?.carrier_logo}
                              className="w-5 h-5 object-contain mt-1"
                            />

                            <div className="text-center">
                              <p className="font-semibold text-[18px] leading-none">
                                {flight?.departure_local_time}
                              </p>
                              <p className=" text-[#7B8190]">
                                ({flight?.departure_airport})
                              </p>
                              <p className="text-[#7B8190]">
                                {flight?.departure_city || ""}
                              </p>
                            </div>

                            <div className="text-center text-[18px] mt-1">
                              <IonIcon icon={arrowForward} />
                            </div>

                            <div className="text-center">
                              <p className="font-semibold text-[18px] ">
                                {flight?.arrival_local_time}
                              </p>

                              <p className=" text-[#7B8190]">
                                ({flight?.arrival_airport})
                              </p>

                              <p className=" text-[#7B8190]">
                                {flight?.arrival_city || ""}
                              </p>
                            </div>
                          </div>

                          <div className="text-[12px] text-[#B6BBC6]">
                            <p>{flight?.duration_formated}/в пути</p>

                            <p>{segment?.flights_info?.length - 1} пересадок</p>
                          </div>
                        </div>
                      ))}
                      <div>
                        {obratno && obratno?.flights_info?.length > 1 ? (
                          <div className=" flex flex-col gap-5">
                            <p className="text-[#00AAFF]">Обратно</p>
                            {obratno?.flights_info.map((flight, index) => (
                              <div
                                key={index}
                                className="grid grid-cols-2 mt-2 gap-5"
                              >
                                <div className="flex gap-3">
                                  <IonImg
                                    src={group?.carrier_logo}
                                    className="w-5 h-5 object-contain mt-1"
                                  />

                                  <div className="text-center">
                                    <p className="font-semibold text-[18px] leading-none">
                                      {flight?.departure_local_time}
                                    </p>
                                    <p className=" text-[#7B8190]">
                                      ({flight?.departure_airport})
                                    </p>
                                    <p className="text-[#7B8190]">
                                      {flight?.departure_city || ""}
                                    </p>
                                  </div>

                                  <div className="text-center text-[18px] mt-1">
                                    <IonIcon icon={arrowForward} />
                                  </div>

                                  <div className="text-center">
                                    <p className="font-semibold text-[18px] ">
                                      {flight?.arrival_local_time}
                                    </p>

                                    <p className=" text-[#7B8190]">
                                      ({flight?.arrival_airport})
                                    </p>

                                    <p className=" text-[#7B8190]">
                                      {flight?.arrival_city || ""}
                                    </p>
                                  </div>
                                </div>

                                <div className="text-[12px] text-[#B6BBC6]">
                                  <p>{flight?.duration_formated}/в пути</p>

                                  <p>
                                    {segment?.flights_info?.length - 1}{" "}
                                    пересадок
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="">
                            <p className="text-[#00AAFF]">Обратно</p>

                            {obratno?.flights_info.map((flight, index) => (
                              <div
                                key={index}
                                className="grid grid-cols-2 gap-5 mt-3"
                              >
                                <div className="flex gap-5 items-center justify-center">
                                  <IonImg
                                    src={group?.carrier_logo}
                                    className="w-8 h-8 object-contain mt-1"
                                  />
                                  <div>
                                    <p className="font-semibold">
                                      {flight?.departure_local_time} –{" "}
                                      {flight?.arrival_local_time}
                                    </p>
                                    <div className="flex gap-3 items-center">
                                      <div>
                                        <p>({flight?.departure_airport})</p>
                                        <p className=" text-[#7B8190]">
                                          {flight?.departure_city || ""}
                                        </p>
                                      </div>
                                      {/* <IonIcon icon={arrowForward} /> */}
                                      <div>
                                        <p>({flight?.arrival_airport})</p>
                                        <p className=" text-[#7B8190]">
                                          {flight?.arrival_city || ""}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-[12px] text-[#B6BBC6]">
                                  <p>{flight?.duration_formated}/в пути</p>

                                  {/* <p>{segment?.flights_info?.length - 1} пересадок</p> */}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="">
                      {segment?.flights_info.map((flight, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-2 gap-5 mt-3"
                        >
                          <div className="flex gap-5 items-center justify-center">
                            <IonImg
                              src={group?.carrier_logo}
                              className="w-8 h-8 object-contain mt-1"
                            />
                            <div>
                              <p className="font-semibold">
                                {flight?.departure_local_time} –{" "}
                                {flight?.arrival_local_time}
                              </p>
                              <div className="flex gap-3 items-center">
                                <div>
                                  <p>({flight?.departure_airport})</p>
                                  <p className=" text-[#7B8190]">
                                    {flight?.departure_city || ""}
                                  </p>
                                </div>
                                {/* <IonIcon icon={arrowForward} /> */}
                                <div>
                                  <p>({flight?.arrival_airport})</p>
                                  <p className=" text-[#7B8190]">
                                    {flight?.arrival_city || ""}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-[12px] text-[#B6BBC6]">
                            <p>{flight?.duration_formated}/в пути</p>

                            {/* <p>{segment?.flights_info?.length - 1} пересадок</p> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* </div> */}
                </IonCardContent>
              </IonCard>
            );
          }),
        )}
      </IonContent>

      {bronTicket && (
        <IonModal
          isOpen={bronTicket}
          initialBreakpoint={0.5}
          breakpoints={[0, 0.5, 0.5, 0.75]}
          style={{ "--background": "#F0F0F5" }}
        >
          <div className=" w-[90%] mt-10 flex flex-col gap-2  m-auto">
            <div className="relative">
              <div>
                <span className="absolute left-3  top-1 translate-y-1/2 text-gray-400">
                  <IonIcon src={plane} />
                </span>
                <input
                  type="text"
                  placeholder="Откуда"
                  className="w-full  pl-12 py-4 focus:border-blue-500 outline-none rounded-t-2xl"
                />
              </div>
              <IonFab className="absolute bottom-5 right-3 ">
                <IonFabButton size="small" className="">
                  <IonIcon
                    size="small"
                    className="-m-4"
                    icon={arrowDown}
                  ></IonIcon>
                  <IonIcon
                    size="small"
                    className="-m-4"
                    icon={arrowUp}
                  ></IonIcon>
                </IonFabButton>
              </IonFab>
              <div>
                <span className="absolute left-3 top-[85px] -translate-y-1/2 t">
                  <IonIcon src={planeTo} />
                </span>
                <hr />
                <input
                  type="text"
                  placeholder="Куда"
                  className="w-full pl-12 py-3 focus:border-blue-500 outline-none rounded-b-2xl"
                />
              </div>
            </div>
            <div className="relative grid grid-cols-2 gap-2">
              <div className="w-full">
                <span className="absolute left-3 top-0.5 translate-y-1/2 text-gray-400">
                  <IonIcon icon={calendar} />
                </span>
                <input
                  type="text"
                  placeholder="Дата туда"
                  className="w-full pl-12 py-3.5 outline-none rounded-xl"
                />
              </div>
              <div className="w-full">
                <IonItem button className="rounded-xl ">
                  <IonIcon
                    icon={person}
                    slot="start"
                    size="small"
                    className="text-gray-400 py-2.5"
                  />
                  <IonLabel>эконом</IonLabel>
                </IonItem>
              </div>
            </div>

            <IonButton
              // onClick={navigateToSearch}
              style={{ "--background": "#06A7F2" }}
              className="h-[50px] "
            >
              Обновить поиск
            </IonButton>
          </div>
        </IonModal>
      )}
    </IonPage>
  );
};

export default SearchPage;
