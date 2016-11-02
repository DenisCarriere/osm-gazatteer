const places = [
  'country',
  'state',
  'region',
  'district',
  'county',
  'municipality',
  'city',
]

module.exports = (data: any, tile: any, writeData: any, done: any) => {
  const features: any[] = []
  for (const feature of data.osmdata.osm.features) {
    if (feature.properties['@type'] === 'node') {
      if (feature.properties.place && feature.properties.name) {
        if (places.indexOf(feature.properties.place) !== -1) {
          features.push(feature)
        }
      }
    }
  }
  done(null, features)
}
