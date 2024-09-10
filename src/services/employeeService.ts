import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Employee } from "../types";

const employeesCollection = collection(db, "employees");

export const addOne = async (employeeData: {
  name: string;
  role: string;
  department: string;
}) => {
  try {
    const docRef = await addDoc(employeesCollection, employeeData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding employee: ", error);
    throw new Error("Failed to add employee");
  }
};

export const getAll = async () => {
  try {
    const querySnapshot = await getDocs(employeesCollection);
    const employees = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Employee[];
    return employees;
  } catch (error) {
    console.error("Error fetching employees: ", error);
    throw new Error("Failed to fetch employees");
  }
};

export const updateOne = async (employeeId: string, updatedData: Employee) => {
  try {
    const employeeDoc = doc(db, "employees", employeeId);
    await updateDoc(employeeDoc, { ...updatedData });
  } catch (error) {
    console.error("Error updating employee: ", error);
    throw new Error("Failed to update employee");
  }
};

export const deleteOne = async (employeeId: string) => {
  try {
    const employeeDoc = doc(db, "employees", employeeId);
    await deleteDoc(employeeDoc);
  } catch (error) {
    console.error("Error deleting employee: ", error);
    throw new Error("Failed to delete employee");
  }
};
