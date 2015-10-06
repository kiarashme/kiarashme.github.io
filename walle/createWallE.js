//This file includes helper functions that help create Wall-E, as well as the
// actual function that creates Wall-E holding a grass stem. 
//
// NOTE: For Wall-E to render properly, you would also need to import materials.js 
// which you can find in the same directory as this file. For the grass stem to show
// up you will also need to import createStem.js
//

//This function creates Wall-E that's holding a stem in one of his hands
function createWallE() {
    var wallE = new THREE.Object3D();
    //using the glass ball function from the library to make Wall-E's
    //glass eyes that the reflect the scene that Wall-E "sees"


    //NOTE: for the eyes to continuously reflect the scene, you need to place
    //the following global variables outside the function:
    //   var glassEyeL;
    //   var glassEyeCamL; 
    //   var glassEyeR;
    //   var glassEyeCamR; 
    //You also need to update them with the help of render and animate functions like so:
    // glassEyeCamL.updateCubeMap(renderer, scene);
    // glassEyeCamR.updateCubeMap(renderer, scene);

    var marbleSet1 = createMarble(0x524CFD, 0x444444, 5, 1.9);
    glassEyeL = marbleSet1[0];
    glassEyeCamL = marbleSet1[1];

    var marbleSet2 = createMarble(0x524CFD, 0x444444, 5, 1.9);
    glassEyeR = marbleSet2[0];
    glassEyeCamR = marbleSet2[1];


    // creating Wall-E's body (the central box)
    var bodyBoxGeom = new THREE.BoxGeometry(12, 10, 12);
    addTextureCoords(bodyBoxGeom, 5, 5);
    var bodyBox = new THREE.Mesh(bodyBoxGeom, yellowMaterial);
    bodyBox.position.set(1, -14, 0);

    // creating Wall-E's head (which basically includes all of its eye details)
    head = createHead();
    head.position.y = -1;

    //creating Wall-E's neck (the part that connects the head with the body box)
    wholeNeck = createNeck();
    wholeNeck.position.set(0, 0.7, -1);

    //creating Wall-E's wheels
    var wheelL = createWheel();
    wheelL.position.set(-7, -22, 0)
    wheelR = createWheel();
    wheelR.position.set(9, -22, 0)
    wallE.add(wheelL); // add to wallE
    wallE.add(wheelR);

    //creating Wall-E's hands
    hand = createHand();
    var handLeft = hand.clone();
    handLeft.rotation.z = Math.PI;
    handLeft.rotation.y = Math.PI / 10;
    handLeft.position.set(-6, -14, 4);

    wallE.add(handLeft);
    //creating a hand pivot to help control the hand's rotation
    // during animation
    var handPivot = new THREE.Object3D();
    handPivot.position.set(7, -13, 4);
    handPivot.add(hand);
    //creating a stem that Wall-E holds
    stem = createStem();
    hand.add(stem);
    stem.position.set(-2, 0, 9);
    wallE.add(handPivot);

    // creating a pivot point to control rotation of the head and neck parts
    // during animation
    var headPivot = new THREE.Object3D();
    headPivot.position.set(1, -8, 0);
    neckNhead = new THREE.Object3D();
    neckNhead.add(head);
    neckNhead.add(wholeNeck);
    headPivot.add(neckNhead);
    neckNhead.position.set(-1, 7.5, 0);
    wallE.add(headPivot);
    wallE.add(bodyBox);

    return wallE;

}

//This helper funciton create the front part of one eye (the glass ball, pupil and other details)

