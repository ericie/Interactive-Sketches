/** @namespace LAB.three */
LAB.three = LAB.three || {};

/** 
@constructor 
@extends THREE.MeshShaderMaterial
*/

var labParticle = function(){
   this.pos = new THREE.Vector3();
   this.vel = new THREE.Vector3();
   this.col = new THREE.Vector3( 1, 1, 1 );
   
   this.radius = 10.;
   this.birth = 0;
   this.lifespan = 1;
   
   this.copy = function( p ){
      this.pos.copy( p.pos );
      this.vel.copy( p.vel );
      this.col.copy( p.col );
      
      this.radius = p.radius;
      this.birth = p.birth;
      this.lifespan = p.lifespan;
   }
}

LAB.three.ParticleEmitter = function ( parameters ) {
   parameters = parameters || {};
   
   //create particle data. this'll be crushed into arrays in the renderer
   this.maxParticleCount = parameters.maxParticleCount || 5000;
   this.particles = [];
   this.scene = parameters.scene || new THREE.Scene();
   this.renderer = parameters.renderer || new THREE.WebGLRenderer();
   this.currentTime = 0;
   
   for(var i=0; i<this.maxParticleCount; i++){
      if(parameters.createParticle){
         //I used this to make particles with additional variables and methds
         this.particles[i] = parameters.createParticle();
      }
      else this.particles[i] = new labParticle();
   }
   
   //geometry and rendering
   this.attributes = {
   pColor: {type: "v3", value: []},
   radius: {type: "f", value: []},
   birth: {type: "f", value: []},
   lifespan: {type: "f", value: []},
   };
   this.geometry = new THREE.Geometry();
   
   for(var i=0; i<this.particles.length;i++){
      this.geometry.vertices[i] = new THREE.Vertex( this.particles[i].pos );
      this.attributes.pColor.value[i] = new THREE.Vector3(1, 0, 0);//this.particles[i].col;
      this.particles[i].col = this.attributes.pColor.value[i];
      this.attributes.radius.value[i] = this.particles[i].radius;
      this.attributes.birth.value[i] = this.particles[i].birth;
      this.attributes.lifespan.value[i] = this.particles[i].lifespan;
   }
   this.geometry.dynamic = true;
   this.geometry.__dirtyVertices = true;
   
   var shaderUniforms = {
      tex:   { type: "t", value: 0, texture: THREE.ImageUtils.loadTexture( "textures/sphereNormal.png" )},
      currentTime:   { type: "f", value: 0},
      pScl: {type: "f", value: 100},
   };
   
   this.shader = new LAB.three.Shader({name: "shaders/basicParticle",
                                      uniforms: shaderUniforms,
                                      attributes: this.attributes,
                                      });
   
   this.particleSystem = new THREE.ParticleSystem( this.geometry, this.shader );
   
   
   this.scene.addObject( this.particleSystem );
   this.renderer.render( this.scene, camera );//this is kinda sloppy, but it's any easy way to create the webgl buffers
   this.particleSystem.geometry.__webglParticleCount = 0;// set the particle count to 0
   
};

//TODO: allow for custome geometries and shaders with a defualt as an alternative
//LAB.three.ParticleEmitter.prototype.makeGeometry = function(){
//   
//}

LAB.three.ParticleEmitter.prototype.addParticle = function( pos, vel, col, radius, currentTime, lifespan) {
   if(this.particleSystem.geometry.__webglParticleCount < this.maxParticleCount - 1){
      var i = this.particleSystem.geometry.__webglParticleCount;
      this.particles[i].pos.copy( pos || {x:0, y:0, z:0} );
      this.particles[i].vel.copy( vel || {x:0, y:0, z:0} );
      this.particles[i].col.copy( col || {x:.25, y:.25, z:.3} );
      
      this.particles[i].radius = this.attributes.radius.value[i] = radius || 10;
      this.particles[i].birth = this.attributes.birth.value[i] = currentTime || LAB.self.getElapsedTimeSeconds();
      this.particles[i].lifespan = this.attributes.lifespan.value[i] = lifespan || 10;

      
      this.particleSystem.geometry.__webglParticleCount++;
      this.geometry.__dirtyVertices = true;
      this.attributes.pColor.needsUpdate = true;
      this.attributes.radius.needsUpdate = true;
      this.attributes.birth.needsUpdate = true;
      this.attributes.lifespan.needsUpdate = true;
      
      
      return this.particles[i];
   }
   else return null;
};

LAB.three.ParticleEmitter.prototype.removeParticle = function( index ){
   
   if(this.geometry.__webglParticleCount > 0){
      
      this.geometry.__webglParticleCount -= 1;

      this.particles[index].copy( this.particles[ this.geometry.__webglParticleCount ] );
      
      this.attributes.radius.value[index] = this.particles[index].radius;
      this.attributes.lifespan.value[index] = this.particles[index].lifespan;
      this.attributes.birth.value[index] = this.particles[index].birth;
      
      this.geometry.__dirtyVertices = true;
      this.attributes.pColor.needsUpdate = true;
      this.attributes.radius.needsUpdate = true;
      this.attributes.birth.needsUpdate = true;
      this.attributes.lifespan.needsUpdate = true;
      
   }
};
