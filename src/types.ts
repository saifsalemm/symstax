export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
}

export interface Data {
  id: number;
  name: number;
  department: number;
  role: number;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export type Order = "asc" | "desc";

export interface TableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}


export interface TableToolbarProps {
  numSelected: number;
}