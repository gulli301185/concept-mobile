import {
  IonContent,
  IonHeader,
  IonImg,
  IonPage,
  IonRippleEffect,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import React from "react";
import plane from "../../components/main/main-img/Group.svg";
import FaqList from "../faq/FaqList";

const Help = () => {
  const router = useIonRouter();

  return (
    <IonPage>
      <IonHeader className="shadow-none " style={{ "--background": "#F5F5F5" }}>
        <IonToolbar
          className="shadow-none "
          style={{ "--background": "#F5F5F5" }}
        ></IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="min-h-full bg-[#F5F5F5]">
          <div className="bg-[#F5F5F5] px-5 pb-4">
            <p className="text-2xl font-bold text-black leading-tight">
              Помощь 24/7
            </p>
            <p className="text-[13px] text-[#ADADAD] mt-1 leading-snug">
              Служба поддержки работает круглосуточно,
              <br />
              без перерывов и выходных
            </p>
          </div>

          <div className="px-4 flex flex-col gap-4 pb-32">
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <button
                className="ion-activatable relative w-full flex items-center gap-3 px-4 py-4 text-left"
                onClick={() => {}}
              >
                <IonRippleEffect />
                <IonImg src={plane} />

                <span
                  className="text-[15px] font-medium text-black"
                  onClick={() => router.push("/faq", "forward")}
                >
                  Вопросы по билетам и перелёту
                </span>
                <svg
                  className="ml-auto shrink-0"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="#ADADAD"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="px-4 pt-4 pb-2">
                <p className="text-[15px] font-semibold text-black">
                  Связь с поддержкой
                </p>
              </div>
              <div className="px-4 pb-4">
                <p className="text-[13px] text-[#ADADAD] mb-4">
                  Не нашли ответа на свой вопрос?
                  <br />
                  Свяжитесь с нами
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setContactExpanded(true)}
                    className="ion-activatable relative flex-1 flex items-center justify-center gap-2 bg-gray-100 border border-[#E5E5E5] rounded-xl py-3 text-[14px] font-medium text-black"
                  >
                    <IonRippleEffect />
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="black"
                    >
                      <path
                        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Звонок
                  </button>
                  <button
                    onClick={() => setContactExpanded(true)}
                    className="ion-activatable bg-gray-100 relative flex-1 flex items-center justify-center gap-2 border border-[#E5E5E5] rounded-xl py-3 text-[14px] font-medium text-black"
                  >
                    <IonRippleEffect />
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="black"
                    >
                      <path
                        d="M22 16.5a2 2 0 01-2 2h-2l-4 4v-4H4a2 2 0 01-2-2v-12a2 2 0 012-2h16a2 2 0 012 2v12z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Чат
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Help;
