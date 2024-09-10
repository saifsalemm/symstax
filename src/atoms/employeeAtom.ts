import { atom } from "jotai";
import { Employee } from "../types";

export const currentEmployeeAtom = atom<Employee | null>(null);
export const modalOpenAtom = atom<boolean>(false);
export const childModalOpenAtom = atom<boolean>(false);
