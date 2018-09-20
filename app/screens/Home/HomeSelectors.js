import { REDUCER_NAME } from './HomeConstants'

export const getModes = state => state[REDUCER_NAME].modes
export const getIsLoading = state => state[REDUCER_NAME].isLoading
export const getHasInternet = state => state[REDUCER_NAME].hasInternet
