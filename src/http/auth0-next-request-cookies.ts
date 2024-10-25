import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';
import { Auth0RequestCookies } from '../auth0-session/http';

export default class Auth0NextRequestCookies extends Auth0RequestCookies {
  public constructor() {
    super();
  }

  public async getCookies(): Promise<Record<string, string>> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { cookies }: { cookies: () => Promise<ReadonlyRequestCookies> } = require('next/headers');
    const cookieStore: ReadonlyRequestCookies = await cookies();
    const allCookies = cookieStore.getAll();
    return allCookies.reduce(
      (memo: Record<string, string>, { name, value }: { name: string; value: string }) => ({
        ...memo,
        [name]: value
      }),
      {}
    );
  }
}