function createEyeFront(glassEye, glassCam) {
    var eyeFront = new THREE.Object3D();
    //squishing the glassBall to make ir resemble Wall-E's eyes better
    glassEye.scale.z = 0.7;
    // adding various eye details to add some visual complexity to the eyes
    var eyeBigCircGeom = new THREE.TorusGeometry(1.9, 0.1, 16, 100);
    var eyeBigCirc = new THREE.Mesh(eyeBigCircGeom, steelMaterial);
    eyeBigCirc.position.set(-2.5, 0.8, 5);

    var eyeBorderGeom = new THREE.TorusGeometry(1, 0.1, 16, 100);
    var eyeBorder = new THREE.Mesh(eyeBorderGeom, steelMaterial);
    eyeBorder.position.set(-2.5, 1, 5.1);
    // creating the light circle on the eye
    var eyeLightPartGeom = new THREE.CircleGeometry(1, 100);
    eyeLightPart = new THREE.Mesh(eyeLightPartGeom, eyeLightMaterial);
    eyeLightPart.position.set(-2.5, 1, 5.1);
    //creating the dark circle on the eye
    var eyeDarkPartGeom = new THREE.CircleGeometry(1.9, 100);
    var eyeDarkPart = new THREE.Mesh(eyeDarkPartGeom, eyeDarkMaterial);
    eyeDarkPart.position.set(-2.5, 0.8, 5);
    //creating the pupil (the smallest dark circle)
    var pupilGeom = new THREE.CircleGeometry(0.7, 100);
    var pupil = new THREE.Mesh(pupilGeom, eyeDarkMaterial);
    pupil.position.set(-2.5, 1, 5.2);

    // nesting all of the front eye details in the parent object
    eyeFront.add(eyeBigCirc);
    eyeFront.add(glassEye);
    eyeFront.add(eyeBorder);
    eyeFront.add(eyeLightPart);
    eyeFront.add(eyeDarkPart);
    eyeFront.add(pupil);

    glassEye.position.set(-2.5, 0.8, 5);
    glassCam.position.set(-2.5, 0.8, 5);

    return eyeFront;

}

