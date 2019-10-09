import React from "react";
import Helmet from "react-helmet";

import { withStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Email from "../../components/Email";
import { Logger } from "../../../../utils";

import { ErrorBoundaryState } from "./types";
import styles from "./styles";

/**
 * This component can capture errors that occur within its children.
 * It will present an error dialog if it catches any errors.
 */
class ErrorBoundaryComponent extends React.Component<
  { classes: any },
  ErrorBoundaryState
> {
  state = {
    error: undefined
  };

  componentDidCatch(error: Error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const classes: any = this.props.classes;
    if (error !== undefined) {
      // TODO: add analytics
      Logger.error("Component: ErrorBoundary", "Caught error", error);
      return (
        <>
          <Helmet>
            <title>Application Crashed</title>
          </Helmet>
          <Card className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              />
              <Typography variant="h4" component="h2">
                Sorry, this page has crashed.
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                An unexpected error caught us off-guard!
              </Typography>
              <Typography variant="body1" component="p">
                Try refreshing the page. If this problem persists, please
                contact us at <Email /> for further assistance.
              </Typography>
              {/* <br />
            <Typography variant="body1" component="p">
              This error has been reported automatically.
            </Typography> */}
            </CardContent>
            <Card>
              <CardContent>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="body2">
                      <b>{String(error)}</b>
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography variant="body2">
                      <code>{((error as unknown) as Error).stack}</code>
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </CardContent>
            </Card>
          </Card>
        </>
      );
    }
    return this.props.children;
  }
}

export const ErrorBoundary = withStyles(styles)(ErrorBoundaryComponent);
