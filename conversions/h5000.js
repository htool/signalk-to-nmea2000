module.exports = (app, plugin) => {
  return {
    title: 'B&G Performance(130824)',
    optionKey: 'Performance_B&G',
    keys: ["performance.tackTrue", "performance.polarSpeed", "performance.polarSpeedRatio", "performance.velocityMadeGood", "navigation.leewayAngle", "performance.beatAngle"],
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
            'Key 30': '8499',
						'Opposite Tack Target Heading': opp_target,
            'Key 31': '8318',
            'Polar Speed': polar_speed,
            'Key 32': '8316',
            'Polar Performance': polar_perf,
            'Key 33': '8477',
            'VMG Performance': vmg_perf,
            'Key 34': '8319',
            'Velocity Made Good': vmg,
            'Key 35': '8322',
            'Leeway Angle': leeway_angle,
            'Key 36': '8458',
            'Optimum Wind Angle': beat_angle
          }
        ]
      } catch ( err ) {
        console.error(err)
      }
    }
  }
}

