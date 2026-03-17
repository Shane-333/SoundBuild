import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, Line } from '@react-three/drei'
import * as THREE from 'three'
import './HeroOrbitScene.css'

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY: Check user preference for reduced motion
// ─────────────────────────────────────────────────────────────────────────────
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ─────────────────────────────────────────────────────────────────────────────
// ORBITAL WRAPPER
// Rotates children around the Y axis at a given speed, radius, and inclination.
// Each element orbits the central core at its own pace and plane angle.
// ─────────────────────────────────────────────────────────────────────────────
function OrbitalGroup({ radius, inclination, speed, phase = 0, children }) {
  const pivotRef = useRef()

  useFrame((state) => {
    if (prefersReducedMotion) return
    pivotRef.current.rotation.y = state.clock.elapsedTime * speed + phase
  })

  return (
    <group rotation={[inclination, 0, 0]}>
      <group ref={pivotRef}>
        <group position={[radius, 0, 0]}>{children}</group>
      </group>
    </group>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// CENTRAL ENGINEERING CORE
// Layered architectural object: smoked-glass icosahedron + metallic rings + glow.
// Represents Sofbld's engineering intelligence and system architecture capability.
// 55% Boardroom Luxury weight: material restraint, dimensionality, confidence.
// ─────────────────────────────────────────────────────────────────────────────
function CentralCore() {
  const outerRef = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()

  useFrame((_state, delta) => {
    if (prefersReducedMotion) return
    outerRef.current.rotation.y += delta * 0.07
    outerRef.current.rotation.x += delta * 0.035
    ring1Ref.current.rotation.z += delta * 0.14
    ring2Ref.current.rotation.x += delta * 0.11
    ring3Ref.current.rotation.y += delta * 0.09
  })

  return (
    <group>
      {/* Innermost emissive glow sphere — the "live signal" at the core */}
      <mesh>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshBasicMaterial color="#4a9eff" transparent opacity={0.9} />
      </mesh>

      {/* Mid glow halo — soft bloom simulation */}
      <mesh>
        <sphereGeometry args={[0.45, 24, 24]} />
        <meshBasicMaterial color="#4a9eff" transparent opacity={0.08} />
      </mesh>

      {/* Smoked-glass icosahedron shell — engineered, sculptural, exact */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[0.82, 1]} />
        <meshPhysicalMaterial
          color="#1a2e50"
          metalness={0.15}
          roughness={0.06}
          transmission={0.5}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Primary equatorial metallic ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.22, 0.02, 8, 80]} />
        <meshStandardMaterial
          color="#2a4a7a"
          metalness={0.95}
          roughness={0.04}
          emissive="#4a9eff"
          emissiveIntensity={0.45}
        />
      </mesh>

      {/* Secondary tilted ring — precision framing */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3.5, Math.PI / 5, 0]}>
        <torusGeometry args={[1.08, 0.015, 8, 64]} />
        <meshStandardMaterial
          color="#1a3a6a"
          metalness={0.9}
          roughness={0.08}
          emissive="#4a9eff"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Tertiary ring with warm gold trace — restraint, fintech precision */}
      <mesh ref={ring3Ref} rotation={[-Math.PI / 5, Math.PI / 3.5, Math.PI / 6]}>
        <torusGeometry args={[0.94, 0.012, 8, 48]} />
        <meshStandardMaterial
          color="#3a3010"
          metalness={0.85}
          roughness={0.12}
          emissive="#f59e0b"
          emissiveIntensity={0.18}
        />
      </mesh>

      {/* Core point light — drives illumination of surrounding elements */}
      <pointLight color="#4a9eff" intensity={2.5} distance={5.5} decay={2} />
    </group>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// WEB APPLICATION PLANE
