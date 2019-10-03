const tailwindcssAnimateCSSPlugin = require('tailwindcss-animatecss');
const tailwindcssTransitionsPlugin = require('tailwindcss-transitions');

module.exports = {
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    tailwindcssAnimateCSSPlugin({
      settings: {
        animatedSpeed: 1000,
        heartBeatSpeed: 1000,
        hingeSpeed: 2000,
        bounceInSpeed: 750,
        bounceOutSpeed: 750,
      },
      variants: ['responsive', 'hover', 'focus', 'active', 'disabled', 'visited'],
    }),
    tailwindcssTransitionsPlugin(),
  ],
};
