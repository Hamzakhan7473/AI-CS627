import React, { useEffect, useRef, useState } from 'react';

const FluidCursor = () => {
  const canvasRef = useRef(null);
  const glRef = useRef(null);
  const programRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Vertex shader source
  const vertexShaderSource = `
    attribute vec2 a_position;
    attribute vec2 a_velocity;
    attribute float a_life;
    attribute vec3 a_color;
    
    uniform vec2 u_resolution;
    uniform float u_time;
    
    varying vec3 v_color;
    varying float v_life;
    
    void main() {
      vec2 position = a_position + a_velocity * u_time;
      vec2 clipSpace = ((position / u_resolution) * 2.0) - 1.0;
      
      gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
      gl_PointSize = 3.0 + sin(u_time * 2.0 + a_life) * 1.0;
      
      v_color = a_color;
      v_life = a_life;
    }
  `;

  // Fragment shader source
  const fragmentShaderSource = `
    precision mediump float;
    
    varying vec3 v_color;
    varying float v_life;
    
    void main() {
      vec2 center = gl_PointCoord - vec2(0.5);
      float dist = length(center);
      
      if (dist > 0.5) {
        discard;
      }
      
      float alpha = (1.0 - dist * 2.0) * v_life;
      gl_FragColor = vec4(v_color, alpha);
    }
  `;

  // Create shader
  const createShader = (gl, type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  };

  // Create program
  const createProgram = (gl, vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    
    return program;
  };

  // Initialize WebGL
  const initWebGL = () => {
    const canvas = canvasRef.current;
    if (!canvas) return false;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return false;
    }

    glRef.current = gl;

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) return false;

    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return false;

    programRef.current = program;

    // Get attribute and uniform locations
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const velocityLocation = gl.getAttribLocation(program, 'a_velocity');
    const lifeLocation = gl.getAttribLocation(program, 'a_life');
    const colorLocation = gl.getAttribLocation(program, 'a_color');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');

    // Store locations
    gl.positionLocation = positionLocation;
    gl.velocityLocation = velocityLocation;
    gl.lifeLocation = lifeLocation;
    gl.colorLocation = colorLocation;
    gl.resolutionLocation = resolutionLocation;
    gl.timeLocation = timeLocation;

    // Enable blending for transparency
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    return true;
  };

  // Create particles
  const createParticles = () => {
    const particles = [];
    const colors = [
      [0.39, 0.40, 0.97], // Indigo
      [0.55, 0.36, 0.97], // Violet
      [0.02, 0.71, 0.83], // Cyan
      [0.93, 0.28, 0.60], // Pink
      [0.06, 0.72, 0.51], // Green
      [0.96, 0.62, 0.04]  // Orange
    ];

    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)],
        trail: []
      });
    }

    particlesRef.current = particles;
  };

  // Update particles with fluid dynamics
  const updateParticles = () => {
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const time = Date.now() * 0.001;

    particles.forEach(particle => {
      // Store previous position for trail
      particle.trail.unshift({ x: particle.x, y: particle.y });
      if (particle.trail.length > 10) {
        particle.trail.pop();
      }

      // Mouse interaction with fluid dynamics
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 150) {
        const force = (150 - distance) / 150;
        const angle = Math.atan2(dy, dx);
        
        // Create swirling motion
        const swirlForce = force * 0.02;
        particle.vx += Math.cos(angle + Math.PI / 2) * swirlForce;
        particle.vy += Math.sin(angle + Math.PI / 2) * swirlForce;
        
        // Add attraction/repulsion based on distance
        const attractionForce = force * 0.01;
        particle.vx += (dx / distance) * attractionForce;
        particle.vy += (dy / distance) * attractionForce;
      }

      // Add turbulence
      particle.vx += (Math.random() - 0.5) * 0.001;
      particle.vy += (Math.random() - 0.5) * 0.001;

      // Apply velocity
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Boundary conditions with soft bounce
      if (particle.x < 0 || particle.x > window.innerWidth) {
        particle.vx *= -0.8;
        particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
      }
      if (particle.y < 0 || particle.y > window.innerHeight) {
        particle.vy *= -0.8;
        particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
      }

      // Damping
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      // Update life cycle
      particle.life = Math.sin(time * 0.5 + particle.x * 0.01) * 0.5 + 0.5;
    });
  };

  // Render particles
  const render = () => {
    const gl = glRef.current;
    const program = programRef.current;
    const canvas = canvasRef.current;
    
    if (!gl || !program || !canvas) return;

    // Set viewport
    gl.viewport(0, 0, canvas.width, canvas.height);
    
    // Clear canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Use program
    gl.useProgram(program);

    // Set uniforms
    gl.uniform2f(gl.resolutionLocation, canvas.width, canvas.height);
    gl.uniform1f(gl.timeLocation, Date.now() * 0.001);

    // Update particles
    updateParticles();

    // Render each particle
    particlesRef.current.forEach(particle => {
      // Render trail
      particle.trail.forEach((point, index) => {
        const alpha = (1 - index / particle.trail.length) * 0.3;
        
        // Create buffer for this trail point
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([point.x, point.y]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(gl.positionLocation);
        gl.vertexAttribPointer(gl.positionLocation, 2, gl.FLOAT, false, 0, 0);

        const velocityBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, velocityBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0, 0]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(gl.velocityLocation);
        gl.vertexAttribPointer(gl.velocityLocation, 2, gl.FLOAT, false, 0, 0);

        const lifeBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, lifeBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([alpha]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(gl.lifeLocation);
        gl.vertexAttribPointer(gl.lifeLocation, 1, gl.FLOAT, false, 0, 0);

        const colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(particle.color), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(gl.colorLocation);
        gl.vertexAttribPointer(gl.colorLocation, 3, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.POINTS, 0, 1);

        // Clean up buffers
        gl.deleteBuffer(positionBuffer);
        gl.deleteBuffer(velocityBuffer);
        gl.deleteBuffer(lifeBuffer);
        gl.deleteBuffer(colorBuffer);
      });

      // Render main particle
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([particle.x, particle.y]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(gl.positionLocation);
      gl.vertexAttribPointer(gl.positionLocation, 2, gl.FLOAT, false, 0, 0);

      const velocityBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, velocityBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([particle.vx, particle.vy]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(gl.velocityLocation);
      gl.vertexAttribPointer(gl.velocityLocation, 2, gl.FLOAT, false, 0, 0);

      const lifeBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, lifeBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([particle.life]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(gl.lifeLocation);
      gl.vertexAttribPointer(gl.lifeLocation, 1, gl.FLOAT, false, 0, 0);

      const colorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(particle.color), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(gl.colorLocation);
      gl.vertexAttribPointer(gl.colorLocation, 3, gl.FLOAT, false, 0, 0);

      gl.drawArrays(gl.POINTS, 0, 1);

      // Clean up buffers
      gl.deleteBuffer(positionBuffer);
      gl.deleteBuffer(velocityBuffer);
      gl.deleteBuffer(lifeBuffer);
      gl.deleteBuffer(colorBuffer);
    });

    animationRef.current = requestAnimationFrame(render);
  };

  // Handle mouse movement
  const handleMouseMove = (e) => {
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
  };

  // Handle resize
  const handleResize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize WebGL
    if (initWebGL()) {
      createParticles();
      setIsInitialized(true);
      
      // Start animation
      render();
    }

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: isInitialized ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}
    />
  );
};

export default FluidCursor;
