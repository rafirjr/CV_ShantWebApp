import { scout } from './scout/scout'
import { user } from './users/users'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(scout)
  app.configure(user)
  // All services will be registered here
}
