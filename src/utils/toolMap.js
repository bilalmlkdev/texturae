// src/utils/toolMap.js

//  ENCODING / DECODING
// Modern base64 using TextEncoder/TextDecoder (replaces deprecated escape/unescape)
export const base64EncodeMap = (text) => {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  const binary = String.fromCharCode(...bytes);
  return btoa(binary);
};
export const base64DecodeMap = (text) => {
  try {
    const binary = atob(text);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decoder = new TextDecoder();
    return decoder.decode(bytes);
  } catch {
    return "Invalid Base64";
  }
};

export const urlEncodeMap = (text) => encodeURIComponent(text);
export const urlDecodeMap = (text) => {
  try {
    return decodeURIComponent(text);
  } catch {
    return "Invalid URL encoding";
  }
};
export const hexEncodeMap = (text) =>
  text
    .split("")
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, "0"))
    .join(" ");
export const hexDecodeMap = (text) => {
  try {
    const parts = text.trim().split(/\s+/);
    return parts
      .map((h) => {
        const code = parseInt(h, 16);
        if (isNaN(code)) throw new Error("Invalid hex");
        return String.fromCharCode(code);
      })
      .join("");
  } catch {
    return "Invalid hex";
  }
};
export const binaryEncodeMap = (text) =>
  text
    .split("")
    .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
    .join(" ");
export const binaryDecodeMap = (text) => {
  try {
    const parts = text.trim().split(/\s+/);
    return parts
      .map((b) => {
        const code = parseInt(b, 2);
        if (isNaN(code)) throw new Error("Invalid binary");
        return String.fromCharCode(code);
      })
      .join("");
  } catch {
    return "Invalid binary";
  }
};
export const rot13Map = (text) =>
  text.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
export const caesarShift = (text, shift = 3) =>
  text.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(
      ((c.charCodeAt(0) - base + shift + 26) % 26) + base,
    );
  });
export const caesarMap = (text) => caesarShift(text, 3);

const MORSE = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  " ": "/",
};
export const morseEncodeMap = (text) =>
  text
    .toLowerCase()
    .split("")
    .map((c) => MORSE[c] ?? c)
    .join(" ");

//  DEV CASE CONVERSION
const splitWords = (text) =>
  text
    .replace(/([a-z])([A-Z])/g, "$1 $2") // camelCase boundary
    .replace(/[_-]+/g, " ") // snake/kebab boundary
    .trim()
    .split(/\s+/)
    .filter(Boolean);

export const camelCaseMap = (text) => {
  const words = splitWords(text).map((w) => w.toLowerCase());
  return words
    .map((w, i) => (i === 0 ? w : w[0].toUpperCase() + w.slice(1)))
    .join("");
};
export const pascalCaseMap = (text) =>
  splitWords(text)
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join("");
export const snakeCaseMap = (text) =>
  splitWords(text)
    .map((w) => w.toLowerCase())
    .join("_");
export const kebabCaseMap = (text) =>
  splitWords(text)
    .map((w) => w.toLowerCase())
    .join("-");
export const constantCaseMap = (text) =>
  splitWords(text)
    .map((w) => w.toUpperCase())
    .join("_");

//  NOVELTY (original)
const ZALGO_UP = [
  "\u030d",
  "\u030e",
  "\u0304",
  "\u0305",
  "\u033f",
  "\u0311",
  "\u0306",
  "\u0310",
  "\u0352",
  "\u0357",
];
const ZALGO_MID = ["\u0334", "\u0335", "\u0336", "\u0337", "\u0338"];
const ZALGO_DOWN = [
  "\u0316",
  "\u0317",
  "\u0318",
  "\u0319",
  "\u031c",
  "\u031d",
  "\u031e",
  "\u031f",
  "\u0320",
  "\u0324",
];
const randPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const zalgoMap = (text, intensity = 3) =>
  text
    .split("")
    .map((c) => {
      if (c === " ") return c;
      let out = c;
      for (let i = 0; i < intensity; i++) out += randPick(ZALGO_UP);
      for (let i = 0; i < intensity; i++) out += randPick(ZALGO_DOWN);
      if (Math.random() > 0.7) out += randPick(ZALGO_MID);
      return out;
    })
    .join("");

