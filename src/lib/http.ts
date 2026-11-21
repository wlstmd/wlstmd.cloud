import { request } from "node:https";

// Build-time HTTP helper. Plain https instead of fetch: Next treats uncached
// fetches as dynamic (which breaks static export) and cached ones would
// survive in the build cache, so data would go stale between deploys.
export function getText(
  url: string,
  { headers = {}, timeout = 10_000, method = "GET" }: { headers?: Record<string, string>; timeout?: number; method?: string } = {},
): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const req = request(url, { method, headers: { "User-Agent": "wlstmd.cloud-build", ...headers }, timeout }, (res) => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => resolve({ status: res.statusCode ?? 0, body }));
    });
    req.on("timeout", () => req.destroy(new Error(`${url} timed out`)));
    req.on("error", reject);
    req.end();
  });
}

export async function getOk(url: string, headers?: Record<string, string>) {
  const res = await getText(url, { headers });
  if (res.status !== 200) throw new Error(`${url} → ${res.status}`);
  return res.body;
}
