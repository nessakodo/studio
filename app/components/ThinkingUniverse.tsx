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
    const particleCount = 3000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const radius = 30 * (0.75 + Math.random() * 0.5)
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Enhanced color distribution
      const colorMix = Math.random()
      colors[i * 3] = 0.2 + colorMix * 0.1 // R
      colors[i * 3 + 1] = 0.6 + colorMix * 0.2 // G
      colors[i * 3 + 2] = 0.4 + colorMix * 0.1 // B
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      sizeAttenuation: true
    })

    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(0xffffff, 0.4)
    pointLight1.position.set(10, 10, 10)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0x4ade80, 0.3)
    pointLight2.position.set(-10, -10, -10)
    scene.add(pointLight2)

    camera.position.z = 35

    // Enhanced controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.2
    controls.enableZoom = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.1

    // Animation
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Smooth particle rotation
      particles.rotation.y += 0.0001
      particles.rotation.x += 0.00005

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