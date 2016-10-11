import Emitter from 'core/Emitter';
import raf from 'raf';
import { TimelineLite } from 'gsap';

import './loader.styl';
import template from './loader.html';

export default Vue.extend({

  template,

  assetLoaded() {

  },

  data() {

    return {
      displayFirstLine: false,
      displayLoader: true,
      loadValue: 0,
      percentValue: 0,
      projects: [],
    };
  },


  init() {

  },

  created() {
    this.emitter = Emitter;
    this.emitter.on('assetLoaded', this.assetLoaded);
  },

  ready() {
    this.inTl();
  },

  methods: {

    animate() {
      const requestanimationframe = raf(this.animate);

      if ( this.loadValue < this.percentValue ) {
        this.loadValue += 1;
      }

      this.$els.percent.innerText = `${this.percentValue} %`;
      this.$els.secondline.style = `transform: translate3D( 0, -100%, 0 ) scale3D(${this.percentValue / 100}, 1, 1);`;

      if ( this.loadValue >= 100 ) {
        raf.cancel(requestanimationframe);
        this.outTl();
      }
    },

    assetLoaded( percent ) {
      this.updateLoading( percent );
    },

    updateLoading( percent ) {
      this.percentValue = percent;
    },

    inTl() {
      const tl = new TimelineLite();

      tl.to(
        this.$els.percent,
        2,
        {
          opacity: 1,
        }
      ).to(
        this.$els.firstline,
        2,
        {
          scaleX: 1,
          onComplete: () => {
            this.animate();
          },
        },
        '-=2'
      );
    },

    outTl() {
      const tl = new TimelineLite();

      this.$els.secondline.style = 'transition: intial;';

      tl.to(
        this.$els.percent,
        0.5,
        {
          opacity: 0,
        }
      ).fromTo(
        this.$els.secondline,
        0.25,
        {
          scaleX: 1,
        },
        {
          scaleX: 0,
          onComplete: this.removeLoader,
        },
        '-=0.25'
      );
    },

    removeLoader() {
      this.emitter.emit('loader-end');
      this.displayLoader = false;
    },

  },

  components: {},
});
