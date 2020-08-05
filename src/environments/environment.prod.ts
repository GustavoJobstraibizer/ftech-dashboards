import { ApiRoutes } from './../app/shared/_resources/resources.api'

export const environment = {
  production: true,
  API: {
    URL: 'http://api.ftechapp.com.br/api/v1/',
    Routes: ApiRoutes,
  },
}
