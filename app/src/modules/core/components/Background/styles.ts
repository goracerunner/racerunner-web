import { makeStyles, createStyles } from "@material-ui/core/styles";

import constants from "../../../../styles/constants";
import background from "../../../../assets/images/background-traf-min.jpg";

export default makeStyles(
  createStyles({
    root: {
      position: "fixed",
      top: 0,
      left: 0,
      minHeight: "100%",
      minWidth: "1024px",
      width: "100%",
      height: "auto",
      zIndex: -1,
      background: `url(${background})`,
      backgroundColor: constants.color.secondary,
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",
      backgroundSize: "cover"
    }
  })
);
