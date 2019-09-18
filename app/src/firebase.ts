import { initializeApp } from "firebase/app";

import { env, Logger } from "./utils";

/**
 * This function initialises Firebase based on the current host.
 */
export const initialiseFirebase = async () => {
  let config = null;
  try {
    // Get config from hosted URL if available
    const response = await fetch("/__/firebase/init.json");
    config = await response.json();
  } catch (error) {
    // If we are on local host, we can retrieve it from environment variables.
    if (window.location.hostname === "localhost") {
      const firebaseJSON = process.env.REACT_APP_FIREBASE_CONFIG || "";
      if (firebaseJSON) {
        config = JSON.parse(firebaseJSON);
        // For debugging on localhost
        Logger.debug("Util: initialiseFirebase", "Firebase config", config);
      }
    }
  }

  if (config) {
    // Initialise Firebase if we successfully retrieved the config
    initializeApp({
      ...config,
      authDomain: env.isDevelopment()
        ? "goracerunner-dev.web.app"
        : "goracerunner.web.app"
    });
  } else {
    Logger.error(
      "Firebase: initialiseFirebase",
      "Failed to retrieve Firebase configuration"
    );
  }
};
