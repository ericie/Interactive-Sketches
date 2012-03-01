// load graphics base, because this is a graphics app
LAB.require(LAB.src+"app/ThreeApp.js");
LAB.require(LAB.src+"three/ParticleEmitter.js");

var demoApp;

$(document).ready( function() {
                  DemoApp.prototype = $.extend(true, LAB.app.ThreeApp.prototype, DemoApp.prototype);
                  demoApp = new DemoApp();
                  demoApp.begin();
                  });

//TODO: 
/*
 add lines between them from parents to kids
 
 add decorrative particles
 -animating lines, little explosions, etc.
 
 shader stuff
 -attenuation
 -lighting
 */

// ===========================================
// ===== DEMO APP
// ===========================================

var tracer = function( target1, target2, lifespan, currentTime ){
   //vertices
   this.v1 = new THREE.Vector3();
   this.v2 = new THREE.Vector3();
   
   //target vertices (points)
   this.t1 = target1 || new THREE.Vector3();
   this.t2 = target2 || new THREE.Vector3();
   
   //weights for interpolation
   this.u1 = 0;
   this.u2 = 0;
   this.mu1 = 0;
   this.mu2 = 0;
   this.u = 0;//needs a better name
   
   //used to determine weights
   this.lifespan = lifespan || 10;
   this.birth = currentTime || LAB.self.getElapsedTimeSeconds();
   this.death = this.birth + this.lifespan;
   
   this.update = function( currentTime ){
      currentTime = currentTime || LAB.self.getElapsedTimeSeconds();
      this.u = LAB.map( currentTime, this.birth, this.death, -1, 1 );
      this.u1 = Math.min( 1, this.u + 1 );
      this.u2 = Math.min( 1, Math.max( 0, this.u ));
      this.mu1 = 1-this.u1;
      this.mu2 = 1-this.u2;
      
      // Animated Point
      this.v1.x = this.t1.pos.x * this.u1 + this.t2.pos.x * this.mu1;
      this.v1.y = this.t1.pos.y * this.u1 + this.t2.pos.y * this.mu1;
      this.v1.z = this.t1.pos.z * this.u1 + this.t2.pos.z * this.mu1;
      
      /*
      this.v1.x = this.t1.pos.x;
      this.v1.y = this.t1.pos.y;
      this.v1.z = this.t1.pos.z;
      */

      /*
      this.v2.x = this.t1.pos.x * this.u2 + this.t2.pos.x * this.mu2;
      this.v2.y = this.t1.pos.y * this.u2 + this.t2.pos.y * this.mu2;
      this.v2.z = this.t1.pos.z * this.u2 + this.t2.pos.z * this.mu2;
      */

      // Stationary Point
      this.v2.x = this.t2.pos.x;
      this.v2.y = this.t2.pos.y;
      this.v2.z = this.t2.pos.z;
   }
   
   this.reset = function( currentTime ){
      this.birth = currentTime || LAB.self.getElapsedTimeSeconds();
      this.death = this.birth + this.lifespan;
      
      this.v1.copy( this.target1.pos );
      this.v2.copy( this.target1.pos );
   }
}