//Helper function that creates the back parts of the eyes (the white metallic part and the brown metal cover)
function createEyeBase(side) { // 1 is right side, -1 is left
    // parent object htat will nest all the details
    var eyeBase = new THREE.Object3D();

    // creating a shape for the white metallic part to be extruded later
    var eye = new THREE.Shape();
    eye.moveTo(-6, 6);
    eye.bezierCurveTo(-6, 3, -6, 1, -2, 0);
    eye.bezierCurveTo(2, 0, 2, 1, 1.5, 4);
    eye.bezierCurveTo(1, 4.5, -0.4, 5, -6, 6);

    // extruding the shape
    var eyeGeom = new THREE.ExtrudeGeometry(eye, {
        amount: 5,
        bevelEnabled: false,
        curveSegments: 12
    });
    // mapping white metal texture
    var texturedEye = new THREE.SceneUtils.createMultiMaterialObject(eyeGeom, [eyeMaterial]);
    // if left eye is being added, the object is reflected in y axis
    if (side == -1) {
        texturedEye.rotation.y = Math.PI;
    }
    eyeBase.add(texturedEye);

    //creating a shape for the back brown part of the eye to be extruded later
    var backEye = new THREE.Shape();
    backEye.moveTo(5, 5);
    backEye.lineTo(8, 5);
    backEye.lineTo(8, 4.8);
    backEye.bezierCurveTo(10, 4.5, 10, 4.5, 8, 3.8);
    backEye.bezierCurveTo(8, 1, 3, 1.8, 5, 1.8);
    backEye.bezierCurveTo(4, 1, 3, 4, 5, 5);

    //extruding the obtained geometry
    var backEyeGeom = new THREE.ExtrudeGeometry(backEye, {
        amount: 5,
        bevelEnabled: false,
        curveSegments: 12
    });
    //mapping brown metal texture  
    var backEye = new THREE.SceneUtils.createMultiMaterialObject(backEyeGeom, [eyeCoverMaterial]);
    // if left side is being added, reflect the object in y axis
    //and position it appropriately
    if (side == -1) {
        backEye.rotation.y = Math.PI;
        backEye.position.set(10, 2, -3);
    }
    // adjusting the position if it's the right eye that's being added
    if (side == 1) {
        backEye.position.set(-9.7, 2, -3);
    }
    // stretching the obtained object for greater resemblance with Wall-E
    backEye.scale.x = 1.3;
    backEye.rotation.z = Math.PI * 2 - Math.PI / 15;

    eyeBase.add(backEye);

    // creating the brown metal cover for the eye out of 3 bezier surfaces
    var eyeSurfPoints1 = [
        [
            [-6.1, 6.1, 0],
            [-6.1, 3, 0],
            [-5.9, 0.8, 0],
            [-2, -0.2, 0]
        ],
        [
            [-6.1, 6.1, 2],
            [-6.1, 3, 2],
            [-5.9, 0.8, 2],
            [-2, -0.2, 2]
        ],
        [
            [-6.1, 6.1, 4],
            [-6.1, 3, 4],
            [-5.9, 0.8, 4],
            [-2, -0.2, 4]
        ],
        [
            [-6.1, 6.1, 6],
            [-6.1, 3, 6],
            [-5.9, 0.8, 6],
            [-2, -0.2, 6]
        ]
    ];


    var eyeSurfPoints2 = [
        [
            [-2, -0.2, 0],
            [0, -0.2, 0],
            [2.7, 0, 0],
            [1.7, 4, 0]
        ],
        [
            [-2, -0.2, 2],
            [0, -0.2, 2],
            [2.7, 0, 2],
            [1.7, 4, 2]
        ],
        [
            [-2, -0.2, 4],
            [0, -0.2, 4],
            [2.7, 0, 4],
            [1.7, 4, 4]
        ],
        [
            [-2, -0.2, 6],
            [0, -0.2, 6],
            [2.7, 0, 6],
            [1.7, 4, 6]
        ]
    ];

    var eyeSurfPoints3 = [
        [
            [1.7, 4, 0],
            [0.5, 5, 0],
            [-3, 5.4, 0],
            [-6.1, 6.1, 0]
        ],
        [
            [1.7, 4, 2],
            [0.5, 5, 2],
            [-3, 5.4, 2],
            [-6.1, 6.1, 2]
        ],
        [
            [1.7, 4, 4],
            [0.5, 5, 4],
            [-3, 5.4, 4],
            [-6.1, 6.1, 4]
        ],
        [
            [1.7, 4, 6],
            [0.5, 5, 6],
            [-3, 5.4, 6],
            [-6.1, 6.1, 6]
        ]
    ];


    var eyeSurfGeom1 = new THREE.BezierSurfaceGeometry(eyeSurfPoints1.reverse(), 60, 60);
    var eyeSurfGeom2 = new THREE.BezierSurfaceGeometry(eyeSurfPoints2.reverse(), 60, 60);
    var eyeSurfGeom3 = new THREE.BezierSurfaceGeometry(eyeSurfPoints3.reverse(), 60, 60);

    var eyeCov1 = new THREE.SceneUtils.createMultiMaterialObject(eyeSurfGeom1, [eyeCoverMaterial]);
    var eyeCov2 = new THREE.SceneUtils.createMultiMaterialObject(eyeSurfGeom2, [eyeCoverMaterial]);
    var eyeCov3 = new THREE.SceneUtils.createMultiMaterialObject(eyeSurfGeom3, [eyeCoverMaterial]);

    // if left eye is being added, make appropriate adjustments
    if (side == -1) {
        eyeCov1.rotation.y = Math.PI;
        eyeCov2.rotation.y = Math.PI;
        eyeCov3.rotation.y = Math.PI;
        eyeCov1.position.z = 1;
        eyeCov2.position.z = 1;
        eyeCov3.position.z = 1;
    }

    eyeBase.add(eyeCov1);
    eyeBase.add(eyeCov2);
    eyeBase.add(eyeCov3);

    return eyeBase;
}


