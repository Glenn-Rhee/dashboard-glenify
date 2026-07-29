import { ChangeEvent } from "react";

export function getNumbersOnly(
  e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
) {
  let onlyNumbers = e.target.value.replace(/[^0-9]/g, "");

  if (onlyNumbers.length > 1 && onlyNumbers.startsWith("0")) {
    onlyNumbers = onlyNumbers.replace(/^0+/, "") || "0";
  }

  return onlyNumbers === "" ? undefined : parseInt(onlyNumbers);
}
