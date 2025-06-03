"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export default function ThinkingUniverse() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    mountRef.current.appendChild(renderer.domElement)

    // Create particles with improved distribution
    const particlesGeometry = new THREE.BufferGeometry()
    const particleCount = 4000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const radius = 40 * (0.75 + Math.random() * 0.5)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Enhanced color distribution for holographic effect
      const colorMix = Math.random()
      colors[i * 3] = 0.1 + colorMix * 0.05 // R
      colors[i * 3 + 1] = 0.4 + colorMix * 0.1 // G
      colors[i * 3 + 2] = 0.3 + colorMix * 0.05 // B

      // Varying particle sizes
      sizes[i] = Math.random() * 0.15 + 0.05
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Create vortex effect
    const vortexGeometry = new THREE.BufferGeometry()
    const vortexCount = 2000
    const vortexPositions = new Float32Array(vortexCount * 3)
    const vortexColors = new Float32Array(vortexCount * 3)

    for (let i = 0; i < vortexCount; i++) {
      const t = i / vortexCount
      const radius = 50 * (1 - t)
      const angle = t * Math.PI * 8
      const height = 100 * (t - 0.5)

      vortexPositions[i * 3] = radius * Math.cos(angle)
      vortexPositions[i * 3 + 1] = height
      vortexPositions[i * 3 + 2] = radius * Math.sin(angle)

      const colorMix = Math.random()
      vortexColors[i * 3] = 0.1 + colorMix * 0.05
      vortexColors[i * 3 + 1] = 0.4 + colorMix * 0.1
      vortexColors[i * 3 + 2] = 0.3 + colorMix * 0.05
    }

    vortexGeometry.setAttribute('position', new THREE.BufferAttribute(vortexPositions, 3))
    vortexGeometry.setAttribute('color', new THREE.BufferAttribute(vortexColors, 3))

    const vortexMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending
    })

    const vortex = new THREE.Points(vortexGeometry, vortexMaterial)
    scene.add(vortex)

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.1)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0x4ade80, 0.3)
    pointLight1.position.set(10, 10, 10)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x94a3b8, 0.2)
    pointLight2.position.set(-10, -10, -10)
    scene.add(pointLight2)

    camera.position.z = 45

    // Enhanced controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.15
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.1

    // Animation
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      const time = Date.now() * 0.001

      // Smooth particle rotation with varying speeds
      particles.rotation.y += 0.0001
      particles.rotation.x += 0.00005

      // Vortex animation
      vortex.rotation.y += 0.0005
      vortex.rotation.z += 0.0002

      // Dynamic particle movement
      const positions = particles.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 3) {
        const y = positions[i + 1]
        positions[i + 1] += Math.sin(time + i * 0.01) * 0.01
      }
      particles.geometry.attributes.position.needsUpdate = true

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      mountRef.current?.removeChild(renderer.domElement)
      controls.dispose()
    }
  }, [])

  return (
    <div className="absolute inset-0">
      <div ref={mountRef} className="absolute inset-0" />
    </div>
  )
} 