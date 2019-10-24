import React from "react";
import ReactDOM from "react-dom";
import loadable from "@loadable/component";

import { initialiseFirebase } from "./firebase";
import { Logger, waitFor, env } from "./utils";

import Theme from "./modules/base/components/Theme";
import { ThemedLoader } from "./modules/base/components/Loader";

const MIN_DELAY = 1 * 1000;
const MAX_DELAY = 10 * 1000;

(async () => {
  const MOUNT_NODE = document.getElementById("root");

  // Show loading screen
  ReactDOM.render(<ThemedLoader animated />, MOUNT_NODE);

  // Check for valid host
  if (!env.isValidHost()) {
    ReactDOM.render(
      <Theme>
        <h4 style={{ padding: "0 1rem" }}>
          This application is not available on this domain.
        </h4>
      </Theme>,
      MOUNT_NODE
    );
    return;
  }

  // Initialise Firebase
  const loadFirebase = async () => {
    try {
      await initialiseFirebase();
    } catch (error) {
      Logger.error("App Load", "Failed to initialise Firebase", error);
    }
  };
  await waitFor(loadFirebase(), MIN_DELAY, MAX_DELAY);

  // Dynamically load the App
  const App = loadable(() => import("./App"), {
    fallback: <ThemedLoader />
  });

  ReactDOM.render(<App />, MOUNT_NODE);
})();
