const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fluidFragmentShader = `
uniform sampler2D uPrevTrails;
uniform vec2 uMouse;
uniform vec2 uPrevMouse;
uniform float uDecay;
uniform bool uIsMoving;

varying vec2 vUv;

void main() {
    vec4 prevState = texture2D(uPrevTrails, vUv);

    float newValue = prevState.r * uDecay;
    
    if (uIsMoving) {
        vec2 mouseDirection = uMouse - uPrevMouse;
        float lineLength = length(mouseDirection);
        
        if (lineLength > 0.001) {
            vec2 mouseDir = mouseDirection / lineLength;

            vec2 toPixel = vUv - uPrevMouse;            
            float projAlong = dot(toPixel, mouseDir);
            projAlong = clamp(projAlong, 0.0, lineLength);

            vec2 closestPoint = uPrevMouse + projAlong * mouseDir;
            float dist = length(vUv - closestPoint);

            float lineWidth = 0.1;
            float intensity = smoothstep(lineWidth, 0.0, dist) * 0.9;

            newValue += intensity;
        }
    }
    
    gl_FragColor = vec4(newValue, 0.0, 0.0, 1.0);
}

`;

const displayFragmentShader = `
uniform sampler2D uFluid;
uniform sampler2D uTopTexture;
uniform sampler2D uBottomTexture;
uniform vec2 uResolution;
uniform vec2 uTopTextureSize;
uniform vec2 uBottomTextureSize;
uniform vec2 uParallax;

varying vec2 vUv;

vec2 getCoverUV(vec2 uv, vec2 textureSize) {
    // Return original UV if texture size is invalid
    if (textureSize.x < 1.0 || textureSize.y < 1.0) {
        return uv;
    }
    
    // Calculate cover-style UV mapping
    vec2 s = uResolution / textureSize;
    float scale = max(s.x, s.y);
    vec2 scaledSize = textureSize * scale;
    vec2 offset = (uResolution - scaledSize) * 0.5;
    
    return (uv * uResolution - offset) / scaledSize;
}

void main() {
    float mask = texture2D(uFluid, vUv).r;

    // boost low values (important for black images)
    mask = pow(mask, 0.5);
    mask = clamp(mask, 0.0, 1.0);

    float t = 1.0 - mask;

    vec2 p = uParallax * 0.04;

    vec2 uvTop = getCoverUV(vUv - p, uTopTextureSize);
    vec2 uvBot = getCoverUV(vUv - p * 0.6, uBottomTextureSize);

    vec4 top = texture2D(uTopTexture, uvTop);
    vec4 bot = texture2D(uBottomTexture, uvBot);

    gl_FragColor = top * t + bot * (1.05 - t);
    // gl_FragColor = mix(top, bot, smoothstep(0.9, 0.10, 1.0 - t));//Reverse 2nd img to 1st image
}
`;

export { vertexShader, fluidFragmentShader, displayFragmentShader };