//This helper function that creates Wall-E's head that basically consits of all the eye parts
function createHead() {
    var head = new THREE.Object3D();
    // creating a brown metal detail that "holds" the eyes
    btnEyesDetailGeom = new THREE.BoxGeometry(4, 2.5, 3);
    addTextureCoords(btnEyesDetailGeom, 3, 3);
    var btnEyesDetail = new THREE.Mesh(btnEyesDetailGeom, eyeCoverMaterial);
    btnEyesDetail.position.set(0.8, 1.2, 1);

    //create the right eye base
    var eyeBaseR = createEyeBase(1);
    eyeBaseR.position.set(7, -1, -2);
    head.add(eyeBaseR);

    //create the left eye base
    var eyeBaseL = createEyeBase(-1);
    eyeBaseL.position.set(-5, -1, 3);
    head.add(eyeBaseL);

    //creaing the front part of the left eye
    var eyeFrontL = createEyeFront(glassEyeL, glassEyeCamL);
    eyeFrontL.position.set(1, 1.4, -1.9)
    head.add(eyeFrontL);

    //creaing the front part of the right eye
    var eyeFrontR = createEyeFront(glassEyeR, glassEyeCamR);
    eyeFrontR.position.set(6, 1.4, -1.9);
    head.add(eyeFrontR);
    head.add(btnEyesDetail);

    return head;
}



// Helper function the creates Wall-E's neck
function createNeck() {

    var wholeNeck = new THREE.Object3D();
    // creating the neck shape that will be extruded later
    var neck = new THREE.Shape();
    neck.moveTo(0, 0);
    neck.lineTo(2, -1)
    neck.lineTo(2, -4);
    neck.lineTo(1, -6);
    neck.lineTo(0.5, -5);
    neck.lineTo(0.5, -3);
    neck.lineTo(0, -2);
    neck.moveTo(0, 0);
    // extruding the shape
    var neckGeom = new THREE.ExtrudeGeometry(neck, {
        amount: 2,
        bevelThickness: 0,
        bevelSize: 0,
        bevelSegments: 3,
        bevelEnabled: false,
        curveSegments: 12,
        steps: 1
    });
    // mapping yellow metal texture on the neck
    var neckDetail = new THREE.Mesh(neckGeom, yellowMaterial);
    neckDetail.rotation.y = 2 * Math.PI - Math.PI / 2;
    neckDetail.rotation.x = 2 * Math.PI - Math.PI / 6;
    neckDetail.position.set(2, -1.5, 0.5);
    wholeNeck.add(neckDetail);

    //creating various neck details to add to the visual complexity of the neck structure
    var bodyCylGeom = new THREE.CylinderGeometry(1, 1, 2.5, 32);
    var bodyCyl = new THREE.Mesh(bodyCylGeom, yellowMaterialForCyl);

    var bodyDiscGeom = new THREE.CylinderGeometry(1, 1, 0.4, 32);
    var bodyDisc = new THREE.Mesh(bodyDiscGeom, yellowMaterialForCyl);

    var neckBaseGeom = new THREE.CylinderGeometry(1, 1.6, 4, 32, true);
    var neckBase = new THREE.Mesh(neckBaseGeom, yellowNeckMat);

    var neckHolderGeom = new THREE.CylinderGeometry(1, 1, 0.4, 32);
    // adding two symmetric nails at the base of the nack
    var neckHolder1 = new THREE.Mesh(neckHolderGeom, eyeCoverMaterial);
    var neckHolder2 = new THREE.Mesh(neckHolderGeom, eyeCoverMaterial);

    //a small detail that goes on top of the neck surface
    // the texture that's mapped on it is also yellow metal but has more
    //details to it - to add to the visual complexity of the neck structure
    topBoxGeom = new THREE.BoxGeometry(1.4, 2.2, 0.3);
    topBox = new THREE.Mesh(topBoxGeom, yellowDetailMat);

    //positioning and rotating the created detais accordingly
    bodyCyl.rotation.z = Math.PI / 2;
    bodyCyl.position.set(1, -5, 3);
    bodyDisc.rotation.x = Math.PI / 6;
    bodyDisc.position.set(1, -6, 2.4);
    neckBase.position.set(1, -8, 1.3);
    neckBase.rotation.x = Math.PI / 6
    neckHolder1.scale.x = 1.5;
    neckHolder2.scale.x = 1.5;
    neckHolder1.rotation.z = Math.PI / 2;
    neckHolder2.rotation.z = Math.PI / 2;
    neckHolder1.position.set(-0.6, -9.2, 1);
    neckHolder2.position.set(2.5, -9.2, 1);
    topBox.rotation.x = 2 * Math.PI - Math.PI / 6;
    topBox.position.set(1, -2.8, 3.6);

    wholeNeck.add(bodyCyl);
    wholeNeck.add(bodyDisc);
    wholeNeck.add(neckBase);
    wholeNeck.add(neckHolder1);
    wholeNeck.add(neckHolder2);
    wholeNeck.add(topBox);

    return wholeNeck;
}

