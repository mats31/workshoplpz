import Emitter from 'core/Emitter';
import ProjectComponent from 'components/ProjectSlider/ProjectSlider';
import { TimelineLite } from 'gsap';

import './home.styl';

import template from './home.html';

export default Vue.extend({

  template,

  data() {

    return {
      // displayHome: false,
    };
  },

  created() {

  },

  ready() {
    this.emitter = Emitter;
    // this.emitter.on('loader-end', this.displayHomepage);
  },

  methods: {

    // displayHomepage() {
    //   this.displayHome = true;
    // },

  },

  components: {
    'project-component': ProjectComponent,
  },
});
