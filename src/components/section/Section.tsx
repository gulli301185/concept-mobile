import React from "react";
import { IonIcon, IonInput, IonItem, IonList } from "@ionic/react";
import { lockClosed } from "ionicons/icons";
function Section() {
  return (
    <IonList>
      <IonItem>
        <IonInput
          labelPlacement="stacked"
          placeholder="Откуда"
          fill="solid"
          className="border-b-2 border-black focus:border-blue-500"
        >
          <IonIcon slot="start" icon={lockClosed} aria-hidden="true" />
        </IonInput>
      </IonItem>
      <IonItem>
        <IonInput labelPlacement="stacked" placeholder="Откуда" fill="solid">
          <IonIcon slot="start" icon={lockClosed} aria-hidden="true"></IonIcon>
        </IonInput>
      </IonItem>
    </IonList>
  );
}
export default Section;
