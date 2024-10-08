import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { Data, Employee, Order } from "../../../types/types";
import TableToolbar from "./TableToolbar";
import TableHeader from "./TableHeader";
import TableBodyDetails from "./TableBodyDetails";
import { useState } from "react";
import EmployeeDetailsModal from "./EmployeeDetailsModal";

export default function EmployeesTable({
  employees,
}: {
  employees: Employee[];
}) {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("id");
  const [page, setPage] = useState(0);

  const employeesPerPage = 5;

  const handleRequestSort = (_: unknown, property: keyof Data) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2, boxShadow: 4, padding: "2rem" }}>
          <TableToolbar />

          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <TableHeader
                numSelected={0}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={employees?.length}
              />
              <TableBodyDetails
                employees={employees}
                employeesPerPage={employeesPerPage}
                page={page}
                order={order}
                orderBy={orderBy}
              />
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={employees?.length}
            rowsPerPage={employeesPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={() => {}}
          />
        </Paper>
      </Box>
      <EmployeeDetailsModal />
    </>
  );
}