var spiderParticle = function(){
   
   //this is a souped up verision of labParticle found in the emiiter
   this.pos = new THREE.Vector3();
   this.vel = new THREE.Vector3();
   this.col = null;// new THREE.Vector3( 1, 0, 0);
   
   this.radius = 40.;
   this.birth = 0;
   this.lifespan = 1;
   this.isAlive = true;
   
   this.parent = null;
   this.children = [];
   
   //   this.lines = [];
   
   this.spread = 20;
   //   this.spreadSquared = this.spread*this.spread;
   //   this.delta = new THREE.Vector3();
   
   this.copy = function( p ){
      this.pos.copy( p.pos );
      this.vel.copy( p.vel );
      this.col.copy( p.col );
      
      this.radius = p.radius;
      this.birth = p.birth;
      this.lifespan = p.lifespan;
      
      //handle children
      this.parent = p.parent;
      this.children.splice(0, this.children.length ); 
      for( i in p.children ){
         this.children[i] = p.children[i];   
         this.children[i].parent = this;
      }
   }
   
   this.spawn = function( emitter, pos, velocity, color, radius, lifespan, currentTime ){
      var newKid = emitter.addParticle({x: this.pos.x + pos.x, y:this.pos.y + pos.y, z:this.pos.z + pos.z },
                                       velocity || {x:LAB.random( -.1, .1), y:LAB.random( -.1, .1), z:LAB.random( -.1, .1)},
                                       color || {x: LAB.random(.1, 1.), y:LAB.random(.1, 1.), z:LAB.random(.1, 1.)},
                                       radius || 10,
                                       currentTime || 0,
                                       lifespan || LAB.random( 1, 10 ));
      this.children.push( newKid );
      newKid.parent = this;
      return newKid;
   }
   
   this.kill = function(){
      
   }
   
   this.dropKids = function(){
      this.children.splice( 0, this.children.length ); 
   }
}

