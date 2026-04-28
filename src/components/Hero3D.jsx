import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles, Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import './Hero3D.css'

// Generated once at module load — safe from React compiler purity rules
const PETAL_COLORS = ['#C4B5FD', '#A78BFA', '#7C3AED', '#DDD6FE', '#8B5CF6', '#EDE9FE']
const PETAL_DATA = Array.from({ length: 34 }, () => ({
  position: [
    (Math.random() - 0.5) * 28,
    (Math.random() - 0.5) * 22,
    (Math.random() - 0.5) * 12 - 4,
  ],
  rotation: [
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
  ],
  color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
  speed: 0.012 + Math.random() * 0.022,
}))

/* ── individual petal ─────────────────────────────── */
function Petal({ position, rotation, color, speed }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x += speed * 0.6
    ref.current.rotation.z += speed * 0.4
    ref.current.position.y -= speed * 0.25
    ref.current.position.x +=
      Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.003
    if (ref.current.position.y < -14) ref.current.position.y = 14
  })

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <planeGeometry args={[0.28, 0.38]} />
      <meshStandardMaterial
        color={color}
        side={THREE.DoubleSide}
        transparent
        opacity={0.82}
      />
    </mesh>
  )
}

/* ── petal field ──────────────────────────────────── */
function FloatingPetals() {
  return PETAL_DATA.map((p, i) => <Petal key={i} {...p} />)
}

/* ── wedding rings ────────────────────────────────── */
function WeddingRings() {
  const groupRef = useRef()
  useFrame((state) => {
    if (!groupRef.current) return
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.28
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.32 - 1.8
  })
  return (
    <group ref={groupRef} position={[0, -1.8, 0]}>
      {/* gold ring */}
      <mesh position={[-0.38, 0, 0]} rotation={[Math.PI / 2, 0, 0.32]}>
        <torusGeometry args={[0.58, 0.08, 20, 120]} />
        <meshStandardMaterial color="#FFD700" metalness={1} roughness={0.04} />
      </mesh>
      {/* silver ring */}
      <mesh position={[0.38, 0, 0]} rotation={[Math.PI / 2, 0, -0.32]}>
        <torusGeometry args={[0.58, 0.08, 20, 120]} />
        <meshStandardMaterial color="#E8E8E8" metalness={0.92} roughness={0.1} />
      </mesh>
      {/* diamond */}
      <mesh position={[-0.38, 0.6, 0]}>
        <octahedronGeometry args={[0.09, 0]} />
        <meshStandardMaterial
          color="#B9F2FF"
          metalness={0}
          roughness={0}
          transparent
          opacity={0.78}
          emissive="#88DDFF"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  )
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
      <pointLight position={[0, -6, 4]} intensity={0.6} color="#A78BFA" />

      <Stars radius={120} depth={60} count={5000} factor={4} saturation={0.3} fade speed={0.8} />
      <Sparkles count={140} scale={14} size={2.4} speed={0.35} opacity={0.85} color="#C4B5FD" />

      <FloatingPetals />

      <Float speed={1.4} rotationIntensity={0.28} floatIntensity={0.45}>
        <WeddingRings />
      </Float>

      <FloatingHeart position={[4.5, 2.2, -4]} scale={0.38} />
      <FloatingHeart position={[-4.2, 1.2, -3]} scale={0.32} />
      <FloatingHeart position={[3.2, -2.5, -5]} scale={0.28} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.18} intensity={1.4} levels={8} mipmapBlur />
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
            <span className="hero-name">Karthikasree</span>
            <span className="hero-amp">&amp;</span>
            <span className="hero-name">Sarathkumar</span>
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
