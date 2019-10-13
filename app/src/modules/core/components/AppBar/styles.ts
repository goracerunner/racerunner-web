import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

export default makeStyles<Theme>(
  createStyles({
    spacer: {
      flex: "1"
    }
  })
);

export const useAppBarMenuStyles = makeStyles<Theme>(
  createStyles({
    avatar: {
      width: "2rem",
      height: "auto"
    },
    bigAvatar: {
      width: "2.5rem",
      height: "auto",
      marginBottom: "0.4rem"
    },
    avatarButton: {
      color: "rgba(255, 255, 255, 0.7)",
      marginRight: "-0.8rem"
    },
    profile: {
      margin: "0.5rem 1rem",
      display: "flex"
    },
    profileInfo: {
      marginLeft: "0.5rem"
    }
  })
);
