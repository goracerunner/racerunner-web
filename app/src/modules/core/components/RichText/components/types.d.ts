import { ContentBlock, ContentState } from "draft-js";

export interface CustomComponentProps {
  /**
   * The class name to apply.
   */
  className: string;

  /**
   * Theme object with custom CSS classes.
   */
  theme: { [key: string]: string };

  /**
   * The content block that this component should render.
   */
  block: ContentBlock;

  /**
   * Custom props passed to the content block.
   */
  blockProps: object;

  /**
   * The editor's current content state.
   */
  contentState: ContentState;
}
