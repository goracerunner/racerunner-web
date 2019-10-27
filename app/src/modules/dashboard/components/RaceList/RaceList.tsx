import React, { FC, useEffect, useState, useCallback, useContext } from "react";
import { Redirect } from "react-router";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

import AddIcon from "@material-ui/icons/Add";

import { Logger } from "../../../../utils";
import { Nullable } from "../../../../types/global";
import { RaceInfo } from "../../../../types/race";
import { useFirestore } from "../../../core/hooks/useFirebase";
import AppModeContext from "../../../core/contexts/AppModeContext";

import { RaceCard } from "./RaceCard";
import { RaceListProps } from "./types";
import useStyles from "./styles";

/**
 * This component retrieves and shows a user's list of races. If the
 * `viewManaging` prop is `true`, the races managed by the user will
 * be shown instead.
 *
 * When the user selects a race, this component will set the race Id
 * in the `AppModeContext` and redirect the user to the `/race` or
 * `/manage` page depending on the `viewManaging` prop.
 */
export const RaceList: FC<RaceListProps> = ({
  user,
  viewManaging,
  showJoinRace,
  onJoinRace
}) => {
  const classes = useStyles();

  const { setRaceId } = useContext(AppModeContext);

  const store = useFirestore();

  const [loading, setLoading] = useState(false);
  const [races, setRaces] = useState<Nullable<Array<RaceInfo>>>(null);
  const [redirect, setRedirect] = useState<Nullable<string>>(null);

  useEffect(() => {
    if (!loading || !races) {
      setLoading(true);
      const racesQuery = store
        .doc(`users/${user.uid}`)
        .collection(viewManaging ? "managedRaces" : "races");

      // Set the races whenever the data chanes
      racesQuery.onSnapshot({
        next: snap => {
          try {
            setRaces(snap.docs.map(r => r.data() as RaceInfo));
          } catch (error) {
            Logger.error("RaceList", "Failed to load race data", error);
          }
        },
        error: error => {
          Logger.error("RaceList", "Failed to load races", error);
        }
      });
    }
  }, [setLoading, setRaces, loading, races, store, user.uid, viewManaging]);

  const onSelectRace = useCallback(
    (uid: string) => {
      setRedirect(viewManaging ? "/manage" : "/race");
      setRaceId(uid);
    },
    [setRaceId, viewManaging, setRedirect]
  );

  if (redirect) {
    return <Redirect to={redirect} push />;
  }

  return (
    <div className={classes.list}>
      {loading && !races && (
        <Typography color="textSecondary" className={classes.message}>
          Loading...
        </Typography>
      )}
      {races && !races.length && (
        <Typography color="textSecondary" className={classes.message}>
          No races available.
        </Typography>
      )}
      {races &&
        races.map(race => (
          <RaceCard key={race.uid} race={race} onSelectRace={onSelectRace} />
        ))}
      {showJoinRace && (
        <Card className={classes.add} elevation={0}>
          <CardActionArea onClick={onJoinRace || undefined}>
            <CardContent>
              <Typography
                color="textSecondary"
                variant="body2"
                className={classes.joinButton}
              >
                <AddIcon />
                Join a race
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </div>
  );
};
