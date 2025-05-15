let inMemoryToken: string | null = null;

export function setAccessTokenMemory(token: string | null) {
  inMemoryToken = token;
}

export function getAccessTokenMemory(): string | null {
  return inMemoryToken;
}
