import React, { FC, useState, useContext } from "react";
import { useSnackbar } from "notistack";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

import ClearIcon from "@material-ui/icons/Clear";

import AuthenticationContext from "../../../core/contexts/AuthenticationContext";

import { useFirestore, useStorage } from "../../../core/hooks/useFirebase";

import { Nullable } from "../../../../types/global";
import { ResponseInput } from "../../../../types/node";

import { SubmissionFieldProps } from "./types";
import { useFieldStyles } from "./styles";

/**
 * This component renders the controls for a user to submit responses.
 */
export const SubmissionField: FC<SubmissionFieldProps> = ({
  race,
  task,
  team
}) => {
  const classes = useFieldStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useContext(AuthenticationContext);
  const store = useFirestore();
  const files = useStorage();

  const [phrase, setPhrase] = useState("");

  const [photo, setPhoto] = useState<Nullable<File>>(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  const submitResponse = (type: "phrase" | "photo" | "manual") => async () => {
    if (!user) return;

    setLoading(true);
    const responseRef = store
      .collection("races")
      .doc(race.uid)
      .collection("nodes")
      .doc(task.nodeId)
      .collection("responses")
      .doc();

    let value = "";

    if (type === "phrase" && phrase) {
      value = phrase;
    } else if (type === "photo" && photo) {
      // Upload file
      const fileRef = files.ref(
        `responses/${race.uid}/${task.nodeId}/${task.taskId}/${responseRef.id}`
      );
      await fileRef.put(photo);
      value = await fileRef.getDownloadURL();
    }

    // Create response object
    const response: ResponseInput = {
      responseId: responseRef.id,
      date: new Date(),
      raceId: race.uid,
      nodeId: task.nodeId,
      taskId: task.taskId,
      teamId: team.teamId,
      userId: user.uid,
      checked: false,
      type,
      value
    };
    await responseRef.set(response);

    // Clear
    setPhrase("");
    setLoading(false);
    enqueueSnackbar("Submitted a response.");
  };

  switch (task.type) {
    case "phrase": {
      return (
        <>
          <TextField
            className={classes.field}
            value={phrase}
            onChange={e => setPhrase(e.target.value)}
            variant="outlined"
            fullWidth
            placeholder="Enter an answer..."
          />
          <Button
            variant="outlined"
            fullWidth
            onClick={submitResponse("phrase")}
            disabled={loading}
          >
            Submit
          </Button>
        </>
      );
    }
    case "photo": {
      return (
        <div className={classes.field}>
          {photo && preview ? (
            <div className={classes.preview}>
              <IconButton
                className={classes.clear}
                onClick={() => {
                  setPhoto(null);
                  setPreview("");
                }}
              >
                <ClearIcon />
              </IconButton>
              <img
                className={classes.previewImage}
                src={preview}
                alt="Preview"
              />
              <Button
                variant="outlined"
                fullWidth
                onClick={submitResponse("photo")}
                disabled={loading}
              >
                Submit
              </Button>
            </div>
          ) : (
            <input
              className={classes.capture}
              type="file"
              accept="image/*"
              capture
              multiple={false}
              onChange={e => {
                if (e.target.files) {
                  const file = e.target.files.item(0);
                  setPhoto(file);
                  setPreview(URL.createObjectURL(file));
                } else {
                  setPhoto(null);
                  setPreview("");
                }
              }}
            />
          )}
        </div>
      );
    }
    case "manual": {
      return (
        <Button
          variant="outlined"
          fullWidth
          onClick={submitResponse("manual")}
          disabled={loading}
        >
          Complete this challenge
        </Button>
      );
    }
  }

  return null;
};
