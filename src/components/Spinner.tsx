import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        width: "100vw",
      }}
    >
      <CircularProgress />
    </Box>
  );
}