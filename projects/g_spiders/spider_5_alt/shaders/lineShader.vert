
void main()
{	
   vec4 ecPos = modelViewMatrix * vec4(position, 1.);
	gl_Position = projectionMatrix * ecPos;
}