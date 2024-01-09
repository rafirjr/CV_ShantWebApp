// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Scout, ScoutData, ScoutPatch, ScoutQuery } from './scout.schema'

export type { Scout, ScoutData, ScoutPatch, ScoutQuery }

export interface ScoutParams extends KnexAdapterParams<ScoutQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ScoutService<ServiceParams extends Params = ScoutParams> extends KnexService<
  Scout,
  ScoutData,
  ScoutParams,
  ScoutPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'scout'
  }
}
