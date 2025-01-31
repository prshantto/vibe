import { atom } from "recoil";

export const themeAtom = atom({
  key: "themeAtom",
  default: localStorage.getItem("theme") || "cupcake",
});

export const userAtom = atom({
  key: "userAtom",
  default: { key: "value" },
});
