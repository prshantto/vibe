import { atom } from "recoil";

export const themeAtom = atom({
  key: "themeAtom",
  default: localStorage.getItem("theme") || "Night",
});

export const userAtom = atom({
  key: "userAtom",
  default: { key: "value" },
});
