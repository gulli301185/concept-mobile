import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

import React from "react";
import {
  IonButton,
  IonFooter,
  IonImg,
  IonModal,
  IonToolbar,
} from "@ionic/react";
import close from "../components/main/main-img/􀅾.svg";
import { useDateStore } from "../store/useDateStore";

const Calendar = ({ isOpenCalendar, setIsOpenCalendar }) => {
  const { departDate, returnDate, setDepartDate, setReturnDate } =
    useDateStore();

  return (
    <IonModal
      isOpen={isOpenCalendar}
      initialBreakpoint={1}
      breakpoints={[0, 0.8, 1]}
      className="rounded-t-3xl"
    >
      <div className="w-[90%] m-auto pb-5">
        <div className="flex justify-end gap-20 items-center mb-6">
          <p className="p-3 font-bold ">Выберите даты</p>
          <div
            onClick={() => setIsOpenCalendar(false)}
            className="bg-slate-200 w-6 h-6 flex justify-center items-center  rounded-full"
          >
            <IonImg src={close} />
          </div>
        </div>
        <div
          className="relative flex gap-1 text-[#787878]"
          onClick={() => setIsOpenCalendar(!isOpenCalendar)}
        >
          <div>
            <input
              type="text"
              placeholder="Tуда"
              className="w-full pl-3 py-3 bg-[#F0F0F5] outline-none rounded-xl"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Обратно"
              className="w-full pl-3  py-3 focus:border-blue-500 outline-none rounded-xl bg-[#F0F0F5]"
            />
          </div>
        </div>
      </div>
      <div className="overflow-y-auto max-h-[60vh]">
        <DayPicker
          className={"rdp-vertical"}
          disabled={{ before: new Date() }}
          styles={{
            months: { display: "flex", justifyContent: "center" },
          }}
          mode="range"
          numberOfMonths={2}
          selected={{
            from: departDate ?? undefined,
            to: returnDate ?? undefined,
          }}
          onDayClick={(range) => {
            console.log(range, "range");
          }}
          onSelect={(range) => {
            if (!range) {
              setReturnDate(null);
              setIsOpenCalendar(false);
              return;
            }

            if (range.from && range.to) {
              if (range.from.getTime() === range.to.getTime()) {
                setDepartDate(range.from);
                setReturnDate(null);
                return;
              }

              setDepartDate(range.from);
              setReturnDate(range.to);
              setIsOpenCalendar(false);
            }
          }}
        />
      </div>
      <IonFooter className="p-5">
        <IonToolbar >
          <button
            className="bg-[#06A7F2] py-3  text-white rounded-2xl  w-full "
            onClick={() => setIsOpenCalendar(false)}
          >
            Обратный билет не нужен
          </button>
        </IonToolbar>
      </IonFooter>
    </IonModal>
  );
};

export default Calendar;
