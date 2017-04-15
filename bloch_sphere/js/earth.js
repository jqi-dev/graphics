var container;

var camera, cameraControls, scene, renderer, mesh;
var group;
var container;
var cylinder;
var pivot;

var heightCircle;
var heightLine, longitudeLine;

var clock = new THREE.Clock();

var SpriteText2D = THREE_Text.SpriteText2D;
var textAlign = THREE_Text.textAlign;

var theta = document.getElementById("theta").value * Math.PI;
var phi = document.getElementById("phi").value * 2 * Math.PI;

init();
animate();


function init() {

        // Renderer

        renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, transparent: true});
        container = document.getElementById('container');

        renderer.setSize(container.offsetWidth, container.offsetHeight);
        container.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera( 75, container.offsetWidth / container.offsetHeight, 0.1, 10000 );
        camera.position.set(-3,3,4);

        cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
        cameraControls.target.set(0, 0, 0);
        cameraControls.minDistance = 3.75;
        cameraControls.maxDistance = 3.75;
        cameraControls.enablePan = false;
        cameraControls.noZoom = true;
        cameraControls.minPolarAngle = Math.PI/8;
        cameraControls.maxPolarAngle = 7 * Math.PI/8;

        scene = new THREE.Scene();

        var textureMaterial;

        var loader = new THREE.TextureLoader();

        loader.load(
        	// resource URL
        	'images/earth.jpg',
        	// Function call when resource is loaded
        	function ( texture ) {
        		// create textured sphere

              var earth = new THREE.SphereGeometry(2, 100, 100);

              var earthBack = new THREE.SphereGeometry(2, 100, 100);

              var textureMaterial = new THREE.MeshBasicMaterial( {
                side: THREE.FrontSide,
                depthWrite: false,
                depthTest: false,
                transparent: true,
        		map: texture,
                opacity: 1
              } );
              
              var textureMaterialTop = new THREE.MeshBasicMaterial( {
                side: THREE.FrontSide,
                depthWrite: false,
                depthTest: false,
                transparent: true,
        		map: texture,
                opacity: 0.6,
                blending: THREE.AdditiveBlending,
              } );

             var textureMaterialBack = new THREE.MeshBasicMaterial( {
                side: THREE.BackSide,
                depthWrite: false,
                depthTest: false,
                transparent: true,
                map: texture,
                opacity: .4,
             } );

             var earthMesh = new THREE.Mesh(earth, textureMaterial);
             var earthMeshTop = new THREE.Mesh(earth, textureMaterialTop);  
             var earthMeshBack = new THREE.Mesh(earthBack, textureMaterialBack);
             scene.add(earthMesh);
             scene.add(earthMeshTop);
             scene.add(earthMeshBack);
             earthMeshTop.renderOrder = 11;  
        	});

        // Vector cylinder

        var cylinderGeometry = new THREE.CylinderGeometry( .03, .03, 1.8, 32 );
        var cylinderMaterial = new THREE.MeshBasicMaterial( {
          color: 0xffff00,
          side: THREE.DoubleSide,
          depthWrite: false,
          depthTest: false,
          transparent: true,
          opacity: 1
        } );
  
        cylinder = new THREE.Mesh( cylinderGeometry, cylinderMaterial );
        cylinder.translateY(.9);
        cylinder.renderOrder = 10;
        scene.add( cylinder );

        var coneGeometry = new THREE.CylinderGeometry (0, .06, .27, 30);
        var cone = new THREE.Mesh( coneGeometry, cylinderMaterial );
        cone.translateY(1.875);
        cone.renderOrder = 10;
        scene.add( cone );       

        // Mesh lines

        var geometry = new THREE.SphereGeometry(2, 24, 24, 0, Math.PI * 2, 0, Math.PI * 2);
        var material = new THREE.MeshPhongMaterial({
          side: THREE.BackSide,
          depthWrite: false,
          depthTest: false,
          color: 0x66CCFF,
          transparent: true,
          opacity: 0.2,
        });
        var sphere = new THREE.Mesh(geometry, material);
        scene.add(sphere);

        // Edges

       var edges = new THREE.EdgesHelper( sphere, 0x3399CC);
       edges.material.opacity = 0.2;
       edges.material.transparent = true;
       edges.material.linewidth = 1;
       scene.add(edges);
       edges.renderOrder = 10;

        // Edge circles

        var radius = 2;

        var circleMaterial = new THREE.LineBasicMaterial({
          color: 0x000000,
          side: THREE.BackSide,
          depthWrite: false,
          depthTest: false,
          transparent: true,
          opacity: 0.2,
        });

        var circleGeometry1 = new THREE.CircleGeometry( radius, 64 );
        var circleGeometry2 = new THREE.CircleGeometry( radius, 64 );
        var circleGeometry3 = new THREE.CircleGeometry( radius, 64 );

        var circle1 = circleGeometry1.rotateX(Math.PI/2);
        var circle2 = circleGeometry2.rotateY(Math.PI/2);
        var circle3 = circleGeometry3.rotateZ(Math.PI/2);

        scene.add( new THREE.Line( circle1, circleMaterial ) );
        scene.add( new THREE.Line( circle2, circleMaterial ) );
        scene.add( new THREE.Line( circle3, circleMaterial ) );
  
        // Outlines 
  
        var outlineMaterial = new THREE.MeshBasicMaterial({
          color: 0x000000,
          side: THREE.BackSide,
          depthWrite: false,
          depthTest: false,
          transparent: true,
          opacity: 0.5,
        });
  
        var outlineGeometry = new THREE.SphereGeometry(2.01, 100, 100, 0, Math.PI * 2, 0, Math.PI * 2);
        var outline = new THREE.Mesh(outlineGeometry, outlineMaterial);
        scene.add(outline);
  
        // Vector outlines
  
        var cylinderOutlineGeometry = new THREE.CylinderGeometry( .042, .042, 1.8, 32 );
        cylinder_outline = new THREE.Mesh( cylinderOutlineGeometry, outlineMaterial );
        cylinder_outline.translateY(.89);
        cylinder_outline.renderOrder = 9;
        scene.add( cylinder_outline );
  
        var coneOutlineGeometry = new THREE.CylinderGeometry (0, .07, .29, 32);
        var cone_outline = new THREE.Mesh( coneOutlineGeometry, outlineMaterial );
        cone_outline.translateY(1.88);
        cone_outline.renderOrder = 9;
        scene.add( cone_outline );   

        // Latitude circle

        var heightLineGeometry = new THREE.Geometry();

        var heightLineMaterial = new THREE.LineBasicMaterial({
          color: 0x99FF00,
          side: THREE.DoubleSide,
          depthWrite: false,
          depthTest: false,
          transparent: true,
          opacity: 1,
        });

        heightLine = new THREE.Line(heightLineGeometry, heightLineMaterial);

        for (var i = 0; i <=  360; i++) {
            var angle=Math.PI/180*i;
            var x = (radius) * Math.cos(angle);
            var y = (radius) * Math.sin(angle);
            var z=0;
            heightLine.geometry.vertices.push(new THREE.Vector3(x, y, z));
          }

          heightLine.geometry.rotateX(Math.PI/2);
          heightLine.geometry.rotateY(-Math.PI/2);

        scene.add(heightLine);

        heightLine.renderOrder = 12;

        // Longitude circle

        var longitudeGeometry = new THREE.Geometry();

        longitudeLine = new THREE.Line(longitudeGeometry, heightLineMaterial);

        for (var i = 0; i <=  180; i++) {
            var angle=Math.PI/180*i;
            var x = (radius) * Math.cos(angle);
            var y = (radius) * Math.sin(angle);
            var z=0;
            longitudeLine.geometry.vertices.push(new THREE.Vector3(x, y, z));
          }

        longitudeLine.geometry.rotateY(-Math.PI/2);
        longitudeLine.geometry.rotateX(Math.PI/2);

        scene.add(longitudeLine);

        longitudeLine.renderOrder = 12;

         // Axes

         var lineMaterial = new THREE.LineBasicMaterial({
           color: 0x000000,
           side: THREE.BackSide,
           depthWrite: false,
           depthTest: false,
           transparent: true,
           opacity: 0.2,
         });
        
         var Xgeometry = new THREE.Geometry();
         Xgeometry.vertices.push(new THREE.Vector3(-2, 0, 0));
         Xgeometry.vertices.push(new THREE.Vector3(2, 0, 0));
        
         var Ygeometry = new THREE.Geometry();
         Ygeometry.vertices.push(new THREE.Vector3(0, -2, 0));
         Ygeometry.vertices.push(new THREE.Vector3(0, 2, 0));
        
         var Zgeometry = new THREE.Geometry();
         Zgeometry.vertices.push(new THREE.Vector3(0, 0, -2));
         Zgeometry.vertices.push(new THREE.Vector3(0, 0, 2));
        
         var Xline = new THREE.Line(Xgeometry, lineMaterial);
         var Yline = new THREE.Line(Ygeometry, lineMaterial);
         var Zline = new THREE.Line(Zgeometry, lineMaterial);
        
         scene.add(Xline, Yline, Zline);
         Xline.renderOrder = 8;
         Yline.renderOrder = 8;
         Zline.renderOrder = 8;

        // Lights

        scene.add(new THREE.AmbientLight(0xffffff,1));

        // Pivot point

        pivot = new THREE.Group();
        scene.add( pivot );
        pivot.add( cylinder );
        pivot.add( cone );
        pivot.add( cylinder_outline );
        pivot.add( cone_outline );

}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {

  renderer.setSize( container.offsetWidth, container.offsetHeight );
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();

}

function animate() {

        var delta = clock.getDelta();

        requestAnimationFrame(animate);

        cameraControls.update(delta);

        renderer.render(scene, camera);

        theta = document.getElementById("theta").value
        phi = document.getElementById("phi").value;

        pivot.rotation.set(theta * Math.PI, phi * 2 * Math.PI, 0, 'YZX');

        var height = -2 * Math.sin((theta - .5) * Math.PI);

        var circleScale = 1;

        if (height != 0) {
          circleScale = Math.sqrt(4 - Math.pow(height,2))/2;
        }
        else {
          circleScale = 1;
        }

        heightLine.scale.set(circleScale,1,circleScale);
        heightLine.position.set(0,height, 0);
        heightLine.rotation.set(0, phi * 2 * Math.PI, 0);

        longitudeLine.rotation.set(0, phi * 2 * Math.PI, 0);
}
