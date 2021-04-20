import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "23rem",
  },
  media: {
    height: 140,
  },
  flex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
  },
  popularity: {
    color: theme.palette.primary.main,
  },
  originalPrice: {
    textDecoration: "line-through",
  },
  discountedPrice: {
    fontSize: "1.15rem",
    fontWeight: 500,
  },
}));

export { useStyles };
