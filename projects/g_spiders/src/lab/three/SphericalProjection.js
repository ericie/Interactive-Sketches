/** @namespace LAB.three */
LAB.three = LAB.three || {};

/** 
 @constructor 
 @extends THREE.MeshShaderMaterial
 */

ImageObject = function(){
   
   this.mat = new THREE.Matrix4();
   this.quat = new THREE.Quaternion();
   this.scale = new THREE.Vector3( 100, 100, 100 );
   this.rotation = new THREE.Quaternion();
   this.mesh = null;
   this.shader = null;
   this.longitude = 0;
   this.latitude = 0;
   this.lonQuat = new THREE.Quaternion();
   this.latQuat = new THREE.Quaternion();
   this.rotation.setFromEuler( {x:0, y:0, z:0} );
   this.latQuat.setFromEuler( {x:0, y:0, z:0} );
   this.lonQuat.setFromEuler( {x:0, y:0, z:0} );
   this.bIsMesh = false;
   
   this.setRotation = function( x, y, z ){
      //This is ment to be used for rotation on the surface. I would just use z if I were you. 
      //x and y will be harder to control,
      //but they could be used in place of longitude and latitude so left em in
      if(this.bIsMesh){
         this.rotation.x = z;//this is DIRTY quick hack
      }else{
         this.rotation.setFromEuler( {x: x||0, y: y||0, z:z||0 } );
      }
      this.update();
   }
   
   this.setLL = function( latitude, longitude ){
      this.latitude = latitude;
      this.longitude = longitude;
         
      this.update();
   }
   
   this.update = function()
   {
      if(this.bIsMesh && this.mesh != null){
         this.quat.setFromEuler( {x: this.rotation.x, y: -this.longitude * 2, z: -this.latitude *2} );
         
         this.mesh.matrix.setTranslation( 100, 0, 0);
         this.mesh.matrix.scale( this.scale );

      }else{
         this.lonQuat.setFromEuler( {x: 0, y: 0, z: this.longitude * 2 + 180 } );
         this.latQuat.setFromEuler( {x: 0, y: 2 * (this.latitude - 90), z: 0} );
         this.quat.copy( this.rotation );
         this.quat.multiplySelf( this.latQuat );
         this.quat.multiplySelf( this.lonQuat );
      }
      
      this.mat.setRotationFromQuaternion( this.quat );
   }
   
   this.setScale = function( scl ){
         this.scale.set( scl.x || this.scale.x, scl.y || this.scale.y, scl.z || this.scale.z );
   }
   
   this.setCartesian = function( v, up ){
      this.mat.lookAt( v, {x:0, y:0, z:0}, up || {x:0, y:-1, z:0} );
   }
};

LAB.three.SphericalProjection = function ( parameters ) {
   
   parameters = parameters || {};
   
   this.width = parameters.width || window.innerWidth;
   this.height = parameters.height || window.innerHeight;
   
   this.fbo = parameters.fbo || new THREE.WebGLRenderTarget( parameters.fboSize || 1024, parameters.fboSize || 1024,{  minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBAFormat });
   
   this.discScene = new THREE.Scene();
   this.backgroundScene = new THREE.Scene();
   this.debugScene = new THREE.Scene();
   
   //cameras
   this.debugCam = new THREE.Camera(60, window.innerWidth/window.innerHeight);
   this.debugCam.position.set( 220, 10, 0 );
   this.debugCam.target.position.set( 0, 0, 0 );
   
   this.orthoCamera = new THREE.OrthoCamera( -this.width/2, this.width/2, this.height/2, -this.height/2, -300, 300 );
   
   //shaders
   this.globalUniforms = {
      equatorAdjust: { type: "f", value:  .5 }, //.467 },
   imageSize:  { type: "v2",  value: { x: this.width, y: this.height }}, 
   };
   
   this.renderStack = [];
   
   
   //debug      
   var debugShader = new LAB.three.Shader({
                                          name: 'shaders/debugGlobe',
                                          uniforms: {
                                          imageSize:  this.globalUniforms.imageSize, 
                                          equatorAdjust:  this.globalUniforms.equatorAdjust,
                                          discTex:  { type: "t",   value: 0, texture: this.fbo },
                                          }
                                          });
   
//   debugShader.wireframe = true;
//   debugShader.wireframeLinewidth = 4;
   var loader = new THREE.JSONLoader();
   var scn = this.debugScene;
   var onGeometry = function( geometry, scene ) {
      geometry.computeFaceNormals();
      
      var debugGlobe = new THREE.Mesh( geometry, debugShader );
      debugGlobe.doubleSided = true;
      scn.addObject( debugGlobe );
   };
   loader.load( { model: "models/globeMesh.js", callback: onGeometry } );
   
};

