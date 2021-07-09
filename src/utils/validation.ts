/* eslint-disable @typescript-eslint/no-explicit-any */
import { computed, ref, Ref } from 'vue'
import validator from 'validator'

export type ValidatorParameters<T extends (str: string, ...args: any) => any> = T extends (
  str: string,
  ...args: infer P
) => any
  ? P
  : never

export type RuleDefinition = {
  [key in keyof typeof validator]: typeof validator[key] extends (str: string, ...args: any) => any
    ? [ruleName: key, ...options: ValidatorParameters<typeof validator[key]>]
    : never
}[keyof typeof validator]

export type Validation = {
  rule: RuleDefinition
  message: string
}
export type Validations = Validation[]
export type ValidationDeclaration = {
  data: string | Ref<string>
  validations: Validations
}
export type ValidationResult = {
  enable: () => void
  disable: () => void
  readonly enabled: Ref<boolean>
  readonly error: Ref<string>
  readonly valid: Ref<boolean>
}
export type UseValidationResult<T extends Record<string, ValidationDeclaration>> = {
  enable: () => void
  disable: () => void
  readonly valid: Ref<boolean>
  fields: Record<keyof T, ValidationResult>
}

export const useValidation = <T extends Record<string, ValidationDeclaration>>(
  validations: T,
): UseValidationResult<T> => {
  const fields = Object.fromEntries(
    Object.entries(validations).map(([key, declaration]) => {
      const enabledRef = ref(false)
      const data = declaration.data
      const computedData = typeof data === 'string' ? computed(() => data) : data
      const enabled = computed(() => enabledRef.value)
      const enable = () => {
        enabledRef.value = true
      }
      const disable = () => {
        enabledRef.value = false
      }
      const valid = computed(() =>
        declaration.validations.reduce((valid, validation) => {
          if (!valid) {
            return false
          }
          const [rule, ...args] = validation.rule

          return (validator[rule] as (...args: any[]) => boolean)(computedData.value, ...args)
        }, true),
      )
      const error = computed(() =>
        enabled.value
          ? declaration.validations.reduce((err, validation) => {
              if (err !== '') {
                return err
              }
              const [rule, ...args] = validation.rule

              return (validator[rule] as (...args: any[]) => boolean)(computedData.value, ...args)
                ? ''
                : validation.message
            }, '')
          : '',
      )
      return [
        key,
        {
          enabled,
          enable,
          disable,
          error,
          valid,
        } as ValidationResult,
      ]
    }),
  ) as Record<keyof T, ValidationResult>
  const enable = () => Object.values(fields).forEach(field => field.enable())
  const disable = () => Object.values(fields).forEach(field => field.disable())
  const valid = computed(() => Object.values(fields).every(field => field.valid.value))
  return {
    fields,
    enable,
    disable,
    valid,
  }
}
