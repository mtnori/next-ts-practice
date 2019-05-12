export interface NormalizedData {
  result: string | string[];
  entities: Partial<ReturnType<typeof import('./reducers/entities').default>>;
}
