// src/utils/transformers.js
import { toolMap } from "./toolMap";

export const renderFormattedText = (tool, inputTxt) => {
  if (!inputTxt) return "";
  return toolMap[tool] ? toolMap[tool](inputTxt) : inputTxt;
};