// Layered panel geometry suggesting dashboards, SaaS platforms, portals.
// Abstracted — not a literal screenshot. Elegant, structured.
// ─────────────────────────────────────────────────────────────────────────────
function WebAppPlane() {
  const groupRef = useRef()

  useFrame((state) => {
    if (prefersReducedMotion) return
    // Gentle self-rotation — feels alive, not static
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.06
  })

  return (
    <group ref={groupRef} rotation={[0.08, -0.25, 0.04]}>
      {/* Main panel body — smoked glass with depth */}
      <mesh>
        <boxGeometry args={[1.65, 1.05, 0.04]} />
        <meshPhysicalMaterial
          color="#0c1e3c"
          metalness={0.25}
          roughness={0.1}
          transmission={0.2}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Screen surface — subtle emissive interior */}
      <mesh position={[0, 0, 0.024]}>
        <planeGeometry args={[1.5, 0.92]} />
        <meshStandardMaterial
          color="#070f1e"
          emissive="#4a9eff"
          emissiveIntensity={0.07}
          roughness={0.3}
        />
      </mesh>

      {/* Top navigation bar */}
      <mesh position={[0, 0.385, 0.025]}>
        <planeGeometry args={[1.5, 0.11]} />
        <meshStandardMaterial
          color="#0f2245"
          emissive="#4a9eff"
          emissiveIntensity={0.14}
          roughness={0.2}
        />
      </mesh>

      {/* Horizontal divider lines — chart/data scaffolding */}
      {[-0.18, 0.02, 0.22].map((y, i) => (
        <mesh key={i} position={[0, y, 0.026]}>
          <planeGeometry args={[1.3, 0.008]} />
          <meshBasicMaterial color="#4a9eff" transparent opacity={0.22} />
        </mesh>
      ))}

      {/* Simulated data blocks on right side */}
      {[0.15, -0.05, -0.25].map((y, i) => (
        <mesh key={i} position={[0.5, y, 0.026]}>
          <planeGeometry args={[0.38, 0.12]} />
          <meshStandardMaterial
            color="#0f2040"
            emissive="#4a9eff"
            emissiveIntensity={0.18 - i * 0.04}
          />
        </mesh>
      ))}

      {/* Left column sidebar accent */}
      <mesh position={[-0.68, 0, 0.025]}>
        <planeGeometry args={[0.055, 0.92]} />
        <meshStandardMaterial
          color="#0a1e40"
          emissive="#4a9eff"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Graphite metal frame rim */}
      <mesh>
        <boxGeometry args={[1.69, 1.09, 0.042]} />
        <meshStandardMaterial
          color="#2a4a7a"
          metalness={0.95}
          roughness={0.05}
          transparent
          opacity={0.0}
        />
      </mesh>

      {/* Soft backlight */}
      <pointLight color="#4a9eff" intensity={0.4} distance={2} position={[0, 0, 0.6]} />
    </group>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// MOBILE DEVICE SLAB
// Ultra-thin premium device proportions suggesting customer apps, field tools.
// Integrated into the scene — not a generic phone mockup.
// ─────────────────────────────────────────────────────────────────────────────
function MobileSlab() {
  const groupRef = useRef()

  useFrame((state) => {
    if (prefersReducedMotion) return
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.25 + 1.5) * 0.12
    groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.18) * 0.04
  })

  return (
    <group ref={groupRef} rotation={[0.05, -0.15, 0.08]}>
      {/* Device body — brushed dark alloy */}
      <RoundedBox args={[0.5, 1.02, 0.052]} radius={0.048} smoothness={4}>
        <meshPhysicalMaterial
          color="#0e1826"
          metalness={0.88}
          roughness={0.06}
          envMapIntensity={1.3}
        />
      </RoundedBox>

      {/* Screen — emissive interface glow */}
      <mesh position={[0, 0.01, 0.029]}>
        <planeGeometry args={[0.42, 0.86]} />
        <meshStandardMaterial
          color="#040b16"
          emissive="#4a9eff"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Screen content rows */}
      {[-0.22, -0.07, 0.08, 0.23].map((y, i) => (
        <mesh key={i} position={[0, y, 0.03]}>
          <planeGeometry args={[0.32 - i * 0.02, 0.013]} />
          <meshBasicMaterial color="#4a9eff" transparent opacity={0.2 + i * 0.03} />
        </mesh>
      ))}

      {/* A small card element on screen */}
      <mesh position={[0, 0.15, 0.03]}>
        <planeGeometry args={[0.36, 0.16]} />
        <meshStandardMaterial
          color="#0a1e3c"
          emissive="#4a9eff"
          emissiveIntensity={0.18}
        />
      </mesh>

      {/* Front camera — detail precision */}
      <mesh position={[0, 0.445, 0.03]}>
        <circleGeometry args={[0.016, 16]} />
        <meshBasicMaterial color="#1a3060" />
      </mesh>

      {/* Home gesture bar */}
      <mesh position={[0, -0.43, 0.03]}>
        <planeGeometry args={[0.16, 0.009]} />
        <meshBasicMaterial color="#4a9eff" transparent opacity={0.35} />
      </mesh>

      {/* Edge rim light — thin metallic band */}
      <mesh position={[0, 0, 0]}>
        <RoundedBox args={[0.505, 1.025, 0.055]} radius={0.05} smoothness={4}>
          <meshStandardMaterial
            color="#3a5a8a"
            metalness={0.95}
            roughness={0.04}
            transparent
            opacity={0.0}
          />
        </RoundedBox>
      </mesh>

      <pointLight color="#4a9eff" intensity={0.3} distance={1.5} position={[0, 0, 0.5]} />
    </group>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AI INTELLIGENCE CLUSTER
