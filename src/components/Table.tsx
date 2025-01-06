import {
  Box,
  IconButton,
  TableBody,
  TableContainer,
  TablePagination,
  TableRow,
  useTheme,
} from "@mui/material";
import Table from "@mui/material/Table";
import { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Paper from "@mui/material/Paper";
interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        color="primary"
      >
        {theme.direction === "rtl" ? (
          <LastPageIcon color="primary" />
        ) : (
          <FirstPageIcon color="primary" />
        )}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
        color="primary"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight color="primary" />
        ) : (
          <KeyboardArrowLeft color="primary" />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
        color="primary"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft color="primary" />
        ) : (
          <KeyboardArrowRight color="primary" />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        color="primary"
      >
        {theme.direction === "rtl" ? (
          <FirstPageIcon color="primary" />
        ) : (
          <LastPageIcon color="primary" />
        )}
      </IconButton>
    </Box>
  );
}

function createData(name: string, calories: number, fat: number) {
  return { name, calories, fat };
}

const rows = [
  createData("cofe", 305, 3.7),
  createData("Asal", 452, 25.0),
  createData("Qaymoq", 262, 16.0),
  createData("Muzdek yogurt", 159, 6.0),
  createData("Qoshtli Non", 356, 16.0),
  createData("Honeycomb", 408, 3.2),
  createData("Muzqaymoqli sandwich", 237, 9.0),
  createData("murabbo", 375, 0.0),
  createData("KitKat", 518, 26.0),
  createData("Lollipop", 392, 0.2),
  createData("Marshmallow", 318, 0),
  createData("Nougat", 360, 19.0),
  createData("Oreo", 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const TableMui = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div style={{ marginTop: "50px" }} className="container mx-auto w-[1000px]">
      <TableContainer
        component={Paper}
        className="border-[2px] border-blue-700"
      >
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.name} color="primary">
                <TableCell component="th" scope="row" color="primary">
                  <h2 className="text-blue-800 font-bold"> {row.name}</h2>
                </TableCell>
                <TableCell style={{ width: 160 }} align="right" color="primary">
                  <h2 className="text-blue-800 font-bold">{row.calories}</h2>
                </TableCell>
                <TableCell style={{ width: 160 }} align="right" color="primary">
                  <h2 className="text-blue-800 font-bold">{row.fat} </h2>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }} color="primary">
                <TableCell colSpan={6} color="primary" />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                color="primary"
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableMui;
