// Redesigned Home.jsx - Light Theme, Modern Layout, Tailwind CSS
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ChevronDown, Github, ExternalLink, Mail, Phone, MapPin, Code, Database, Smartphone, Globe, Star, ArrowRight, Menu, X } from 'lucide-react';

function Home() {
 const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  // Three.js Animation Setup
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating geometric shapes
    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshPhongMaterial({ 
      color: 0x6366f1, 
      transparent: true, 
      opacity: 0.8,
      shininess: 100
    });

    const shapes = [];
    for (let i = 0; i < 15; i++) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 20;
      mesh.position.y = (Math.random() - 0.5) * 20;
      mesh.position.z = (Math.random() - 0.5) * 20;
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      scene.add(mesh);
      shapes.push(mesh);
    }

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera.position.z = 10;
    sceneRef.current = { scene, camera, renderer, shapes };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.01;
        shape.rotation.y += 0.01;
        shape.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Scroll handler for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      liveLink: "#",
      githubLink: "#"
    },
    {
      title: "Task Management App",
      description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      tech: ["React", "Firebase", "Tailwind CSS", "Socket.io"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      liveLink: "#",
      githubLink: "#"
    },
    {
      title: "Weather Dashboard",
      description: "Real-time weather application with geolocation, forecasts, and interactive maps. Built with modern React and weather APIs.",
      tech: ["React", "OpenWeather API", "Chart.js", "Geolocation"],
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop",
      liveLink: "#",
      githubLink: "#"
    }
  ];

  const skills = [
    { name: "React", level: 95, icon: <Globe className="w-6 h-6" /> },
    { name: "Node.js", level: 90, icon: <Database className="w-6 h-6" /> },
    { name: "JavaScript", level: 95, icon: <Code className="w-6 h-6" /> },
    { name: "MongoDB", level: 85, icon: <Database className="w-6 h-6" /> },
    { name: "React Native", level: 80, icon: <Smartphone className="w-6 h-6" /> },
    { name: "Three.js", level: 75, icon: <Globe className="w-6 h-6" /> }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen relative overflow-hidden">
      {/* Three.js Background */}
      <div ref={mountRef} className="fixed inset-0 z-0" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Vidhi Savaliya
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-200 hover:text-indigo-400 ${
                    activeSection === item ? 'text-indigo-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-3 py-2 capitalize text-gray-300 hover:text-indigo-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Vidhi Savaliya
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Full Stack Developer & Creative Problem Solver
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              I craft beautiful, functional web applications that drive business growth. 
              Specializing in React, Node.js, and modern web technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border border-indigo-500 hover:bg-indigo-500 px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-indigo-400">
                Passionate Developer & Problem Solver
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I'm a full-stack developer with a passion for creating innovative web solutions. 
                With expertise in modern technologies like React, Node.js, and MongoDB, I help 
                businesses transform their ideas into powerful digital experiences.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                My approach combines technical excellence with creative problem-solving, ensuring 
                that every project not only meets requirements but exceeds expectations.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                  3+ Years Experience
                </span>
                <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  50+ Projects Completed
                </span>
                <span className="px-4 py-2 bg-pink-500/20 text-pink-300 rounded-full text-sm">
                  Happy Clients
                </span>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full mx-auto opacity-20 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">👩‍💻</div>
                  <p className="text-lg text-gray-300">Building the future, one line at a time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-indigo-500 transition-all duration-200 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className="text-indigo-400 mr-3">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{skill.name}</h3>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-2">{skill.level}% Proficiency</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto"></div>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and creativity
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-200 transform hover:scale-105">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-indigo-400">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.liveLink}
                      className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubLink}
                      className="flex items-center text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      <Github className="w-4 h-4 mr-1" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Let's Work Together
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto"></div>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Ready to bring your project to life? Let's discuss how I can help you achieve your goals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-indigo-400">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-indigo-400 mr-4" />
                  <span className="text-gray-300">vidhi.savaliya@example.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-indigo-400 mr-4" />
                  <span className="text-gray-300">+91 12345 67890</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-indigo-400 mr-4" />
                  <span className="text-gray-300">Surat, Gujarat, India</span>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4 text-indigo-400">Why Choose Me?</h4>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-2" />
                    Clean, maintainable code
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-2" />
                    Responsive design
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-2" />
                    On-time delivery
                  </li>
                  <li className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 mr-2" />
                    Post-launch support
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Project Details</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-indigo-500 text-white"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button
                  onClick={() => alert('Contact form submitted! In a real implementation, this would send an email or save to a database.')}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center"
                >
                  Send Message
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 bg-gray-900 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Vidhi Savaliya. All rights reserved. Built with React, Tailwind CSS & Three.js
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;