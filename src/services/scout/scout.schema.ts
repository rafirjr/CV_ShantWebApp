// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ScoutService } from './scout.class'

// Main data model schema
export const scoutSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Scout', additionalProperties: false }
)
export type Scout = Static<typeof scoutSchema>
export const scoutValidator = getValidator(scoutSchema, dataValidator)
export const scoutResolver = resolve<Scout, HookContext<ScoutService>>({})

export const scoutExternalResolver = resolve<Scout, HookContext<ScoutService>>({})

// Schema for creating new entries
export const scoutDataSchema = Type.Pick(scoutSchema, ['text'], {
  $id: 'ScoutData'
})
export type ScoutData = Static<typeof scoutDataSchema>
export const scoutDataValidator = getValidator(scoutDataSchema, dataValidator)
export const scoutDataResolver = resolve<Scout, HookContext<ScoutService>>({})

// Schema for updating existing entries
export const scoutPatchSchema = Type.Partial(scoutSchema, {
  $id: 'ScoutPatch'
})
export type ScoutPatch = Static<typeof scoutPatchSchema>
export const scoutPatchValidator = getValidator(scoutPatchSchema, dataValidator)
export const scoutPatchResolver = resolve<Scout, HookContext<ScoutService>>({})

// Schema for allowed query properties
export const scoutQueryProperties = Type.Pick(scoutSchema, ['id', 'text'])
export const scoutQuerySchema = Type.Intersect(
  [
    querySyntax(scoutQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ScoutQuery = Static<typeof scoutQuerySchema>
export const scoutQueryValidator = getValidator(scoutQuerySchema, queryValidator)
export const scoutQueryResolver = resolve<ScoutQuery, HookContext<ScoutService>>({})
