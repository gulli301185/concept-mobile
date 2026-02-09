import {
  IonModal,
  IonContent,
  IonLabel,
  IonList,
  IonItem,
  IonImg,
  IonInput,
} from "@ionic/react";
import close from "../components/main/main-img/􀅾.svg";
import { useFromCountry } from "../store/useFromCounty";
const ModalDropFrom = ({ isOpenFrom, setIsOpenFrom, data }) => {
  const { setFrom } = useFromCountry();
  return (
    <IonModal
      isOpen={isOpenFrom}
      initialBreakpoint={1}
      breakpoints={[0, 0.25, 0.5, 0.75]}
    >
      <IonContent
        className="ion-padding"
        style={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
      >
        <div className="flex justify-between m-2">
          <p className="font-bold">Откуда?</p>
          <div
            onClick={() => setIsOpenFrom(false)}
            className="bg-slate-200 w-6 h-6 flex justify-center items-center  rounded-full"
          >
            <IonImg src={close} />
          </div>
        </div>
        <IonInput
          placeholder="Откуда летим?"
          className="border-2 border-[#00AAFF] rounded-xl my-8 pl-5"
          style={{ "--padding-start": "16px" }}
        ></IonInput>
        <IonList>
          {data?.slice(0, 20)?.map((el) => {
            return (
              <IonItem
                key={el.id}
                button
                onClick={() => {
                  setFrom(el);
                  setIsOpenFrom(false);
                }}
              >
                <IonLabel>
                  <div className="flex justify-between items-center">
                    <div>
                      <p>{el.city}</p>
                      <p className="text-gray-400">
                        {el.city}, {el.country}
                      </p>
                    </div>
                    <div>{el.city_code}</div>
                  </div>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonModal>
  );
};

export default ModalDropFrom;
