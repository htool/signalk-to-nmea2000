module.exports = (app, plugin) => {
  return {
    title: 'B&G Performance(130824)',
    optionKey: 'Performance_B&G',
    keys: ["performance.tackTrue", "performance.polarSpeed", "performance.polarSpeedRatio", "performance.velocityMadeGood", "navigation.leewayAngle", "performance.beatAngle"],
    // timeouts: [200, 200, 200, 200, 200, 200],
    callback: (opp_target,
	       			 // opp_cog,
               polar_speed,
               polar_perf,
               //vmg_perf
							 vmg,
               leeway_angle,
               beat_angle
              ) => {

      let vmg_perf = 0;

      try {
        return [
          {
            pgn: 130824,
					  SID: 0x1e,
            'Manufacturer Code': 'B&G',
            'Key 30': '8499',
						'Opposite tack target heading': opp_target ? opp_target : 65535,
            'Key 31': '8318',
            'Polar Speed': polar_speed ? polar_speed : 65535,
            'Key 32': '8316',
            'Polar Performance': polar_perf ? polar_perf : 65535,
            'Key 33': '8477',
            'VMG Performance': vmg_perf ? vmg_perf : 65535,
            'Key 34': '8319',
            'Velocity Made Good': vmg ? vmg_perf : 65535,
            'Key 35': '8322',
            'Leeway Angle': leeway_angle ? leeway_angle : 65535,
            'Key 36': '8458',
            'Optimum Wind Angle': beat_angle ? beat_angle : 65535
          }
        ]
      } catch ( err ) {
        console.error(err)
      }
    }
  }
}

