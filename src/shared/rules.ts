import { parseToNumber } from "./utils";

export const greaterThanOrEqual = {
  message: "The :attribute field should not be less than the :values",
  rule(val: number, params: [number, string]) {
    return parseToNumber(val) >= parseToNumber(params[0]);
  },
  messageReplace: (message: string, params: [number, string]) =>
    message.replace(":values", params[1] || ""),
};

export const lessThanOrEqual = {
  message: "The :attribute field should not be greater than the :values",
  rule(val: number, params: [number, string]) {
    return parseToNumber(val) <= parseToNumber(params[0]);
  },
  messageReplace: (message: string, params: [number, string]) =>
    message.replace(":values", params[1] || ""),
};
