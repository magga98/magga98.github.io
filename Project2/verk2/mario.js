var gl;
var points;

var locPosition;
var locColor;
var bufferIdA;
var bufferIdB;
var colorA = vec4(1.0, 0.0, 0.0, 1.0);
var colorB = vec4(0.0, 1.0, 0.0, 1.0);

var bottom = -0.98;
//1=haegri & 0=vinstri
var look = 1;
var count = 0;

var state = 0;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }


    var mario = [ vec2( -0.98, -0.84), vec2( -0.98, -0.68), vec2( -0.91, -0.76) ];


    //var ground = [ vec2(-1.0, -0.84), vec2(-1.0, -1.0), vec2(1.0, -1.0), vec2(1.0, -0.84)];

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.2, 0.5, 0.6 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU


    bufferIdA = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdA );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(mario), gl.DYNAMIC_DRAW );

    //bufferIdB = gl.createBuffer();
    //gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdB );
    //gl.bufferData( gl.ARRAY_BUFFER, flatten(ground), gl.STATIC_DRAW );
    // Associate out shader variables with our data buffer

    locPosition = gl.getAttribLocation( program, "vPosition" );
    gl.enableVertexAttribArray( locPosition );
    locColor = gl.getUniformLocation( program, "rcolor");

    // Event listener for keyboard
    window.addEventListener("keydown", function(init){
        switch( init.keyCode ) {
            case 37:	// vinstri �r
                if ((mario[2][0] <= -0.98)||(mario[0][0] <= -0.90)){
                  xmove = 0;
                }
                else if (look == 1){
                  mario[2][0] += -0.14;
                  xmove = -0.01;
                  look += -1;
                }
                else{
                  xmove = -0.04;
                }
                break;
            case 39:	// h�gri �r
                if (mario[2][0] >= 0.94){
                  xmove = 0;
                }
                else if (look == 0){
                  mario[2][0] += 0.14;
                  xmove = 0.01;
                  look += 1;

                }
                else{
                  xmove = 0.04;
                }
                break;
            case 38: //Hoppa/upp
                if (look == 0){
                  for(i=0; i<3; i++) {
                    mario[i][0] += -0.1;
                    mario[i][1] += 0.4;
                  }
                }
                else{
                  for(i=0; i<3; i++) {
                    mario[i][0] += 0.1;
                    mario[i][1] += 0.4;
                  }
                }
                break;
            default:
                xmove = 0.0;
        }
        for(i=0; i<3; i++) {
          mario[i][0] += xmove;
        }

        gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(mario));
    } );


    render();
};


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    //Draw mario
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdA);
    gl.vertexAttribPointer( locPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.uniform4fv( locColor, flatten(colorA));
    gl.drawArrays( gl.TRIANGLES, 0, 3 );
    window.requestAnimFrame(render);
    //Draw ground
    //gl.bindBuffer( gl.ARRAY_BUFFER, bufferIdB);
    //gl.vertexAttribPointer( locPosition, 2, gl.FLOAT, false, 0, 0 );
    //gl.uniform4fv( locColor, flatten(colorB));
    //gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );

}
