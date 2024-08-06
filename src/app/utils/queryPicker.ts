export const queryPicker = <Q extends Record<string, unknown>, S extends keyof Q | string>
  (query: Q, eligibleQuery: S[]) => {

  // modified query
  const result: Partial<Q> = {}
  for (const key of eligibleQuery) {
    if (query && Object.hasOwnProperty.call(query, key)) {
      result[key] = query[key]
    }
  }
  return result
}
