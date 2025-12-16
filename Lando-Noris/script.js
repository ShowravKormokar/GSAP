import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js';

import {
    vertexShader,
    fluidFragmentShader,
    displayFragmentShader
} from './shaders.js';

window.addEventListener("load", init);

function init() {

    const canvas = document.querySelector("canvas");

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        precision: "highp"
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const mouse = new THREE.Vector2(0.5, 0.5);
    const prevMouse = new THREE.Vector2(0.5, 0.5);

    let isMoving = false;
    let lastMoveTime = 0;
    let lastUserInputTime = performance.now();

    const size = 500;

    const pingPongTargets = [
        new THREE.WebGLRenderTarget(size, size, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            type: THREE.FloatType,
        }),
        new THREE.WebGLRenderTarget(size, size, {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            format: THREE.RGBAFormat,
            type: THREE.FloatType,
        }),
    ];

    let currentTarget = 0;

    const topTexture = createPlaceholderTexture("#0000ff");
    const bottomTexture = createPlaceholderTexture("#ff0000");

    const topTextureSize = new THREE.Vector2(1, 1);
    const bottomTextureSize = new THREE.Vector2(1, 1);

    const parallax = new THREE.Vector2(0, 0);

    // ===============================
    // AUTO RANDOM REVEAL
    // ===============================

    const clock = new THREE.Clock();

    let autoMouse = {
        x: Math.random(),
        y: Math.random(),
    };

    let autoTarget = {
        x: Math.random(),
        y: Math.random(),
    };

    let autoTimer = 0;

    function updateAutoReveal(delta) {

        // ⛔ DO NOTHING if user moved mouse recently
        if (performance.now() - lastUserInputTime < 300) return;

        autoTimer += delta;

        if (autoTimer > 1.2) {
            autoTimer = 0;
            autoTarget.x = Math.random();
            autoTarget.y = Math.random();
        }

        autoMouse.x += (autoTarget.x - autoMouse.x) * 0.05;
        autoMouse.y += (autoTarget.y - autoMouse.y) * 0.05;

        trailsMaterial.uniforms.uMouse.value.set(autoMouse.x, autoMouse.y);
        trailsMaterial.uniforms.uIsMoving.value = true;
    }


    // ===============================
    // MATERIALS
    // ===============================

    const trailsMaterial = new THREE.ShaderMaterial({
        uniforms: {
            uPrevTrails: { value: null },
            uMouse: { value: mouse },
            uPrevMouse: { value: prevMouse },
            uResolution: { value: new THREE.Vector2(size, size) },
            uDecay: { value: 0.935 },
            uIsMoving: { value: false },
        },
        vertexShader,
        fragmentShader: fluidFragmentShader,
    });

    const displayMaterial = new THREE.ShaderMaterial({
        uniforms: {
            uFluid: { value: null },
            uTopTexture: { value: topTexture },
            uBottomTexture: { value: bottomTexture },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uDpr: { value: window.devicePixelRatio },
            uTopTextureSize: { value: topTextureSize },
            uBottomTextureSize: { value: bottomTextureSize },
            uParallax: { value: parallax },
        },
        vertexShader,
        fragmentShader: displayFragmentShader,
    });

    // ===============================
    // LOAD IMAGES
    // ===============================

    loadImage("./topOO.png", topTexture, topTextureSize);
    loadImage("./bottomO.png", bottomTexture, bottomTextureSize);

    // ===============================
    // SCENE SETUP
    // ===============================

    const planeGeometry = new THREE.PlaneGeometry(2, 2);
    const displayMesh = new THREE.Mesh(planeGeometry, displayMaterial);
    scene.add(displayMesh);

    const simMesh = new THREE.Mesh(planeGeometry, trailsMaterial);
    const simScene = new THREE.Scene();
    simScene.add(simMesh);

    renderer.setRenderTarget(pingPongTargets[0]);
    renderer.clear();
    renderer.setRenderTarget(pingPongTargets[1]);
    renderer.clear();
    renderer.setRenderTarget(null);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("resize", onWindowResize);

    animate();

    // ===============================
    // HELPERS
    // ===============================

    function createPlaceholderTexture(color) {
        const c = document.createElement("canvas");
        c.width = 512;
        c.height = 512;
        const ctx = c.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 512, 512);
        return new THREE.CanvasTexture(c);
    }

    function loadImage(url, targetTexture, textureSizeVector) {
        const img = new Image();
        img.crossOrigin = "anonymous";

        img.onload = () => {
            textureSizeVector.set(img.width, img.height);

            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);

            const tex = new THREE.CanvasTexture(canvas);
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;

            if (url.includes("top")) {
                displayMaterial.uniforms.uTopTexture.value = tex;
            } else {
                displayMaterial.uniforms.uBottomTexture.value = tex;
            }
        };

        img.src = url;
    }

    function onMouseMove(e) {
        lastUserInputTime = performance.now();

        const r = canvas.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) return;

        prevMouse.copy(mouse);
        mouse.x = (e.clientX - r.left) / r.width;
        mouse.y = 1 - (e.clientY - r.top) / r.height;

        const px = mouse.x - 0.5;
        const py = mouse.y - 0.5;

        parallax.x += (-px - parallax.x) * 0.08;
        parallax.y += (-py - parallax.y) * 0.08;

        isMoving = true;
        lastMoveTime = performance.now();
    }

    function onTouchMove(e) {
        if (!e.touches.length) return;
        e.preventDefault();

        const r = canvas.getBoundingClientRect();
        prevMouse.copy(mouse);

        mouse.x = (e.touches[0].clientX - r.left) / r.width;
        mouse.y = 1 - (e.touches[0].clientY - r.top) / r.height;

        isMoving = true;
        lastMoveTime = performance.now();
    }

    function onWindowResize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        displayMaterial.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
        displayMaterial.uniforms.uDpr.value = window.devicePixelRatio;
    }

    // ===============================
    // ANIMATE
    // ===============================

    function animate() {
        requestAnimationFrame(animate);

        parallax.multiplyScalar(0.97);

        const delta = clock.getDelta();
        updateAutoReveal(delta);

        if (isMoving && performance.now() - lastMoveTime > 50) {
            isMoving = false;
        }

        const prevTarget = pingPongTargets[currentTarget];
        currentTarget = (currentTarget + 1) % 2;

        trailsMaterial.uniforms.uPrevTrails.value = prevTarget.texture;
        trailsMaterial.uniforms.uPrevMouse.value.copy(prevMouse);
        trailsMaterial.uniforms.uIsMoving.value = isMoving;

        renderer.setRenderTarget(pingPongTargets[currentTarget]);
        renderer.render(simScene, camera);

        displayMaterial.uniforms.uFluid.value = pingPongTargets[currentTarget].texture;

        renderer.setRenderTarget(null);
        renderer.render(scene, camera);
    }
}