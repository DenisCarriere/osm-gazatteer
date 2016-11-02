module.exports = (data: any, tile: any, writeData: any, done: any) => {
  const features: any[] = []
  for (const feature of data.osmdata.osm.features) {
    if (feature.properties['@user'] === global.mapOptions.user) {
      if (feature.properties.building) {
        features.push(feature)
      }
    }
  }
  done(null, features)
}
