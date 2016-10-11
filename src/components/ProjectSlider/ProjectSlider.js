import assets from 'config/assets';
import Emitter from 'core/Emitter';
import Webgl from 'utils/webgl/Webgl';
import Project from 'objects/Project';
import projects from 'datas/projects';
import { TimelineLite, TweenLite } from 'gsap';
import { Box3, Vector2 } from 'three';
import raf from 'raf';


import './projectSlider.styl';
import template from './projectSlider.html';


export default Vue.extend({

  template,

  data() {

    return {
      // bound_onCanvasMousemove: this.onCanvasMousemove.bind(this),
      cameraTarget: 0,
      displayGreyLine: false,
      height: 56,
      index: 0,
      mouse: new Vector2(),
      offset: 2,
      canvasMouse: {
        currentDirection: '',
        initialCamera: 0,
        initialX: 0,
        oldX: 0,
        xDirection: '',
      },
      projectMouse: new Vector2(),
      projects: [],
      width: 112,
    };
  },

  created() {
    this.webgl = new Webgl( window.innerWidth, window.innerHeight );

    this.emitter = Emitter;
    this.emitter.on('loader-end', this.zoomIn);
    this.emitter.on('global-mousemove', this.onMousemove);
    this.emitter.on('global-resize', this.onResize);
    this.emitter.on('textureLoaded', this.textureLoaded);

    document.addEventListener( 'keyup', this.onKeyup, false);
  },

  mounted() {
    this.$refs.canvas.appendChild( this.webgl.renderer.domElement );
    this.animate();

    // setTimeout( () => {
    //   this.projects[0].scale.set(
    //     0.5, 1, 1
    //   );
    //   const bbox = new Box3().setFromObject( this.projects[0] );
    //   console.log(bbox);
    //   this.webgl.camera.position.z = 2 * Math.atan( ( this.width * 2 / this.webgl.camera.aspect ) / ( 2 * this.webgl.camera.position.z ) ) * ( 180 / Math.PI );
    // }, 7000);
  },

  methods: {

    animate() {

      raf(this.animate);

      if ( this.projects.length > 0 ) {

        this.webgl.camera.position.x += ( this.cameraTarget - this.webgl.camera.position.x ) * 0.05;

        for ( let i = 0; i < this.projects.length; i += 1 ) {
          this.projects[i].update( this.index, this.mouse, this.projectMouse, this.webgl.camera.position.x );
        }

      }

      this.webgl.render();
    },

    createProject( texture ) {
      this.projects.push( new Project( this.width, this.height, this.offset, texture, this.projects.length ) );
      this.webgl.scene.add( this.projects[this.projects.length - 1] );
    },

    goToNextProject() {
      if ( this.index < this.projects.length - 1 ) {
        this.index += 1;
        this.cameraTarget = this.projects[this.index].children[0].position.x;
      }
    },

    goToPreviousProject() {
      if ( this.index > 0 ) {
        this.index -= 1;
        this.cameraTarget = this.projects[this.index].children[0].position.x;
      }
    },

    onKeyup( event ) {

      if ( event.keyCode === 39 ) {
        this.goToNextProject();
      }

      if ( event.keyCode === 37 ) {
        this.goToPreviousProject();
      }

    },

    onCanvasMousemove( event ) {

      if ( this.canvasMouse.oldX < event.pageX ) {
        this.canvasMouse.xDirection = 'right';
      } else {
        this.canvasMouse.xDirection = 'left';
      }

      if ( this.canvasMouse.xDirection !== this.canvasMouse.currentDirection ) this.canvasMouse.initialX = event.PageX;

      this.canvasMouse.oldX = event.pageX;
      this.canvasMouse.currentDirection = this.canvasMouse.xDirection;

      const offset = this.canvasMouse.oldX - this.initialX;
      const startPosition = 0;
      const endPosition = this.projects[this.projects.length - 1].children[0].position.x;

      let position = this.initialCamera + offset < 0 ? startPosition : this.initialCamera + offset;
      position = position > endPosition ? endPosition : position;

      this.cameraTarget = position;

    },

    onMousedown( event ) {
      this.initialCamera = this.webgl.camera.position.x;
      this.initialX = event.pageX;

      this.$refs.canvas.addEventListener( 'mousemove', this.bound_onCanvasMousemove, false );
    },

    onMousemove( event ) {

      this.mouse.x = ( event.clientX - ( window.innerWidth / 2 ) ) * -0.3;
      this.mouse.y = ( event.clientY - ( window.innerHeight / 2 ) ) * -0.3;

      // this.projectMouse.x = event.clientX - ( window.innerWidth / 2 );
      // this.projectMouse.y = event.clientY - ( window.innerHeight / 2 );
      this.projectMouse.x = event.clientX;
      this.projectMouse.y = event.clientY;
    },

    onMouseup() {
      this.$refs.canvas.removeEventListener( 'mousemove', this.bound_onCanvasMousemove, false );
    },

    onResize() {
      this.webgl.resize( window.innerWidth, window.innerHeight );
    },

    textureLoaded( textureId ) {
      for ( let i = 0; i < assets.textures.length; i += 1 ) {

        if ( assets.textures[i].id === textureId ) {
          this.createProject( assets.textures[i].media );
        }

        if ( i === assets.textures.length - 1 ) {
          this.$refs.whiteline.style.width = `${window.innerWidth / assets.textures.length}px`;
        }
      }
    },

    zoomIn() {
      const tl = new TimelineLite();
      const project = this.projects.length > 1 ? this.projects[1].children[0] : {};

      this.displayGreyLine = true;

      tl.fromTo(
        this.$refs.canvas,
        1,
        {
          opacity: 0,
          x: '100%',
        },
        {
          opacity: 1,
          x: '0%',
          ease: Power2.easeOut,
        }
      )
      .to(
        this.webgl.camera.position,
        1,
        {
          z: 100,
          ease: Power2.easeOut,
        },
        '-=1'
      )
      .to(
        this.$refs.whiteline,
        1,
        {
          scaleX: 2,
          ease: Power2.easeOut,
        },
        '-=1'
      )
      .to(
        this.$refs.navigation,
        2,
        {
          opacity: 1,
          ease: Power2.easeOut,
        }
      )
      .to(
        project.position,
        2,
        {
          x: '-=50',
        },
        '-=2'
      );
    },

  },

  components: {},
});
