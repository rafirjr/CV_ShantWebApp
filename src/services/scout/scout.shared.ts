// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Scout, ScoutData, ScoutPatch, ScoutQuery, ScoutService } from './scout.class'

export type { Scout, ScoutData, ScoutPatch, ScoutQuery }

export type ScoutClientService = Pick<ScoutService<Params<ScoutQuery>>, (typeof scoutMethods)[number]>

export const scoutPath = 'scout'

export const scoutMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const scoutClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(scoutPath, connection.service(scoutPath), {
    methods: scoutMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [scoutPath]: ScoutClientService
  }
}
