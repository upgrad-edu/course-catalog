import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    maxHeight: "70vh",
    overflowY: "auto",
  },
  formControlsContainer: {
    display: "grid",
    rowGap: "1.5rem",
    padding: theme.spacing(2, 4),
  },
  formButton: {
    marginTop: theme.spacing(3),
    borderTopLeftRadius: "0",
    borderTopRightRadius: "0",
    transition: "var(--transition)",
  },
}));

export { useStyles };
