/**
 * Array of auth routes is for authentication.
 *
 * @type {string[]}
 */
export const AUTH_ROUTE: string[] = ["/login", "/register"];

/**
 * Redireact Route after admin Login
 *
 * @type {string}
 */
export const DEFAULT_REDIRECT: string = "/app";

/**
 * Route for email verification
 *
 * @type {string}
 */

export const VERIFY_ROUTE: string = "/verify";

/**
 * Prefix route for api
 *
 * @type {string[]}
 */
export const PREFIX_ROUTE: string = "api/auth";
