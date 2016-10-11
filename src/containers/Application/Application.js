import HomeContainer from 'containers/Home/Home';
import LoaderComponent from 'components/Loader/Loader';
import MenuComponent from 'components/Menu/Menu';
import template from './application.html';

export default Vue.extend({

  template,

  emitterEvents: [],

  data() {

    return {};
  },

  ready() {},

  methods: {},

  components: {
    'home-container': HomeContainer,
    'loader-component': LoaderComponent,
    'menu-component': MenuComponent,
  },

});
