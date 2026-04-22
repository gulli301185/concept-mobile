import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "kg.concept.mobile", // com.navisdevs.concept
  appName: "mobile-concept",
  webDir: "dist",
  plugins: {
    Keyboard: {
      resize: "body",
      resizeOnFullScreen: true,
    },
  },
};

export default config;
