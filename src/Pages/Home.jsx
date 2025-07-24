// Updated Home.jsx - New Hero and About Section Design
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ChevronDown, Github, ExternalLink, Mail, Phone, MapPin, Code, Database, Smartphone, Globe, Star, ArrowRight, Menu, X, Server, Zap } from 'lucide-react';
import me from '../assets/me.jpg'
import html from '../assets/html.png'
import css from '../assets/css.png'
import bootstrap from '../assets/bootstrap.png'
import tailwind from '../assets/Tailwind.png'
import javascript from '../assets/javascript.png'
import react from '../assets/react.svg'
import node from '../assets/nodejs.png'
import express from '../assets/express.webp'
import Mongodb from '../assets/Mongodb.png'
import php from '../assets/php.png'
import nextjs from '../assets/nextjs.png'

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

  const expertSkills = [
    {
      name: "HTML",
      icon: "HTML",
      color: "from-orange-500 to-orange-600",
      borderColor: "border-orange-500/50"
    },
    {
      name: "CSS",
      icon: "CSS",
      color: "from-blue-500 to-blue-600",
      borderColor: "border-blue-500/50"
    },
    {
      name: "Bootstrap",
      icon: "BS",
      color: "from-purple-600 to-purple-700",
      borderColor: "border-purple-600/50"
    },
    {
      name: "Tailwind CSS",
      icon: "TW",
      color: "from-cyan-400 to-cyan-500",
      borderColor: "border-cyan-400/50"
    },
    {
      name: "JavaScript",
      icon: "JS",
      color: "from-yellow-400 to-yellow-500",
      borderColor: "border-yellow-400/50"
    },
    {
      name: "React.js",
      icon: "⚛",
      color: "from-cyan-400 to-blue-500",
      borderColor: "border-cyan-400/50"
    },
    {
      name: "Node.js",
      icon: "⬢",
      color: "from-green-500 to-green-600",
      borderColor: "border-green-500/50"
    },
    {
      name: "Express.js",
      icon: "Ex",
      color: "from-gray-600 to-gray-700",
      borderColor: "border-gray-500/50"
    },
    {
      name: "MongoDB",
      icon: "🍃",
      color: "from-green-500 to-green-700",
      borderColor: "border-green-500/50"
    },
     {
      name: "PHP",
      icon: "PHP",
      color: "from-indigo-600 to-purple-600",
      borderColor: "border-indigo-500/30"
    },
    {
      name: "Next.js",
      icon: "N",
      color: "from-gray-800 to-black",
      borderColor: "border-gray-600/30"
    }
  ];

 

  const SkillCard = ({ skill, isBasic = false }) => (
    <div className={`
      group relative bg-gray-800/60 backdrop-blur-sm p-6 rounded-2xl 
      border-2 transition-all duration-300 cursor-pointer
      hover:scale-105 hover:bg-gray-700/70
      ${skill.borderColor}
      ${isBasic ? 'opacity-70 hover:opacity-100' : ''}
    `}>
      <div className="flex flex-col items-center text-center">
        {/* Icon */}
        <div className={`
          w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold text-white mb-4
          bg-gradient-to-br ${skill.color}
          group-hover:shadow-lg transition-all duration-300
        `}>
          {skill.icon}
        </div>

        {/* Skill Name */}
        <h3 className="text-white font-semibold text-sm group-hover:text-indigo-300 transition-colors">
          {skill.name}
        </h3>

        {/* Level Indicator */}
        {isBasic && (
          <span className="text-xs text-gray-400 mt-1 opacity-60">Basic</span>
        )}
      </div>

      {/* Glow effect on hover */}
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300
        bg-gradient-to-br ${skill.color}
      `}></div>
    </div>
  );

  const experiences = [
    {
      company: "Navuscore Softcom Solutions Pvt. Ltd",
      duration: "6 months",
      role: "Full Stack Developer",
      period: "March-2025 - Current",
      description: "Working on full-stack development projects using modern technologies",
      technologies: ["React", "Node.js", "MongoDB", "Express.js"]
    },
    {
      company: "Sattvam Soft",
      duration: "6 months",
      role: "Intern & Junior MERN Stack Developer",
      period: "Oct-2024 - March-2025",
      description: "Started as intern (2 months) and continued as developer (4 months)",
      technologies: ["JavaScript", "React", "Node.js"]
    }
  ];

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "MERN Stack Developer",
      description: "Building robust web applications using MongoDB, Express.js, React, and Node.js with seamless frontend-backend integration."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Full Stack Developer",
      description: "Designing and developing end-to-end web solutions, from interactive UIs to secure server-side logic, using modern technologies."
    }
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
                  className={`capitalize transition-colors duration-200 hover:text-indigo-400 ${activeSection === item ? 'text-indigo-400' : 'text-gray-300'
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

      {/* NEW HERO SECTION - Similar to first image */}
      <section id="home" className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10  grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in">
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Hello
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-6">
              </div>
              <p className="text-xl text-gray-300 mb-4">I'm Vidhi</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Full Stack Developer
              </h2>
              <p className="text-xl text-gray-300 mb-4">I craft beautiful, functional web applications that drive business growth.
                Specializing in React, Node.js, and modern web technologies.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-8 py-3 rounded font-semibold transition-all duration-200 transform hover:scale-105"
              >
                Got a project?
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="border border-indigo-500 hover:bg-indigo-500 px-8 py-3 rounded font-semibold transition-all duration-200 transform hover:scale-105"
              >
                My resume
              </button>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-8 text-gray-400 text-sm">
              <span>HTML5</span>
              <span>CSS</span>
              <span>Javascript</span>
              <span>Node.js</span>
              <span>React</span>
              <span>Git</span>
              <span>Github</span>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Indigo Circle Background */}
              <div className="w-90 h-90 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full opacity-90"></div>

              {/* Profile Image Placeholder */}
              <div className="absolute inset-4 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                {/* You can replace this with an actual image */}
                <img
                  src={me}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-indigo-500 transform rotate-45"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-2 border-indigo-500 transform rotate-45"></div>
              <div className="absolute top-1/2 -right-8 w-6 h-6 border-2 border-indigo-500 transform rotate-45"></div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW ABOUT SECTION - Similar to second image */}
      <section id="about" className="relative z-10 py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Services */}
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-2 top-0 w-0.5 h-full bg-gradient-to-b from-indigo-500  to-purple-500"></div>

              <div className="space-y-12">
                {services.map((service, index) => (
                  <div key={index} className="relative flex items-start space-x-6">
                    {/* Orange Timeline Dot */}
                    <div className="relative z-10 w-4 h-4 bg-gradient-to-b from-indigo-500  to-purple-500 rounded-full flex-shrink-0 mt-3"></div>

                    {/* Service Content */}
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="text-white p-2">
                        {service.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - About Content */}
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                About me
              </h2>

              <p className="text-gray-300 leading-relaxed mb-12 text-lg">
                I started my software journey from photography. Through that, I learned to
                love the process of creating from scratch. Since then, this has led me to
                software development as it fulfills my love for learning and building things.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Skills & Experience
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-400 text-lg">1 Year of Development Experience</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Side - Skills */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Zap className="w-6 h-6 text-indigo-500 mr-2" />
                  Technical Skills
                </h3>

            
{/* Updated Skills Grid - Enhanced with shadow, glass and glow */}
<div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 gap-6 px-4">
  {[
    { name: 'HTML', icon: html },
    { name: 'CSS', icon: css },
    { name: 'Bootstrap', icon: bootstrap },
    { name: 'Tailwind', icon: tailwind },
    { name: 'JavaScript', icon: javascript },
    { name: 'React', icon: react },
    { name: 'Node.js', icon: node },
    { name: 'Express.js', icon: express },
    { name: 'MongoDB', icon: Mongodb },
    { name: 'PHP', icon: php },
    { name: 'Next.js', icon: nextjs },
  ].map((skill, index) => (
    <div
      key={index}
      className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 
        bg-white/5 backdrop-blur-md shadow-[inset_0_0_0.5px_#fff3] transition-all duration-300 
        group hover:scale-105 hover:border-indigo-500/70 hover:shadow-[0_0_15px_#6366f1cc]"
    >
      <div className="w-16 h-16 mb-4 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:shadow-[0_0_10px_#6366f1aa]">
  <img src={skill.icon} alt={skill.name} className="w-10 h-10 object-contain" />
</div>

      {/* <p className="text-white text-sm font-medium">{skill.name}</p> */}
    </div>
  ))}
</div>



              </div>
            </div>

            {/* Right Side - Experience */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Database className="w-6 h-6 text-purple-500 mr-2" />
                  Work Experience
                </h3>

                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-8 w-0.5 h-3/4 bg-gradient-to-b from-indigo-500 to-purple-500"></div>

                  <div className="space-y-8">
                    {experiences.map((exp, index) => (
                      <div key={index} className="relative bg-gray-800/60 p-6 rounded-xl border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 transform">
                        {/* Timeline Dot */}
                        <div className="absolute -left-2 top-8 w-4 h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full border-4 border-slate-900"></div>

                        <div className="ml-8">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="max-w-[300px] text-xl font-bold text-white">{exp.company}</h4>
                              <p className="text-indigo-400 font-semibold">{exp.role}</p>
                            </div>
                            <div className="text-right">
                              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                                {exp.period}
                              </span>
                              <p className="text-gray-400 text-sm mt-1">{exp.duration}</p>
                            </div>
                          </div>

                          <p className="text-gray-300 mb-4 leading-relaxed">
                            {exp.description}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <span key={techIndex} className="bg-gray-700/60 text-indigo-300 px-3 py-1 rounded-lg text-sm font-medium border border-gray-600">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                
              </div>
            </div>
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

    <div className="space-y-16">
      {projects.map((project, index) => (
        <div 
          key={index} 
          className={`flex flex-col lg:flex-row items-center gap-8 ${
            index % 2 === 1 ? 'lg:flex-row-reverse' : ''
          }`}
        >
          {/* Image Section */}
          <div className="lg:w-1/2">
            <div className="relative group overflow-hidden rounded-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 space-y-6">
            <div>
              <h3 className="text-3xl font-bold mb-4 text-indigo-400">
                {project.title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech, techIndex) => (
                  <span 
                    key={techIndex} 
                    className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-6 pt-4">
              <a
                href={project.liveLink}
                className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors group"
              >
                <ExternalLink className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Live Demo
              </a>
              <a
                href={project.githubLink}
                className="flex items-center px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg font-medium transition-colors group"
              >
                <Github className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                View Code
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
            © 2025 Vidhi Savaliya. All rights reserved. Built with React, Tailwind CSS & Three.js
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;