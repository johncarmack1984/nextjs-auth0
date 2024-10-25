import { ResponseCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import type { CookieSerializeOptions } from 'cookie';
import { Auth0ResponseCookies } from '../auth0-session/http';
export default class Auth0NextResponseCookies extends Auth0ResponseCookies {
    constructor();
    setCookie(name: string, value: string, options?: CookieSerializeOptions): Promise<ResponseCookies | void>;
    clearCookie(name: string, options?: CookieSerializeOptions): Promise<ResponseCookies | void>;
}
//# sourceMappingURL=auth0-next-response-cookies.d.ts.map