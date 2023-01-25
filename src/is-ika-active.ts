interface D1 {
  currentcount: number;
  hasStorm: boolean;
  players: unknown[];
  isThundering: boolean;
  confighash: number;
  servertime: number;
  updates: unknown[];
  timestamp: number;
}
function isD1(data: unknown): data is D1 {
  if (!("currentcount" in data && typeof data.currentcount === "number")) return false;
  if (!("hasStorm" in data && typeof data.hasStorm === "boolean")) return false;
  if (!("players" in data && Array.isArray(data.players))) return false;
  if (!("isThundering" in data && typeof data.isThundering === "boolean")) return false;
  if (!("confighash" in data && typeof data.confighash === "number")) return false;
  if (!("servertime" in data && typeof data.servertime === "number")) return false;
  if (!("updates" in data && Array.isArray(data.updates))) return false;
  if (!("timestamp" in data && typeof data.timestamp === "number")) return false;
  return true;
}

export const fetchIkaStatus = async (): Promise<0 | 1 | 2> => {
  try {
    const res = await fetch("https://tibyte.net/is-kkiroserver-active/d1");
    if (res.status < 200 && res.status >= 300) return 1;
    try {
      const p: unknown = await res.json();
      if (isD1(p)) {
        if (p.players.length > 0) {
          return 2;
        }
      }
      return 1;
    } catch (_e: unknown) {
      return 1;
    }
  } catch (_e: unknown) {
    return 0;
  }
}