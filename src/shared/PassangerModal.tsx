import { IonButton, IonHeader, IonModal } from "@ionic/react";
import React from "react";
import { usePassengerStore } from "../store/usePassengerStore";


const PassangerModal = ({ isOpenPassenger, setIsOpenToPassenger }) => {
  const { passengers, increment, decrement, cabinClass, setCabinClass } =
    usePassengerStore();

  const passengerList = [
    { key: "adult", ...passengers.adult },
    { key: "child", ...passengers.child },
    { key: "infant", ...passengers.infant },
  ] as const;

  const classes = [
    { label: "Эконом", value: "E", id: 1 },
    { label: "Комфорт", value: "W", id: 2 },
    { label: "Бизнес", value: "B", id: 3 },
    { label: "Премиум", value: "F", id: 4 },
  ];

  return (
    <IonModal
      isOpen={isOpenPassenger}
      onDidDismiss={() => setIsOpenToPassenger(false)}
      initialBreakpoint={0.8}
      breakpoints={[0, 0.8, 1]}
      style={{ "--background": "#F0F0F5" }}
    >
      <div className="flex flex-col gap-3 mx-5">
        <p className="text-xl font-bold text-center mt-5">Пассажиры</p>

        <div className="p-4 space-y-5 bg-white  rounded-xl">
          {passengerList.map(({ key, label, age, count }) => (
            <div key={key} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{label}</p>
                <span className="text-sm text-[#787878] font-normal">{age}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decrement(key)}
                  className="w-8 h-8 rounded-lg bg-[#F2F2F2] flex items-center justify-center"
                >
                  <span className="text-[32px] leading-none text-[#C2C2C2] translate-y-[-2px]">
                    -
                  </span>
                </button>

                <span className="w-8 text-center text-gray-400 font-semibold">
                  {count}
                </span>
                <button
                  onClick={() => increment(key)}
                  className="w-8 h-8 rounded-lg bg-[#F2F2F2] flex items-center justify-center"
                >
                  <span className="text-[28px] leading-none text-[#6B6B6B] translate-y-[-2px]">
                    +
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 overflow-x-auto whitespace-nowrap no-scrollbar">
          {classes?.map((cls) => (
            <div
              key={cls.id}
              onClick={() => setCabinClass(cls)}
              className={`px-5 py-3 rounded-lg cursor-pointer flex-shrink-0 ${
                cabinClass.value === cls.value
                  ? "border-[#06A7F2] border-2 bg-white"
                  : "bg-white"
              }`}
            >
              {cls.label}
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsOpenToPassenger(false)}
          className="bg-[#06A7F2] py-3 text-white rounded-2xl mt-3"
        >
          Готово
        </button>
      </div>
    </IonModal>
  );
};

export default PassangerModal;
