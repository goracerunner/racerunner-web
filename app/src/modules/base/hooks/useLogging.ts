import { useEffect } from "react";

import { Logger } from "../../../utils";

/**
 * This hook logs an error message with the given parameters
 * if the given error object is not falsy.
 * @param name the name of the component from which the error was thrown
 * @param message the error message
 * @param error the error object
 */
export const useErrorLogging = (name: string, message: string, error: any) => {
  useEffect(() => {
    if (error) Logger.error(name, message, error);
  }, [error]);
};