LAB.three.SphericalProjection.prototype.addBackground = function( texture ){
   
   var bckgrdGeo = new THREE.PlaneGeometry( 180, 360, 60, 120 );
   var bckgrdShader = new LAB.three.Shader({
                                           name: 'shaders/discTex',
                                           uniforms: {
                                           equatorAdjust:  this.globalUniforms.equatorAdjust,
                                           imageSize:  this.globalUniforms.imageSize,
                                           tex: { type: "t", value: 0, texture: texture },
                                           }});
   var bckgrd = new THREE.Mesh( bckgrdGeo, bckgrdShader );
   bckgrd.doubleSided = true;
   this.backgroundScene.addObject( bckgrd );
   
   return bckgrd;
}

LAB.three.SphericalProjection.prototype.addImage = function( texture, latitude, longitude, scale ){   
   var imgObj = new ImageObject();
   imgObj.setScale( scale || {x:100, y:100} );
   imgObjShader = new LAB.three.Shader({
                                       name: 'shaders/worldToDisc_2',
                                       uniforms: {
                                       tex: { type: "t", value: 0, texture: texture},
                                       equatorAdjust:  this.globalUniforms.equatorAdjust,
                                       imageSize:  this.globalUniforms.imageSize,
                                       imgMatrix: { type: "m4", value: imgObj.mat },
                                       scale:  { type: "v2", value: imgObj.scale },
                                       }});
   imgObj.mesh = new THREE.Mesh( new THREE.PlaneGeometry( 2, 2, 2, 2 ), imgObjShader );
   
   imgObj.setLL( latitude || 0, longitude  || 0);
   
   this.discScene.addObject( imgObj.mesh );
   
   return imgObj;
}


LAB.three.SphericalProjection.prototype.loadMesh = function( location, latitude, longitude, scale, color, alpha, pos, _shader, onload ){
   var scn = this.discScene;
   var outObj = new ImageObject();
   outObj.bIsMesh = true;
   outObj.setLL( latitude, longitude );
   outObj.scale.copy( scale || {x:1, y:1, z:1 } );
   var shader = _shader || this.createMeshShader( outObj, color, alpha );
   var loader = new THREE.JSONLoader();
   pos = pos || {x:100, y:0, z:0};
   var onload = onload || function( mesh ){};
   
   var onGeometry = function( geometry ) {
      geometry.computeFaceNormals();
      outObj.mesh = new THREE.Mesh( geometry, shader );
      outObj.mesh.doubleSided = true;
      outObj.mesh.matrixAutoUpdate = false;
      outObj.mesh.matrix.setPosition( pos );
      outObj.mesh.matrix.scale( outObj.scale );
      
      onload( outObj.mesh );
      
      scn.addObject( outObj.mesh );
      
   };
   loader.load( { model: location, callback: onGeometry } );
   
   return outObj;
};

//TODO: fix thi names imgObj doesn't work for me
LAB.three.SphericalProjection.prototype.createMeshShader = function( imgObj, color, alpha, location ){
   
   color = color || {x:1, y:1, z:1 };
   return  new LAB.three.Shader({
                                name: location || 'shaders/meshToDisc',
                                uniforms: {
                                color: { type: "v3", value: color },
                                equatorAdjust:  this.globalUniforms.equatorAdjust,
                                imageSize:  this.globalUniforms.imageSize, 
                                imgMatrix: { type: "m4", value: imgObj.mat },
                                }});
}

