import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ChevronDown, Github, ExternalLink, Mail, Phone, MapPin, Code, Database, Smartphone, Globe, Linkedin, Twitter, Instagram, Star, ArrowRight, Menu, X, Server, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import me from '../assets/me.jpg';
import html from '../assets/html.png';
import css from '../assets/css.png';
import bootstrap from '../assets/bootstrap.png';
import tailwind from '../assets/Tailwind.png';
import javascript from '../assets/javascript.png';
import react from '../assets/react.svg';
import node from '../assets/nodejs.png';
import express from '../assets/express.webp';
import Mongodb from '../assets/Mongodb.png';
import php from '../assets/php.png';
import nextjs from '../assets/nextjs.png';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';
import project4 from '../assets/project4.png';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const slideInFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

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
      description: "A real estate platform for showcasing housing projects, featuring property listings, project details, user authentication, and an admin dashboard for content management.",
      tech: ["React", "Node.js", "MongoDB", "Socket.io", "Tailwind Css"],
      image: project1,
      liveLink: "http://18.233.150.206/",
    },
    {
      title: "Pathsy Logistics Solutions Pvt. Ltd.",
      description: "A logistics and delivery management system with features for managing clients, drivers, and shipment tracking. Includes task assignment, status updates, and an intuitive dashboard interface.",
      tech: ["React", "Tailwind CSS"],
      image: project2,
      liveLink: "https://pathsy-logistics-solutions.vercel.app/#/",
    },
    {
      title: "The Black Turn",
      description: "A music and entertainment platform where artists can release albums and singles. Features include audio streaming, artist credits, and interactive album pages built with React and Node.js.",
      tech: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      image: project3,
      liveLink: "https://theblackturn.in/",
    },
    {
      title: "Novuscore Drones",
      description: "A modern website for a drone service provider, featuring responsive layouts, service showcases, and dynamic UI built with React, Tailwind CSS, and Scss.",
      tech: ["React", "Scss", "Tailwind CSS", "Node.js","SuperBase"],
      image: project4,
      liveLink: "https://novuscore.co.in/",
    }
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/vidhi-savaliya-a75226289/",
      description: "Professional network & career updates",
      color: "hover:text-blue-400"
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/vidhisavaliya-1710",
      description: "Code repositories & open source projects",
      color: "hover:text-gray-300"
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:vidhisavaliya017@gmail.com",
      description: "Direct communication for business inquiries",
      color: "hover:text-red-400"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/coding_.by_.vidhi",
      description: "Behind the scenes & creative inspiration",
      color: "hover:text-pink-400"
    }
  ];

  const experiences = [
    {
      company: "Navuscore Softcom Solutions Pvt. Ltd",
      duration: "4 months",
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
      description: "Specialized in building fast and scalable web apps using MongoDB, Express, React, and Node.js."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Full Stack Developer",
      description: "Crafting complete web solutions from frontend interfaces to backend APIs and deployment."
    }
  ];

  return (
    <div className="bg-gray-900 text-white relative overflow-hidden">
      {/* Three.js Background */}
      <div ref={mountRef} className="fixed inset-0 z-0" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Vidhi Savaliya
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4 lg:space-x-8">
              {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize text-sm lg:text-base transition-colors duration-200 hover:text-indigo-400 ${activeSection === item ? 'text-indigo-400' : 'text-gray-300'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * ['home', 'about', 'skills', 'projects', 'contact'].indexOf(item) }}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-gray-800 border-t border-gray-700"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-3 py-2 capitalize text-gray-300 hover:text-indigo-400 transition-colors"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * ['home', 'about', 'skills', 'projects', 'contact'].indexOf(item) }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative z-10 min-h-screen flex items-center pt-16 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="order-2 lg:order-1"
          >
            <motion.div variants={itemVariants} className="mb-6 md:mb-8">
              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Hello
              </motion.h2>
              <motion.div
                className="w-16 sm:w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mb-4 sm:mb-6"
                initial={{ width: 0 }}
                animate={{ width: '80px' }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
              <motion.p
                className="text-lg sm:text-xl text-gray-300 mb-2 sm:mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                I'm Vidhi
              </motion.p>
              <motion.h3
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Full Stack Developer
              </motion.h3>
              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-300 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                I craft beautiful, functional web applications that drive business growth.
                Specializing in React, Node.js, and modern web technologies.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
              variants={itemVariants}
            >
              <motion.button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-6 py-2 sm:px-8 sm:py-3 rounded font-semibold text-sm sm:text-base transition-all duration-200 transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Projects
              </motion.button>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              className="flex flex-wrap gap-4 sm:gap-6 text-gray-400 text-xs sm:text-sm"
              variants={containerVariants}
            >
              {["HTML5", "CSS", "JavaScript", "Node.js", "React", "Git", "GitHub"].map((tech, index) => (
                <motion.span
                  key={index}
                  variants={itemVariants}
                  className="hover:text-indigo-400 transition-colors"
                  whileHover={{ scale: 1.2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            className="relative flex justify-center lg:justify-end order-1 lg:order-2 mb-8 lg:mb-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              {/* Indigo Circle Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full opacity-90"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              />

              {/* Profile Image */}
              <motion.div
                className="absolute inset-4 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <img
                  src={me}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-3 -right-3 w-6 h-6 sm:w-8 sm:h-8 border-2 border-indigo-500 transform rotate-45"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              />
              <motion.div
                className="absolute -bottom-3 -left-3 w-6 h-6 sm:w-8 sm:h-8 border-2 border-indigo-500 transform rotate-45"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
              />
              <motion.div
                className="absolute top-1/2 -right-4 sm:-right-6 w-4 h-4 sm:w-6 sm:h-6 border-2 border-indigo-500 transform rotate-45"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.3 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-16 sm:py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Services */}
            <motion.div
              className="relative"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {/* Vertical Timeline Line */}
              <motion.div
                className="absolute left-2 top-0 w-0.5 h-full bg-gradient-to-b from-indigo-500 to-purple-500"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1 }}
              />

              <div className="space-y-8 sm:space-y-12">
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    className="relative flex items-start space-x-4 sm:space-x-6"
                    variants={fadeInUp}
                  >
                    {/* Timeline Dot */}
                    <motion.div
                      className="relative z-10 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full flex-shrink-0 mt-3 sm:mt-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 }}
                    />

                    {/* Service Content */}
                    <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                      <motion.div
                        className="text-white p-1 sm:p-2"
                        whileHover={{ rotate: 10 }}
                      >
                        {service.icon}
                      </motion.div>
                      <div className="flex-1">
                        <motion.h3
                          className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2"
                          whileHover={{ x: 5 }}
                        >
                          {service.title}
                        </motion.h3>
                        <motion.p
                          className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-md"
                          whileHover={{ x: 5 }}
                        >
                          {service.description}
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Side - About Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 sm:mb-8"
                variants={itemVariants}
              >
                About me
              </motion.h2>

              <motion.p
                className="text-gray-300 leading-relaxed mb-8 sm:mb-12 text-sm sm:text-base md:text-lg"
                variants={itemVariants}
              >
                I'm a dedicated Full Stack Developer with strong expertise in the MERN stack. I enjoy turning ideas into real-world web solutions with clean, scalable code and modern UI. I'm passionate about continuous learning, solving complex problems, and building user-friendly applications that make an impact.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3 sm:gap-4"
                variants={containerVariants}
              >
                {[
                  { icon: <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />, text: "Surat, India" },
                  { icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />, text: "vidhisavaliya017@gmail.com" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 bg-gray-700/50 px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm"
                    variants={itemVariants}
                    whileHover={{ y: -3 }}
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Skills & Experience
            </h2>
            <motion.div
              className="w-24 sm:w-32 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-3 sm:mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: '128px' }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
            <p className="text-gray-400 text-sm sm:text-base md:text-lg">6+ months of Development Experience</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            {/* Left Side - Skills */}
            <motion.div
              className="space-y-6 sm:space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-500 mr-2" />
                  Technical Skills
                </h3>

                {/* Skills Grid */}
                <motion.div
                  className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 gap-4 sm:gap-6 px-2 sm:px-4"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
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
                    <motion.div
                      key={index}
                      className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border border-white/10 
                        bg-white/5 backdrop-blur-md shadow-[inset_0_0_0.5px_#fff3] transition-all duration-300 
                        group hover:scale-105 hover:border-indigo-500/70 hover:shadow-[0_0_15px_#6366f1cc]"
                      variants={itemVariants}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="w-12 h-12 sm:w-16 sm:h-16 mb-2 sm:mb-4 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:shadow-[0_0_10px_#6366f1aa]">
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                        />
                      </div>
                      <span className="text-xs sm:text-sm text-gray-300">{skill.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Experience */}
            <motion.div
              className="space-y-6 sm:space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center">
                  <Database className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 mr-2" />
                  Work Experience
                </h3>

                <div className="relative">
                  {/* Timeline Line */}
                  <motion.div
                    className="absolute left-4 sm:left-6 top-8 w-0.5 h-3/4 bg-gradient-to-b from-indigo-500 to-purple-500"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  />

                  <div className="space-y-6 sm:space-y-8">
                    {experiences.map((exp, index) => (
                      <motion.div
                        key={index}
                        className="relative bg-gray-800/60 p-4 sm:p-6 rounded-xl border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 transform"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                      >
                        {/* Timeline Dot */}
                        <motion.div
                          className="absolute -left-2 top-8 w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full border-4 border-slate-900"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: index * 0.2 }}
                          viewport={{ once: true }}
                        />

                        <div className="ml-6 sm:ml-8">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 sm:mb-3 gap-2">
                            <div>
                              <h4 className="max-w-[300px] text-lg sm:text-xl font-bold text-white">{exp.company}</h4>
                              <p className="text-indigo-400 font-semibold text-sm sm:text-base">{exp.role}</p>
                            </div>
                            <div className="sm:text-right">
                              <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium">
                                {exp.period}
                              </span>
                              <p className="text-gray-400 text-xs sm:text-sm mt-1">{exp.duration}</p>
                            </div>
                          </div>

                          <p className="text-gray-300 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm">
                            {exp.description}
                          </p>

                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <motion.span
                                key={techIndex}
                                className="bg-gray-700/60 text-indigo-300 px-2 py-1 sm:px-3 sm:py-1 rounded-lg text-xs sm:text-sm font-medium border border-gray-600"
                                whileHover={{ scale: 1.05 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-16 sm:py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <motion.div
              className="w-20 sm:w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-3 sm:mb-4"
              initial={{ width: 0 }}
              whileInView={{ width: '96px' }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            />
            <motion.p
              className="text-gray-300 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              Here are some of my recent projects that showcase my skills and creativity
            </motion.p>
          </motion.div>

          <div className="space-y-12 sm:space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-6 sm:gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Image Section */}
                <div className="lg:w-1/2 w-full">
                  <motion.div
                    className="relative group overflow-hidden rounded-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                </div>

                {/* Content Section */}
                <div className="lg:w-1/2 w-full space-y-4 sm:space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 text-indigo-400">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
                      {project.description}
                    </p>
                  </motion.div>

                  {/* Tech Stack */}
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {project.tech.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="px-3 py-1 sm:px-4 sm:py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-xs sm:text-sm font-medium border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * techIndex }}
                          viewport={{ once: true }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Links */}
                  <motion.div
                    className="flex gap-4 sm:gap-6 pt-2 sm:pt-4"
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <motion.a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors group text-sm sm:text-base"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                      Live Demo
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <div className="bg-gray-900">
        <section id="contact" className="relative z-10 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Let's Connect
              </h2>
              <motion.div
                className="w-20 sm:w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-3 sm:mb-4"
                initial={{ width: 0 }}
                whileInView={{ width: '96px' }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              />
              <motion.p
                className="text-gray-300 mt-3 sm:mt-4 max-w-2xl mx-auto text-sm sm:text-base"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                Find me across various platforms. I'm always excited to connect with fellow developers, potential collaborators, and anyone interested in my work.
              </motion.p>
            </motion.div>

            {/* Social Media Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <motion.div
                    key={index}
                    className="bg-gray-800/50 p-4 sm:p-6 rounded-lg border border-gray-700 hover:border-indigo-500/50 transition-all duration-300 group hover:transform hover:scale-105"
                    variants={itemVariants}
                    whileHover={{ y: -10 }}
                  >
                    <div className="text-center">
                      <motion.div
                        className="inline-flex p-3 sm:p-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full group-hover:from-indigo-500/30 group-hover:to-purple-500/30 transition-all duration-300 mb-3 sm:mb-4"
                        whileHover={{ rotate: 15 }}
                      >
                        <IconComponent className={`w-6 h-6 sm:w-8 sm:h-8 text-gray-300 transition-colors duration-300 ${social.color}`} />
                      </motion.div>
                      <h4 className="text-lg sm:text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors duration-300 mb-1 sm:mb-2">
                        {social.name}
                      </h4>
                      <p className="text-gray-400 text-xs sm:text-sm mb-4 sm:mb-6">
                        {social.description}
                      </p>
                      <motion.a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 px-4 py-2 sm:px-6 sm:py-2 rounded-lg transition-all duration-200 transform hover:scale-110 text-white font-medium text-sm sm:text-base"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Connect
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
                      </motion.a>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-6 sm:py-8 bg-gray-900 border-t border-gray-700">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 text-xs sm:text-sm">
            © 2025 Vidhi Savaliya. All rights reserved. Built with React, Tailwind CSS & Three.js
          </p>
        </motion.div>
      </footer>
    </div>
  );
}

export default Home;