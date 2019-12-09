import createImagePlugin from "draft-js-image-plugin";

import Image from "../components/Image";

const imagePlugin = createImagePlugin({
  imageComponent: Image as any
});

export default imagePlugin;
