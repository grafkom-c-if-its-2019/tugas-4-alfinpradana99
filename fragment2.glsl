precision mediump float;
varying vec3 fNormal;
varying vec3 fPosition;
varying vec2 fTexCoord;
uniform vec3 lightColor;
uniform vec3 lightPosition;
uniform vec3 ambientColor;
uniform sampler2D sampler0;

void main() {

  vec4 tex0 = texture2D(sampler0, fTexCoord); 
  vec3 lightDirection = lightPosition - fPosition;
  lightDirection = normalize(lightDirection);

  vec3 normal = normalize(fNormal);

  float lightIntensity = max(dot(lightDirection, -normal), 0.0);

  float specularPower = 120.0;
  float specular = 0.0;
  if (lightIntensity > 0.0){

    vec3 viewVec = vec3(0.0, 0.251, 1.0);

    vec3 reflectVec = reflect(-lightDirection, normal);

    float specularFactor = max(dot(reflectVec, viewVec), 0.0);
    specular = pow(specularFactor, specularPower);
  }

  vec3 diffuse = lightColor * tex0.rgb * lightIntensity + specular;

  vec3 ambient = ambientColor * tex0.rgb;

  gl_FragColor = vec4(diffuse + ambient, 1.0);
}


