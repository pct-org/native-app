import { REDUCER_NAME } from './ItemConstants'

export const getItem = state => state[REDUCER_NAME].item
export const getIsLoading = state => state[REDUCER_NAME].isLoading
export const getFetchingBetter = state => state[REDUCER_NAME].fetchingBetter
