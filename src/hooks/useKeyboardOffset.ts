import { useEffect, useState } from "react";
import { Keyboard } from "@capacitor/keyboard";

export function useKeyboardOffset() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    // iOS көбүнчө will*, Android көбүнчө did* берет — экөөнү тең кармайбыз
    const listeners: Array<{ remove: () => void }> = [];

    const setupListeners = async () => {
      const s1 = await Keyboard.addListener("keyboardWillShow", (e) =>
        setHeight(e.keyboardHeight || 0),
      );
      const s2 = await Keyboard.addListener("keyboardDidShow", (e) =>
        setHeight(e.keyboardHeight || 0),
      );

      const h1 = await Keyboard.addListener("keyboardWillHide", () => setHeight(0));
      const h2 = await Keyboard.addListener("keyboardDidHide", () => setHeight(0));

      listeners.push(s1, s2, h1, h2);
    };

    setupListeners();

    return () => {
      listeners.forEach((listener) => listener.remove());
    };
  }, []);

  return height;
}
