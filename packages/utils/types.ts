export type PredicateCallback<T> = (value: T) => unknown

/** deep partial */
export type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T

/**
 * pick union type
 *
 * @example
 *
 * PickUnion<{ a: number, b: string }, 'a' | 'b'>
 *
 * // => { a: number } | { b: string }
 */
export type PickUnion<T, K extends keyof T> = K extends K
  ? { [P in K]: T[P] }
  : never

/**
 * partial with optional
 *
 * @example
 *
 * PartialOptional<{ a: string; b: number }, 'a'>
 *
 * // => { a?: string; b: number }
 */
export type PartialOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>
