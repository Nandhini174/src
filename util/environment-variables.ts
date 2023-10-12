import { username, password, securityAnswer, url, headless } from './manual-configuration';

function getVarOrThrow(varName: string): string {
  const value = process.env[varName];
  if (value == null) {
    throw new Error(`Unable to get value for environment variable: '${varName}'`);
  }
  return value;
}

export const TCS_E2E_USERNAME = process.env['TCS_E2E_USERNAME'] ?? username;
export const TCS_E2E_PASSWORD = process.env['TCS_E2E_PASSWORD'] ?? password;
export const TCS_E2E_SECURITY_ANSWER = process.env['TCS_E2E_SECURITY_ANSWER'] ?? securityAnswer;
export const TCS_E2E_URL = process.env['TCS_E2E_URL'] ?? url;
export const TCS_E2E_HEADLESS = getVarOrThrow('TCS_E2E_HEADLESS') !== 'false' ?? headless;
