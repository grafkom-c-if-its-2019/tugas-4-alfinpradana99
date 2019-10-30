attribute vec2 vPosition;
attribute vec3 vColor;
varying vec3 fColor;
uniform float theta1;
void main() {
  fColor = vColor;
  mat4 rotasi = mat4(
    cos(theta1), -sin(theta1), 0.0, +0.5*cos(theta1) -0.5,
    sin(theta1), cos(theta1), 0.0, +0.5*sin(theta1),
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  gl_Position = vec4(vPosition, 0.0, 1.0) * rotasi;
}
