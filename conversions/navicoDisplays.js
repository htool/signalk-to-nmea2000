const _ = require('lodash')

const nightModeColors = {
  red: 0,
  green: 1,
  blue: 2,
  white: 3,
  magenta: 4
}

function simnetKeyValue (displayGroup, key, value) {
  return {
    pgn: 130845,
    dst: 255,
    prio: 3,
    'Manufacturer Code': 'Simrad',
    'Industry Code': 'Marine Industry',
    'Display Group': displayGroup,
    Key: key,
    Value: value
  }
}

module.exports = (app, plugin) => {
  return {
    title: 'Navico / B&G Display (130845)',
    optionKey: 'NAVICO_DISPLAYS',
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
              description: 'Path leaf, e.g. default or group1',
              type: 'string'
            },
            instanceId: {
              title: 'NMEA2000 Display Group',
              description: 'canboat name, e.g. Default or Group 1',
              type: 'string'
            }
          }
        }
      }
    },

    testOptions: {
      NAVICO_DISPLAYS: {
        groups: [{
          signalkId: 'group1',
          instanceId: 'Group 1'
        }]
      }
    },

    conversions: (options) => {
      if (!_.get(options, 'NAVICO_DISPLAYS.groups')) {
        return null
      }
      return _.flatten(options.NAVICO_DISPLAYS.groups.map(group => {
        const brightnessPath = `electrical.displays.navico.${group.signalkId}.brightness`
        const nightPath = `electrical.displays.navico.${group.signalkId}.nightMode.state`
        const colorPath = `electrical.displays.navico.${group.signalkId}.nightModeColor`

        return [
          {
            keys: [brightnessPath],
            callback: (brightness) => {
              if (brightness == null) {
                return []
              }
              return [simnetKeyValue(group.instanceId, 'Backlight level', brightness * 100)]
            },
            tests: [{
              input: [0.5],
              expected: [{
                prio: 3,
                pgn: 130845,
                dst: 255,
                fields: {
                  'Manufacturer Code': 'Simrad',
                  'Industry Code': 'Marine Industry',
                  'Display Group': 'Group 1',
                  Key: 'Backlight level',
                  Value: 50
                }
              }]
            }]
          },
          {
            keys: [nightPath],
            callback: (state) => {
              if (state == null) {
                return []
              }
              return [simnetKeyValue(group.instanceId, 'Night mode', state == 1 ? 4 : 2)]
            },
            tests: [{
              input: [1],
              expected: [{
                prio: 3,
                pgn: 130845,
                dst: 255,
                fields: {
                  'Manufacturer Code': 'Simrad',
                  'Industry Code': 'Marine Industry',
                  'Display Group': 'Group 1',
                  Key: 'Night mode',
                  Value: 4
                }
              }]
            }]
          },
          {
            keys: [colorPath],
            callback: (color) => {
              if (color == null || nightModeColors[color] === undefined) {
                return []
              }
              return [simnetKeyValue(group.instanceId, 'Night mode color', nightModeColors[color])]
            },
            tests: [{
              input: ['green'],
              expected: [{
                prio: 3,
                pgn: 130845,
                dst: 255,
                fields: {
                  'Manufacturer Code': 'Simrad',
                  'Industry Code': 'Marine Industry',
                  'Display Group': 'Group 1',
                  Key: 'Night mode color',
                  Value: 1
                }
              }]
            }]
          }
        ]
      }))
    }
  }
}
