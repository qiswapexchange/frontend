import BigNumber from 'bignumber.js';
import Vue from 'vue';
// Particle effects plugin
import VueParticles from 'vue-particles';
import VueFeather from 'vue-feather';
// Scroll plugin
import VueScrollTo from 'vue-scrollto';
// Tooltip plugin
import Tooltip from 'vue-directive-tooltip';
import VueClipboard from 'vue-clipboard2';

import 'vue-directive-tooltip/dist/vueDirectiveTooltip.css';

Vue.use(VueParticles)
  .use(Tooltip)
  .use(VueScrollTo)
  .use(VueFeather)
  .use(VueClipboard);

Vue.filter('formatBalance', (balance, decimals) =>
  BigNumber(balance)
    .div(BigNumber(10 ** decimals))
    .toString()
);
