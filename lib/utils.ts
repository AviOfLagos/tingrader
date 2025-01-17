// lib/utils.ts

export function cn(
  ...classes: Array<string | undefined | { [key: string]: boolean }>
): string {
  return classes
    .flatMap((cls) => {
      if (typeof cls === 'string') {
        return cls;
      } else if (typeof cls === 'object' && cls !== null) {
        return Object.entries(cls)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key);
      } else {
        return [];
      }
    })
    .filter(Boolean)
    .join(' ');
}
