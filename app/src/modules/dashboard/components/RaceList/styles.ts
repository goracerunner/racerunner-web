import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import constants from "../../../../styles/constants";

export default makeStyles<Theme>(theme =>
  createStyles({
    list: {
      marginBottom: "1.5rem"
    },
    add: {
      background: `${constants.color.primary}22`
    },
    message: {
      marginBottom: "1rem"
    },
    joinButton: {
      display: "flex",
      justifyContent: "space-between"
    }
  })
);

export const useCardStyles = makeStyles<Theme>(theme =>
  createStyles({
    card: {
      marginBottom: "0.5rem"
    },
    title: {
      fontSize: "1.5rem"
    },
    subheader: {
      fontSize: "1rem"
    }
  })
);