export const spongebobCaseMap = (text) =>
  text
    .split("")
    .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
    .join("");

const NATO = {
  a: "Alpha",
  b: "Bravo",
  c: "Charlie",
  d: "Delta",
  e: "Echo",
  f: "Foxtrot",
  g: "Golf",
  h: "Hotel",
  i: "India",
  j: "Juliett",
  k: "Kilo",
  l: "Lima",
  m: "Mike",
  n: "November",
  o: "Oscar",
  p: "Papa",
  q: "Quebec",
  r: "Romeo",
  s: "Sierra",
  t: "Tango",
  u: "Uniform",
  v: "Victor",
  w: "Whiskey",
  x: "X-ray",
  y: "Yankee",
  z: "Zulu",
};
export const natoMap = (text) =>
  text
    .toLowerCase()
    .split("")
    .map((c) => NATO[c] || (c === " " ? "/" : c))
    .join(" ");

const CIRCLED = {
  a: "ⓐ",
  b: "ⓑ",
  c: "ⓒ",
  d: "ⓓ",
  e: "ⓔ",
  f: "ⓕ",
  g: "ⓖ",
  h: "ⓗ",
  i: "ⓘ",
  j: "ⓙ",
  k: "ⓚ",
  l: "ⓛ",
  m: "ⓜ",
  n: "ⓝ",
  o: "ⓞ",
  p: "ⓟ",
  q: "ⓠ",
  r: "ⓡ",
  s: "ⓢ",
  t: "ⓣ",
  u: "ⓤ",
  v: "ⓥ",
  w: "ⓦ",
  x: "ⓧ",
  y: "ⓨ",
  z: "ⓩ",
};
export const circledMap = (text) =>
  text
    .toLowerCase()
    .split("")
    .map((c) => CIRCLED[c] || c)
    .join("");

const UPSIDE_DOWN = {
  a: "ɐ",
  b: "q",
  c: "ɔ",
  d: "p",
  e: "ǝ",
  f: "ɟ",
  g: "ƃ",
  h: "ɥ",
  i: "ᴉ",
  j: "ɾ",
  k: "ʞ",
  l: "l",
  m: "ɯ",
  n: "u",
  o: "o",
  p: "d",
  q: "b",
  r: "ɹ",
  s: "s",
  t: "ʇ",
  u: "n",
  v: "ʌ",
  w: "ʍ",
  x: "x",
  y: "ʎ",
  z: "z",
  "?": "¿",
  "!": "¡",
  ".": "˙",
  ",": "'",
};
export const upsideDownMap = (text) =>
  text
    .toLowerCase()
    .split("")
    .reverse()
    .map((c) => UPSIDE_DOWN[c] || c)
    .join("");

// ══════════════════════════════════════════════════════════════
// NEW: 50+ additional transformations
// ══════════════════════════════════════════════════════════════

//  shared helpers for unicode math alphabets
const buildMathAlphabet = (
  upperBase,
  lowerBase,
  digitBase,
  exceptions = {},
) => {
  const map = {};
  for (let i = 0; i < 26; i++) {
    const U = String.fromCharCode(65 + i);
    const L = String.fromCharCode(97 + i);
    map[U] = exceptions[U] || String.fromCodePoint(upperBase + i);
    map[L] = exceptions[L] || String.fromCodePoint(lowerBase + i);
  }
  if (digitBase !== null) {
    for (let i = 0; i < 10; i++) {
      map[String(i)] = String.fromCodePoint(digitBase + i);
    }
  }
  return map;
};
const applyCharMap = (map, text) =>
  text
    .split("")
    .map((c) => map[c] ?? c)
    .join("");

//  UNICODE STYLES
const MATH_BOLD = buildMathAlphabet(0x1d400, 0x1d41a, 0x1d7ce);
export const boldUnicodeMap = (text) => applyCharMap(MATH_BOLD, text);

const MATH_ITALIC = buildMathAlphabet(0x1d434, 0x1d44e, null, {
  h: "\u210e",
});
export const italicUnicodeMap = (text) => applyCharMap(MATH_ITALIC, text);