DemoApp = function() {
	LAB.app.ThreeApp.call( this );		
   
	var _self = this;
   
   var bStats = true;
   
	var lastMouse = {x:0, y:0};
   var frameCount = 0;
   var camRot = {x:0, y:0};
   var rotVel = {x:0, y:0};
   
   var gui = new GUI();
   var emitter, bgEmitter;
   
   var currentParticle;
   
   var lineShader;
   var lines;
   var lineMesh;
   
   var hubs = [];
   
   var tracers = [];
   
   // ===========================================
	// ===== SETUP
	// ===========================================	
	this.setup = function() {
      //stats
      if( bStats ){
         stats = new Stats();
         stats.domElement.style.position = 'absolute';
         stats.domElement.style.top = '10px';
         stats.domElement.style.left = '10px';
         this.container.appendChild( stats.domElement );
      }
      
		// catch mouse events!
		this.registerMouseEvents();
      
      //cameras
      camera = new THREE.Camera(60, window.innerWidth/window.innerHeight);
      camera.position.set( 0, 10, 220 );
      camera.target.position.set( 0, 10, 0 );
      
      orthoCamera = new THREE.OrthoCamera( -window.innerWidth/2, window.innerWidth/2, window.innerHeight/2, -window.innerHeight/2, -100, 100 );
      
      this.setupGui();
      
      
      //particles
      var createParticle = function(){ return new spiderParticle(); };
      emitter = new LAB.three.ParticleEmitter( { maxParticleCount: 10000, scene: this.scene, renderer: this.renderer, createParticle: createParticle });
      
      bgEmitter = new LAB.three.ParticleEmitter( { maxParticleCount: 3000, scene: this.scene, renderer: this.renderer });
      
      currentParticle = emitter.addParticle({x: 0, y: 0, z: 0 },  //posiiton
                                            {x: LAB.random(-.1, .1), y:LAB.random(-.1, .1), z:LAB.random(-.1, .1)},        //velocity
                                            {x: LAB.random(.1, 1.), y:LAB.random(.1, 1.), z:LAB.random(.1, 1.)},        //color
                                            10,     //radius
                                            0,                       //current time
                                            LAB.random( 2, 10 ));    //lifespan
      
      //line setup
      lineShader = new LAB.three.Shader({ name: 'shaders/lineShader' }) ;
      lineShader.linewidth = 2.;
      lineShader.depthTest = false;
      
      lines = new THREE.Geometry();
      var tempVec = new THREE.Vector3();
      
      for(var i=0; i<emitter.maxParticleCount * 2; i++){
         lines.vertices[i] = new THREE.Vertex( tempVec );
      }
      
      lineMesh = new THREE.Line( lines, lineShader, THREE.LinePieces );
      this.scene.addObject( lineMesh );
      
      this.renderer.render( this.scene, camera );//this is kinda sloppy, but it's any easy way to create the webgl buffers
      lineMesh.geometry.__webglLineCount = 0;
      lineMesh.geometry.__dirtyVertices = true;
      
      console.log( lineMesh );
      
      
      //create particle cloud
      var weight = 0;
      var delta = new THREE.Vector3();
      var cp = currentParticle;
      var dist = 0;
      var frc = 0;
      
      for(var i=0; i<400; i++){
         cp = currentParticle;
         var numSpawns = LAB.randomInt( 2, LAB.randomInt( 2, 20 ));
         this.spawn( cp, numSpawns, false );
         
         currentParticle = emitter.particles[ LAB.randomInt( 0, emitter.geometry.__webglParticleCount) ];
         
      }
      //spread em out
      for(var j=0; j<60*4; j++){
         this.updateParticles();
      }
      
      //add "backgroundParticles"
      for(var i=0; i<bgEmitter.maxParticleCount; i++){
         bgEmitter.addParticle({x: LAB.random(-200,200), y:LAB.random(-200,200), z:LAB.random(-200,200) },
                               {x:0, y:0, z:0},
                               {x: LAB.random(.1, 1.), y:LAB.random(.1, 1.), z:LAB.random(.1, 1.)},
                               LAB.random(3, 10),
                               0,
                               10);
      }
      
      
      //create some tracers
      var v1, v2;
      currentTime = this.getElapsedTimeSeconds();
      for(var i=0; i< 20; i++){
         v1 = emitter.particles[ LAB.randomInt( 0, emitter.geometry.__webglParticleCount) ];
         if( v1.parent ){
            v2 = v1.parent
         }else if( v1.children.length ){
            v2 = LAB.randomObject( v1.children );
         }else{
            v2 = v1;
         }
         tracers[i] = new tracer( v1, v2, LAB.random( 10, 20), currentTime );
         this.addLine( tracers[i].v1, tracers[i].v2 ); 
         //         tracers[i].v2.copy( v2.pos );//temp
         tracers[i].update( currentTime );
         
         
      }
      
      console.log( tracers[0] );
	}
   
   
   this.setupGui = function(){
   }
	
	// ===========================================
	// ===== UPDATE
	// ===========================================
	this.update = function() {
      if( bStats ) stats.update();
      frameCount += 1;
      
      var currentTime = this.getElapsedTimeSeconds();
      this.updateParticles();
      
      for(var i=tracers.length-1; i>=0; i--){
         tracers[i].update( currentTime );
         
         if(tracers[i].u2 == 1){
            //reset tracer
            tracers[i].birth = currentTime;
            tracers[i].death = tracers[i].lifespan + currentTime;
            
            if( tracers[i].t1.children.length > 0 ){
               tracers[i].t2 = tracers[i].t1;  
               tracers[i].t1 = LAB.randomObject( tracers[i].t2.children );;//emitter.particles[ LAB.randomInt( 0, emitter.geometry.__webglParticleCount) ];
            }
            else{
               tracers[i].t2 = emitter.particles[ LAB.randomInt( 1, emitter.geometry.__webglParticleCount) ];
               tracers[i].t1 = tracers[i].t2.parent
               if( tracers[i].t1.children.length > 0 ){
                  tracers[i].t2 = LAB.randomObject( tracers[i].t1.children );
               }
            }
            //            
            //            tracers[i].reset(currentTime);
            //            for(var j=0; j<tracers.v2.children.length; j++){
            //               
            //            }
         }
      }
      
      //update geometries
      emitter.geometry.__dirtyVertices = true;
      emitter.attributes.radius.needsUpdate = true;
      
      lines.__dirtyVertices = true;
      
      
      //camera
      camRot.x += rotVel.x;
      camRot.y += rotVel.y;
      rotVel.x *= .9;
      rotVel.y *= .9;
      
      camera.position.set(Math.cos( camRot.y  ) * Math.cos( camRot.x ) * 220,
                          Math.sin( camRot.y ) * 220,
                          Math.cos( camRot.y ) * Math.sin( camRot.x ) * 220);
      
	}
   
   this.updateParticles = function(){
      var currentTime = this.getElapsedTimeSeconds();
      
      var p, c, repel, dist;
      var delta = new THREE.Vector3();
      var frc = 0;
      for(var i=emitter.geometry.__webglParticleCount; i>=0; i--){
         p = emitter.particles[i];
         
         p.pos.addSelf( emitter.particles[i].vel );
         p.vel.multiplyScalar( .95 );//attenuation
         
         //spread the kids. repel from all the family
         if(p.parent){
            delta.sub(p.parent.pos, p.pos);
            dist = delta.length();
            delta.multiplyScalar( (-.25 * (p.parent.spread - dist)/p.parent.spread) / dist );
            p.vel.addSelf( delta );
            
            //repel from the other children
            var weight = -.5/p.parent.children.length;
            for(var j=0; j<p.parent.children.length; j++)
            {
               delta.sub( p.parent.children[j].pos, p.pos );
               dist = delta.length();
               if(dist == 0 ) continue;
               frc = weight/Math.max( 1, dist );
               delta.multiplyScalar( frc / dist );//normalize and scale force
               p.vel.addSelf( delta );
            }
         }
      }
   }
   
   
	
	// ===========================================
	// ===== DRAW
	// ===========================================
	this.draw = function() {
      
      gl.disable(gl.DePTH_TEST );
      gl.clearColor( 1,1,1,1 );
      gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
      
      this.renderer.render( this.scene, camera );
	}
   
   this.addLine = function( v1, v2 ){
      if(lines.__webglLineCount < emitter.maxParticleCount * 2){
         lines.vertices[ lines.__webglLineCount ].position = v1;
         lines.vertices[ lines.__webglLineCount+1 ].position = v2;
         
         lines.__webglLineCount += 2;
         lines.__dirtyVertices = true;
      }
   }
   
   this.spawn = function( p, numSpawns, bUseLines ){
      bUseLines = bUseLines || false;
      var kid;
      var pos = new THREE.Vector3();
      p.spread = numSpawns * 2;
      for(var i=0; i<numSpawns; i++){
         pos.set( LAB.random(-1,1), LAB.random(-1,1), LAB.random(-1,1) ); 
         pos.normalize();
         pos.multiplyScalar( p.spread );
         kid = p.spawn(emitter,
                       pos,
                       p.vel,   //velocity
                       {x: LAB.random(.1, 1.), y:LAB.random(.1, 1.), z:LAB.random(.1, 1.)},      //color
                       numSpawns/2);  //radius
         
         if( bUseLines )   this.addLine( kid.pos, p.pos ); 
      }
      
      if( p.parent )  p.parent.spread *= 1.15;
   }
	
	// ===========================================
	// ===== RESIZE
	// ===========================================
	this.onWindowResized = function( width, height ) {
      
	}
   
	// ===========================================
	// ===== MOUSE
	// ===========================================
   
   
	this.onMouseMoved = function( x, y ) {
		lastMouse.x = x;
		lastMouse.y = y;
	}
   
   this.onMouseDragged	= function (x,y){
      
      rotVel.x += (x - lastMouse.x) * .001;
      rotVel.y += (y - lastMouse.y) * .0005;
      lastMouse.x = x;
      lastMouse.y = y;
   }
   
   
	// ===========================================
	// ===== KEYS
	// ===========================================
   
   
   this.onDocumentKeyDown = function( event ){
      //      console.log( event.keyCode );
      switch( event.keyCode ) {
         case 83:
            break;
         case 32:
            break;
      }
   }
   
   
   //====
   
   this.randomPosOnSphere = function( radius ){
      
   }
}

/*
 DemoApp.prototype 				= new LAB.ThreeApp();
 DemoApp.prototype.constructor 	= DemoApp;
 DemoApp.prototype.supr 			= LAB.ThreeApp.prototype;	
 */