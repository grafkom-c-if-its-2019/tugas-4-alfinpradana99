var gerakdua = [0.0, 0.0, 0.0];
var xAdder = 0.02;
var yAdder = 0.03;
var zAdder = 0.04;


(function(global) {
  var canvas, gl;
  var program, program2;
  glUtils.SL.init({ callback: function() { main(); } });
  
  function main() {
      canvas = document.getElementById("glcanvas");
      gl = glUtils.checkWebGL(canvas);
      // Register Callbacks
      window.addEventListener('resize', resizer);
  
      // huruf bercahaya
      var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
      var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
      // kubus tekstur
      var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
      var fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
 
      program = glUtils.createProgram(gl, vertexShader, fragmentShader);
      program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader2);

      var theta = [0.0, 0.0, 0.0];
      var axis = 0;
      var xAxis = 0;
      var yAxis = 1;
      var zAxis = 2;

      function listener(){
        function onKeyPress(event) {
          if (event.keyCode == 88 || event.keyCode == 120) {
            axis = xAxis;
          } else if (event.keyCode == 89 || event.keyCode == 121) {
            axis = yAxis;
          } else if (event.keyCode == 90 || event.keyCode == 122) {
            axis = zAxis;
          }
        }
        document.addEventListener('keypress', onKeyPress);
    
        var lastX, lastY;
        function onMouseDown(event){
          var x = event.clientX;
          var y = event.clientY;
          var rect = event.target.getBoundingClientRect();
          if (rect.left <= x &&
              rect.right > x &&
              rect.top <= y &&
              rect.bottom > y) {
                lastX = x;
                lastY = y;
                dragging = true;
          }
        }
        function onMouseUp(event) {
          dragging = false;
        }
        function onMouseMove(event) {
          var x = event.clientX;
          var y = event.clientY;
          if (dragging) {
            var factor = 5 / canvas.height;
            var dx = factor * (x-lastX);
            var dy = factor * (y-lastY);
            theta[yAxis] += dx;
            theta[xAxis] += dy;
          }
          lastX = x;
          lastY = y;
        }
        document.addEventListener('mousedown',onMouseDown);
        document.addEventListener('mouseup',onMouseUp);
        document.addEventListener('mousemove',onMouseMove);
      }

      function cube(){
        gl.useProgram(program2);
        var cubeVertices = [
          // x, y, z            u, v         normal
    
          // -0.5,  0.5,  0.5,     0.0, 1.0,  0.0, 0.0, 1.0, // depan, merah, BAD BDC
          // -0.5, -0.5,  0.5,     0.0, 0.0,  0.0, 0.0, 1.0, 
          //  0.5, -0.5,  0.5,     1.0, 0.0,  0.0, 0.0, 1.0, 
          // -0.5,  0.5,  0.5,     0.0, 1.0,  0.0, 0.0, 1.0, 
          //  0.5, -0.5,  0.5,     1.0, 0.0,  0.0, 0.0, 1.0, 
          //  0.5,  0.5,  0.5,     1.0, 1.0,  0.0, 0.0, 1.0, 
    
          0.5,  0.5,  0.5,     0.0, 1.0,  1.0, 0.0, 0.0, // kanan, hijau, CDH CHG
          0.5, -0.5,  0.5,     0.0, 0.0,  1.0, 0.0, 0.0,
          0.5, -0.5, -0.5,     0.2, 0.0,  1.0, 0.0, 0.0,
          0.5,  0.5,  0.5,     0.0, 1.0,  1.0, 0.0, 0.0,
          0.5, -0.5, -0.5,     0.2, 0.0,  1.0, 0.0, 0.0,
          0.5,  0.5, -0.5,     0.2, 1.0,  1.0, 0.0, 0.0,
   
          0.5, -0.5,  0.5,     0.2, 1.0,  0.0, -1.0, 0.0, // bawah, biru, DAE DEH
         -0.5, -0.5,  0.5,     0.2, 0.0,  0.0, -1.0, 0.0,
         -0.5, -0.5, -0.5,     0.4, 0.0,  0.0, -1.0, 0.0,
          0.5, -0.5,  0.5,     0.2, 1.0,  0.0, -1.0, 0.0,
         -0.5, -0.5, -0.5,     0.4, 0.0,  0.0, -1.0, 0.0,
          0.5, -0.5, -0.5,     0.4, 1.0,  0.0, -1.0, 0.0,
   
         -0.5, -0.5, -0.5,     0.4, 1.0,  0.0, 0.0, -1.0, // belakang, kuning, EFG EGH
         -0.5,  0.5, -0.5,     0.4, 0.0,  0.0, 0.0, -1.0,
          0.5,  0.5, -0.5,     0.6, 0.0,  0.0, 0.0, -1.0,
         -0.5, -0.5, -0.5,     0.4, 1.0,  0.0, 0.0, -1.0,
          0.5,  0.5, -0.5,     0.6, 0.0,  0.0, 0.0, -1.0,
          0.5, -0.5, -0.5,     0.6, 1.0,  0.0, 0.0, -1.0,
   
         -0.5,  0.5, -0.5,     0.6, 1.0,  -1.0, 0.0, 0.0, // kiri, cyan, FEA FAB
         -0.5, -0.5, -0.5,     0.6, 0.0,  -1.0, 0.0, 0.0,
         -0.5, -0.5,  0.5,     0.8, 0.0,  -1.0, 0.0, 0.0,
         -0.5,  0.5, -0.5,     0.6, 1.0,  -1.0, 0.0, 0.0,
         -0.5, -0.5,  0.5,     0.8, 0.0,  -1.0, 0.0, 0.0,
         -0.5,  0.5,  0.5,     0.8, 1.0,  -1.0, 0.0, 0.0,
   
          0.5,  0.5, -0.5,     0.8, 1.0,  0.0, 1.0, 0.0, // atas, magenta, GFB GBC
         -0.5,  0.5, -0.5,     0.8, 0.0,  0.0, 1.0, 0.0,
         -0.5,  0.5,  0.5,     1.0, 0.0,  0.0, 1.0, 0.0,
          0.5,  0.5, -0.5,     0.8, 1.0,  0.0, 1.0, 0.0,
         -0.5,  0.5,  0.5,     1.0, 0.0,  0.0, 1.0, 0.0,
          0.5,  0.5,  0.5,     1.0, 1.0,  0.0, 1.0, 0.0
        ];
        
      function render(){
        gl.clearColor(0, 0, 0, 1);
        gl.colorMask(true,true,true,true);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);
        drawtriangle();
        gl.drawArrays(gl.TRIANGLE_STRIP,0,9);

        gl.useProgram(program2);
        drawtriangle2();
        gl.drawArrays(gl.TRIANGLE_STRIP,0,4);

        gl.useProgram(program3);
        thetaCube = [10, 10, 0];
        gl.uniform3fv(thetaLocCube, thetaCube);

        drawcube();

        gl.drawArrays(gl.LINES,0,24);
        
        requestAnimationFrame(render);
      }

      function drawcube(){
        var cubeVertices = [
          //BAWAH
            -0.3,  -0.8,  0.7,      255, 255, 255,          
            0.4,  -0.8,  0.7,       255, 255, 255,          
            0.4,  -0.8,  0.7,       255, 255, 255,          
            0.4,  -0.8,  -0.6,      255, 255, 255,          
            0.4,  -0.8,  -0.6,      255, 255, 255,          
            -0.3,  -0.8,  -0.6,     255, 255, 255,          
            -0.3,  -0.8,  -0.6,     255, 255, 255,          
            -0.3,  -0.8,  0.7,      255, 255, 255,          
            //ATAS
            -0.3,  0.6,  0.7,       255,255, 255,          
            0.4,  0.6,  0.7,        255,255, 255,       
            0.4,  0.6,  0.7,        255,255, 255,         
            0.4,  0.6,  -0.6,      255,255, 255,          
            0.4,  0.6,  -0.6,       255,255, 255,          
            -0.3,  0.6,  -0.6,      255,255, 255,          
            -0.3,  0.6,  -0.6,      255,255, 255,          
            -0.3,  0.6,  0.7,       255,255, 255,          
            //BELAKANG
            -0.3,  -0.8,  0.7,      255,255, 255,            
            -0.3,  0.6,  0.7,       255,255, 255,           
            0.4,  -0.8,  0.7,      255,255, 255,            
            0.4,  0.6,  0.7,        255,255, 255,            
            //DEPAN
            0.4,  -0.8,  -0.6,      255,255, 255,            
            0.4,  0.6,  -0.6,       255,255, 255,           
            -0.3,  -0.8,  -0.6,     255,255, 255,            
            -0.3,  0.6,  -0.6,      255,255, 255             
      ];
      
      var cubeVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);


      var vPosition = gl.getAttribLocation(program2, 'vPosition');
      var vTexCoord = gl.getAttribLocation(program2, 'vTexCoord');
      var vNormal = gl.getAttribLocation(program2, 'vNormal');

      
      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        3,          // jumlah elemen per attribute
        gl.FLOAT,   // tipe data atribut
        gl.FALSE,
        8 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
        0                                   // offset dari posisi elemen di array
      );

      gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, gl.FALSE, 
        8 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
      gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, gl.FALSE, 
        8 * Float32Array.BYTES_PER_ELEMENT, 5 * Float32Array.BYTES_PER_ELEMENT);

      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vTexCoord);
      gl.enableVertexAttribArray(vNormal);

      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        3,          // jumlah elemen per attribute
        gl.FLOAT,   // tipe data atribut
        gl.FALSE,
        8 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
        0                                   // offset dari posisi elemen di array
      );

      gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, gl.FALSE, 
        8 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
      gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, gl.FALSE, 
        8 * Float32Array.BYTES_PER_ELEMENT, 5 * Float32Array.BYTES_PER_ELEMENT);

      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vTexCoord);
      gl.enableVertexAttribArray(vNormal);

      var lightColorLoc = gl.getUniformLocation(program2, 'lightColor');
      var lightPositionLoc = gl.getUniformLocation(program2, 'lightPosition');
      var ambientColorLoc = gl.getUniformLocation(program2, 'ambientColor');
      var lightColor = [2., 2., 2.];

      var shine = gl.getUniformLocation(program2,'shininess');
      var s = 0.05;

      var lightPosition = [0 + gerakdua[0] ,0 + gerakdua[1] ,0 + gerakdua[2]];
      var ambientColor = glMatrix.vec3.fromValues(0.17, 0.41, 0.91);
      gl.uniform3fv(lightColorLoc, lightColor);
      gl.uniform3fv(lightPositionLoc, lightPosition);
      gl.uniform3fv(ambientColorLoc, ambientColor);
      gl.uniform1f(shine, s);

      var nmLoc = gl.getUniformLocation(program2, 'normalMatrix');

      var vmLoc = gl.getUniformLocation(program2, 'view');
      var pmLoc = gl.getUniformLocation(program2, 'projection');
      var mmLoc = gl.getUniformLocation(program2, 'model');
      var vm = glMatrix.mat4.create();
      var pm = glMatrix.mat4.create();

      glMatrix.mat4.lookAt(vm,
        glMatrix.vec3.fromValues(0.0, 0.0, 1.5),
        glMatrix.vec3.fromValues(0.0, 0.0, 0.0),
        glMatrix.vec3.fromValues(0.0, 1.0, 0.0)
      );

      var fovy = glMatrix.glMatrix.toRadian(90.0);
      var aspect = canvas.width / canvas.height;
      var near = 0.1;
      var far = 10.0;
      glMatrix.mat4.perspective(pm,
        fovy,
        aspect,
        near,
        far
      );

      gl.uniformMatrix4fv(vmLoc, false, vm);
      gl.uniformMatrix4fv(pmLoc, false, pm);

      // theta[axis] += glMatrix.glMatrix.toRadian(0.5);  // dalam derajat
      var mm = glMatrix.mat4.create();
      glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -0.2]);
      glMatrix.mat4.rotateX(mm, mm, theta[xAxis]);
      glMatrix.mat4.rotateY(mm, mm, theta[yAxis]);
      glMatrix.mat4.rotateZ(mm, mm, theta[zAxis]);
      gl.uniformMatrix4fv(mmLoc, false, mm);

      // Perhitungan modelMatrix untuk vektor normal
      var nm = glMatrix.mat3.create();
      glMatrix.mat3.normalFromMat4(nm, mm);
      gl.uniformMatrix3fv(nmLoc, false, nm);

    }

      function drawtriangle(){
        var triangleVertices = [
          0.1, -0.3, 0.4,0.0,1.0,
          0.4, 0.6, 0.7,1.0,0.6,
          0.2, -0.3, 0.3,1.0,0.6,
          0.45, 0.6, 1.0,1.0,0.0,
          0.4, 0.4, 0.4,0.0,1.0,
          0.5, 0.4, 2.0,1.0,0.0,
          0.45, 0.4, 0.2,0.0,1.0,
          0.7, -0.3, 1.0,1.0,0.0,
          0.6, -0.3, 0.4,0.0,1.0
        ];

        var triangleVertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

        var vPosition = gl.getAttribLocation(program,'vPosition');
        var vColor = gl.getAttribLocation(program,'vColor');
        gl.vertexAttribPointer(
          vPosition,                          
          2,                                  // jumlah elemen per attribute
          gl.FLOAT,                           // tipe data attribut
          gl.FALSE,                           // default
          5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
          0                                   // offset dari posisi elemen di array
        );
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
          5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

          if(trans[0] >= 0.4*0.8 || trans[0] <= -0.3*0.8 ){
            X *= -1;
          }
          trans[0] += X;
    
          if(trans[1] >= 0.6*0.8 || trans[1] <= -0.8*0.8 ){
            Y *= -1;
          }
          trans[1] += Y;
    
          if(trans[2] >= 0.7*0.8 || trans[2] <= -0.6*0.8){
            Z *= -1;
          }
          trans[2] += Z;
    
          gl.uniform3fv(transLoc, trans);


        thetaA[1] += 0.191;
        gl.uniform3fv(thetaLoc, thetaA);

        gl.enableVertexAttribArray(vPosition);
        gl.enableVertexAttribArray(vColor);
      }

      function drawtriangle2(){
        var triangleVertices2 = [
          0.27, 0, 0.7,1.0,0.6,
          0.54, 0, 0.3,1.0,0.2,
          0.31, 0.1, 0.2,0.0,1.0,
          0.53, 0.1, 0.2,1.0,0.7
        ];
        var triangleVertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices2), gl.STATIC_DRAW);

        var vPosition = gl.getAttribLocation(program2,'vPosition');
        var vColor = gl.getAttribLocation(program2,'vColor');
        gl.vertexAttribPointer(
          vPosition,                       
          2,                                  // jumlah elemen per attribute
          gl.FLOAT,                           // tipe data attribut
          gl.FALSE,                           // default
          5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap vertex
          0                                   // offset dari posisi elemen di array
        );
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
          5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);

          if(trans1[0] >= 0.4*0.8 || trans1[0] <= -0.3*0.8 ){
            X1 *= -1;
          }
          trans1[0] += X1;
    
          if(trans1[1] >= 0.6*0.8 || trans1[1] <= -0.8*0.8 ){
            Y1 *= -1;
          }
          trans1[1] += Y1;
    
          if(trans1[2] >= 0.7*0.8 || trans1[2] <= -0.6*0.8){
            Z1 *= -1;
          }
          trans1[2] += Z1;
    
          gl.uniform3fv(transLoc1, trans1);


        thetaA1[1] += 0.191;
        gl.uniform3fv(thetaLoc1, thetaA1);

        gl.enableVertexAttribArray(vPosition);
        gl.enableVertexAttribArray(vColor);

      }

      resizer();
      render();
  }
    function resizer() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }
  
  })(window || this);