const MATH_SCRIPT = buildMathAlphabet(0x1d49c, 0x1d4b6, null, {
  B: "\u212c",
  E: "\u2130",
  F: "\u2131",
  H: "\u210b",
  I: "\u2110",
  L: "\u2112",
  M: "\u2133",
  R: "\u211b",
  e: "\u212f",
  g: "\u210a",
  o: "\u2134",
});
export const scriptUnicodeMap = (text) => applyCharMap(MATH_SCRIPT, text);

const MATH_FRAKTUR = buildMathAlphabet(0x1d504, 0x1d51e, null, {
  C: "\u212d",
  H: "\u210c",
  I: "\u2111",
  R: "\u211c",
  Z: "\u2128",
});
export const frakturUnicodeMap = (text) => applyCharMap(MATH_FRAKTUR, text);

const MATH_DOUBLE_STRUCK = buildMathAlphabet(0x1d538, 0x1d552, 0x1d7d8, {
  C: "\u2102",
  H: "\u210d",
  N: "\u2115",
  P: "\u2119",
  Q: "\u211a",
  R: "\u211d",
  Z: "\u2124",
});
export const doubleStruckMap = (text) => applyCharMap(MATH_DOUBLE_STRUCK, text);

const SMALL_CAPS = {
  a: "ᴀ",
  b: "ʙ",
  c: "ᴄ",
  d: "ᴅ",
  e: "ᴇ",
  f: "ꜰ",
  g: "ɢ",
  h: "ʜ",
  i: "ɪ",
  j: "ᴊ",
  k: "ᴋ",
  l: "ʟ",
  m: "ᴍ",
  n: "ɴ",
  o: "ᴏ",
  p: "ᴘ",
  q: "ǫ",
  r: "ʀ",
  s: "s",
  t: "ᴛ",
  u: "ᴜ",
  v: "ᴠ",
  w: "ᴡ",
  x: "x",
  y: "ʏ",
  z: "ᴢ",
};
export const smallCapsMap = (text) =>
  text
    .toLowerCase()
    .split("")
    .map((c) => SMALL_CAPS[c] || c)
    .join("");

const SUPERSCRIPT = {
  0: "⁰",
  1: "¹",
  2: "²",
  3: "³",
  4: "⁴",
  5: "⁵",
  6: "⁶",
  7: "⁷",
  8: "⁸",
  9: "⁹",
  a: "ᵃ",
  b: "ᵇ",
  c: "ᶜ",
  d: "ᵈ",
  e: "ᵉ",
  f: "ᶠ",
  g: "ᵍ",
  h: "ʰ",
  i: "ⁱ",
  j: "ʲ",
  k: "ᵏ",
  l: "ˡ",
  m: "ᵐ",
  n: "ⁿ",
  o: "ᵒ",
  p: "ᵖ",
  r: "ʳ",
  s: "ˢ",
  t: "ᵗ",
  u: "ᵘ",
  v: "ᵛ",
  w: "ʷ",
  x: "ˣ",
  y: "ʸ",
  z: "ᶻ",
  "+": "⁺",
  "-": "⁻",
  "=": "⁼",
  "(": "⁽",
  ")": "⁾",
};
export const superscriptMap = (text) =>
  text
    .toLowerCase()
    .split("")
    .map((c) => SUPERSCRIPT[c] || c)
    .join("");

const SUBSCRIPT = {
  0: "₀",
  1: "₁",
  2: "₂",
  3: "₃",
  4: "₄",
  5: "₅",
  6: "₆",
  7: "₇",
  8: "₈",
  9: "₉",
  a: "ₐ",
  e: "ₑ",
  h: "ₕ",
  i: "ᵢ",
  j: "ⱼ",
  k: "ₖ",
  l: "ₗ",
  m: "ₘ",
  n: "ₙ",
  o: "ₒ",
  p: "ₚ",
  r: "ᵣ",
  s: "ₛ",
  t: "ₜ",
  u: "ᵤ",
  v: "ᵥ",
  x: "ₓ",
  "+": "₊",
  "-": "₋",
  "=": "₌",
  "(": "₍",
  ")": "₎",
};
export const subscriptMap = (text) =>
  text
    .toLowerCase()
    .split("")
    .map((c) => SUBSCRIPT[c] || c)
    .join("");

