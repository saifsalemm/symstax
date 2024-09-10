import { TableBody, TableCell, TableRow } from "@mui/material";
import { Data, Employee, Order } from "../../../types";

const TableBodyDetails = ({
  employees,
  employeesPerPage,
  page,
  order,
  orderBy,
  setModalOpen,
}: {
  employees: Employee[];
  employeesPerPage: number;
  page: number;
  order: Order;
  orderBy: keyof Data;
  setModalOpen: (x: boolean) => void;
}) => {
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

  const handleClick = () => {
    setModalOpen(true);
  };

  return (
    <TableBody>
      {visibleemployees?.map((row, index) => {
        const labelId = `enhanced-table-checkbox-${index}`;
        return (
          <TableRow
            hover
            role="checkbox"
            aria-checked={false}
            tabIndex={-1}
            key={row.id}
            selected={false}
            sx={{ cursor: "pointer" }}
            onClick={() => handleClick()}
          >
            <TableCell align="left">{row.id}</TableCell>
            <TableCell component="th" id={labelId} scope="row" padding="none">
              {row.name}
            </TableCell>
            <TableCell align="left">{row.department}</TableCell>
            <TableCell align="left">{row.role}</TableCell>
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
