import React from 'react';
import { motion } from 'framer-motion';
import FluidCursor from './FluidCursor';
import './App.css';

function App() {

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const staggerItem = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const hoverScale = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
  };

  const skills = [
    {
      category: "AI & Machine Learning",
      items: ["TensorFlow", "PyTorch", "OpenAI API", "Hugging Face", "Scikit-learn", "XGBoost", "LightGBM", "CatBoost"]
    },
    {
      category: "Financial AI & Quant", 
      items: ["Pandas", "NumPy", "Matplotlib", "Plotly", "Quantitative Analysis", "Financial Modeling", "Risk Management"]
    },
    {
      category: "Programming & Development",
      items: ["Python", "JavaScript", "TypeScript", "Rust", "Flutter", "FastAPI", "Streamlit", "Docker"]
    },
    {
      category: "Advanced Analytics",
      items: ["Jupyter", "RAG Systems", "LLM Orchestration", "WebAssembly", "ONNX Runtime", "WebGPU", "EasyOCR"]
    }
  ];

  const projects = [
    {
      title: "Taxora AI - Flagship Project",
      description: "AI-powered Chartered Accountant platform for UAE & India. Automates VAT filing, corporate tax, document OCR, and financial insights with smart invoice processing and business simulations.",
      tech: ["Python", "Flask", "spaCy", "Gemini RAG", "Flutter", "EasyOCR", "PaddleOCR"],
      link: "https://github.com/Hamzakhan7473/Taxora_AI_MCP_Server-"
    },
    {
      title: "Autonomous ML Agent",
      description: "LLM-orchestrated machine learning pipeline that automatically ingests datasets, cleans data, trains models, and optimizes them for target metrics with meta-learning and ensemble methods.",
      tech: ["Python", "OpenAI API", "Scikit-learn", "FastAPI", "Streamlit", "Docker"]
    },
    {
      title: "Intelligent LLM Router",
      description: "Smart routing system that directs prompts across multiple LLMs based on cost, latency, and performance optimization with intelligent prompt classification and load balancing.",
      tech: ["Python", "OpenAI API", "Anthropic API", "LangChain"],
      link: "https://github.com/Hamzakhan7473/Intelligent-LLM-Router"
    },
    {
      title: "Neural Style Transfer with WebAssembly",
      description: "Real-time AI art generation in the browser using ONNX models, WebAssembly, and WebGPU acceleration with 21+ artistic styles and privacy-first local processing.",
      tech: ["Rust", "WebAssembly", "ONNX Runtime", "WebGPU", "JavaScript"]
    },
    {
      title: "AskPro - AI Assistant",
      description: "Cutting-edge AI-powered assistant using Retrieval-Augmented Generation (RAG) and OpenAI's GPT model to deliver quick and accurate answers with intelligent context understanding.",
      tech: ["Python", "OpenAI API", "RAG", "FastAPI"],
      link: "https://github.com/Hamzakhan7473/Ask_pro-"
    },
    {
      title: "AI Customer Support System",
      description: "Intelligent customer support automation system with natural language processing, sentiment analysis, and automated response generation for enhanced customer experience.",
      tech: ["Python", "NLP", "Machine Learning", "FastAPI"],
      link: "https://github.com/Hamzakhan7473/AI_CustomerSupport"
    }
  ];

  const experience = [
    {
      title: "AI Resident Intern",
      company: "Headstarter AI | 2024 - Present",
      description: "Working as an AI Resident Intern at Headstarter AI, focusing on advanced AI research and development. Contributing to cutting-edge AI projects, machine learning model development, and innovative AI solutions that drive the future of artificial intelligence."
    },
    {
      title: "Master's in Computer Science",
      company: "Pace University, NYC | 2023 - Present",
      description: "Pursuing advanced studies in Computer Science with focus on AI, Machine Learning, and Financial Technology. Research areas include LLM Orchestration, Autonomous ML Systems, and Financial AI applications."
    },
    {
      title: "Founder & AI Engineer",
      company: "Taxora AI | 2023 - Present",
      description: "Leading development of AI-powered Chartered Accountant platform for UAE & India. Building automated VAT filing, corporate tax processing, document OCR, and financial insights using advanced NLP and RAG systems."
    },
    {
      title: "AI Research & Development",
      company: "Independent Projects | 2022 - Present",
      description: "Developing cutting-edge AI solutions including Autonomous ML Agents, Intelligent LLM Routers, Neural Style Transfer systems, and advanced customer support automation with focus on real-world applications."
    },
    {
      title: "Open Source Contributor",
      company: "GitHub | 2022 - Present",
      description: "Maintaining 38+ repositories with focus on AI/ML projects, contributing to open source communities, and building innovative solutions that solve real-world problems in finance, technology, and automation."
    }
  ];

  const contactLinks = [
    { platform: "Email", url: "mailto:abuhamzakhan@gmail.com", text: "abuhamzakhan@gmail.com" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/abuhamzakhan", text: "linkedin.com/in/abuhamzakhan" },
    { platform: "GitHub", url: "https://github.com/Hamzakhan7473", text: "github.com/Hamzakhan7473" },
    { platform: "Location", url: "#", text: "NYC, USA" }
  ];

  return (
    <div className="App">
      {/* WebGL Fluid Dynamics Cursor */}
      <FluidCursor />
      
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      <motion.nav 
        role="navigation" 
        aria-label="Main navigation"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="nav-container">
          <motion.div 
            className="logo" 
            aria-label="Hamza Khan Portfolio"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            HK
          </motion.div>
          <ul className="nav-links" role="menubar">
            {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map((item, index) => (
              <li key={item} role="none">
                <motion.a 
                  href={`#${item.toLowerCase()}`}
                  role="menuitem"
                  aria-label={`Go to ${item.toLowerCase()} section`}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      <main id="main-content">
        <motion.section 
          id="home" 
          className="hero" 
          aria-labelledby="hero-heading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div 
            className="hero-content"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.img 
              src="https://github.com/Hamzakhan7473.png" 
              alt="Abu Hamza Khan Profile Photo - Professional headshot" 
              className="profile-photo"
              variants={staggerItem}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.h1 
              id="hero-heading"
              variants={staggerItem}
            >
              Abu Hamza Khan
            </motion.h1>
            <motion.p 
              className="subtitle"
              variants={staggerItem}
            >
              Master's in Computer Science @ Pace University | AI/ML/Finance Specialist
            </motion.p>
            <motion.a 
              href="mailto:abuhamzakhan@gmail.com" 
              className="email-link" 
              aria-label="Send email to Abu Hamza Khan"
              variants={staggerItem}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 35px 60px -12px rgba(99, 102, 241, 0.4)" 
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </motion.section>

        <div className="container">
          <motion.section 
            id="about" 
            className="bio-section" 
            aria-labelledby="about-heading"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              id="about-heading"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              About Me
            </motion.h2>
            <motion.div 
              className="bio-text"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <motion.p variants={staggerItem}>
                Hi! I'm Abu Hamza Khan, a passionate Computer Science Master's student at Pace University (NYC) with a deep love for AI, Machine Learning, and building innovative solutions. My research focuses on LLM Orchestration, Autonomous ML Systems, and Financial AI.
              </motion.p>
              <motion.p variants={staggerItem}>
                I'm the founder of Taxora AI, an AI-powered Chartered Accountant platform for UAE & India that automates VAT filing, corporate tax, document OCR, and financial insights. My mission is building AI systems that solve real-world problems with human-centered innovation.
              </motion.p>
              <motion.p variants={staggerItem}>
                Based in NYC, I specialize in Python, AI/LLMs, Data Science, Quant Research, and Flutter development. I'm curious by default, always iterating, and passionate about creating AI-powered solutions that make a meaningful impact in finance and technology.
              </motion.p>
            </motion.div>
          </motion.section>

          <motion.section 
            id="skills" 
            className="skills-section" 
            aria-labelledby="skills-heading"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              id="skills-heading"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Technical Skills
            </motion.h2>
            <motion.div 
              className="skills-grid"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {skills.map((skill, index) => (
                <motion.div 
                  key={skill.category}
                  className="skill-category"
                  variants={staggerItem}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: "0 20px 40px rgba(99, 102, 241, 0.2)",
                    scale: 1.02
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3>{skill.category}</h3>
                  <ul className="skill-list">
                    {skill.items.map((item, itemIndex) => (
                      <motion.li 
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section 
            id="projects" 
            className="projects-section" 
            aria-labelledby="projects-heading"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              id="projects-heading"
              initial={{ opacity: 0, rotateX: -90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Featured Projects
            </motion.h2>
            <motion.div 
              className="projects-grid"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {projects.map((project, index) => (
                <motion.div 
                  key={project.title}
                  className="project-card"
                  variants={staggerItem}
                  whileHover={{ 
                    y: -15, 
                    rotateY: 5,
                    boxShadow: "0 25px 50px rgba(6, 182, 212, 0.3)" 
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-tech">
                    {project.tech.map((tech, techIndex) => (
                      <motion.span 
                        key={tech}
                        className="tech-tag"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: techIndex * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  {project.link && (
                    <motion.a 
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Project →
                    </motion.a>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section 
            id="experience" 
            className="experience-section" 
            aria-labelledby="experience-heading"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              id="experience-heading"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Experience & Education
            </motion.h2>
            <motion.div 
              className="timeline"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {experience.map((exp, index) => (
                <motion.div 
                  key={exp.title}
                  className="timeline-item"
                  variants={staggerItem}
                  whileHover={{ x: index % 2 === 0 ? 10 : -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="timeline-content">
                    <h3>{exp.title}</h3>
                    <h4>{exp.company}</h4>
                    <p>{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section 
            id="contact" 
            className="contact-section" 
            aria-labelledby="contact-heading"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2 
              id="contact-heading"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Get In Touch
            </motion.h2>
            <motion.div 
              className="contact-grid"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {contactLinks.map((contact, index) => (
                <motion.div 
                  key={contact.platform}
                  className="contact-item"
                  variants={staggerItem}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(139, 92, 246, 0.2)" 
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3>{contact.platform}</h3>
                  <a 
                    href={contact.url} 
                    target={contact.platform !== "Email" ? "_blank" : undefined}
                    rel={contact.platform !== "Email" ? "noopener noreferrer" : undefined}
                    aria-label={`Visit Hamza Khan's ${contact.platform} ${contact.platform !== "Email" ? "(opens in new tab)" : ""}`}
                  >
                    {contact.text}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}

export default App;
