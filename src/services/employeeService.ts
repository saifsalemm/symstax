import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const employeesCollection = collection(db, "employees");

interface Employee {
  name: string;
  email: string;
  role: string;
  department: string;
}

export const addEmployee = async (employeeData: Employee) => {
  try {
    const docRef = await addDoc(employeesCollection, employeeData);
    return docRef.id;
  } catch (error) {
    console.error("Error adding employee: ", error);
    throw new Error("Failed to add employee");
  }
};

export const getEmployees = async () => {
  try {
    const querySnapshot = await getDocs(employeesCollection);
    const employees = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return employees;
  } catch (error) {
    console.error("Error fetching employees: ", error);
    throw new Error("Failed to fetch employees");
  }
};

export const updateEmployee = async (
  employeeId: string,
  updatedData: { [key in Employee as string]: string }
) => {
  try {
    const employeeDoc = doc(db, "employees", employeeId);
    await updateDoc(employeeDoc, updatedData);
  } catch (error) {
    console.error("Error updating employee: ", error);
    throw new Error("Failed to update employee");
  }
};

export const deleteEmployee = async (employeeId: string) => {
  try {
    const employeeDoc = doc(db, "employees", employeeId);
    await deleteDoc(employeeDoc);
  } catch (error) {
    console.error("Error deleting employee: ", error);
    throw new Error("Failed to delete employee");
  }
};
