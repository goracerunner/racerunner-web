import React, { FC } from "react";
import clsx from "clsx";

import { SkeletonProps } from "./types";

import "./style.scss";

/**
 * Wrapper component for rendering skeleton placeholders.
 * Use the `<SkeletonAvatar>` and `<SkeletonLine>` components
 * as children to this component.
 */
export const Skeleton: FC<SkeletonProps> = ({ children, className }) => {
  return <div className={clsx("skeleton", className)}>{children}</div>;
};
