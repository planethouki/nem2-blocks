export default function({ $axios }, inject) {
  const through = $axios.create({
    baseURL: process.env.NODE_URL_THROUGH
  })

  const cached = $axios.create({
    baseURL: process.env.NODE_URL_CACHED
  })

  inject('api', through)
  inject('cachedApi', cached)
}
