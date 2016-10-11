import VueRouter from 'vue-router';

import ProjectContainer from '../containers/Project/Project';

import OrangeComponent from '../components/Projects/Orange/Orange';

Vue.use( VueRouter );

export default class Router extends VueRouter {

  constructor() {

    super({
      base: '/',
      mode: 'history',
    });

    this.path = '/';
    this.firstRoute = true;
    this.routeTimeout = null;

    this.routes = [
      {
        component: ProjectContainer,
        name: 'project',
        path: '/project',
        children: [
          { component: OrangeComponent, name: 'orange', path: '/orange' },
        ],
      },
    ];
  }
}
