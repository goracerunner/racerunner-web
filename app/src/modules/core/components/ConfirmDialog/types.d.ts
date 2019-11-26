import { DialogProps } from "@material-ui/core/Dialog";

export interface ConfirmDialogProps extends DialogProps {
  /**
   * If `true` the dialog will be shown.
   */
  open: boolean;

  /**
   * Callback function to close the dialog.
   */
  onClose: () => void;

  /**
   * Callback function to call when the user cancels.
   */
  onCancel?: () => void;

  /**
   * Callback function to call when the user confirms.
   */
  onConfirm?: () => void;

  /**
   * The title to show in the dialog.
   */
  title: string | JSX.Element;

  /**
   * The text to show on the confirm button.
   * @default OK
   */
  confirmText?: string | JSX.Element;

  /**
   * Styles to apply to the inner components.
   */
  styles?: {
    cancelButton?: string;
    confirmButton?: string;
  };
}
