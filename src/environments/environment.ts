import { ApiRoutes } from './../app/shared/_resources/resources.api'

export const environment = {
  production: false,
  API: {
    URL: 'https://api.ftechapp.com.br/api/v1/',
    Routes: ApiRoutes,
  },
}
