import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import { useRef, useState, useEffect, useMemo, Suspense } from 'react'
import * as THREE from 'three'

const TEXTUREMAP = 'https://i.postimg.cc/XYwvXN8D/img-4.png'
const DEPTHMAP   = 'https://i.postimg.cc/2SHKQh2q/raw-4.webp'

// ─── GLSL Shaders ──────────────────────────────────────────────────────────
const vertexShader = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */`
  uniform sampler2D tMap;
  uniform sampler2D tDepth;
  uniform vec2      uPointer;
  uniform float     uProgress;
  uniform float     uOpacity;
  varying vec2      vUv;

  void main() {
    // Depth-map parallax offset
    float depth  = texture2D(tDepth, vUv).r;
    vec2  offset = depth * uPointer * 0.012;
    vec4  color  = texture2D(tMap, vUv + offset);

    // Halftone dot overlay following depth wave
    vec2  aspect  = vec2(1.0, 1.0);
    vec2  tUv     = vUv * aspect * 120.0;
    vec2  tile    = mod(tUv, 2.0) - 1.0;
    float dist    = length(tile);
    float dotMask = smoothstep(0.5, 0.49, dist);

    // Wave flow based on depth vs scan progress
    float flow  = 1.0 - smoothstep(0.0, 0.025, abs(depth - uProgress));
    vec3  mask  = dotMask * flow * vec3(8.0, 0.0, 0.0);

    // Screen blend: 1-(1-a)*(1-b)
    vec3 blended = 1.0 - (1.0 - color.rgb) * (1.0 - mask);

    // Red scan line
    float scan = smoothstep(0.06, 0.0, abs(vUv.y - uProgress));
    blended += vec3(1.0, 0.0, 0.0) * scan * 0.35;

    gl_FragColor = vec4(blended, color.a * uOpacity);
  }
`

// ─── Scene mesh ────────────────────────────────────────────────────────────
function DepthScene() {
  const meshRef  = useRef()
  const [colorMap, depthMap] = useTexture([TEXTUREMAP, DEPTHMAP])
  const [opacity, setOpacity] = useState(0)
  const { viewport } = useThree()

  useEffect(() => {
    if (colorMap && depthMap) {
      // fade in after textures load
      const id = setTimeout(() => setOpacity(1), 100)
      return () => clearTimeout(id)
    }
  }, [colorMap, depthMap])

  const uniforms = useMemo(() => ({
    tMap:      { value: colorMap  },
    tDepth:    { value: depthMap  },
    uPointer:  { value: new THREE.Vector2(0, 0) },
    uProgress: { value: 0 },
    uOpacity:  { value: 0 },
  }), [colorMap, depthMap])

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime()
    uniforms.uProgress.value = Math.sin(t * 0.5) * 0.5 + 0.5
    uniforms.uPointer.value.lerp(pointer, 0.06)
    uniforms.uOpacity.value = THREE.MathUtils.lerp(
      uniforms.uOpacity.value,
      opacity,
      0.05
    )
  })

  // Fill the viewport keeping aspect ratio
  const aspect = 300 / 300
  const scale = Math.min(viewport.width, viewport.height * aspect) * 0.88

  return (
    <mesh ref={meshRef} scale={[scale, scale / aspect, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  )
}

// ─── FuturisticHero ────────────────────────────────────────────────────────
export default function FuturisticHero() {
  const titleWords = 'Precision in Motion.'.split(' ')
  const subtitle   = "Kosovo's leading tachograph specialists since 2001."

  const [visibleWords,    setVisibleWords]    = useState(0)
  const [subtitleVisible, setSubtitleVisible] = useState(false)
  const [delays,          setDelays]          = useState([])

  useEffect(() => {
    setDelays(titleWords.map(() => Math.random() * 0.06))
  }, [])

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const t = setTimeout(() => setVisibleWords(v => v + 1), 550)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setSubtitleVisible(true), 700)
    return () => clearTimeout(t)
  }, [visibleWords, titleWords.length])

  return (
    <div className="relative h-svh overflow-hidden bg-black">

      {/* WebGL Canvas — full background */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 1], fov: 75, near: 0.01, far: 10 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: '#000' }}
        >
          <Suspense fallback={null}>
            <DepthScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient vignette */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.65) 100%)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }} />

      {/* Text overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 pointer-events-none">

        {/* Badge */}
        <div className="futuristic-badge mb-6">
          <span className="badge-dot" />
          Est. 2001 — Kosovo
        </div>

        {/* Title — word by word */}
        <div className="text-4xl md:text-6xl xl:text-7xl font-extrabold text-center mb-4">
          <div className="flex flex-wrap justify-center gap-x-4 lg:gap-x-6">
            {titleWords.map((word, i) => (
              <span
                key={i}
                className={i < visibleWords ? 'hero-word-in' : ''}
                style={{
                  opacity: i < visibleWords ? undefined : 0,
                  animationDelay: `${i * 0.12 + (delays[i] || 0)}s`,
                  color: word === 'Motion.' ? '#E31E24' : 'white',
                  display: 'inline-block',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.02em',
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <div
          className={subtitleVisible ? 'hero-subtitle-in' : ''}
          style={{ opacity: subtitleVisible ? undefined : 0 }}
        >
          <div
            className="inline-flex items-center px-5 py-2.5 rounded-full text-sm md:text-base font-semibold text-white text-center"
            style={{
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* CTA buttons */}
        {subtitleVisible && (
          <div
            className="hero-cta-in flex flex-wrap justify-center gap-4 mt-10 pointer-events-auto"
          >
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-btn-primary"
            >
              View Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-btn-ghost"
            >
              Contact Us
            </button>
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      <button
        className="explore-btn pointer-events-auto"
        style={{ animationDelay: '3s' }}
        onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
      >
        Scroll to explore
        <span className="explore-arrow">
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none" className="arrow-svg">
            <path d="M11 5V17" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 12L11 17L16 12" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
    </div>
  )
}
