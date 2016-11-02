function map (data: any, tile: any, writeData: any, done: any) {
  let count = 0
  for (const feature of data.osmdata.osm.features) {
    if (feature.properties['@user'] === 'DenisCarriere') {
      if (feature.properties.building) { count += 1 }
    }
  }
  done(null, count)
}

module.exports = map
