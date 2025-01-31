import { atom } from "recoil";

export const themeAtom = atom({
  key: "themeAtom",
  default: "cyberpunk",
});

export const userAtom = atom({
  key: "userAtom",
  default: { key: "value" },
});
