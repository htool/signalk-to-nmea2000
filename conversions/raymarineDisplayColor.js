const _ = require('lodash')

const seatalkColors = {
  day1: 'Day 1',
  day2: 'Day 2',
  'red/black': 'Red/Black',
  inverse: 'Inverse'
}

function displayColor (group, color) {
  return {
    pgn: 126720,
    dst: 255,
    'Manufacturer Code': 'Raymarine',
    'Industry Code': 'Marine Industry',
    'Proprietary ID': 'Display',
    command1: 'Settings',
    Group: group,
    'Unknown 1': 1,
    Command: 'Color',
    Color: color,
    'Unknown 2': 0
  }
}

module.exports = (app, plugin) => {
  return {
    title: 'Raymarine Display Color (126720)',
    optionKey: 'RAYMARINE_DISPLAY_COLOR',
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
      RAYMARINE_DISPLAY_COLOR: {
        groups: [{
          signalkId: 'helm1',
          instanceId: 'Helm 1'
        }]
      }
    },

    conversions: (options) => {
      if (!_.get(options, 'RAYMARINE_DISPLAY_COLOR.groups')) {
        return null
      }
      return options.RAYMARINE_DISPLAY_COLOR.groups.map(group => {
        return {
          keys: [`electrical.displays.raymarine.${group.signalkId}.color`],
          callback: (color) => {
            const canboatColor = seatalkColors[color]
            if (color == null || canboatColor === undefined) {
              return []
            }
            return [displayColor(group.instanceId, canboatColor)]
          },
          tests: [{
            input: ['red/black'],
            expected: [{
              pgn: 126720,
              dst: 255,
              'Manufacturer Code': 'Raymarine',
              'Industry Code': 'Marine Industry',
              'Proprietary ID': 'Display',
              command1: 'Settings',
              Group: 'Helm 1',
              'Unknown 1': 1,
              Command: 'Color',
              Color: 'Red/Black',
              'Unknown 2': 0
            }]
          }]
        }
      })
    }
  }
}
