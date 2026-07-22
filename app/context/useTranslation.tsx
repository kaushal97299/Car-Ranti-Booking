"use client";

import { useLanguage } from "./LanguageContext";
import en from "../messages/en.json";
import hi from "../messages/hi.json";
import pa from "../messages/pa.json";

const messages = { en, hi, pa };

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = messages[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return { t };
}