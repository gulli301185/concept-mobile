import { useState } from "react";
import plane from "./main-img/Vector (1).svg";
import planeTo from "./main-img/Vector (5).svg";
import {
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonTabBar,
  IonTabButton,
  useIonRouter,
} from "@ionic/react";
import {
  arrowDown,
  arrowUp,
  calendar,
  person,
  search,
  ticketOutline,
} from "ionicons/icons";
import Calendar from "../../shared/Calendar";
import ModalDropFrom from "../../shared/ModalDropFrom";
import ModalDropTo from "../../shared/ModalDropTo";
import PassangerModal from "../../shared/PassangerModal";
import Banner from "../banner/Banner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPopularDestination } from "../../constants/getPopularDestination";
import { usePassengerStore } from "../../store/usePassengerStore";
import { useDateStore } from "../../store/useDateStore";
import { useFromCountry } from "../../store/useFromCounty";
import { postSearchTickets } from "../../constants/postSerchTickets";
const Main = () => {
  const [isOpenFrom, setIsOpenFrom] = useState(false);
  const [isOpenTo, setIsOpenTo] = useState(false);
  const [isOpenPassenger, setIsOpenToPassenger] = useState(false);
  const [isOpenCalendar, setIsOpenCalendar] = useState(false);
  const router = useIonRouter();
  const { passengers, cabinClass } = usePassengerStore();
  const { departDate, returnDate } = useDateStore();
  console.log(returnDate);

  const { from, to } = useFromCountry();

  const directions = [
    {
      departure_code: from?.city_code,
      arrival_code: to?.city_code,
      date: departDate ? departDate.toISOString().split("T")[0] : null,
    },
  ];

  if (returnDate) {
    directions.push({
      departure_code: to?.city_code,
      arrival_code: from?.city_code,
      date: returnDate.toISOString().split("T")[0],
    });
  }

  const payload = {
    directions,
    adult_qnt: passengers.adult.count,
    child_qnt: passengers.child.count,
    infant_qnt: passengers.infant.count,
    flight_class: cabinClass.value,
  };

  const { mutate, isPending } = useMutation({
    mutationFn: postSearchTickets,
    onSuccess: (data) => {
      console.log("SUCCESS:", data);
      router.push(
        `/app/search?request_id=${data?.data?.request_id}`,
        "forward",
        "push",
      );
    },
    onError: (err) => {
      console.error("ERROR:", err);
    },
  });

  const totalPassengers =
    passengers.adult.count + passengers.child.count + passengers.infant.count;

  const formatDate = (date: Date | null) =>
    date
      ? date.toLocaleDateString("ru-RU", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : "";

  const { data } = useQuery({
    queryKey: ["popular-destination"],
    queryFn: getPopularDestination,
  });
  console.log(data);

  return (
    <div>
      <Banner from={from?.city} to={to?.city} />
      <div className=" w-[90%] left-1/2 transform -translate-x-1/2  absolute -mt-14 z-50 flex flex-col gap-2 ">
        <div className="relative">
          <div onClick={() => setIsOpenFrom(!isOpenFrom)}>
            <span className="absolute left-3  top-1 translate-y-1/2 text-gray-400">
              <IonIcon src={plane} />
            </span>
            <input
              type="text"
              placeholder="Откуда"
              className="w-full  pl-12 py-4 focus:border-blue-500 outline-none rounded-t-2xl"
              readOnly
              value={from ? `${from.city}, ${from.country}` : ""}
            />
          </div>
          <IonFab className="absolute bottom-5 right-3 ">
            <IonFabButton size="small" className="">
              <IonIcon
                size="small"
                className="-m-4 text-gray-600 font-bold"
                icon={arrowDown}
              ></IonIcon>
              <IonIcon
                size="small"
                className="-m-4 text-gray-600 font-bold"
                icon={arrowUp}
              ></IonIcon>
            </IonFabButton>
          </IonFab>
          <div onClick={() => setIsOpenTo(!isOpenTo)}>
            <span className="absolute left-3 top-[85px] -translate-y-1/2 t">
              <IonIcon src={planeTo} />
            </span>
            <hr />
            <input
              type="text"
              placeholder="Куда"
              className="w-full pl-12 py-3 focus:border-blue-500 outline-none rounded-b-2xl"
              readOnly
              value={to ? `${to.city}, ${to.country}` : ""}
            />
          </div>
        </div>
        <div
          className="relative flex "
          onClick={() => setIsOpenCalendar(!isOpenCalendar)}
        >
          <div className="w-full">
            <span className="absolute left-3 top-0.5 translate-y-1/2 text-gray-400">
              <IonIcon icon={calendar} />
            </span>
            <input
              type="text"
              placeholder="Дата туда"
              readOnly
              value={formatDate(departDate)}
              className="w-full pl-12 py-3.5 outline-none rounded-l-2xl"
            />
          </div>
          <div className="border border-gray-300"></div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Дата обратно"
              readOnly
              value={formatDate(returnDate)}
              className="w-full pl-2 py-3.5 focus:border-blue-500 outline-none rounded-r-2xl"
            />
          </div>
        </div>
        {isOpenCalendar && (
          <Calendar
            isOpenCalendar={isOpenCalendar}
            setIsOpenCalendar={setIsOpenCalendar}
          />
        )}
        <IonItem
          button
          onClick={() => setIsOpenToPassenger(true)}
          className="rounded-2xl"
        >
          <IonIcon
            icon={person}
            slot="start"
            size="small"
            className="text-gray-400"
          />
          <IonLabel>
            {" "}
            <span>
              {totalPassengers} пассажира • {cabinClass.label}
            </span>
          </IonLabel>
        </IonItem>
        {isOpenPassenger && (
          <PassangerModal
            isOpenPassenger={isOpenPassenger}
            setIsOpenToPassenger={setIsOpenToPassenger}
          />
        )}
        {isOpenFrom && (
          <ModalDropFrom
            isOpenFrom={isOpenFrom}
            setIsOpenFrom={setIsOpenFrom}
            data={data}
          />
        )}
        {isOpenTo && (
          <ModalDropTo
            isOpenTo={isOpenTo}
            setIsOpenTo={setIsOpenTo}
            data={data}
          />
        )}
        <button
          className="bg-[#06A7F2] py-3 text-white rounded-2xl mt-3"
          // disabled={!from || !to || !departDate}
          onClick={() => mutate(payload)}
        >
          {isPending ? "Поиск..." : "Найти"}
        </button>
      </div>
    </div>
  );
};

export default Main;
