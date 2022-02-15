import http, { Response } from 'lava-fe-lib/lib-common/http'

interface Demo {
  id: number
}

export const getDemo = (): Promise<Response<Demo>> => {
  return http.get('/demo')
}
