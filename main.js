import * as THREE from 'three';

class BasicWorldDemo{
    constructor(){
        this._Initialize();
    }
}

_Initialize(){
    this._threejs = new THREE.WebGLRenderer({
        antialias: true,
    });
    this._threejs.shadowMap.enabled = true;
    this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
    this._threejs.setPixelRatio(window.devicePixelRatio);
    this._threejs.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(this._threejs.domElement);

window.addEventListener('resize', () => {
    this._OnWindowResize();
}, false);

const fov = 60;
const aspect = 1920 / 1080;
const near = 1.0;
const far = 1000.0;
this._camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
this._camera.position.set(75, 20, 0);

this._scene = new THREE.Scene();

let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
light.position.set(-100, 100, 100);
light.target.position.set(0, 0, 0);
light.castShadow = true;
light.shadow.bias = -0.01;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 1.0;
light.shadow.camera.far = 500;
light.shadow.camera.left = 200;
light.shadow.camera.right = -200;
light.shadow.camera.top = 200;
light.shadow.camera.bottom = -200;
this._scene.add(light);

light = new THREE.AmbientLight(0x404040);
this._scene.add(light);

this._RAF();
}  

_OnWindowResize(){
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();
    this._threejs.setSize(window.innerWidth, window.innerHeight);
}

_RAF(){
    requestAnimationFrame(() => {
        this._threejs.render(this._scene, this._camera);
        this._RAF();
    });
}
