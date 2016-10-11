uniform float active;
uniform vec3 color;
uniform sampler2D map;
uniform vec2 mouse;
uniform float opacity;
uniform vec2 resolution;

varying vec2 vUv;
varying vec3 pos;

void main() {

  vec4 texture = texture2D( map, vUv );

  float mouseOpacity = min( 0.5, distance( mouse / resolution.xy, gl_FragCoord.xy / resolution.xy ) );

  vec4 color = vec4( texture.rgb, opacity + ( mouseOpacity * active ) );
  // vec4 color = vec4(mouseOpacity);

  // vec4 color = vec4(pos.x);
  // if (pos.x < 10.) {
  //   color = vec4(1.,0.,0.,1.);
  // }

  gl_FragColor = vec4(color);

}
