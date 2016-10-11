import VueRouter from 'vue-router';

import ProjectContainer from '../containers/Project/Project';

import OrangeComponent from '../components/Projects/Orange/Orange';

Vue.use( VueRouter );

export default class Router extends VueRouter {

  constructor() {

    super({
      hashbang: false,
      pushState: true,
      history: true,
      abstract: false,
      saveScrollPosition: false,
      transitionOnLoad: false,
    });

    this.path = '/';
    this.firstRoute = true;
    this.routeTimeout = null;


    this.map({

      '/project': {
        name: 'project',
        component: ProjectContainer,
        subRoutes: {
          '/orange': {
            component: OrangeComponent,
          },
        },
      },

    });
  }
}