LAB.three.SphericalProjection.prototype.createSpriteShader = function( texture ){
   return  new LAB.three.Shader({
                                name: 'shaders/worldToDisc',
                                uniforms: {
                                tex: { type: "t", value: 0, texture: texture || new THREE.Texture() },
                                equatorAdjust:  this.globalUniforms.equatorAdjust,
                                imageSize:  this.globalUniforms.imageSize, 
                                }});
}
LAB.three.SphericalProjection.prototype.createSpriteGeometry = function( subdiv ){
   return  new THREE.PlaneGeometry( 2, 2, subdiv || 3, subdiv || 3 );
}

LAB.three.SphericalProjection.prototype.addMesh = function( latitude, longitude, scale, geometry, shader ){
   var mGeo = geometry || this.createSpriteGeometry();
   var mShader = shader || this.createSpriteShader();
   var mesh = new THREE.Mesh( mGeo, mShader ); 
   mesh.scale.copy( scale || {x:1, y:1, z:1} );
   mesh.position.copy( this.llToCartesian( latitude || 0, longitude || 0 ) );
   mesh.lookAt( {x:0, y:0.01, z:0 } );
   
   this.discScene.addObject( mesh );
   return mesh;
}


LAB.three.SphericalProjection.prototype.makeGlobe = function( radius, segments ){ 
   var rad = radius || 100;
   var seg = segments || 100;
   
   var sphrGeom = new THREE.Geometry();
   var normals = [];
   var texCoords = [];
   
   var sphrVrts = [];
   for(var j=0; j<=seg * .5 + 1; j++){
      var theta1 = j * 2 * Math.PI / (seg) - ( Math.PI / 2 );
      var theta2 = (j + 1) * 2 * Math.PI / (seg) - ( Math.PI / 2 );
      
      for(var i=0; i<=seg; i++){
         var e = new THREE.Vector3();
         var p = new THREE.Vector3();
         
         var theta3 = i * 2 * Math.PI / (seg);
         
         e.x = Math.cos( theta1 ) * Math.cos( theta3 );
         e.y = Math.sin( theta1 );
         e.z = Math.cos( theta1 ) * Math.sin( theta3 );
         
         normals.push( e );
         p.copy( e ).multiplyScalar( rad );
         sphrGeom.vertices.push( new THREE.Vertex( p )); 
         
         var tc1 = LAB.map( 1 - i/(seg), 0, 1, -180, 180 );
         var tc2 = LAB.map( 1 - (2*j)/(seg), 0, 1, -90, 90 );
         texCoords.push( new THREE.UV( tc1, tc2 ));
      }
   }
   
   for(var j=1; j<=seg * .5 + 1 ; j++){
      for(var i=1; i<=seg ; i++){ 
         var f1 = (j-1)*seg + i-1;
         var f2 = (j-1)*seg + i;
         var f3 = j*seg + i;
         var f4 = j*seg + i-1;
         
         sphrGeom.faces.push( new THREE.Face3( f1, f2, f3,  [ normals[f1], normals[f2], normals[f3] ] ));
         sphrGeom.faceVertexUvs[ 0 ].push( [ texCoords[f1], texCoords[f2], texCoords[f3] ] );
         
         sphrGeom.faces.push( new THREE.Face3( f1, f3, f4, [ normals[f1], normals[f3], normals[f4] ] ));
         sphrGeom.faceVertexUvs[ 0 ].push( [ texCoords[f1], texCoords[f3], texCoords[f4] ] );
      }
   }
   return sphrGeom;
}

LAB.three.SphericalProjection.prototype.draw = function( renderer, debug ){
   if(!debug){
      renderer.render( this.backgroundScene, this.orthoCamera );
      renderer.render( this.discScene, this.orthoCamera );
   }else{
      gl.enable( gl.DEPTH_TEST );
      renderer.render( this.backgroundScene, this.orthoCamera, this.fbo, true );
      renderer.render( this.discScene, this.orthoCamera, this.fbo, false );
      
      renderer.render( this.debugScene, this.debugCam );
   }
}

LAB.three.SphericalProjection.prototype.llToCartesian = function( lat, lon, rad ){
   rad = rad || 100;

   var theta = LAB.degToRad( lat );
   var phi = LAB.degToRad( lon );
   var x = rad * Math.cos( theta ) * Math.cos( phi );
   var y = rad * Math.cos( theta ) * Math.sin( phi );
   var z = rad * Math.sin( theta );

   return { x:x, y:z, z:y };//{x: x, y: y, z: z};
}
