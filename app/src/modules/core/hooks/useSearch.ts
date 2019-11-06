import { useCallback } from "react";
import { parse } from "query-string";
import { useLocation, useHistory } from "react-router";

/**
 * Parse the search query string in the URL and return it as a map.
 */
export const useSearch = <T>(options?: {
  parseBooleans?: boolean;
  parseNumbers?: boolean;
}) => {
  const { search } = useLocation();
  return (parse(search, options) as unknown) as Partial<T>;
};

/**
 * Returns a function that can be used to set the search
 * parameters in the URL. Note that this function should
 * only be called ONCE per render.
 */
export const useSetSearch = () => {
  const { push } = useHistory();
  const { pathname, search } = useLocation();
  return (values: { [key: string]: string }) => {
    const searchParams = new URLSearchParams(search);
    Object.keys(values).forEach(key => searchParams.set(key, values[key]));
    push({
      pathname: pathname,
      search: searchParams.toString()
    });
  };
};

/**
 * Returns a function that can be used to remove search
 * parameters in the URL. Note that this function should
 * only be called ONCE per render.
 */
export const useRemoveSearch = () => {
  const { push } = useHistory();
  const { pathname, search } = useLocation();

  const removeQuery = useCallback(
    (keys: string[]) => {
      const searchParams = new URLSearchParams(search);
      keys.forEach(key => searchParams.delete(key));
      push({
        pathname: pathname,
        search: searchParams.toString()
      });
    },
    [push, pathname, search]
  );

  return removeQuery;
};
