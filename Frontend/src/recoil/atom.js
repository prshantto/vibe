import { atom } from "recoil";

export const themeAtom = atom({
  key: "themeAtom",
  default: localStorage.getItem("theme") || "cupcake",
});

export const userAtom = atom({
  key: "userAtom",
  default: { key: "value" },
});

export const messageAtom = atom({
  key: "messageAtom",
  default: [],
});

export const usersAtom = atom({
  key: "usersAtom",
  default: [],
});

export const selectedUserAtom = atom({
  key: "selectedUserAtom",
  default: null,
});

export const onlineUsersAtom = atom({
  key: "onlineUsersAtom",
  default: [],
});

export const isUserLoadingAtom = atom({
  key: "isUserLoadingAtom",
  default: false,
});

export const isMessageLoadingAtom = atom({
  key: "isMessageLoadingAtom",
  default: false,
});
