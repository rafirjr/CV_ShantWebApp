// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  scoutDataValidator,
  scoutPatchValidator,
  scoutQueryValidator,
  scoutResolver,
  scoutExternalResolver,
  scoutDataResolver,
  scoutPatchResolver,
  scoutQueryResolver
} from './scout.schema'

import type { Application } from '../../declarations'
import { ScoutService, getOptions } from './scout.class'
import { scoutPath, scoutMethods } from './scout.shared'

export * from './scout.class'
export * from './scout.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const scout = (app: Application) => {
  // Register our service on the Feathers application
  app.use(scoutPath, new ScoutService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: scoutMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(scoutPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(scoutExternalResolver), schemaHooks.resolveResult(scoutResolver)]
    },
    before: {
      all: [schemaHooks.validateQuery(scoutQueryValidator), schemaHooks.resolveQuery(scoutQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(scoutDataValidator), schemaHooks.resolveData(scoutDataResolver)],
      patch: [schemaHooks.validateData(scoutPatchValidator), schemaHooks.resolveData(scoutPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [scoutPath]: ScoutService
  }
}
