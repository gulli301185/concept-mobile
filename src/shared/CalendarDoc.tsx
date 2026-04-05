import {
  IonModal,
  IonContent,
  IonButton,
  IonFooter,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useDocumentStore } from "../store/useDocumentStore";

const CalendarDoc = () => {
  const {
    formData,
    isOpenCalendarDoc,
    calendarField,
    setField,
    setIsOpenCalendarDoc,
    birthdate,
  } = useDocumentStore();

  const currentDate =
    calendarField === "birthDate"
      ? formData.birthDate
      : calendarField === "expiryDate"
        ? formData.expiryDate
        : null;

  const [tempDate, setTempDate] = useState<Date | null>(currentDate);

  useEffect(() => {
    setTempDate(currentDate);
  }, [currentDate, isOpenCalendarDoc]);

  const handleConfirm = () => {
    if (calendarField && tempDate) {
      setField(calendarField, tempDate);
    }
    setIsOpenCalendarDoc(false);
  };

  return (
    <IonModal
      isOpen={isOpenCalendarDoc}
      onDidDismiss={() => setIsOpenCalendarDoc(false)}
      initialBreakpoint={0.6}
      breakpoints={[0, 0.6, 1]}
    >
      <IonContent className="ion-padding">
        <div className="overflow-y-auto max-h-[70vh] bg-white rounded-xl p-3">
          <DayPicker
            mode="single"
            selected={tempDate ?? undefined}
            onSelect={(date) => {
              if (date) setTempDate(date);
            }}
          />
        </div>
      </IonContent>

      <IonFooter>
        {/* <IonToolbar> */}
        <IonButton
          expand="block"
          onClick={handleConfirm}
          style={{ "--background": "#06A7F2" } as React.CSSProperties}
          className="text-black bg-slate-500"
        >
          Готово
        </IonButton>
        {/* </IonToolbar> */}
      </IonFooter>
    </IonModal>
  );
};

export default CalendarDoc;