// Luminous node groupings with branching logic — embedded intelligence.
// Deliberately restrained: no glowing brain icons, no neural spaghetti.
// ─────────────────────────────────────────────────────────────────────────────
function AICluster() {
  const groupRef = useRef()

  // Node positions — a controlled cluster arrangement, not random
  const nodes = useMemo(() => [
    [0, 0, 0],        // central hub
    [0.28, 0.22, 0.08],
    [-0.22, 0.28, -0.1],
    [0.08, -0.28, 0.2],
    [-0.18, -0.18, -0.22],
    [0.32, -0.1, -0.14],
    [-0.08, 0.1, 0.32],
  ], [])

  // Connections — disciplined branching from hub + peer links
  const connections = useMemo(() => [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 2], [1, 5], [2, 6], [3, 4],
  ], [])

  const nodeSizes = [0.095, 0.062, 0.055, 0.058, 0.048, 0.065, 0.052]
  const nodeIntensities = [1.4, 0.7, 0.6, 0.65, 0.5, 0.75, 0.55]

  useFrame((state, delta) => {
    if (prefersReducedMotion) return
    groupRef.current.rotation.y += delta * 0.07
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.08
  })

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[nodeSizes[i], 14, 14]} />
          <meshStandardMaterial
            color="#4a9eff"
            emissive="#4a9eff"
            emissiveIntensity={nodeIntensities[i]}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Connections — thin disciplined lines */}
      {connections.map(([a, b], i) => (
        <Line
          key={i}
          points={[nodes[a], nodes[b]]}
          color="#4a9eff"
          transparent
          opacity={0.22}
          lineWidth={0.9}
        />
      ))}

      {/* Cluster ambient light */}
      <pointLight color="#4a9eff" intensity={1.0} distance={2.2} decay={2} />
    </group>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// QUANT / DATA RIBBON
