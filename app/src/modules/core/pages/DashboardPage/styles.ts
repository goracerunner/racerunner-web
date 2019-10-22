import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export const useDashboardStyles = makeStyles<Theme>(theme =>
  createStyles({
    title: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: "1rem"
    },
    header: {
      marginTop: "0"
    },
    subtitle: {
      fontSize: "1.5rem",
      marginBottom: "0.5rem"
    }
  })
);

export const useRaceStyles = makeStyles<Theme>(theme => createStyles({}));