// Helper function that creates one wheel
function createWheel() {

    var wheel = new THREE.Object3D();
    // the wheel is made out of three bezier surfaces
    //Wall-E's wheel resembles a triangle with 2 equal sides
    //wheelSurfPoints1 is going to represent the side of the trianlgle
    var wheelSurfPoints1 = [
        [
            [-2, 7, 0],
            [-2, 7, 2],
            [-2, 4, 6],
            [-2, 2, 6]
        ],
        [
            [-1, 7, 0],
            [-1, 7, 2],
            [-1, 4, 6],
            [-1, 2, 6]
        ],
        [
            [0, 7, 0],
            [0, 7, 2],
            [0, 4, 6],
            [0, 2, 6]
        ],
        [
            [2, 7, 0],
            [2, 7, 2],
            [2, 4, 6],
            [2, 2, 6]
        ]
    ];

    //while wheeSurfPoints2 is gonig to be the base of the triangle

    var wheelSurfPoints2 = [
        [
            [-2, 2, 6],
            [-2, 0, 6],
            [-2, 0, -6],
            [-2, 2, -6]
        ],
        [
            [-1, 2, 6],
            [-1, 0, 6],
            [-1, 0, -6],
            [-1, 2, -6]
        ],
        [
            [0, 2, 6],
            [0, 0, 6],
            [0, 0, -6],
            [0, 2, -6]
        ],
        [
            [2, 2, 6],
            [2, 0, 6],
            [2, 0, -6],
            [2, 2, -6]
        ]
    ];

    //creating geometries
    var wheelSurfGeom1 = new THREE.BezierSurfaceGeometry(wheelSurfPoints1.reverse(), 60, 60);
    var wheelSurfGeom2 = new THREE.BezierSurfaceGeometry(wheelSurfPoints2.reverse(), 60, 60);

    var wheelPart1 = new THREE.SceneUtils.createMultiMaterialObject(wheelSurfGeom1, [wheelMaterial]);

    var wheelPart2 = new THREE.SceneUtils.createMultiMaterialObject(wheelSurfGeom2, [wheelMaterial]);
    // reflecting the created side of the triangle to get the opposite side
    var wheelPart3 = wheelPart1.clone();
    wheelPart3.rotation.y = Math.PI;
    wheel.add(wheelPart1);
    wheel.add(wheelPart2);
    wheel.add(wheelPart3);

    return wheel;
}


//Helper function that creates a textured box for Wall-E's hand

