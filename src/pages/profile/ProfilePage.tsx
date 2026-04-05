import { IonContent, IonHeader, IonPage, IonToolbar, useIonRouter } from "@ionic/react";
import PersonalData from "./PersonalData";
import { useQuery } from "@tanstack/react-query";
import { getDocInfoUserAsync } from "../../constants/getDocInfoUser";

export default function ProfilePage() {
  const router = useIonRouter();
  const token = localStorage.getItem("token");
  console.log(token);

  const { data: docInfoUser } = useQuery({
    queryKey: ["doc-info-user"],
    queryFn: getDocInfoUserAsync,
  });

  return (
    <IonPage>
         <IonHeader className="shadow-none">
        <IonToolbar className="shadow-none" style={{"--background":"#f3f4f6"}}></IonToolbar>
      </IonHeader>
      {!token ? (
        <IonContent fullscreen>
          <div className="min-h-full bg-gray-100 px-4 ">
            <div className="rounded-2xl  pb-5">
              <h2 className="text-black text-2xl font-semibold">
                Войдите в профиль
              </h2>
              <p className="text-gray-400 pb-5 text-base mt-2 leading-5">
                Чтобы пользоваться всеми возможностями, войдите в свой аккаунт.
              </p>

              <button
                onClick={() => router.push("/login", "forward")}
                className="mt-4 w-full h-12 rounded-xl bg-[#1e88ff] text-white font-semibold active:scale-[0.99]"
              >
                Войти
              </button>
            </div>

            <button
              className="w-full rounded-2xl  bg-white px-4 h-12 flex items-center justify-between"
              onClick={() => console.log("settings")}
            >
              <span className="text-black">Настройки</span>
              <span className="text-black text-xl">›</span>
            </button>
          </div>
        </IonContent>
      ) : (
        <PersonalData docInfoUser={docInfoUser} />
      )}
    </IonPage>
  );
}
