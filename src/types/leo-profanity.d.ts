declare module "leo-profanity" {
  export const profanity: {
    loadDictionary(locale?: string): void;
    check(text: string): boolean;
    clean(text: string): string;
  };
}
