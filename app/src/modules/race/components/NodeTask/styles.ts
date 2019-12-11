import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(theme =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      marginBottom: theme.spacing(1)
    }
  })
);

export const useFieldStyles = makeStyles<Theme>(theme =>
  createStyles({
    field: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1)
    },
    capture: {
      border: "1px solid rgba(0, 0, 0, 0.23)",
      borderRadius: theme.shape.borderRadius,
      transition: theme.transitions.create("background-color", {
        duration: theme.transitions.duration.shorter
      }),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      width: "100%",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.08)",
        cursor: "pointer"
      },
      color: "transparent",
      "&::-webkit-file-upload-button": {
        visibility: "hidden"
      },
      "&::before": {
        content: "'UPLOAD PHOTO'",
        color: "rgba(0, 0, 0, 0.87)",
        display: "flex",
        justifyContent: "center",
        marginBottom: "-1rem",
        fontFamily: "Open Sans, Helvetica"
      }
    },
    preview: {
      position: "relative"
    },
    previewImage: {
      width: "100%",
      marginBottom: theme.spacing(1)
    },
    clear: {
      position: "absolute",
      top: theme.spacing(1),
      right: theme.spacing(1)
    }
  })
);
