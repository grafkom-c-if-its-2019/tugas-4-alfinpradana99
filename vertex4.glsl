attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float scale1;

void main() {
  fColor = vColor;
  mat4 skalasi = mat4(
    scale1, 0.0, 0.0, 0.3,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  gl_Position = (vec4(vPosition, 0.0, 1.0)-vec4(0.4,0,0,0)) * skalasi+vec4(0.4,0,0,0);
}
