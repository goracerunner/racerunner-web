export interface AuthorisedProps {
  /**
   * If this is `true`, it will only render children
   * if the user is **NOT** authorised.
   * @default false
   */
  inverted?: boolean;

  /**
   * If this is `true`, it will only render children
   * if the authorisation state is **loading**. This
   * prop overrides the `inverted` prop.
   */
  loading?: boolean;

  /**
   * If this field is populated, the user's claims
   * will be matched against this array before
   * children are rendered. You can use `inverted`
   * to show children if the user is **NOT** authorised.
   */
  claims?: string[];

  /**
   * Specify the type of check to be used on the `claims`
   * prop. If `"and"` is used, ALL claims listed in the array
   * must be present to be authorised. If `"or"` is used,
   * then only ONE of the claims listed in the array needs
   * to be present to be authorised.
   *
   * This prop is ignored if the `claims` prop is not used.
   */
  checkType?: "and" | "or";
}
