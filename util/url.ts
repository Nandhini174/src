import { TCS_E2E_URL } from './environment-variables';

export function tcsUrl(path?: string) {
  if (!path?.startsWith('/')) {
    throw new Error("tcsUrl: Path should start with '/'");
  }
  return `${TCS_E2E_URL}${path}`;
}
