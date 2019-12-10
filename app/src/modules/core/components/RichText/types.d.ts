import { EditorState } from "draft-js";

export interface RichTextPreviewProps {
  /**
   * The value in the preview.
   */
  value?: string;

  /**
   * The names of recognised tokens that will be displayed in the
   * editor. Tokens are recognised in the editor if they are prefixed
   * with the `@` character and will be rendered inside the `TokenSpan`
   * component.
   */
  tokens?: string[];

  /**
   * The text alignment to use.
   * @default "left"
   */
  textAlignment?: "left" | "center" | "right";

  /**
   * Custom styles to apply to inner elements.
   */
  classes?: {
    root?: string;
    editor?: string;
  };
}

export interface RichTextEditorProps {
  /**
   * The value in the editor.
   */
  value: string;

  /**
   * Callback function for when the text in the editor changes.
   */
  onChange?: (text: string, html: string) => void;

  /**
   * The names of recognised tokens that will be displayed in the
   * editor. Tokens are recognised in the editor if they are prefixed
   * with the `@` character and will be rendered inside the `TokenSpan`
   * component.
   */
  tokens?: string[];

  /**
   * If `true`, the editor will not be able to edit its values.
   */
  readOnly?: boolean;

  /**
   * The placeholder to show when the value of the editor is empty.
   */
  placeholder?: string;

  /**
   * The text alignment to use.
   * @default "left"
   */
  textAlignment?: "left" | "center" | "right";

  /**
   * If `true`, the toolbar for rich text editing will be hidden.
   * Hoever, this will still allow keyboard shortcuts to be used
   * to apply styling.
   */
  hideToolbar?: boolean;

  /**
   * If `true`, the editor will not allow rich text editing.
   */
  plain?: boolean;

  /**
   * Custom styles to apply to inner elements.
   */
  classes?: {
    root?: string;
    editor?: string;
    toolbar?: string;
  };
}

export interface EditorButtonProps {
  /**
   * Pass the icon to be shown as the button prop.
   */
  children: JSX.Element;

  /**
   * Tooltip to show when the user hovers on the button.
   */
  tooltip?: string;

  /**
   * If `true`, the button cannot be clicked.
   */
  disabled?: boolean;

  /**
   * The action to execute when the button is clicked.
   */
  onClick?: () => void;
}

export interface RichTextEditorToolbarProps {
  /**
   * The current draft-js editor state.
   */
  editorState: EditorState;

  /**
   * A function to update the draft-js editor state.
   */
  setEditorState: (state: EditorState) => void;

  /**
   * Custom styles to apply to inner elements.
   */
  classes?: {
    toolbar?: string;
  };
}

export interface EditorDialogProps<T> {
  /**
   * If `true`, the dialog will be open.
   */
  open: boolean;

  /**
   * Callback function to close the dialog.
   */
  onClose: () => void;

  /**
   * Callback function when the user confirms the action.
   */
  onConfirm: (args: T) => void;
}

export interface AddImageDialogProps extends EditorDialogProps<string> {}
