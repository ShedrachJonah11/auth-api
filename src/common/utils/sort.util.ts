export interface SortSpec {
  [field: string]: 1 | -1;
}

const ALLOWED = /^[a-zA-Z0-9_]+$/;

export function buildSort(sortBy?: string, sortOrder: 'asc' | 'desc' = 'desc'): SortSpec {
  if (!sortBy || !ALLOWED.test(sortBy)) {
    return { createdAt: -1 };
  }
  return { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
}
