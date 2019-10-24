import { RaceRegistrationField } from "../../../../types/race";
import { Logger } from "../../../../utils";

/**
 * This function takes in an array of field definitions
 * and checks a value map with each definition.
 *
 * It will return a map containing the keys of any fields
 * that have errors.
 */
export const validateFields = (
  fields: Array<RaceRegistrationField>,
  values: { [key: string]: string }
) => {
  let errors: { [key: string]: string } = {};

  fields.forEach(field => {
    const { required, type, name, validation } = field;

    const value = values[name];
    const setError = (error: string) => (errors[name] = error);

    // Check for null values if the field is required
    if (required && typeof value !== "boolean" && !Boolean(value)) {
      setError(`This cannot be empty.`);
      return;
    }

    switch (type) {
      case "text":
      case "listcustom":
      case "longtext": {
        // Perform validation checks if any.
        if (validation) {
          if (validation.type === "value") {
            if (validation.min && value.length < validation.min) {
              setError(
                `Too short (minimum ${validation.min} character${
                  validation.min === 1 ? "" : "s"
                }).`
              );
              return;
            }
            if (validation.max && value.length > validation.max) {
              setError(
                `Too long (maximum ${validation.max} character${
                  validation.max === 1 ? "" : "s"
                }).`
              );
              return;
            }
          }
          if (validation.type === "email") {
            if (!/^(\w|\.)+@\w+(\.\w+)+$/.test(value)) {
              setError(`Invalid email.`);
              return;
            }
          }
          if (validation.type === "mobile") {
            if (!/^[\d+() ]+$/.test(value)) {
              setError(`Invalid mobile number.`);
              return;
            }
          }
        }
        break;
      }

      case "number": {
        // Check that it is a valid number.
        const number = parseFloat(value);
        if (isNaN(number)) {
          setError(`Invalid number.`);
          return;
        }

        // Do any additional validation checks.
        if (validation) {
          if (validation.type === "value") {
            if (validation.min && number < validation.min) {
              setError(`Number must be above ${validation.min}.`);
              return;
            }
            if (validation.max && number > validation.max) {
              setError(`Number must be below ${validation.min}.`);
              return;
            }
          }
        }
        break;
      }

      case "markdown":
      case "list": {
        // No validation required.
        break;
      }

      case "checkbox":
      case "select": {
        Logger.error(
          "RegistrationForm(validateField)",
          `${type} validation not implemented`
        );
      }
    }
  });

  return errors;
};
