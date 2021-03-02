import BigNumber from 'bignumber.js'
import Vue from 'vue'
// 粒子效果插件
import VueParticles from 'vue-particles'
import VueFeather from 'vue-feather'
// 滚动插件
import VueScrollTo from 'vue-scrollto'
// 提示工具插件
import Tooltip from 'vue-directive-tooltip'
import VueClipboard from 'vue-clipboard2'

import 'vue-directive-tooltip/dist/vueDirectiveTooltip.css'

Vue.use(VueParticles).use(Tooltip).use(VueScrollTo).use(VueFeather).use(VueClipboard)

Vue.filter('formatBalance', (balance, decimals) => BigNumber(balance).div(BigNumber(10 ** decimals)).toString())