function createTexturedHand(handGeom) {
    // material array to map on the hand
    var mats = new THREE.MeshFaceMaterial(

        [yellowMaterial,
            handMaterial
        ]);
    //setting material indexes for the faces
    // to be able to selectively map textures
    //mapping the yellow metal texture on the following faces
    for (i = 0; i < 6; i++) {
        handGeom.faces[i].materialIndex = 0;
    }
    // mapping the stripy texture on one of the sides of the box
    for (i = 6; i < 8; i++) {
        handGeom.faces[i].materialIndex = 1;
    }
    //mapping the yellow metal texture on the following faces
    for (i = 8; i < 11; i++) {
        handGeom.faces[i].materialIndex = 0;
    }

    //sets all the texture params
    addTextureCoords(handGeom, 1.4, 1.6);

    var hand = new THREE.Mesh(handGeom, mats);
    return hand;
}

// Helper function that creates the whole hand
function createHand() {

    var wholeHand = new THREE.Object3D();
    var handArm = new THREE.Object3D();

    // creating the shoulder of the arm
    var shoulderGeom = new THREE.CylinderGeometry(0.7, 0.7, 2, 5, 32);
    var shoulder = new THREE.Mesh(shoulderGeom, handMetalMat);
    // creating the link between the hand box and the wrist of the hand
    var armStartGeom = new THREE.CylinderGeometry(0.8, 0.8, 2, 32);
    var armStart = new THREE.Mesh(armStartGeom, handMetalMat);
    // creating the wrist of the hand
    var wristGeom = new THREE.CylinderGeometry(0.4, 0.4, 2, 32);
    var wrist = new THREE.Mesh(wristGeom, yellowMaterial);

    // arm shape to be extruded for Wall-E's fingers
    var arm = new THREE.Shape();
    arm.moveTo(1.4, -0.31);
    arm.lineTo(3, -2);
    arm.lineTo(3, -4);
    arm.lineTo(2.5, -4);
    arm.lineTo(2.5, -2);
    arm.lineTo(1, -1.9);

    // extruding the shape
    var armGeom = new THREE.ExtrudeGeometry(arm, {
            amount: 1.4,
            bevelThickness: 0,
            bevelSize: 0,
            bevelSegments: 0,
            bevelEnabled: false,
            curveSegments: 0,
            steps: 1
        })
        // making two fingers
    var armFirst = new THREE.Mesh(armGeom, handMetalMat);
    var armSecond = armFirst.clone();

    //positioning and rotating the hand details accordinly 
    shoulder.position.set(0, -0.4, 0.6);
    wrist.position.set(0, 0.4, 9.5);
    wrist.rotation.x = Math.PI / 2;

    var armEnd = new THREE.Object3D();
    armFirst.rotation.y = Math.PI * 2 - Math.PI / 2;
    armFirst.position.set(0, 0, 0);
    armSecond.rotation.y = Math.PI * 2 - Math.PI / 2;
    armSecond.position.set(1.6, 0, 0)
    armEnd.add(armFirst);
    armEnd.add(armSecond);
    armEnd.position.set(0, 1, 9.7);
    armStart.position.set(0, 0, 10.8);
    armStart.rotation.z = Math.PI / 2;
    handArm.add(wrist);
    handArm.add(armEnd);
    handArm.add(armStart);
    handArm.position.set(0, 0, -2.5);
    handArm.rotation.z = Math.PI * 2 - Math.PI / 2;

    //creatin the box part of the hand
    var handFaces = createHandwFaces(1.4, 2, 6);
    var hand = createTexturedHand(handFaces);

    hand.rotation.y = Math.PI;
    hand.position.set(1, -1.2, 1);

    //nesting all the hadn details in the parent wholeHand object
    wholeHand.add(hand);
    wholeHand.add(shoulder);
    wholeHand.add(handArm);
    wholeHand.rotation.x = Math.PI * 2 - Math.PI / 6;

    return wholeHand;
}


