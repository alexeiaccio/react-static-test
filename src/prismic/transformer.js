export default function transform (prismicData) {
  const data = prismicData.data
  const result = {}
  const entries = Object.entries(data)

  for (let i = 0; i < entries.length; i += 1) {
    const name = entries[i][0]
    const value = entries[i][1]

    switch (name) {
      case 'description':
        result[name] = value.map(item => item.richtext)
        break

      default:
        result[name] = value
    }
  }
  return result
}
