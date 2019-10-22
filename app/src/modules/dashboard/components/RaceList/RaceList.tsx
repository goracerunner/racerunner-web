import React, { FC, useEffect, useState, useCallback, useContext } from "react";

import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

import AddIcon from "@material-ui/icons/Add";

import { Logger } from "../../../../utils";
import { Nullable } from "../../../../types/global";
import { RaceInfo } from "../../../../types/race";
import { useFirestore } from "../../../core/hooks/useFirebase";

import { RaceCard } from "./RaceCard";
import { RaceListProps } from "./types";
import useStyles from "./styles";
import AppModeContext from "../../../core/contexts/AppModeContext";

/**
 * This component retrieves and shows a user's list of races. If the
 * `viewManaging` prop is `true`, the races managed by the user will
 * be shown instead.
 */
export const RaceList: FC<RaceListProps> = ({
  user,
  viewManaging,
  showJoinRace,
  onJoinRace
}) => {
  const classes = useStyles();
  const store = useFirestore();
  const [loading, setLoading] = useState(false);
  const [races, setRaces] = useState<Nullable<Array<RaceInfo>>>(null);
  const { setMode, setRaceId } = useContext(AppModeContext);

  useEffect(() => {
    async function loadRaces() {
      setLoading(true);
      let racesQuery = store
        .doc(`users/${user.uid}`)
        .collection(viewManaging ? "managedRaces" : "races");
      try {
        const raceData = await racesQuery.get();
        setRaces(raceData.docs.map(r => r.data() as RaceInfo));
      } catch (error) {
        Logger.error("RaceList", "Failed to load race data", error);
      }
    }

    if (!loading || !races) loadRaces();
  }, [setLoading, setRaces, loading, races, store, user.uid, viewManaging]);

  const onSelectRace = useCallback(
    (uid: string) => {
      setMode("race");
      setRaceId(uid);
    },
    [setMode, setRaceId]
  );

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
