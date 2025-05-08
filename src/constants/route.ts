/**
 * Array of public routes that don't require authentication.
 *
 * @type {string[]}
 */
export const PUBLIC_ROUTE: string[] = ["/"];

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
 * Prefix route for api
 *
 * @type {string[]}
 */
export const PREFIX_ROUTE: string = "api/auth";