//This helper function creates habd faces to allow selective texture
//mapping for the hand object
createHandwFaces = function(width, height, depth) {
    var w = width,
        h = height,
        len = depth;
    var handGeom = new THREE.Geometry();
    // add the front
    handGeom.vertices.push(new THREE.Vector3(0, 0, 0)); // vertex 0
    handGeom.vertices.push(new THREE.Vector3(w, 0, 0)); // vertex 1
    handGeom.vertices.push(new THREE.Vector3(w, h, 0)); // vertex 2
    handGeom.vertices.push(new THREE.Vector3(0, h, 0)); // vertex 3

    // the back
    handGeom.vertices.push(new THREE.Vector3(0, 0, -len)); // vertex 4
    handGeom.vertices.push(new THREE.Vector3(w, 0, -len)); // vertex 5
    handGeom.vertices.push(new THREE.Vector3(w, h, -len)); // vertex 6
    handGeom.vertices.push(new THREE.Vector3(0, h, -len)); // vertex 7

    // now that we've got the vertices we need to define the faces.
    // front faces
    handGeom.faces.push(new THREE.Face3(0, 1, 2)); // 0
    handGeom.faces.push(new THREE.Face3(0, 2, 3)); //1

    // back faces
    handGeom.faces.push(new THREE.Face3(4, 6, 5)); // 3
    handGeom.faces.push(new THREE.Face3(4, 7, 6)); //2

    // top faces.
    handGeom.faces.push(new THREE.Face3(3, 6, 7)); // 4
    handGeom.faces.push(new THREE.Face3(3, 2, 6)); //5

    // side faces
    handGeom.faces.push(new THREE.Face3(0, 3, 4)); // 6
    handGeom.faces.push(new THREE.Face3(3, 7, 4)); //7
    handGeom.faces.push(new THREE.Face3(1, 5, 2)); // 8
    handGeom.faces.push(new THREE.Face3(2, 5, 6)); //9

    // floor faces
    handGeom.faces.push(new THREE.Face3(0, 5, 1)); // 10
    handGeom.faces.push(new THREE.Face3(0, 4, 5)); //11

    // calculate the normals for shading
    handGeom.computeFaceNormals();
    return handGeom;
};

// functions that help cuztomized texture mapping
function addTextureCoords(boxGeom, maxT, maxS) {

    var UVs = [];

    function faceCoords(as, at, bs, bt, cs, ct) {
        UVs.push([new THREE.Vector2(as, at),
            new THREE.Vector2(bs, bt),
            new THREE.Vector2(cs, ct)
        ]);
    }
    // front
    faceCoords(0, 0, maxS, 0, maxS, maxT);
    faceCoords(0, 0, maxS, maxT, 0, maxT);

    faceCoords(maxS, 0, 0, maxT, 0, 0);
    faceCoords(maxS, 0, maxS, maxT, 0, maxT);
    // sides
    faceCoords(maxS, 0, 0, maxT, 0, 0);
    faceCoords(maxS, maxT, 0, maxT, maxS, 0);
    faceCoords(maxS, 0, maxS, maxT, 0, 0);
    faceCoords(maxS, maxT, 0, maxT, 0, 0);
    // floor
    faceCoords(0, 0, maxS, 0, 0, maxT);
    faceCoords(maxS, 0, maxS, maxT, 0, maxT);
    // Finally, attach this to the geometry
    boxGeom.faceVertexUvs = [UVs];

}

function updateQuadTextureParams(quad, sMin, sMax, tMin, tMax) {
    var elt = quad.faceVertexUvs[0]; // dunno why they have this 1-elt array
    var face0 = elt[0];
    face0[0] = new THREE.Vector2(sMin, tMax);
    face0[1] = new THREE.Vector2(sMin, tMin);
    face0[2] = new THREE.Vector2(sMax, tMax);
    var face1 = elt[1];
    face1[0] = new THREE.Vector2(sMin, tMin);
    face1[1] = new THREE.Vector2(sMax, tMin);
    face1[2] = new THREE.Vector2(sMax, tMax);
    // printTextureParams(quad);
    quad.uvsNeedUpdate = true;
}