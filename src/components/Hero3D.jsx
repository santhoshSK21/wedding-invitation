import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import './Hero3D.css'

// Generated once at module load — safe from React compiler purity rules
const PETAL_COLORS = [
  '#C4B5FD', '#A78BFA', '#7C3AED', '#DDD6FE', '#8B5CF6', '#EDE9FE',
  '#FBCFE8', '#F9A8D4', '#F472B6', '#FDE8EE', '#FF6BA8', '#FFB3D1',
]
const PETAL_DATA = Array.from({ length: 60 }, (_, i) => ({
  position: [
    (((i * 137.5) % 28) - 14),
    (((i * 73.1) % 22) - 11),
    (((i * 51.7) % 12) - 10),
  ],
  rotation: [
    (i * 0.57) % (Math.PI * 2),
    (i * 1.13) % (Math.PI * 2),
    (i * 0.89) % (Math.PI * 2),
  ],
  color: PETAL_COLORS[i % PETAL_COLORS.length],
  speed: 0.008 + (i % 8) * 0.003,
  width:  0.18 + (i % 5) * 0.07,
  height: 0.24 + (i % 4) * 0.08,
}))

/* ── individual petal ─────────────────────────────── */
function Petal({ position, rotation, color, speed, width, height }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x += speed * 0.5
    ref.current.rotation.z += speed * 0.35
    ref.current.position.y -= speed * 0.2
    ref.current.position.x +=
      Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.002
    if (ref.current.position.y < -14) ref.current.position.y = 14
  })

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={0.78}
      />
    </mesh>
  )
}

/* ── petal field ──────────────────────────────────── */
function FloatingPetals() {
  return PETAL_DATA.map((p, i) => <Petal key={i} {...p} />)
}

/* ── floating heart ───────────────────────────────── */
function FloatingHeart({ position, scale = 0.45 }) {
  const ref = useRef()

  const geometry = useMemo(() => {
    const shape = new THREE.Shape()
    shape.moveTo(0, 0.4)
    shape.bezierCurveTo(0, 0.75, 0.48, 0.75, 0.48, 0.4)
    shape.bezierCurveTo(0.48, 0.1, 0, -0.1, 0, -0.38)
    shape.bezierCurveTo(0, -0.1, -0.48, 0.1, -0.48, 0.4)
    shape.bezierCurveTo(-0.48, 0.75, 0, 0.75, 0, 0.4)
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    })
    geo.center()
    return geo
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.55
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.22
  })

  return (
    <mesh ref={ref} position={position} geometry={geometry} scale={scale}>
      <meshStandardMaterial
        color="#FF1493"
        metalness={0.25}
        roughness={0.45}
        emissive="#FF1493"
        emissiveIntensity={0.28}
      />
    </mesh>
  )
}

/* ── Scene ────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <pointLight position={[6, 6, 6]} intensity={1.8} color="#C4B5FD" />
      <pointLight position={[-6, -4, 4]} intensity={1.2} color="#7C3AED" />
      <pointLight position={[0, 9, 0]} intensity={0.9} color="#EDE9FE" />
      <pointLight position={[0, -6, 4]} intensity={0.6} color="#F9A8D4" />

      <Stars radius={120} depth={60} count={5000} factor={4} saturation={0.3} fade speed={0.8} />
      <Sparkles count={180} scale={16} size={2.2} speed={0.3} opacity={0.9} color="#F9A8D4" />
      <Sparkles count={100} scale={12} size={1.6} speed={0.5} opacity={0.7} color="#C4B5FD" />

      <FloatingPetals />

      <FloatingHeart position={[4.5, 2.2, -4]} scale={0.42} />
      <FloatingHeart position={[-4.2, 1.2, -3]} scale={0.35} />
      <FloatingHeart position={[3.2, -2.5, -5]} scale={0.3} />
      <FloatingHeart position={[-2.8, -1.8, -6]} scale={0.26} />
      <FloatingHeart position={[1.5, 3.5, -7]} scale={0.22} />
      <FloatingHeart position={[-5.5, 3.0, -5]} scale={0.28} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.15} intensity={1.6} levels={8} mipmapBlur />
      </EffectComposer>
    </>
  )
}

/* ── Hero ─────────────────────────────────────────── */
export default function Hero3D() {
  return (
    <section className="hero-section">
      <Canvas
        className="hero-canvas"
        camera={{ position: [0, 0, 13], fov: 58 }}
        gl={{ antialias: true }}
        style={{ background: 'linear-gradient(135deg, #EDE9FE, #C4B5FD, #A78BFA)' }}
      >
        <Scene />
      </Canvas>

      {/* HTML text overlay */}
      <div className="hero-overlay">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="hero-eyebrow">Together with their families</p>

          <h1 className="hero-names">
            <span className="hero-name">Sarathkumar</span>
            <span className="hero-amp">&amp;</span>
            <span className="hero-name">Karthikasree</span>
          </h1>

          <div className="hero-divider">
            <span className="hero-line" />
            <span className="hero-diamond">◆</span>
            <span className="hero-line" />
          </div>

          <p className="hero-sub">request the honour of your presence</p>
          <p className="hero-sub">at their wedding celebration</p>

          <motion.a
            href="#invitation"
            className="hero-scroll"
            animate={{ y: [0, 9, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span>Scroll to discover</span>
            <span>↓</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
