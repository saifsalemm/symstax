import { atom } from "jotai";
import { Employee } from "../types/types";

export const currentEmployeeAtom = atom<Employee>({
  id: "",
  name: "",
  role: "",
  department: "",
});
export const modalOpenAtom = atom<boolean>(false);
export const childModalOpenAtom = atom<boolean>(false);
