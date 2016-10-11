export default class MouseDrag {

  constructor( element ) {
    this.element = element;

    this.xDirection = '';
    this.yDirection = '';
    this.oldX = 0;
    this.oldY = 0;
    this.flag = 0;

    this.element.addEventListener( 'mousedown', this.onMouseDown.bind(this), false );
    this.element.addEventListener( 'mouseup', this.onMouseUp.bind(this), false );
  }

  onMouseDown() {
    this.element.addEventListener( 'mousemove', this.getMouseDirection, false );
  }

  onMouseUp() {
    this.element.removeEventListener( 'mousemove', this.getMouseDirection, false );
  }

  getMouseDirection(e) {

    if ( this.oldX < e.pageX ) {
      this.xDirection = 'right';
    } else {
      this.xDirection = 'left';
    }

    if ( this.oldY < e.pageY ) {
      this.yDirection = 'down';
    } else {
      this.yDirection = 'up';
    }

    this.oldX = e.pageX;
    this.oldY = e.pageY;

    console.log(this.xDirection + " " + this.yDirection);
  }

}
