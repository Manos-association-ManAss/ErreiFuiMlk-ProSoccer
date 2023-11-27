precision mediump float;

varying vec2 fragCoord;

uniform sampler2D uMainSampler;

void main(void)
{
    vec4 color = texture2D(uMainSampler, fragCoord.xy / vec2(800, 600)); // Substitua 800 e 600 pelas dimensões do seu jogo
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    gl_FragColor = vec4(vec3(gray), color.a);
}