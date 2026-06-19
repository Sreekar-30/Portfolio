"use client";

import { motion } from "framer-motion";

const CERTIFICATIONS = [
  { title: "Python", provider: "Coursera", color: "from-blue-500/10 to-cyan-500/10", borderColor: "group-hover:border-cyan-500/30" },
  { title: "FastAPI", provider: "Udemy", color: "from-green-500/10 to-emerald-500/10", borderColor: "group-hover:border-emerald-500/30" },
  { title: "Java", provider: "NPTEL", color: "from-orange-500/10 to-red-500/10", borderColor: "group-hover:border-orange-500/30" },
  { title: "SQL", provider: "HackerRank", color: "from-purple-500/10 to-pink-500/10", borderColor: "group-hover:border-purple-500/30" },
];

export default function Education() {
  return (
    <section className="relative z-20 bg-transparent py-32 px-4 md:px-12 overflow-hidden" id="education">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[5%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <span className="text-xs uppercase tracking-widest text-purple-400 font-mono mb-4 block">
            Academic & Credentials
          </span>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Education & <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Certifications</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 backdrop-blur-md relative overflow-hidden group hover:border-white/20 transition-all flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-purple-500" />
            <div>
              <span className="text-xs text-blue-400 font-mono border border-blue-500/30 px-3 py-1 rounded-full bg-blue-500/10 mb-6 inline-block">
                2021 - 2025
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                B.Tech in Computer Science & Systems Engineering
              </h3>
              <p className="text-purple-300 font-medium text-lg mb-6">
                Andhra University
              </p>
              <p className="text-gray-400 leading-relaxed mb-8">
                Focused on foundational computer science concepts, object-oriented design, algorithms, databases, and software engineering methodologies.
              </p>
            </div>
            
            <div className="flex items-center justify-between border-t border-white/10 pt-6 mt-4">
              <span className="text-gray-500 text-sm uppercase tracking-wider font-mono">Performance Metric</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white font-mono">7.4</span>
                <span className="text-gray-500 text-sm">/ 10 CGPA</span>
              </div>
            </div>
          </motion.div>

          {/* Certifications Grid */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h4 className="text-xl font-bold text-white mb-6 uppercase tracking-wider font-mono text-center lg:text-left">
              Professional Credentials
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {CERTIFICATIONS.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] cursor-default"
                >
                  <div className={`absolute inset-0 bg-linear-to-br ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      <h5 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {cert.title}
                      </h5>
                      <p className="text-sm text-gray-400 font-medium">
                        {cert.provider}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-end">
                      <span className="text-[10px] uppercase tracking-widest text-blue-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                        Verified Credentials
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
