import React from "react";
import Helmet from "react-helmet";

const TITLE = "Race Runner";

const DESCRIPTION =
  "Race Runner, the scavanger hunt experience brought online.";

const URL = "https://goracerunner.web.app";

/**
 * Create meta tags for the site using React Helmet.
 */
const HeadMeta: React.FC = () => {
  return (
    <Helmet titleTemplate="%s - Race Runner" defaultTitle="Race Runner">
      <meta name="description" content={DESCRIPTION} />
      <meta property="og:description" content={DESCRIPTION} />
      <meta property="og:title" content={TITLE} />
      <meta property="og:url" content={URL} />
      <meta property="og:image" content={`/ogimage.jpg`} />
    </Helmet>
  );
};

export default HeadMeta;
