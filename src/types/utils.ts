/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { PropType } from 'vue'

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const typedProp = <T extends any>(type: PropType<any>): new () => T => type as any
export const typedListener = <T extends unknown[] = []>() => typedProp<(...args: T) => void>(Function)
export const typedFunction = <T extends (...args: any[]) => any>() => typedProp<T>(Function)
export const typedString = <T extends string = string>() => typedProp<T>(String)
export const typedObject = <T extends Record<string, any> = Record<string, any>>() => typedProp<T>(Object)
export const typedArray = <T extends any = any>() => typedProp<T[]>(Array)