export const squaredMap = (text) =>
  text
    .toUpperCase()
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 65 && code <= 90)
        return String.fromCodePoint(0x1f130 + (code - 65));
      return c;
    })
    .join("");

export const fullwidthMap = (text) =>
  text
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code === 32) return "\u3000";
      if (code >= 33 && code <= 126)
        return String.fromCodePoint(0xff00 + (code - 0x20));
      return c;
    })
    .join("");

export const vaporwaveMap = (text) =>
  text
    .split("")
    .map((c) => fullwidthMap(c))
    .join(" ");

//  TEXT MANIPULATION
export const reverseTextMap = (text) => text.split("").reverse().join("");
export const reverseWordsMap = (text) => text.split(" ").reverse().join(" ");
export const titleCaseMap = (text) =>
  text.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
export const sentenceCaseMap = (text) => {
  const lower = text.toLowerCase();
  return lower.replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
};
export const invertCaseMap = (text) =>
  text
    .split("")
    .map((c) => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
    .join("");
export const randomCaseMap = (text) =>
  text
    .split("")
    .map((c) => (Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()))
    .join("");
export const removeSpacesMap = (text) => text.replace(/\s+/g, "");
export const removeVowelsMap = (text) => text.replace(/[aeiouAEIOU]/g, "");
export const onlyVowelsMap = (text) => text.replace(/[^aeiouAEIOU\s]/g, "");
export const onlyConsonantsMap = (text) =>
  text
    .split("")
    .filter((c) => /[a-zA-Z\s]/.test(c) && !/[aeiouAEIOU]/.test(c))
    .join("");
export const removeDuplicateLettersMap = (text) => {
  const seen = new Set();
  return text
    .split("")
    .filter((c) => {
      if (c === " ") return true;
      const lower = c.toLowerCase();
      if (seen.has(lower)) return false;
      seen.add(lower);
      return true;
    })
    .join("");
};
export const duplicateEachLetterMap = (text) =>
  text
    .split("")
    .map((c) => c + c)
    .join("");
export const repeatTextMap = (text) => text + text;
export const shuffleWordsMap = (text) => {
  const words = text.split(" ");
  for (let i = words.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [words[i], words[j]] = [words[j], words[i]];
  }
  return words.join(" ");
};
export const sortWordsAlphabeticallyMap = (text) =>
  text
    .split(" ")
    .sort((a, b) => a.localeCompare(b))
    .join(" ");
export const sortLettersInWordMap = (text) =>
  text
    .split(" ")
    .map((w) =>
      w
        .split("")
        .sort((a, b) => a.localeCompare(b))
        .join(""),
    )
    .join(" ");
export const removePunctuationMap = (text) =>
  text.replace(/[.,/#!$%^&*;:{}=\-_`~()?'"]/g, "");
export const removeNumbersMap = (text) => text.replace(/[0-9]/g, "");
export const onlyNumbersMap = (text) => text.replace(/[^0-9\s]/g, "");
export const capitalizeFirstLetterMap = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1);
export const alternateWordsCaseMap = (text) =>
  text
    .split(" ")
    .map((w, i) => (i % 2 === 0 ? w.toUpperCase() : w.toLowerCase()))
    .join(" ");

//  FUN & NOVELTY
const LEET = {
  a: "4",
  e: "3",
  i: "1",
  o: "0",
  s: "5",
  t: "7",
  b: "8",
  g: "9",
  l: "1",
};
export const leetSpeakMap = (text) =>
  text
    .split("")
    .map((c) => LEET[c.toLowerCase()] || c)
    .join("");

export const pigLatinMap = (text) =>
  text
    .split(" ")
    .map((word) => {
      if (!word) return word;
      const match = word.match(/^[^aeiouAEIOU]+/);
      if (!match) return word + "way";
      const cluster = match[0];
      return word.slice(cluster.length) + cluster + "ay";
    })
    .join(" ");

export const clapCaseMap = (text) => text.trim().split(/\s+/).join(" 👏 ");
export const starWordsMap = (text) => text.trim().split(/\s+/).join(" ⭐ ");
export const dotCharsMap = (text) => text.split("").join("·");
export const spacedTextMap = (text) => text.split("").join(" ");

const KEYBOARD_ROWS = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
export const keyboardShiftMap = (text) =>
  text
    .split("")
    .map((ch) => {
      const lower = ch.toLowerCase();
      for (const row of KEYBOARD_ROWS) {
        const idx = row.indexOf(lower);
        if (idx !== -1) {
          const nextChar = row[(idx + 1) % row.length];
          return ch === lower ? nextChar : nextChar.toUpperCase();
        }
      }
      return ch;
    })
    .join("");

//  CIPHERS & CODES
export const atbashMap = (text) =>
  text.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= "Z" ? 65 : 97;
    return String.fromCharCode(base + (25 - (c.charCodeAt(0) - base)));
  });

