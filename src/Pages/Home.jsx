// Redesigned Home.jsx - Light Theme, Modern Layout, Tailwind CSS
import React, { useEffect, useState } from 'react';
import {
  ChevronDown, Github, Linkedin, Mail,
  ExternalLink, Code, Zap, Palette, Users, Calendar
} from 'lucide-react';
import me from '../assets/me.jpg'

function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = [
    { name: 'Frontend Development', icon: Code, level: 95 },
    { name: 'Backend Development', icon: Zap, level: 90 },
    { name: 'Database Design', icon: Palette, level: 85 },
    { name: 'Cloud Architecture', icon: Users, level: 88 },
  ];

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack solution with user auth, payments, and admin panel.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      live: '#',
    },
    {
      title: 'Task Manager App',
      description: 'Real-time drag-and-drop task board with Firebase backend.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop',
      tech: ['React', 'Firebase', 'Material-UI'],
      github: '#',
      live: '#',
    },
    {
      title: 'AI Dashboard',
      description: 'Analytics dashboard with ML insights and D3.js charts.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop',
      tech: ['Python', 'Flask', 'TensorFlow', 'D3.js'],
      github: '#',
      live: '#',
    },
  ];

  const experiences = [
    {
      title: 'Senior Full-Stack Developer',
      company: 'TechScale Solutions',
      duration: '2022 - Present',
      description: 'Leading scalable React/Node apps, mentoring team, CI/CD pipelines.',
    },
    {
      title: 'Full-Stack Developer',
      company: 'DataFlow Inc.',
      duration: '2020 - 2022',
      description: 'Built full-stack web apps with PostgreSQL, React, Node.',
    },
    {
      title: 'Backend Developer',
      company: 'CloudTech StartUp',
      duration: '2018 - 2020',
      description: 'Developed RESTful APIs, integrated services, optimized databases.',
    },
  ];

  return (
    <div className="bg-[#FAFAFA] text-[#1F2937]">
      {/* Hero Section */}
      <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-[#FAF6F3] to-[#fff] overflow-hidden"
    >
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#C78665]/30 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-[250px] h-[250px] bg-[#915A3E]/20 rounded-full blur-[80px] animate-spin-slow"></div>

      {/* Floating Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_1px,_rgba(199,134,101,0.1)_1px,_transparent_1px)] bg-[size:20px_20px] opacity-30"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl w-full text-center md:text-left grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-[#C78665]">
            Hello, I'm <span className="text-[#915A3E]">Vidhi Savaliya</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-700">
            Full-Stack Developer with a passion for elegant UIs and robust backend solutions.
          </p>

          {/* Social Links */}
          <div className="mt-6 flex justify-center md:justify-start gap-4">
            <a href="#" className="bg-white p-3 rounded-full border border-gray-200 hover:shadow-md transition">
              <Github className="text-gray-700 w-5 h-5" />
            </a>
            <a href="#" className="bg-white p-3 rounded-full border border-gray-200 hover:shadow-md transition">
              <Linkedin className="text-gray-700 w-5 h-5" />
            </a>
            <a href="#" className="bg-white p-3 rounded-full border border-gray-200 hover:shadow-md transition">
              <Mail className="text-gray-700 w-5 h-5" />
            </a>
          </div>

          {/* CTA Button */}
          <a
            href="#about"
            className="mt-10 inline-flex items-center px-8 py-4 rounded-full text-white bg-gradient-to-r from-[#C78665] to-[#915A3E] font-medium shadow hover:scale-105 transition"
          >
            Explore My Work
            <ChevronDown className="ml-3 animate-bounce w-4 h-4" />
          </a>
        </div>

        {/* Hero Image */}
        <div className="flex justify-center">
          <div className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px]  bg-white shadow-xl border-4 border-[#C78665]/30 overflow-hidden">
            <img
              src={me} // Replace with your own image
              alt="Vidhi Portrait"
              className="w-full h-full object-cover"
            />
            {/* <div className="absolute bottom-2 right-0 bg-[#C78665] px-3 py-1 text-white text-xs font-semibold rounded-tl-xl shadow-md">
              Available for Work
            </div> */}
          </div>
        </div>
      </div>
    </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-[#F0F4F8]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#C78665] mb-6">About Me</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            I'm a full-stack developer who loves turning complex problems into clean, scalable solutions using modern JavaScript, APIs, and cloud tools.
          </p>
        </div>
        <div className="max-w-6xl mx-auto mt-12 grid md:grid-cols-2 gap-8">
          {/* Skills */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Skills</h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center space-x-2">
                      <skill.icon className="w-5 h-5 text-[#C78665]" />
                      <span className="text-gray-800 font-medium">{skill.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 rounded-full bg-[#C78665]"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Experience</h3>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white hover:shadow-md transition">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="font-semibold text-gray-800">{exp.title}</h4>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" /> {exp.duration}
                    </span>
                  </div>
                  <p className="text-sm text-[#C78665] font-medium mb-1">{exp.company}</p>
                  <p className="text-gray-600 text-sm">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#C78665] mb-6">Projects</h2>
          <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
            Some of my recent work showcasing my full-stack capabilities and creative problem-solving.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div key={index} className="rounded-lg border border-gray-200 bg-white shadow hover:shadow-lg overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{project.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((t) => (
                      <span key={t} className="text-xs px-2 py-1 bg-[#FAF6F3] text-[#C78665] rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a href={project.github} className="text-sm text-gray-500 hover:text-gray-800 flex items-center">
                      <Github className="w-4 h-4 mr-1" /> Code
                    </a>
                    <a href={project.live} className="text-sm text-gray-500 hover:text-gray-800 flex items-center">
                      <ExternalLink className="w-4 h-4 mr-1" /> Live
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-[#F0F4F8]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-[#C78665] mb-6">Get In Touch</h2>
          <p className="text-lg text-gray-600 mb-12">
            Want to build something amazing? Reach out — I’d love to hear from you.
          </p>
          <a
            href="mailto:vidhi@example.com"
            className="inline-flex items-center px-8 py-4 rounded-full text-white bg-gradient-to-r from-[#C78665] to-[#915A3E] font-medium shadow hover:scale-105 transition"
          >
            <Mail className="w-5 h-5 mr-2" /> Say Hello
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 bg-white border-t border-gray-200 text-center">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Vidhi Savaliya. Built with React & Tailwind CSS.
        </p>
      </footer>
    </div>
  );
}

export default Home;