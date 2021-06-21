/* eslint-disable @typescript-eslint/no-explicit-any */

export const typedListener = <T extends unknown[] = []>(): new () => (...args: T) => void => Function as any
