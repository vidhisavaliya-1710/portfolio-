// Updated Home.jsx - New Hero and About Section Design
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ChevronDown, Github, ExternalLink, Mail, Phone, MapPin, Code, Database, Smartphone, Globe, Linkedin,Twitter,Instagram ,Star, ArrowRight, Menu, X, Server, Zap } from 'lucide-react';
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
import project1 from '../assets/project1.png'
import project2 from '../assets/project2.png'
import project3 from '../assets/project3.png'

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
      title: "Elite Concept Homes",
      description: "Full-stack e-commerce solution with React, Node.js, and MongoDB. Features include user authentication, payment integration, and admin dashboard.",
      tech: ["React", "Node.js", "MongoDB","Socket.io"],
      image: project1,
      liveLink: "#",
      githubLink: "#"
    },
    {
      title: "Pathsy Logistics Solutions Pvt. Ltd.",
      description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      tech: ["React",  "Tailwind CSS"],
      image: project2,
      liveLink: "#",
      githubLink: "#"
    },
    {
      title: "The Black Turn",
      description: "Real-time weather application with geolocation, forecasts, and interactive maps. Built with modern React and weather APIs.",
      tech: ["React", "Node.Js", "MongoDB", "Tailwind Css"],
      image: project3,
      liveLink: "#",
      githubLink: "#"
    }
  ];
 const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/in/vidhi-savaliya",
      description: "Professional network & career updates",
      color: "hover:text-blue-400"
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/vidhi-savaliya",
      description: "Code repositories & open source projects",
      color: "hover:text-gray-300"
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:vidhi.savaliya@example.com",
      description: "Direct communication for business inquiries",
      color: "hover:text-red-400"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/vidhi.savaliya",
      description: "Behind the scenes & creative inspiration",
      color: "hover:text-pink-400"
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
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
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
    <div className="bg-gray-900 min-h-screen">
      <section id="contact" className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto"></div>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Find me across various platforms. I'm always excited to connect with fellow developers, potential collaborators, and anyone interested in my work.
            </p>
          </div>

          {/* Social Media Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 group hover:transform hover:scale-105"
                >
                  <div className="text-center">
                    <div className="inline-flex p-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300 mb-4">
                      <IconComponent className={`w-8 h-8 text-gray-300 transition-colors duration-300 ${social.color}`} />
                    </div>
                    <h4 className="text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors duration-300 mb-2">
                      {social.name}
                    </h4>
                    <p className="text-gray-400 text-sm mb-6">
                      {social.description}
                    </p>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-110 text-white font-medium"
                    >
                      Connect
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>


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