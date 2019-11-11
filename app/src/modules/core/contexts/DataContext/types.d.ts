import { Nullable, Maybe } from "../../../../types/global";

export interface DataProviderProps<T = any> {
  /**
   * True if the data is loading.
   */
  loading?: boolean;

  /**
   * An error if something went wrong.
   */
  error?: any;

  /**
   * The data.
   */
  data: Maybe<Nullable<T>>;

  /**
   * Children components to render.
   */
  children?: JSX.Element | Array<JSX.Element>;
}

export interface DataContextState<T = any> {
  /**
   * Flag for whether a data context exists.
   * By default, this should be `false` unless
   * a data context is returning a value.
   */
  contextExists: boolean;

  /**
   * True if the data is loading.
   */
  loading: boolean;

  /**
   * An error if something went wrong.
   */
  error?: any;

  /**
   * The data.
   */
  data: Maybe<Nullable<T>>;
}
