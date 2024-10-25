import {
  Auth0Server,
  ConfigParameters,
  GetAccessToken,
  GetSession,
  HandleAuth,
  HandleCallback,
  HandleLogin,
  HandleLogout,
  HandleProfile,
  TouchSession,
  UpdateSession,
  WithApiAuthRequired,
  WithPageAuthRequired
} from './shared';
import { _initAuth } from './init';
import { setIsUsingNamedExports, setIsUsingOwnInstance } from './utils/instance-check';
import { clientGetter } from './auth0-session/client/edge-client';
import { WithMiddlewareAuthRequired } from './helpers/with-middleware-auth-required';

const genId = () => {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
};

let instance: Auth0Server;

/**
 * Initialise your own instance of the SDK.
 *
 * See {@link ConfigParameters}.
 *
 * @category Server
 */
export type InitAuth0 = (params?: ConfigParameters) => Promise<Auth0Server>;

// For using managed instance with named exports.
async function getInstance(): Promise<Auth0Server> {
  setIsUsingNamedExports();
  if (instance) {
    return instance;
  }
  instance = await _initAuth({ genId, clientGetter });
  return instance;
}

// For creating own instance.
export const initAuth0: InitAuth0 = async (params) => {
  setIsUsingOwnInstance();
  return await _initAuth({ genId, clientGetter, params });
};

export const getSession: GetSession = async (...args) => (await getInstance()).getSession(...args);
export const updateSession: UpdateSession = async (...args) => (await getInstance()).updateSession(...args);
export const getAccessToken: GetAccessToken = async (...args) => (await getInstance()).getAccessToken(...args);
export const touchSession: TouchSession = async (...args) => (await getInstance()).touchSession(...args);
export const withApiAuthRequired: WithApiAuthRequired = (...args) =>
  // @ts-expect-error -- Let's see what happens
  (getInstance().withApiAuthRequired as any)(...args);
export const withPageAuthRequired: WithPageAuthRequired = ((...args: Parameters<WithPageAuthRequired>) =>
  // @ts-expect-error -- Let's see what happens
  getInstance().withPageAuthRequired(...args)) as WithPageAuthRequired;
export const handleLogin: HandleLogin = ((...args: Parameters<HandleLogin>) =>
  // @ts-expect-error -- Let's see what happens
  getInstance().handleLogin(...args)) as HandleLogin;
export const handleLogout: HandleLogout = ((...args: Parameters<HandleLogout>) =>
  // @ts-expect-error -- Let's see what happens
  getInstance().handleLogout(...args)) as HandleLogout;
export const handleCallback: HandleCallback = ((...args: Parameters<HandleCallback>) =>
  // @ts-expect-error -- Let's see what happens
  getInstance().handleCallback(...args)) as HandleCallback;
export const handleProfile: HandleProfile = ((...args: Parameters<HandleProfile>) =>
  // @ts-expect-error -- Let's see what happens
  getInstance().handleProfile(...args)) as HandleProfile;
// @ts-expect-error -- Let's see what happens
export const handleAuth: HandleAuth = (...args) => getInstance().handleAuth(...args);
export const withMiddlewareAuthRequired: WithMiddlewareAuthRequired = (...args) =>
  // @ts-expect-error -- Let's see what happens
  getInstance().withMiddlewareAuthRequired(...args);

export * from './shared';
