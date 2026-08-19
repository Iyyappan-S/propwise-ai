const COOKIE_NAME = "app_session_id";
const ONE_YEAR_MS = 1e3 * 60 * 60 * 24 * 365;
const AXIOS_TIMEOUT_MS = 3e4;
const UNAUTHED_ERR_MSG = "Please login (10001)";
const NOT_ADMIN_ERR_MSG = "You do not have required permission (10002)";
const OAUTH_STATE_COOKIE = "__Host-oauth_state";
const encodeOAuthState = (state) => btoa(JSON.stringify(state));
const decodeOAuthState = (state) => {
  let decoded;
  try {
    decoded = atob(state);
  } catch {
    return { redirectUri: "" };
  }
  try {
    const parsed = JSON.parse(decoded);
    if (parsed && typeof parsed.redirectUri === "string") return parsed;
  } catch {
  }
  return { redirectUri: decoded };
};
export {
  AXIOS_TIMEOUT_MS,
  COOKIE_NAME,
  NOT_ADMIN_ERR_MSG,
  OAUTH_STATE_COOKIE,
  ONE_YEAR_MS,
  UNAUTHED_ERR_MSG,
  decodeOAuthState,
  encodeOAuthState
};
