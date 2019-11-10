export interface StatDisplayProps {
  /**
   * The caption to display underneath the stat.
   */
  caption?: string;

  /**
   * An optional caption that is displayed if the
   * statistic is singular. If no caption is provided,
   * this is not used at all.
   */
  singularCaption?: string;

  /**
   * If this is `true`, it is expected that the data
   * can be `null`. Otherwise, an error will be displayed
   * if the error retrieved is `null`.
   */
  nullable?: boolean;
}
