
module.exports = (app, plugin) => {
  return {
    title: 'B&G Performance(130824)',
    optionKey: 'Performance_B&G',
    keys: ["performance.tackTrue", "performance.polarSpeed", "performance.polarSpeedRatio"],
    callback: (opp_target,
	       // opp_cog,
               polar_speed,
               polar_perf
               //vmg_perf
              ) => {


      try {
        return [
          {
            pgn: 130824,
            'Opposite Tack Target Heading': opp_target,
            // 'Opposite Tack COG': opp_cog,
            'Polar Speed': polar_speed,
            'Polar Performance': polar_perf
            // 'VMG Performance': vmg_perf,
          }
        ]
      } catch ( err ) {
        console.error(err)
      }
    }
  }
}

