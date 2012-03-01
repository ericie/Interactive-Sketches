//uniform float attScale;
//uniform float radius;
//varying float dist;

attribute float size;
attribute vec3 pCol;
varying vec3 col;

void main()
{	
	//gl_TexCoord[0] = uv;
	vec4 ecPos = modelViewMatrix * vec4(position, 1.);
	gl_Position = projectionMatrix * ecPos;
   
	//particle attenuation
//	dist = attScale/length(ecPos);	
   col = pCol; // vec3( 1., 1., 0.);//
	gl_PointSize = size;//15.;//clamp( radius * dist, 1.0, 120.0);
}