export const rot47Map = (text) =>
  text.replace(/[!-~]/g, (c) => {
    const code = c.charCodeAt(0);
    return String.fromCharCode(33 + ((code + 14) % 94));
  });

export const a1z26EncodeMap = (text) =>
  text
    .toLowerCase()
    .split("")
    .map((c) => {
      if (c === " ") return "/";
      const code = c.charCodeAt(0) - 96;
      return code >= 1 && code <= 26 ? code : c;
    })
    .join("-");

export const a1z26DecodeMap = (text) =>
  text
    .split("-")
    .map((token) => {
      if (token === "/") return " ";
      const num = parseInt(token, 10);
      if (!isNaN(num) && num >= 1 && num <= 26)
        return String.fromCharCode(96 + num);
      return token;
    })
    .join("");

const BACON = {};
(() => {
  const alphabet = "abcdefghiklmnopqrstuvwxyz"; // classic 24-letter bacon (i/j, u/v merged)
  for (let i = 0; i < alphabet.length; i++) {
    const bin = i.toString(2).padStart(5, "0");
    BACON[alphabet[i]] = bin
      .split("")
      .map((b) => (b === "0" ? "A" : "B"))
      .join("");
  }
})();
export const baconEncodeMap = (text) =>
  text
    .toLowerCase()
    .split("")
    .map((c) => {
      if (c === "j") c = "i";
      if (c === "v") c = "u";
      return BACON[c] || (c === " " ? " " : c);
    })
    .join(" ");

const TAP_GRID = ["abcde", "fghik", "lmnop", "qrstu", "vwxyz"]; // j merged with i
export const tapCodeMap = (text) =>
  text
    .toLowerCase()
    .split("")
    .map((c) => {
      if (c === "j") c = "i";
      if (c === " ") return "/";
      for (let r = 0; r < 5; r++) {
        const idx = TAP_GRID[r].indexOf(c);
        if (idx !== -1) return `${r + 1}.${idx + 1}`;
      }
      return c;
    })
    .join(" ");

export const charCodesEncodeMap = (text) =>
  text
    .split("")
    .map((c) => c.charCodeAt(0))
    .join(" ");
export const charCodesDecodeMap = (text) => {
  try {
    const parts = text.trim().split(/\s+/);
    return parts
      .map((n) => {
        const code = parseInt(n, 10);
        if (isNaN(code)) throw new Error("Invalid char code");
        return String.fromCharCode(code);
      })
      .join("");
  } catch {
    return "Invalid char codes";
  }
};

// Fixed run-length decode: always emit count+char, even for single chars (count=1)
export const runLengthEncodeMap = (text) => {
  let result = "";
  let i = 0;
  while (i < text.length) {
    let count = 1;
    while (i + count < text.length && text[i + count] === text[i]) count++;
    result += count + text[i];
    i += count;
  }
  return result;
};
export const runLengthDecodeMap = (text) => {
  // Always decode as count+char pairs, regardless of digit/non-digit
  let result = "";
  let i = 0;
  while (i < text.length) {
    let countStr = "";
    while (i < text.length && /\d/.test(text[i])) {
      countStr += text[i];
      i++;
    }
    if (countStr === "" || i >= text.length) break; // malformed
    const count = parseInt(countStr, 10);
    const char = text[i];
    result += char.repeat(count);
    i++;
  }
  return result;
};

