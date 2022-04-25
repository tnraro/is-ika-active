export const fetchIkaStatus = async (): Promise<0 | 1 | 2> => {
  try {
    const res = await fetch("https://tibyte.net/is-kkiroserver-active/d1");
    if (res.status < 200 && res.status >= 300) return 1;
    try {
      await res.json();
      return 2;
    } catch (e: unknown) {
      return 1;
    }
  } catch (e: unknown) {
    return 0;
  }
}