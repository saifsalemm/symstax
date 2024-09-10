import { TableBody, TableCell, TableRow } from "@mui/material";
import { Data, Employee, Order } from "../../../types";
import { useAtom } from "jotai";
import {
  currentEmployeeAtom,
  modalOpenAtom,
} from "../../../atoms/employeeAtom";

const TableBodyDetails = ({
  employees,
  employeesPerPage,
  page,
  order,
  orderBy,
}: {
  employees: Employee[];
  employeesPerPage: number;
  page: number;
  order: Order;
  orderBy: keyof Data;
}) => {
  const [_, setCurrentEmployee] = useAtom(currentEmployeeAtom);
  const [__, setModalOpen] = useAtom(modalOpenAtom);

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  const emptyemployees =
    page > 0
      ? Math.max(0, (1 + page) * employeesPerPage - employees?.length)
      : 0;

  const visibleemployees = [...employees]
    .sort(getComparator(order, orderBy))
    .slice(page * employeesPerPage, page * employeesPerPage + employeesPerPage);

  const handleClick = (employee: Employee) => {
    setCurrentEmployee(employee);
    setModalOpen(true);
  };

  return (
    <TableBody>
      {visibleemployees?.map((employee, index) => {
        const labelId = `enhanced-table-checkbox-${index}`;
        return (
          <TableRow
            hover
            role="checkbox"
            aria-checked={false}
            tabIndex={-1}
            key={employee.id}
            selected={false}
            sx={{ cursor: "pointer" }}
            onClick={() => handleClick(employee)}
          >
            <TableCell align="left">{employee.id}</TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none">
              {employee.name}
            </TableCell>
            <TableCell align="left">{employee.department}</TableCell>
            <TableCell align="left">{employee.role}</TableCell>
          </TableRow>
        );
      })}
      {emptyemployees > 0 && (
        <TableRow
          style={{
            height: 53 * emptyemployees,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableBodyDetails;