export const textStatsMap = (text) => {
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text.split("\n").length;
  const noSpaces = text.replace(/\s/g, "").length;
  return `Characters: ${chars}\nCharacters (no spaces): ${noSpaces}\nWords: ${words}\nLines: ${lines}`;
};

//  registry (same pattern as fontMap / filterMap)
export const toolMap = {
  base64Encode: base64EncodeMap,
  base64Decode: base64DecodeMap,
  urlEncode: urlEncodeMap,
  urlDecode: urlDecodeMap,
  hexEncode: hexEncodeMap,
  hexDecode: hexDecodeMap,
  binaryEncode: binaryEncodeMap,
  binaryDecode: binaryDecodeMap,
  rot13: rot13Map,
  caesar: caesarMap,
  morse: morseEncodeMap,
  camelCase: camelCaseMap,
  pascalCase: pascalCaseMap,
  snakeCase: snakeCaseMap,
  kebabCase: kebabCaseMap,
  constantCase: constantCaseMap,
  zalgo: zalgoMap,
  spongebob: spongebobCaseMap,
  nato: natoMap,
  circled: circledMap,
  upsideDown: upsideDownMap,

  // unicode styles
  boldUnicode: boldUnicodeMap,
  italicUnicode: italicUnicodeMap,
  scriptUnicode: scriptUnicodeMap,
  frakturUnicode: frakturUnicodeMap,
  doubleStruck: doubleStruckMap,
  smallCaps: smallCapsMap,
  superscript: superscriptMap,
  subscript: subscriptMap,
  squared: squaredMap,
  fullwidth: fullwidthMap,
  vaporwave: vaporwaveMap,

  // text manipulation
  reverseText: reverseTextMap,
  reverseWords: reverseWordsMap,
  titleCase: titleCaseMap,
  sentenceCase: sentenceCaseMap,
  invertCase: invertCaseMap,
  randomCase: randomCaseMap,
  removeSpaces: removeSpacesMap,
  removeVowels: removeVowelsMap,
  onlyVowels: onlyVowelsMap,
  onlyConsonants: onlyConsonantsMap,
  removeDuplicateLetters: removeDuplicateLettersMap,
  duplicateEachLetter: duplicateEachLetterMap,
  repeatText: repeatTextMap,
  shuffleWords: shuffleWordsMap,
  sortWordsAlphabetically: sortWordsAlphabeticallyMap,
  sortLettersInWord: sortLettersInWordMap,
  removePunctuation: removePunctuationMap,
  removeNumbers: removeNumbersMap,
  onlyNumbers: onlyNumbersMap,
  capitalizeFirstLetter: capitalizeFirstLetterMap,
  alternateWordsCase: alternateWordsCaseMap,

  // fun & novelty
  leetSpeak: leetSpeakMap,
  pigLatin: pigLatinMap,
  clapCase: clapCaseMap,
  starWords: starWordsMap,
  dotChars: dotCharsMap,
  spacedText: spacedTextMap,
  keyboardShift: keyboardShiftMap,

  // ciphers & codes
  atbash: atbashMap,
  rot47: rot47Map,
  a1z26Encode: a1z26EncodeMap,
  a1z26Decode: a1z26DecodeMap,
  baconEncode: baconEncodeMap,
  tapCode: tapCodeMap,
  charCodesEncode: charCodesEncodeMap,
  charCodesDecode: charCodesDecodeMap,
  runLengthEncode: runLengthEncodeMap,
  runLengthDecode: runLengthDecodeMap,
  textStats: textStatsMap,
};

//  POPULAR FONTS (new)
export const strikethroughMap = (text) =>
  text
    .split("")
    .map((c) => (c === " " ? c : c + "\u0336"))
    .join("");

export const underlineMap = (text) =>
  text
    .split("")
    .map((c) => (c === " " ? c : c + "\u0332"))
    .join("");

export const wideTextMap = (text) => fullwidthMap(text);
export const bubbleTextMap = (text) => circledMap(text);
export const cursiveTextMap = (text) => scriptUnicodeMap(text);

toolMap.strikethrough = strikethroughMap;
toolMap.underline = underlineMap;
toolMap.wideText = wideTextMap;
toolMap.bubbleText = bubbleTextMap;
toolMap.cursiveText = cursiveTextMap;