// Animated parametric surface suggesting financial tooling, analytics depth.
// Contour lines, disciplined wave — precision surface with graph-like geometry.
// ─────────────────────────────────────────────────────────────────────────────
function QuantRibbon() {
  const meshRef = useRef()
  const wireRef = useRef()

  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(1.75, 0.78, 48, 14)
  }, [])

  useFrame((state) => {
    if (!meshRef.current || !wireRef.current) return
    if (prefersReducedMotion) return

    const t = state.clock.elapsedTime
    const positions = meshRef.current.geometry.attributes.position
    const wPositions = wireRef.current.geometry.attributes.position

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const z =
        Math.sin(x * 2.8 + t * 0.55) * 0.11 +
        Math.sin(x * 5.5 + t * 0.35) * 0.055 +
        Math.cos(x * 1.5 + t * 0.25) * 0.04
      positions.setZ(i, z)
      wPositions.setZ(i, z + 0.002)
    }

    positions.needsUpdate = true
    wPositions.needsUpdate = true
    meshRef.current.geometry.computeVertexNormals()
  })

  // Separate geometry for wireframe (clone)
  const wireGeometry = useMemo(() => geometry.clone(), [geometry])

  return (
    <group rotation={[0.1, 0.18, 0.14]}>
      {/* Main surface — metallic blue, precision material */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#112040"
          metalness={0.85}
          roughness={0.08}
          emissive="#4a9eff"
          emissiveIntensity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Wireframe overlay — fintech precision, graph articulation */}
      <mesh ref={wireRef} geometry={wireGeometry}>
        <meshBasicMaterial
          color="#4a9eff"
          transparent
          opacity={0.12}
          wireframe
        />
      </mesh>

      {/* Edge contour accent — gold trace for quant distinction */}
      <mesh position={[0, -0.41, 0]}>
        <planeGeometry args={[1.75, 0.008]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.4} />
      </mesh>
      <mesh position={[0, 0.41, 0]}>
        <planeGeometry args={[1.75, 0.008]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ORCHESTRATION CONNECTORS
// Signal paths from central core to orbiting elements.
// Represents: shared architecture, interoperability, system ownership.
// Thin bezier curves with pulsing data signals.
// ─────────────────────────────────────────────────────────────────────────────
function OrchestrationConnectors() {
  const pulseRefs = [useRef(), useRef(), useRef(), useRef()]

  // Static curved paths — approximate directions to each orbital
  // These are atmospheric connectors, not precise trackers
  const paths = useMemo(() => [
    {
      points: [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1.8, 0.3, 0.4),
        new THREE.Vector3(3.3, 0.1, 0.1),
      ],
      color: '#4a9eff',
    },
    {
      points: [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1.0, -0.6, 1.2),
        new THREE.Vector3(0.5, -2.4, 1.0),
      ],
      color: '#4a9eff',
    },
    {
      points: [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(-1.8, 0.5, -0.6),
        new THREE.Vector3(-3.6, 0.4, -0.4),
      ],
      color: '#4a9eff',
    },
    {
      points: [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0.6, 1.2, -1.6),
        new THREE.Vector3(1.2, 0.2, -3.0),
      ],
      color: '#f59e0b',
    },
  ], [])

  const curves = useMemo(() =>
    paths.map(p => new THREE.QuadraticBezierCurve3(p.points[0], p.points[1], p.points[2])),
    [paths]
  )

  const linePoints = useMemo(() =>
    curves.map(c => c.getPoints(32).map(p => [p.x, p.y, p.z])),
    [curves]
  )

  // Animate pulse spheres along each path
  useFrame((state) => {
    if (prefersReducedMotion) return
    const t = state.clock.elapsedTime
    curves.forEach((curve, i) => {
      const ref = pulseRefs[i]
      if (!ref.current) return
      // Each pulse on its own offset timing
      const progress = ((t * 0.28 + i * 0.25) % 1.0)
      const pos = curve.getPoint(progress)
      ref.current.position.set(pos.x, pos.y, pos.z)
    })
  })

  return (
    <group>
      {/* Static connector lines */}
      {linePoints.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color={paths[i].color}
          transparent
          opacity={0.1}
          lineWidth={0.5}
        />
      ))}

      {/* Moving data pulse spheres */}
      {curves.map((_, i) => (
        <mesh key={i} ref={pulseRefs[i]}>
          <sphereGeometry args={[0.038, 8, 8]} />
          <meshBasicMaterial
            color={i === 3 ? '#f59e0b' : '#4a9eff'}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AMBIENT PARTICLE FIELD
// Scattered point particles — quiet atmospheric depth, not a storm.
// ─────────────────────────────────────────────────────────────────────────────
function AmbientParticles({ count = 90 }) {
  const ref = useRef()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Distribute in a sphere shell between r=4 and r=7
      const r = 4.5 + Math.random() * 2.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((_state, delta) => {
    if (prefersReducedMotion || !ref.current) return
    ref.current.rotation.y += delta * 0.008
    ref.current.rotation.x += delta * 0.004
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#4a9eff"
        size={0.022}
        transparent
        opacity={0.45}
        sizeAttenuation
      />
    </points>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// POINTER PARALLAX GROUP
// Subtle perspective tilt tracking cursor position.
// Premium physical depth feel — not a playful toy.
// ─────────────────────────────────────────────────────────────────────────────
function PointerParallaxGroup({ children }) {
  const groupRef = useRef()

  useFrame((state) => {
    if (prefersReducedMotion || !groupRef.current) return
    const { x, y } = state.pointer
    // Lerp toward pointer direction — slow, measured, expensive feel
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      y * -0.07,
      0.04
    )
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      x * 0.09,
      0.04
    )
  })

  return <group ref={groupRef}>{children}</group>
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDERER CONFIGURATION
// Apply tone mapping and exposure for premium visual feel
// ─────────────────────────────────────────────────────────────────────────────
function RendererConfig() {
  const { gl } = useThree()
  gl.toneMapping = THREE.ACESFilmicToneMapping
  gl.toneMappingExposure = 1.2
  return null
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPLETE SCENE CONTENT
// All elements assembled with strategic positioning.
// Scene is offset slightly to the right to frame well in the right hero column.
// ─────────────────────────────────────────────────────────────────────────────
function SceneContent() {
  return (
    <>
      <RendererConfig />

      {/* Lighting — Boardroom Luxury: cinematic, layered, selective */}
      <ambientLight color="#1a2a4a" intensity={0.9} />

      {/* Primary key light — confidence and dimensionality */}
      <directionalLight
        color="#c8d8f0"
        intensity={0.55}
        position={[-4, 6, 5]}
      />

      {/* Secondary fill — soft depth from opposite side */}
      <directionalLight
        color="#0a1628"
        intensity={0.2}
        position={[5, -3, -4]}
      />

      {/* Blue accent point from upper right */}
      <pointLight color="#4a9eff" intensity={0.5} position={[5, 3, 4]} distance={14} decay={2} />

      {/* Gold trace from lower right — Fintech Precision layer */}
      <pointLight color="#f59e0b" intensity={0.12} position={[4, -4, 2]} distance={10} decay={2} />

      {/* Main scene group — slight offset for visual composition */}
      <group position={[0.4, 0, 0]}>
        <PointerParallaxGroup>
          {/* 01 — Central Engineering Core */}
          <CentralCore />

          {/* 02 — Orbiting Web App Plane
               Radius 3.4, gentle inclination, medium speed */}
          <OrbitalGroup
            radius={3.4}
            inclination={0.28}
            speed={0.038}
            phase={0}
          >
            <WebAppPlane />
          </OrbitalGroup>

          {/* 03 — Orbiting Mobile Device Slab
               Tighter orbit, negative inclination, slightly faster */}
          <OrbitalGroup
            radius={2.75}
            inclination={-0.22}
            speed={0.055}
            phase={Math.PI / 2}
          >
            <MobileSlab />
          </OrbitalGroup>

          {/* 04 — Orbiting AI Intelligence Cluster
               Wider orbit, higher inclination, slower — feels weightier */}
          <OrbitalGroup
            radius={3.85}
            inclination={0.48}
            speed={0.032}
            phase={Math.PI}
          >
            <AICluster />
          </OrbitalGroup>

          {/* 05 — Orbiting Quant Data Ribbon
               Moderate orbit, steep negative inclination for visual depth */}
          <OrbitalGroup
            radius={3.15}
            inclination={-0.42}
            speed={0.042}
            phase={Math.PI * 1.5}
          >
            <QuantRibbon />
          </OrbitalGroup>

          {/* Orchestration connectors — internal tools represented through
               workflow logic and signal routing, not a separate object */}
          <OrchestrationConnectors />

          {/* Ambient particle atmosphere */}
          <AmbientParticles count={80} />
        </PointerParallaxGroup>
      </group>
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO ORBIT SCENE — Canvas wrapper
// Exported component to embed in Hero.jsx
// Canvas is pointer-event-none so text + CTAs remain fully interactive.
// ─────────────────────────────────────────────────────────────────────────────
export default function HeroOrbitScene() {
  return (
    <div className="hero-scene-wrapper" aria-hidden="true">
      {/* Fallback gradient always present — visible before canvas loads */}
      <div className="hero-scene-fallback" />

      <Canvas
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)]}
        camera={{ position: [0, 0.5, 9], fov: 52, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
