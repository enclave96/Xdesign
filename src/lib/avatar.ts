import type { User } from "@/lib/api";

const AVATAR_STYLES = ["notionists", "lorelei", "avataaars", "personas"] as const;

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/** Stable, varied avatar image per user (DiceBear). */
export function getUserAvatarUrl(user: User, size = 80): string {
  const seed = encodeURIComponent(user.id || user.email);
  const style = AVATAR_STYLES[hashString(user.id || user.email) % AVATAR_STYLES.length];

  return `https://api.dicebear.com/7.x/${style}/png?seed=${seed}&size=${size}&backgroundColor=ffedd5,fdb883,ffd8bf`;
}
