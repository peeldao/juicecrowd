/**
 * Used to represent a GraphQL query result that has not yet been resolved.
 */
export const QueryResultNone = {
  data: undefined as any,
  error: undefined as any,
  loading: false,
  networkStatus: 8, // error
  called: false,
  client: undefined as any,
  observable: undefined as any,
  reobserve: (() => {}) as any,
  startPolling: (() => {}) as any,
  stopPolling: (() => {}) as any,
  subscribeToMore: (() => {}) as any,
  updateQuery: (() => {}) as any,
  variables: undefined as any,
  fetchMore: (() => {}) as any,
  refetch: (() => {}) as any,
}
