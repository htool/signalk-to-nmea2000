const _ = require('lodash')

module.exports = (app, plugin) => {
  return {
    title: 'Raymarine Display Brightness (126720)',
    optionKey: 'RAYMARINE_DISPLAY_BRIGHTNESS',
    context: 'vessels.self',
    properties: {
      groups: {
        title: 'Group Mapping',
        type: 'array',
        items: {
          type: 'object',
          properties: {
            signalkId: {
              title: 'Signal K Group id',
              description: 'Path leaf, e.g. helm1',
              type: 'string'
            },
            instanceId: {
              title: 'NMEA2000 Group',
              description: 'canboat name, e.g. Helm 1',
              type: 'string'
            }
          }
        }
      }
    },

    testOptions: {
      RAYMARINE_DISPLAY_BRIGHTNESS: {
        groups: [{
          signalkId: 'helm2',
          instanceId: 'Helm 2'
        }]
      }
    },

    conversions: (options) => {
      if (!_.get(options, 'RAYMARINE_DISPLAY_BRIGHTNESS.groups')) {
        return null
      }
      return options.RAYMARINE_DISPLAY_BRIGHTNESS.groups.map(group => {
        return {
          keys: [`electrical.displays.raymarine.${group.signalkId}.brightness`],
          callback: (brightness) => {
            if (brightness == null) {
              return []
            }
            return [{
              pgn: 126720,
              dst: 255,
              'Manufacturer Code': 'Raymarine',
              'Industry Code': 'Marine Industry',
              'Proprietary ID': 'Display',
              command1: 'Settings',
              Command: 'Brightness',
              Group: group.instanceId,
              Brightness: brightness * 100,
              'Unknown 2': 0
            }]
          },
          tests: [{
            input: [0.85],
            expected: [{
              pgn: 126720,
              dst: 255,
              'Manufacturer Code': 'Raymarine',
              'Industry Code': 'Marine Industry',
              'Proprietary ID': 'Display',
              command1: 'Settings',
              Command: 'Brightness',
              Group: 'Helm 2',
              Brightness: 85,
              'Unknown 2': 0
            }]
          }]
        }
      })
    }
  }
}
