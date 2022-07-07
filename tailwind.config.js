// eslint-disable-next-line @typescript-eslint/no-var-requires
const modifyVars = require('lava-fe-lib/lib-common/constant.js')
module.exports = {
  purge: {
    enabled: true,
    content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  },
  content: [],
  theme: {
    fontSize: {
      sm: '12px',
      base: '14px',
      lg: '18px'
    },
    extend: {
      colors: {
        lava: {
          bluee: modifyVars.COLOR_PRIMARY_BLUE,
          red: {
            DEFAULT: modifyVars.COLOR_DANGER,
            light: modifyVars.COLOR_DANGER_LIGHT,
          },
          black: modifyVars.COLOR_PRIMARY_BLACK,
          green: {
            DEFAULT: modifyVars.COLOR_ASSIST_GREEN,
            light: modifyVars.COLOR_ASSIST_GREEN_LIGHT,
          },
          yellow: {
            DEFAULT: modifyVars.COLOR_WARN,
            light: modifyVars.COLOR_WARN_LIGHT,
          },
          gray: {
            DEFAULT: modifyVars.COLOR_TEXT_COMMENT,
            deep: {
              DEFAULT: '#D5D8DB',
              '0.5': 'rgba(213, 216, 216, .5)'
            },
          }
        },
      },
      spacing: {
        '5px': '5px',
        '10px': '10px',
        '10': '2.5rem',
        '15': '3.75rem',
        '26': '26px',
        '30': '30px',
        '35': '35px',
        '120': '30rem',
        '150': '37.5rem',
        '300': '75rem',
        '450': '112.5rem',
        '700': '175rem',
        '1000': '250rem',
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      visibility: ['group-hover'],
    }
  },
}
