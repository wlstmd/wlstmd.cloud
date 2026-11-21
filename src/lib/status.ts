import { services } from "./data";
import { getText } from "./http";

export type ServiceStatus = { up: boolean; ms: number | null; auth: boolean };

// Probed once per build (and the daily scheduled rebuild), so "up" means
// "answered with < 400 at the last deploy", not a live uptime monitor.
export async function getServiceStatuses(): Promise<{ checkedAt: string; statuses: Record<string, ServiceStatus> }> {
  const entries = await Promise.all(
    services.map(async (s): Promise<[string, ServiceStatus]> => {
      const start = performance.now();
      try {
        const { status } = await getText(s.url, { timeout: 8_000 });
        // sign-in-gated apps answer anonymous probes with 401/403/404 — the server is still up
        const up = status > 0 && (status < 400 || (!!s.auth && status < 500));
        return [s.url, { up, ms: Math.round(performance.now() - start), auth: !!s.auth }];
      } catch {
        return [s.url, { up: false, ms: null, auth: !!s.auth }];
      }
    }),
  );
  return { checkedAt: new Date().toISOString(), statuses: Object.fromEntries(entries) };
}
