import { RouteComponentProps, match, StaticContext } from "react-router";
import { ButtonProps } from "@material-ui/core/Button";
import * as H from "history";

export interface BackButtonProps extends RouteComponentProps, ButtonProps {
  /** Provided by `withRouter` decorator. */
  history: H.History;

  /** Provided by `withRouter` decorator. */
  location: H.Location<any>;

  /** Provided by `withRouter` decorator. */
  match: match<any>;

  /** Provided by `withRouter` decorator. */
  staticContext?: StaticContext;
}
