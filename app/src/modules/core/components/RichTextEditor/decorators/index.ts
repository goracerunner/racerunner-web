import { CompositeDecorator, ContentBlock, ContentState } from "draft-js";

import { TokenSpan } from "../components/TokenSpan";

/**
 * Creates a token strategy that finds specified tokens starting with '@'.
 *
 * See https://draftjs.org/docs/advanced-topics-decorators.
 */
const createTokenStrategy = (tokens: string[]) => (
  block: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
) => {
  const text = block.getText();

  const knownTokens = [...tokens];

  // Only decorate if there are tokens
  if (knownTokens.length) {
    // Create a regex that matches each token prefixed with '@'
    const regex = new RegExp(`@(${knownTokens.join("|")})`, "g");

    // Find matches
    let match, start;
    while ((match = regex.exec(text)) !== null) {
      start = match.index;
      callback(start, start + match[0].length);
    }
  }
};

/**
 * Create decorators based on recognised tokens.
 */
export const createDecorators = (tokens: string[]) =>
  new CompositeDecorator([
    {
      strategy: createTokenStrategy(tokens),
      component: TokenSpan
    }
  ]);
