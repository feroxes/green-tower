export const numeric = {
  type: 'numeric',
  precision: 10,
  scale: 6,
  transformer: {
    to: (value: number) => value,
    from: (value: string) => parseFloat(value),
  },
} as const;
