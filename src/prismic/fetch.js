import { apiEndpoint, apiToken } from './config'
import transform from './transformer'

const Prismic = require('prismic-javascript')

export default async function getData () {
  const api = await Prismic.getApi(apiEndpoint, { accessToken: apiToken })
  const response = await api.query(
    '',
    { orderings: '[document.first_publication_date]' }
  )

  const mapped = response.results.map(data => ({
    id: data.id.toLowerCase(),
    uid: data.uid,
    type: data.type,
    ...transform(data),
  }))
  return mapped
}
