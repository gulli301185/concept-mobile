// import {
//   IonButton,
//   IonContent,
//   IonIcon,
//   IonInputOtp,
//   IonPage,
//   useIonRouter,
//   IonSpinner,
// } from "@ionic/react";
// import { chevronBack } from "ionicons/icons";
// import React, { useState } from "react";
// import CustomToolbar from "../../components/customToolbar/CustomToolbar";
// import { useMutation } from "@tanstack/react-query";
// import { confirmCodeAsync } from "../../constants/postConfirmCode";
// import { useLocation } from "react-router-dom";
// import { toast } from "react-toastify";

// const ConfirmCode = () => {
//   const router = useIonRouter();
//   const location = useLocation();
//   const email = location.state?.email;
// console.log(location);

//   const [code, setCode] = useState("");
// console.log(email);

//   const confirmMutation = useMutation({
//     mutationFn: confirmCodeAsync,
//     onSuccess: (data) => {
//       console.log(data);
      
//       toast.success(data?.message || "Код подтвержден");
//       router.push("/new-password", "forward", "push");
//     },
//     onError: (error) => {
//       const data = error?.response?.data;
//       toast.error(data?.message || "Ошибка подтверждения");
//     },
//   });

//   const handleConfirmCode = () => {
//     if (!code || code.length !== 6) {
//       toast.error("Введите 6-значный код");
//       return;
//     }

//     confirmMutation.mutate({
//       email,
//       code,
//     });
//   };

//   const backToPassword = () => {
//     router.goBack();
//   };

//   return (
//     <IonPage>
//       <CustomToolbar>
//         <div className="p-5 pt-10">
//           <div onClick={backToPassword}>
//             <IonIcon icon={chevronBack} size="large" />
//           </div>
//         </div>
//       </CustomToolbar>

//       <IonContent>
//         <div className="w-[90%] m-auto">
//           <div className="space-y-5">
//             <p className="text-2xl font-bold">Подтверждение кода</p>

//             <p className="text-[#787878]">
//               Введите код, который мы прислали <br />
//               на почту
//               <span className="font-bold text-[#141414]">
//                 {" "}
//                 {email}
//               </span>
//             </p>

//             <IonInputOtp
//               length={6}
//               value={code}
//               onIonInput={(e) => setCode(e.detail.value)}
//             />
//           </div>

//           <IonButton
//             className="w-full mt-10"
//             style={{ "--background": "#06A7F2" }}
//             onClick={handleConfirmCode}
//             disabled={confirmMutation.isPending}
//           >
//             {confirmMutation.isPending ? (
//               <IonSpinner name="crescent" />
//             ) : (
//               "Подтвердить код"
//             )}
//           </IonButton>
//         </div>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default ConfirmCode;