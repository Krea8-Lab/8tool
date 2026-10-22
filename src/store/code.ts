import { createSignal, createMemo } from "solid-js";
import { isServer } from "solid-js/web";
import { Base64 } from "js-base64";
import hljs from "highlight.js";
import { LANGUAGES, Language } from "../util/languages";

export type CodeSample = {
  language: Language;
  code: string;
};

export const CODE_SAMPLES: CodeSample[] = [
  {
    language: LANGUAGES.javascript,
    code: `module.exports = leftpad;

function leftpad(str, len, ch) {
  str = String(str);
  var i = -1;

  if (!ch && ch !== 0) ch = ' ';

  len = len - str.length;

  while (i++ < len) {
    str = ch + str;
  }
  return str;
}`,
  },
  {
    language: LANGUAGES.swift,
    code: `import SwiftUI

struct CircleImage: View {
  var body: some View {
    Image("turtlerock")
      .clipShape(Circle())
  }
}`,
  },
  {
    language: LANGUAGES.tsx,
    code: `import { Detail } from "@raycast/api";

export default function Command() {
  return <Detail markdown="Hello World" />;
}`,
  },
];

export const detectLanguage = async (input: string): Promise<string> => {
  return new Promise((resolve) => {
    try {
      if (
        /import\s+(SwiftUI|UIKit|Foundation|Combine|AppKit)/.test(input) ||
        /\b(struct|class|enum)\s+\w+\s*:\s*View\b/.test(input)
      ) {
        resolve("swift");
        return;
      }
      const highlightResult = hljs.highlightAuto(input, Object.keys(LANGUAGES));
      if (highlightResult.language) {
        resolve(highlightResult.language);
      } else {
        resolve(LANGUAGES.plaintext.name.toLowerCase());
      }
    } catch {
      resolve(LANGUAGES.plaintext.name.toLowerCase());
    }
  });
};

const defaultSample = CODE_SAMPLES[Math.floor(Math.random() * CODE_SAMPLES.length)];

export const [userInputtedLanguage, setUserInputtedLanguage] = createSignal<Language | null>(null);
export const [detectedLanguage, setDetectedLanguage] = createSignal<Language | null>(null);
export const [userInputtedCode, setUserInputtedCode] = createSignal<string | null>(null);

export const codeExample = createMemo(() => defaultSample);

export const autoDetectLanguage = createMemo(() => {
  return userInputtedLanguage() === null;
});

export const selectedLanguage = createMemo<Language | null>(() => {
  const userLang = userInputtedLanguage();
  if (userLang !== null) {
    return userLang;
  }
  if (userInputtedCode() === null && codeExample()) {
    return codeExample().language;
  }
  return detectedLanguage() || LANGUAGES.javascript;
});

export function setSelectedLanguage(lang: Language | null) {
  setUserInputtedLanguage(lang);
}

export const code = createMemo(() => {
  return userInputtedCode() ?? codeExample()?.code ?? "";
});

export const isCodeExample = createMemo(() => {
  const current = code();
  return !!CODE_SAMPLES.find((sample) => sample.code === current);
});

export function setCode(newCode: string) {
  setUserInputtedCode(newCode);

  detectLanguage(newCode).then((langKey) => {
    if (LANGUAGES[langKey]) {
      setDetectedLanguage(LANGUAGES[langKey]);
    }
  });
}

// Aliases for compatibility
export {
  autoDetectLanguage as autoDetectLanguageAtom,
  selectedLanguage as selectedLanguageAtom,
  code as codeAtom,
  isCodeExample as isCodeExampleAtom,
  codeExample as codeExampleAtom,
};
