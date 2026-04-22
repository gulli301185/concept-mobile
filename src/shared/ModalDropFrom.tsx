import {
  IonModal,
  IonContent,
  IonLabel,
  IonList,
  IonItem,
  IonImg,
  IonInput,
} from "@ionic/react";
import { useMemo, useState } from "react";
import close from "../components/main/main-img/􀅾.svg";
import { useFromCountry } from "../store/useFromCounty";

const ModalDropFrom = ({ isOpenFrom, setIsOpenFrom, data }) => {
  const { setFrom } = useFromCountry();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return [...(data || [])]
      .filter((el) => el.is_popular === true && el.position > 0)
      .sort((a, b) => Number(a.position) - Number(b.position))
      .filter((el) => {
        if (!normalizedSearch) return true;

        return (
          el.city?.toLowerCase().includes(normalizedSearch) ||
          el.country?.toLowerCase().includes(normalizedSearch) ||
          el.city_code?.toLowerCase().includes(normalizedSearch)
        );
      });
  }, [data, searchTerm]);

  return (
    <IonModal
      isOpen={isOpenFrom}
      initialBreakpoint={1}
      breakpoints={[0, 0.25, 0.5, 0.75, 1]}
      style={{ "--border-radius": "28px 28px 0 0" }}
      onDidDismiss={() => setSearchTerm("")}
    >
      <IonContent className="ion-padding ">
        <div className="flex justify-between pt-5">
          <p className="font-bold">Откуда?</p>
          <div
            onClick={() => {
              setIsOpenFrom(false);
              setSearchTerm("");
            }}
            className="bg-slate-200 w-6 h-6 flex justify-center items-center rounded-full"
          >
            <IonImg src={close} />
          </div>
        </div>

        <div className="border-2 border-[#00AAFF] rounded-xl my-8 px-4 py-2">
          <p className="text-[12px] text-[#787878] mb-1">Откуда летим?</p>
          <IonInput
            value={searchTerm}
            onIonInput={(e) => setSearchTerm(e.detail.value || "")}
            placeholder="Пункт отправления"
            className="text-[14px] text-[#787878] [--padding-start:0] [--padding-end:0] min-h-0"
            style={{
              "--highlight-color-focused": "transparent",
              "--highlight-color": "transparent",
            }}
          />
        </div>

        <IonList>
          {filteredData.map((el) => (
            <IonItem
              key={el.id}
              button
              onClick={() => {
                setFrom(el);
                setIsOpenFrom(false);
                setSearchTerm("");
              }}
              lines="none"
              detail={false}
            >
              <IonLabel>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#141414] font-bold">{el.city}</p>
                    <p className="text-[#787878]">
                      {el.city}, {el.country}
                    </p>
                  </div>
                  <div className="text-[16px] font-medium text-[#787878]">
                    {el.city_code}
                  </div>
                </div>
              </IonLabel>
            </IonItem>
          ))}

          {filteredData.length === 0 && (
            <div className="text-center text-[#787878] py-4">
              Ничего не найдено
            </div>
          )}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default ModalDropFrom;
