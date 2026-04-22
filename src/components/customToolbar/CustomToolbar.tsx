// import { IonToolbar } from "@ionic/react";
// import { FC, ReactNode, useEffect, useState } from "react";
// import { Device } from "@capacitor/device";

// interface ICustomToolbar {
//   children?: ReactNode;
//   className?: string;
//   style?: {
//     [key: string]: any;
//   } | undefined;
// }

// export const IonicHalfToolbar = () => {
//   return <IonToolbar className="min-h-[40px]" />;
// };

// const CustomToolbar: FC<ICustomToolbar> = ({ children,className,style }) => {
//   const [androidVersion, setAndroidVersion] = useState<number | null>(null);
//   const [platform, setPlatform] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getDeviceInfo = async () => {
//       try {
//         const info = await Device.getInfo();

//         setPlatform(info.platform);

//         // Парсим версию только для Android
//         if (info.platform === "android") {
//           const version = parseFloat(info.osVersion) || 0;
//           setAndroidVersion(version);
//         } else {
//           setAndroidVersion(null);
//         }
//       } catch (error) {
//         console.error("Ошибка получения информации устройства:", error);
//         setPlatform("web"); // Предполагаем web при ошибке
//         setAndroidVersion(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getDeviceInfo();
//   }, []);

//   // Пока загружаем данные, можно показать заглушку
//   if (loading) {
//     return <IonToolbar>{children}</IonToolbar>;
//   }

//   // Проверяем версию Android только для Android платформы
//   if (
//     platform === "android" &&
//     androidVersion !== null &&
//     androidVersion <= 12
//   ) {
//     return (
//       <>
//         <IonicHalfToolbar />
//         <IonToolbar className={className} style={style}>{children}</IonToolbar>
//       </>
//     );
//   }

//   // Для web, ios и других платформ, а также Android > 12
//   return <IonToolbar className={className} style={style}>{children}</IonToolbar>;
// };
// export default CustomToolbar;



import { IonToolbar } from "@ionic/react";
import { FC, ReactNode } from "react";

interface ICustomToolbar {
  children?: ReactNode;
  className?: string;
  style?: {
    [key: string]: any;
  };
}

const CustomToolbar: FC<ICustomToolbar> = ({ children, className, style }) => {
  return (
    <IonToolbar
      className={className}
      style={{
        paddingTop: "env(safe-area-inset-top)",
        ...style,
      }}
    >
      {children}
    </IonToolbar>
  );
};

export default CustomToolbar;