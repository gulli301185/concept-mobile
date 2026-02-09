import { IonButton, IonHeader, IonModal } from "@ionic/react";
import React from "react";
import { usePassengerStore } from "../store/usePassengerStore";

// const PassangerModal = ({ isOpenPassenger, setIsOpenToPassenger }) => {
//   const PASSENGERS = [
//     { label: "Взрослый", age: "(15+)", count: 1 },
//     { label: "Ребенок", age: "(2–12 лет)", count: 0 },
//     { label: "Младенец", age: "(0–2 лет)", count: 0 },
//   ];

//   return (
//     <IonModal
//       isOpen={isOpenPassenger}
//       onDidDismiss={() => setIsOpenToPassenger(false)}
//       breakpoints={[0, 0.8, 1]}
//       initialBreakpoint={0.8}
//       handleBehavior="cycle"
//       className="half-sheet"
//       style={{ "--background": "#F0F0F5" }}
//     >
//       <div className="flex flex-col gap-3">
//         <p className="text-xl font-bold text-center mt-5 ">Пассажиры</p>
//         <div className="p-4 space-y-5 bg-white m-5 rounded-xl ">
//           {PASSENGERS.map(({ label, age, count }) => (
//             <div key={label} className="flex justify-between items-center">
//               <div>
//                 <p className="font-medium">{label}</p>
//                 <span className="text-sm text-gray-400">{age}</span>
//               </div>

//               <div className="flex items-center justify-center gap-3">
//                 <button className="w-8 h-8 border rounded-lg bg-slate-100">
//                   -
//                 </button>
//                 <span className="w-8 text-center">{count}</span>
//                 <button className="w-8 h-8 bg-blue text-white rounded-lg bg-slate-300">
//                   +
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="flex gap-3 mx-5 mb-3">
//           <div className="bg-white px-5 py-3 text-center rounded-lg">
//             Эконом
//           </div>
//           <div className="bg-white px-5 py-3 text-center rounded-lg">
//             Комфорт
//           </div>
//           <div className="bg-white px-5 py-3 text-center rounded-lg">
//             Бизнес
//           </div>
//           <div className="bg-white px-5 py-3 text-center rounded-lg">
//             Премиум
//           </div>
//         </div>
//         <IonButton
//           expand="block"
//           onClick={() => setIsOpenToPassenger(false)}
//           className="mb-20 mx-5"
//           style={{ "--background": "#06A7F2" }}
//         >
//           Готово
//         </IonButton>
//       </div>
//     </IonModal>
//   );
// };

// export default PassangerModal;

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
      <div className="flex flex-col gap-3">
        <p className="text-xl font-bold text-center mt-5">Пассажиры</p>

        <div className="p-4 space-y-5 bg-white m-5 rounded-xl">
          {passengerList.map(({ key, label, age, count }) => (
            <div key={key} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{label}</p>
                <span className="text-sm text-gray-400">{age}</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decrement(key)}
                  className="w-8 h-8 border rounded-lg bg-slate-100"
                >
                  -
                </button>

                <span className="w-8 text-center">{count}</span>

                <button
                  onClick={() => increment(key)}
                  className="w-8 h-8 rounded-lg bg-slate-300"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mx-5">
          {classes?.map((cls) => (
            <div
              key={cls.id}
              onClick={() => setCabinClass(cls)}
              className={`px-5 py-3 rounded-lg cursor-pointer ${
                cabinClass.value === cls.value
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              {cls.label}
            </div>
          ))}
        </div>

        <IonButton
          expand="block"
          onClick={() => setIsOpenToPassenger(false)}
          className="mb-20 mx-5"
          style={{ "--background": "#06A7F2" }}
        >
          Готово
        </IonButton>
      </div>
    </IonModal>
  );
};

export default PassangerModal;
