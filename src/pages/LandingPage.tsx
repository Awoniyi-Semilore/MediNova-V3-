import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRef } from "react";
import { ArrowRight, GraduationCap, HeartPulse, Globe, Users, Zap, Shield, ExternalLink } from "lucide-react";

import gate from "../assets/medinova-gate.jpg";
import campus from "../assets/medinova-campus.jpg";
import gate1 from "../assets/medinova-gate1.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true, margin: "-100px" },
};

export default function LandingPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const features = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Structured Learning",
      desc: "Case-based medical education with real clinical simulations and hospital-style dashboards.",
    },
    {
      icon: <HeartPulse className="w-6 h-6" />,
      title: "Patient Care System",
      desc: "Digital hospital infrastructure for registration, tracking, and workflow optimization.",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Built for Africa",
      desc: "Designed from African realities — not imported assumptions. Works with existing infrastructure.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Midwife-First Design",
      desc: "Empowering frontline healthcare workers with tools that reduce burden and improve outcomes.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time Coordination",
      desc: "Seamless communication between staff, students, and patients across the platform.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Compliant",
      desc: "Enterprise-grade data protection with full privacy controls and audit trails.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <img
            src={gate}
            alt="MediNova Campus"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-slate-50/70 to-slate-50 dark:from-[#0a0a0a]/90 dark:via-[#0a0a0a]/70 dark:to-[#0a0a0a]" />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-8 border border-emerald-500/20"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Now serving healthcare institutions across Africa
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" as const }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
          >
            Where Learning Meets{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Real Healthcare
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" as const }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            A unified digital ecosystem combining medical education and hospital-grade patient management — 
            built in Africa, for Africa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" as const }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/about"
              className="group px-8 py-4 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-sm tracking-wide hover:shadow-2xl hover:shadow-slate-900/20 dark:hover:shadow-white/20 transition-all duration-300 flex items-center gap-2"
            >
              Explore Platform
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/partnership"
              className="px-8 py-4 rounded-2xl border-2 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold text-sm tracking-wide hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300"
            >
              Become a Partner
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1, ease: "easeOut" as const }}
            className="mt-20 flex justify-center gap-12 text-center"
          >
            {[
              { num: "2", label: "Countries" },
              { num: "2", label: "Founders" },
              { num: "1", label: "Mission" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">{stat.num}</div>
                <div className="text-sm text-slate-500 dark:text-slate-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* DUAL SYSTEM */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={fadeUp.viewport}
          transition={fadeUp.transition}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Two Systems. One Ecosystem.</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            MediNova bridges the critical gap between medical education and real-world clinical practice.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* MediNova Teaching Hospital */}
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            viewport={fadeUp.viewport}
            transition={fadeUp.transition}
            className="group relative overflow-hidden rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-10 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl group-hover:from-emerald-500/20 transition-all" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">MediNova Teaching Hospital</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Structured medical education for midwives and students with real clinical simulations,
                case-based learning, and guided training dashboards. Not theory — practical, system-based learning
                tailored to African healthcare realities.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Case Simulations", "Progress Tracking", "Midwife Training", "Digital Curriculum"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-xs font-medium text-slate-600 dark:text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="https://medinova-teaching-hospital.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm tracking-wide hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-500/20 transition-all duration-300"
              >
                Open Teaching Hospital
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* MediNova Care */}
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            viewport={fadeUp.viewport}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="group relative overflow-hidden rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 p-10 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-teal-500/10 to-transparent rounded-full blur-3xl group-hover:from-teal-500/20 transition-all" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 dark:bg-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400 mb-6">
                <HeartPulse className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4">MediNova Care</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Hospital-grade patient management with registration, tracking, and workflow tools designed
                for African healthcare environments. Speed, accuracy, and better patient outcomes — 
                without disrupting existing hospital structure.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Patient Records", "Appointment System", "Staff Dashboards", "Workflow Tools"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-xs font-medium text-slate-600 dark:text-slate-400">
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href="https://medinova-care.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold text-sm tracking-wide hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-500/20 transition-all duration-300"
              >
                Open MediNova Care
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-100 dark:bg-white/[0.02]" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              transition={fadeUp.transition}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={campus} alt="MediNova Campus" className="w-full h-[500px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-sm font-medium opacity-80">MediNova Campus</p>
                  <p className="text-lg font-semibold">Building the future of African healthcare</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Why MediNova Exists</h2>
              <div className="space-y-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>
                  Across Africa, healthcare systems and medical education operate in isolation. 
                  Students learn theory without exposure to real systems, while hospitals struggle 
                  with outdated workflows and manual processes.
                </p>
                <p>
                  Maternal mortality remains high. Midwives are overworked and under-supported. 
                  Training does not always match real clinical demands. There is no unified system 
                  connecting learning and real healthcare practice.
                </p>
                <p className="text-slate-900 dark:text-white font-medium">
                  MediNova bridges this gap — combining learning and care into one digital ecosystem.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { label: "Nigeria", sub: "Development HQ" },
                  { label: "Cameroon", sub: "Operations" },
                ].map((loc) => (
                  <div key={loc.label} className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                    <div className="text-lg font-bold">{loc.label}</div>
                    <div className="text-sm text-slate-500">{loc.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={fadeUp.viewport}
          transition={fadeUp.transition}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for Real Impact</h2>
          <p className="text-slate-600 dark:text-slate-400">Every feature designed with African healthcare in mind</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={fadeUp}
              className="group p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CAMPUS IMAGE BREAK */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="max-w-7xl mx-auto rounded-3xl overflow-hidden relative"
        >
          <img src={gate1} alt="MediNova Gate" className="w-full h-[400px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent flex items-center">
            <div className="p-10 max-w-lg">
              <h3 className="text-3xl font-bold text-white mb-4">African-Built. African-Tested.</h3>
              <p className="text-slate-300 leading-relaxed">
                Not imported ideas. Not Western assumptions. Built from real African experiences, 
                designed with local problems in mind, tested in real healthcare environments.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6">
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={fadeUp.viewport}
          transition={fadeUp.transition}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
            Built in Africa.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Designed for Impact.
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Join the movement to transform healthcare education and delivery across the continent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/partnership"
              className="group px-8 py-4 rounded-2xl bg-emerald-600 text-white font-semibold text-sm tracking-wide hover:bg-emerald-700 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Partner With Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-4 rounded-2xl border-2 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold text-sm tracking-wide hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300"
            >
              Contact Team
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 dark:border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <span className="font-semibold">MediNova V3</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-500 dark:text-slate-500">
            <Link to="/privacy" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms</Link>
            <Link to="/contact" className="hover:text-slate-900 dark:hover:text-white transition-colors">Contact</Link>
          </div>
          <p className="text-sm text-slate-400">© 2026 MediNova. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}