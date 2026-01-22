export function normalizeEmail(email: string | undefined | null): string {
  return (email || '').toLowerCase().trim();
}
