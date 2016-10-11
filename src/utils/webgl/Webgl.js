import * as THREE from 'three';
// import WAGNER from '@superguigui/wagner';
// import VignettePass from '@superguigui/wagner/src/passes/vignette/VignettePass';

// const OrbitControls = require( './OrbitControls' )( THREE );

export default class Webgl {
  constructor( width, height ) {
    this.params = {};

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera( 50, width / height, 1, 1000 );
    this.camera.position.z = 200;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize( width, height );
    this.renderer.setClearColor( 0x000000, 0 );
    this.renderer.autoClearColor = true;

    // this.controls = new OrbitControls( this.camera, null, 20 );

    // this.initPostProcessing();
  }

  // initPostProcessing() {
  //   this.composer = new WAGNER.Composer( this.renderer );
  //
  //   this.vignette = new VignettePass({});
  //   this.vignette.params.boost = 1;
  //   this.vignette.params.reduction = 1;
  //   window.params = this.vignette.params;
  //   console.log(this.vignette.params);
  // }

  resize( width, height ) {
    if ( this.composer ) {
      this.composer.setSize( width, height );
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }

  render() {
    // this.renderer.autoClearColor = true;
    // this.composer.reset();
    // this.composer.render( this.scene, this.camera );
    // this.composer.pass( this.vignette );
    // this.composer.toScreen();
    this.renderer.render( this.scene, this.camera );
  }
}
