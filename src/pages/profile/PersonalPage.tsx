import {
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { arrowBack, documentTextOutline, trashOutline } from "ionicons/icons";
import { getPersonalInfoAsync } from "../../constants/getPersonalInfo";
import { postLogoutAsync } from "../../constants/postLogout";
import { toast } from "react-toastify";
import { deleteAccountAsync } from "../../constants/deleteAccount";
import { useState } from "react";
import ProfileDataPage from "./ProfileDataPage";

const PersonalPage = () => {
  const router = useIonRouter();
  const queryClient = useQueryClient();
  const [dataProfile, setDataProfile] = useState(false);

  const { data } = useQuery({
    queryKey: ["personal-info"],
    queryFn: getPersonalInfoAsync,
  });

  const logoutMutation = useMutation({
    mutationFn: postLogoutAsync,
    onSuccess: (datas) => {
      localStorage.removeItem("token");
      localStorage.removeItem("register_email");
      queryClient.clear();
      toast.success(datas?.message || "Вы вышли из аккаунта");
      router.push("/", "root", "push");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Ошибка при выходе из аккаунта";

      toast.error(message);
    },
  });
  function logoutHandler() {
    logoutMutation.mutate();
  }

  const deleteAccountMutation = useMutation({
    mutationFn: deleteAccountAsync,
    onSuccess: (datas) => {
      localStorage.removeItem("token");
      localStorage.removeItem("register_email");
      queryClient.clear();
      toast.success(datas?.message || "Вы успешно удалили аккаунт!");
      router.push("/", "root", "push");
    },
    onError: (error) => {
      const message =
        error?.response?.data?.detail ||
        error?.response?.data?.message ||
        "Ошибка при удалении аккаунта";

      toast.error(message);
    },
  });
  const deleteAccountHandler = () => {
    deleteAccountMutation.mutate();
  };

  return (
    <>
      {dataProfile ? (
        <ProfileDataPage />
      ) : (
        <IonPage>
          <IonHeader
            className=" shadow-md"
            style={{ "--background": "#d1d5db" }}
          >
            <IonToolbar className="p-5 items-center gap-3 text-black shadow-none">
              <div className="flex justify-between items-center w-[60%]">
                <button
                  type="button"
                  onClick={() => router.goBack()}
                  className="w-9 h-9 flex items-center justify-center rounded-full"
                >
                  <IonIcon icon={arrowBack} className=" text-xl" />
                </button>

                <h1 className="text-[18px] font-semibold">Личные данные</h1>
              </div>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <div className="px-4 pt-4 pb-28 space-y-4">
              <div className="rounded-2xl bg-gray-100 overflow-hidden border border-gray-300">
                <div className="p-4 border-b border-r border-gray-300  grid grid-cols-[30%_70%]">
                  <p className="text-[12px] text-[#8E95A4] mb-2">Имя</p>
                  <p className="text-[15px] text-gray-600 font-medium">Ernis</p>
                </div>

                <div className="p-4 border-b border-gray-300  grid grid-cols-[30%_70%]">
                  <p className="text-[12px] text-[#8E95A4] mb-2">Фамилия</p>
                  <p className="text-[15px] text-gray-600 font-medium">
                    Ernisov
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-gray-100 overflow-hidden border border-gray-300">
                <div className="p-4 border-r border-b border-gray-300 grid grid-cols-[30%_70%]">
                  <p className="text-[12px] text-[#8E95A4] ">Эл. почта</p>
                  <p className="text-[15px] text-gray-600 font-medium truncate">
                    {data?.email}
                  </p>
                </div>

                <div className="p-4  grid grid-cols-[30%_70%]">
                  <p className="text-[12px] text-[#8E95A4] ">Телефон</p>
                  <p className="text-[15px] text-gray-600 font-medium">
                    {data?.phone}
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-gray-100 overflow-hidden border border-gray-300">
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-4 py-4 border-b border-gray-400 text-left"
                >
                  <div className="w-5 h-5 flex items-center justify-center text-gray-800">
                    <IonIcon
                      icon={documentTextOutline}
                      className="text-[18px]"
                    />
                  </div>
                  <span
                    className="text-[15px] text-gray-600"
                    onClick={logoutHandler}
                  >
                    Выйти из аккаунта
                  </span>
                </button>

                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-4 py-4 text-left"
                  onClick={deleteAccountHandler}
                >
                  <div className="w-5 h-5 flex items-center justify-center text-red-500">
                    <IonIcon icon={trashOutline} className="text-[18px]" />
                  </div>
                  <span className="text-[15px] text-red-500">
                    Удалить аккаунт
                  </span>
                </button>
              </div>
            </div>
          </IonContent>
        </IonPage>
      )}
    </>
  );
};

export default PersonalPage;
