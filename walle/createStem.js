//This function creates a stem that Wall-E holds and then hands to Eve

function createStem() {
    var greenMat = new THREE.MeshBasicMaterial({
        color: 0x317A28, // green
        side: THREE.DoubleSide
    });

    // points for creating a bezier surface for the leaf
    var leafPoints = [
        [
            [0, 0, 0],
            [1.5, -1, 1],
            [2, -2, 2],
            [2.5, -0.2, 0]
        ],
        [
            [0, 0, 0],
            [1.5, -1, 0.5],
            [2, -1.5, 1.5],
            [2.5, -0.2, 0]
        ],
        [
            [0, 0, 0],
            [1.5, -1, -0.5],
            [2, -1.5, -1.5],
            [2.5, -0.2, 0]
        ],
        [
            [0, 0, 0],
            [1.5, -1.5, -1],
            [2, -2, -2],
            [2.5, -0.2, 0]
        ]
    ];

    //creaging bezier surface
    var leafGeom = new THREE.BezierSurfaceGeometry(leafPoints.reverse(), 30, 30);

    var leaf = new THREE.Mesh(leafGeom, greenMat);
    leaf.rotation.x = Math.PI;
    //making a second leaf using the first one
    var leaf2 = leaf.clone();
    leaf.rotation.y = Math.PI;
    leaf.position.set(0, 4, 0);
    leaf2.position.set(0, 6.5, 0);

    //points that will be used to create a tube geometry for the stem
    var stemPoints = [];
    stemPoints.push(new THREE.Vector3(0, 0, 0));
    stemPoints.push(new THREE.Vector3(1, 3, 0));
    stemPoints.push(new THREE.Vector3(-1, 5, 0));
    stemPoints.push(new THREE.Vector3(0.5, 7, 0));

    //creating tube geometry
    var stemGeom = new THREE.TubeGeometry(new THREE.SplineCurve3(stemPoints), 64, 0.1, 10, false);
    var stem = new THREE.Mesh(stemGeom, greenMat);

    var fullStem = new THREE.Object3D();
    fullStem.add(leaf);
    fullStem.add(leaf2);
    fullStem.add(stem);

    return fullStem;
}