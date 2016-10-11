import domready from 'domready';

import Application from 'containers/Application/Application';
import AssetLoader from 'core/AssetLoader';
import Emitter from 'core/Emitter';
import Router from 'core/Router';
import './stylesheets/main.styl';

class Main {

  constructor() {

    this.router = new Router();

    this.setEvents();
    this.loadAssets();
    this.start();
  }

  loadAssets() {
    this.assetLoader = AssetLoader;
  }

  setEvents() {
    this.emitter = Emitter;

    window.addEventListener( 'resize', () => { this.emitter.emit('global-resize'); }, false );
    window.addEventListener( 'mousemove', ( event ) => { this.emitter.emit('global-mousemove', event); }, false );
  }

  start() {
    this.router.start(Application, '#application');
  }
}

domready(() => {

  new Main();
});
