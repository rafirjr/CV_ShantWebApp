// For more information about this file see https://dove.feathersjs.com/guides/cli/validators.html
import { Ajv, addFormats } from '@feathersjs/schema'
import type { FormatsPluginOptions } from '@feathersjs/schema'
import { TypeGuard } from '@sinclair/typebox'
import { Value } from '@sinclair/typebox/value'

const schemaOf = (schemaOf: string, value: unknown, schema: unknown) => {
  switch (schemaOf) {
    case 'Constructor':
      return TypeGuard.IsConstructor(schema) && Value.Check(schema, value)
    case 'Function':
      return TypeGuard.IsFunction(schema) && Value.Check(schema, value)
    case 'Date':
      return TypeGuard.IsDate(schema) && Value.Check(schema, value)
    case 'Promise':
      return TypeGuard.IsPromise(schema) && Value.Check(schema, value)
    case 'Uint8Array':
      return TypeGuard.IsUint8Array(schema) && Value.Check(schema, value)
    case 'Undefined':
      return TypeGuard.IsUndefined(schema) && Value.Check(schema, value)
    case 'Void':
      return TypeGuard.IsVoid(schema) && Value.Check(schema, value)
    default:
      return false
  }
}

const formats: FormatsPluginOptions = [
  'date-time',
  'time',
  'date',
  'email',
  'hostname',
  'ipv4',
  'ipv6',
  'uri',
  'uri-reference',
  'uuid',
  'uri-template',
  'json-pointer',
  'relative-json-pointer',
  'regex'
]

export const dataValidator: Ajv = addFormats(new Ajv({}), formats)

dataValidator
  .addKeyword({ type: 'object', keyword: 'instanceOf', validate: schemaOf })
  .addKeyword({ type: 'null', keyword: 'typeOf', validate: schemaOf })
  .addKeyword('exclusiveMinimumTimestamp')
  .addKeyword('exclusiveMaximumTimestamp')
  .addKeyword('minimumTimestamp')
  .addKeyword('maximumTimestamp')
  .addKeyword('minByteLength')
  .addKeyword('maxByteLength')

export const queryValidator: Ajv = addFormats(
  new Ajv({
    coerceTypes: true
  }),
  formats
)
