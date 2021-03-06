import Emitter from 'core/Emitter';
import { TimelineLite } from 'gsap';

import './menu.styl';
import template from './menu.html';

export default Vue.extend({

  template,

  data() {

    return {};
  },


  init() {},

  created() {
    this.emitter = Emitter;
    this.emitter.on('loader-end', this.inTl);
  },

  mounted() {},

  methods: {

    inTl() {

      const tl = new TimelineLite();

      tl.to(
        this.$refs.container,
        2,
        {
          opacity: 1,
        },
        '+=1'
      );

    },

    outTl() {},

  },

  components: {},
});
