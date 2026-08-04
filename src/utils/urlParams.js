// src/utils/urlParams.js
export function parseShareParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    text: params.get("t") || "",
    style: params.get("s") || "",
    combine: params.get("c") || "",
  };
}
