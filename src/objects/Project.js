
import { BufferGeometry, Color, DoubleSide, LinearFilter, Mesh, Object3D, PlaneGeometry, ShaderMaterial, Vector2 } from 'three';
const glslify = require('glslify');

import ExplodeModifier from 'utils/webgl/ExplodeModifier';

export default class Project extends Object3D {
  constructor( width, height, offset, texture, index ) {
    super();

    this.index = index;
    this.initialOffset = offset;
    this.offset = offset;
    this.texture = texture;
    this.width = width;
    this.height = height;
    this.start = false;

    // window.addEventListener( 'click', () => { this.start = true; }, false);

    this.createMesh();
  }

  createMesh() {
    this.geometry = new PlaneGeometry( this.width, this.height, 100, 100 );
    this.velocities = [];

    const explodeModifier = new ExplodeModifier();
    explodeModifier.modify( this.geometry );

    this.geometry = new BufferGeometry().fromGeometry( this.geometry );

    this.getVelocities();

    this.texture.minFilter = LinearFilter;

    this.uniforms = {
      active: { type: 'f', value: 0 },
      color: { type: 'v3', value: new Color( 0xffffff ) },
      opacity: { type: 'f', value: 0.5 },
      map: { type: 't', value: this.texture },
      mouse: { type: 'v2', value: new Vector2() },
      resolution: { type: 'v2', value: new Vector2( window.innerWidth, window.innerHeight ) },
    };

    this.material = new ShaderMaterial({
      fragmentShader: glslify('./shaders/projectFragment.glsl'),
      vertexShader: glslify('./shaders/projectVertex.glsl'),
      side: DoubleSide,
      transparent: true,
      uniforms: this.uniforms,
      wireframe: false,
    });

    this.mesh = new Mesh( this.geometry, this.material );

    let specialOffset = 0;

    if ( this.index === 1 ) specialOffset = 50;

    this.mesh.position.set(
      ( this.index * this.width ) + ( this.offset * this.index ) + specialOffset,
      0,
      0
    );

    this.add( this.mesh );
  }

  getVelocities() {
    const positions = this.geometry.attributes.position.array;

    for (let i = positions.length - 1, j = 0; i > positions.length / 2; i -= 18, j += 1) {
      const velocity = Math.random() > 0.5 ? ( Math.random() * 2 ) + 1 : ( Math.random() * -2 ) - 1;
      this.velocities.push( velocity );
    }
  }

  update( index, mouse, projectMouse, xCamera ) {

    const scale = Math.min( 1, Math.max( 0.8, isNaN(this.mesh.position.x / xCamera) ? 1 : this.mesh.position.x / xCamera ) );

    this.mesh.scale.set(
      this.mesh.scale.x + ( ( scale - this.mesh.scale.x ) * 0.1 ),
      this.mesh.scale.y + ( ( scale - this.mesh.scale.y ) * 0.1 ),
      this.mesh.scale.z + ( ( scale - this.mesh.scale.z ) * 0.1 )
    );

    // this.uniforms.opacity.value += ( 0.5 - this.uniforms.opacity.value ) * 0.1;

    if ( index === this.index ) {

      this.mesh.rotation.x += ( ( mouse.y / window.innerHeight ) - this.mesh.rotation.x ) * 0.2;
      this.mesh.rotation.y += ( ( mouse.x / window.innerWidth ) - this.mesh.rotation.y ) * 0.2;

      this.uniforms.mouse.value = new Vector2( projectMouse.x, projectMouse.y );
      this.uniforms.active.value += ( 1 - this.uniforms.active.value ) * 0.1;

      // this.mesh.scale.set(
      //   this.mesh.scale.x + ( ( 1 - this.mesh.scale.x ) * 0.1 ),
      //   this.mesh.scale.y + ( ( 1 - this.mesh.scale.y ) * 0.1 ),
      //   this.mesh.scale.z + ( ( 1 - this.mesh.scale.z ) * 0.1 )
      // );
      //
      this.uniforms.opacity.value += ( 0.5 - this.uniforms.opacity.value ) * 0.1;

    } else {

      this.mesh.rotation.x = 0;
      this.mesh.rotation.y = 0;

      this.uniforms.mouse.value = new Vector2( 0 );
      this.uniforms.active.value += ( 0 - this.uniforms.active.value ) * 0.1;

      // this.mesh.scale.set(
      //   this.mesh.scale.x + ( ( 0.8 - this.mesh.scale.x ) * 0.1 ),
      //   this.mesh.scale.y + ( ( 0.8 - this.mesh.scale.y ) * 0.1 ),
      //   this.mesh.scale.z + ( ( 0.8 - this.mesh.scale.z ) * 0.1 )
      // );
      //
      this.uniforms.opacity.value += ( 0.25 - this.uniforms.opacity.value ) * 0.1;

    }

    if ( this.start ) {
      const positions = this.geometry.attributes.position.array;

      for (let i = positions.length - 1, j = 0; i > positions.length / 2; i -= 18, j += 1) {
        positions[i] -= 0.01 * this.velocities[j] * 10;
        positions[i - 1] -= 0.01 * Math.abs( this.velocities[j] * 10 );
        positions[i - 2] -= 0.01 * this.velocities[j] * 10;

        positions[i - 3] -= 0.01 * this.velocities[j] * 10;
        positions[i - 4] -= 0.01 * Math.abs( this.velocities[j] * 10 );
        positions[i - 5] -= 0.01 * this.velocities[j] * 10;

        positions[i - 6] -= 0.01 * this.velocities[j] * 10;
        positions[i - 7] -= 0.01 * Math.abs( this.velocities[j] * 10 );
        positions[i - 8] -= 0.01 * this.velocities[j] * 10;

        positions[i - 9] -= 0.01 * this.velocities[j] * 10;
        positions[i - 10] -= 0.01 * Math.abs( this.velocities[j] * 10 );
        positions[i - 11] -= 0.01 * this.velocities[j] * 10;

        positions[i - 12] -= 0.01 * this.velocities[j] * 10;
        positions[i - 13] -= 0.01 * Math.abs( this.velocities[j] * 10 );
        positions[i - 14] -= 0.01 * this.velocities[j] * 10;

        positions[i - 15] -= 0.01 * this.velocities[j] * 10;
        positions[i - 16] -= 0.01 * Math.abs( this.velocities[j] * 10 );
        positions[i - 17] -= 0.01 * this.velocities[j] * 10;
      }

      this.geometry.attributes.position.needsUpdate = true;
    }
  }
}
