import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import {
  EditorButtonProps,
  RichTextEditorProps,
  RichTextPreviewProps,
  RichTextEditorToolbarProps
} from "./types";

export const useEditorStyles = makeStyles<Theme, RichTextEditorProps>(theme =>
  createStyles({
    root: ({ readOnly }) => ({
      border: readOnly ? "solid 1px #f8f8f8" : "solid 1px #efefef",
      borderRadius: theme.shape.borderRadius
    }),
    editor: {
      padding: theme.spacing(2)
    },
    toolbar: {}
  })
);

export const usePreviewStyles = makeStyles<Theme, RichTextPreviewProps>(
  createStyles({})
);

export const useToolbarStyles = makeStyles<Theme, RichTextEditorToolbarProps>(
  theme =>
    createStyles({
      toolbar: {
        borderBottom: "solid 1px #efefef",
        padding: theme.spacing(0.5),
        display: "flex"
      },
      divider: {
        margin: theme.spacing(1),
        borderRight: "solid 1px #efefef"
      }
    })
);

export const useEditorButtonStyles = makeStyles<Theme, EditorButtonProps>(
  theme =>
    createStyles({
      button: ({ disabled }) => ({
        display: "flex",
        jsutifyContent: "center",
        width: "fit-content",
        padding: theme.spacing(0.5),
        borderRadius: theme.shape.borderRadius,
        cursor: disabled ? "inherit" : "pointer",
        "&:hover": {
          backgroundColor: disabled ? "inherit" : "#efefef"
        },
        "&:active": {
          backgroundColor: disabled ? "inherit" : "#ddd"
        }
      })
    })
);

export const useTokenStyles = makeStyles<Theme>(theme =>
  createStyles({
    token: {
      color: theme.palette.primary.main,
      "&:hover": {
        color: theme.palette.primary.light,
        cursor: "pointer"
      }
    }
  })
);

export const useImageDialogStyles = makeStyles<Theme>(theme =>
  createStyles({
    preview: {
      display: "flex",
      justifyContent: "center"
    },
    image: {
      padding: theme.spacing(2),
      maxWidth: "30rem"
    }
  })
);
