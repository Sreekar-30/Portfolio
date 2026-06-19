"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="relative z-20 bg-transparent py-32 px-4 md:px-12 overflow-hidden" id="about">
      {/* Ambient backgrounds */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Section Heading & Focus */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <span className="text-xs uppercase tracking-widest text-blue-400 font-mono mb-4 block">
              About Me
            </span>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
              Designing <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                Robust Backends
              </span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              A results-driven engineer specializing in building high-performance APIs, automated data pipelines, and clean, modular architectures that power seamless client experiences.
            </p>
            
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-8">
              <div>
                <span className="block text-4xl font-bold text-white font-mono mb-1">
                  100%
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                  Clean & OOP Code
                </span>
              </div>
              <div>
                <span className="block text-4xl font-bold text-white font-mono mb-1">
                  40%
                </span>
                <span className="text-xs text-gray-500 uppercase tracking-wider">
                  Security Optimized
                </span>
              </div>
            </div>
          </motion.div>

          {/* Profile Card / Description */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-md relative overflow-hidden group hover:border-white/20 transition-all"
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-blue-500/15 transition-all" />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-6">
                Professional Profile
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6 text-base md:text-lg">
                I am a Python Software Engineer with professional experience developing web applications, automation solutions, and scalable backend systems using Python, FastAPI, JavaScript, and MySQL.
              </p>
              <p className="text-gray-300 leading-relaxed mb-6 text-base md:text-lg">
                Skilled in designing REST APIs, implementing OOP-based architectures, optimizing application performance, and writing clean, maintainable code.
              </p>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                I am highly experienced in debugging, API integration, Git-based workflows, and Agile development, with a proven ability to deliver reliable software solutions in collaborative environments.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
