import { motion } from "framer-motion";
import { MapPin, Calendar, Target, Heart, Lightbulb, Rocket } from "lucide-react";
import campus from "../assets/medinova-campus.jpg";
import gate from "../assets/medinova-gate.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

export default function About() {
  const milestones = [
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "The Spark",
      desc: "Two developers across Nigeria and Cameroon identified the same problem: medical education and hospital systems never talk to each other.",
    },
    {
      icon: <Rocket className="w-5 h-5" />,
      title: "The Build",
      desc: "Months of remote collaboration, debugging complex systems, and building scalable architecture from scratch under real constraints.",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "The Mission",
      desc: "A unified platform that trains healthcare workers while simultaneously digitizing the hospitals they will serve.",
    },
  ];

  const challenges = [
    "Limited internet access and data cost constraints",
    "Remote collaboration across two countries",
    "Building scalable architecture from scratch",
    "Balancing school, burnout, and self-learning",
    "PWA setup and deployment under resource limits",
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* HERO */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20">
            <Target className="w-4 h-4" />
            Our Story
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Healthcare Infrastructure
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Built From Reality
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            MediNova was not born in a boardroom. It was built from late nights, real frustrations, 
            and the stubborn belief that African healthcare deserves better tools.
          </p>
        </motion.div>
      </section>

      {/* FOUNDERS */}
      <section className="px-6 py-20 bg-slate-100 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              transition={fadeUp.transition}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={gate} alt="MediNova Gate" className="w-full h-[500px] object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl opacity-20 blur-2xl" />
            </motion.div>

            <motion.div
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-8">The Founders</h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Awoniyi Semilore</h3>
                    <p className="text-slate-500 text-sm mb-2">Nigeria 🇳🇬</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Full-stack developer building scalable systems with deep understanding of local healthcare challenges.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Chea Gerald</h3>
                    <p className="text-slate-500 text-sm mb-2">Cameroon 🇨🇲</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      Systems architect focused on bridging digital infrastructure gaps in underserved regions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                  "Two developers. Two countries. One continent — Africa. Built from real African experiences, 
                  not imported ideas, designed with local problems in mind."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="px-6 py-32 max-w-7xl mx-auto">
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={fadeUp.viewport}
          transition={fadeUp.transition}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Journey</h2>
          <p className="text-slate-600 dark:text-slate-400">From idea to impact — every step mattered</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {milestones.map((milestone, i) => (
            <motion.div
              key={milestone.title}
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              transition={{ ...fadeUp.transition, delay: i * 0.15 }}
              className="relative p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 group hover:border-emerald-500/30 transition-all"
            >
              <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-emerald-500/30">
                {i + 1}
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 mt-2">
                {milestone.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{milestone.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{milestone.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CHALLENGES */}
      <section className="px-6 py-20 bg-slate-100 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              transition={fadeUp.transition}
            >
              <h2 className="text-3xl font-bold mb-6">Challenges We Overcame</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                Building MediNova was not easy. Every obstacle taught us something about resilience, 
                resourcefulness, and what African tech builders are truly capable of.
              </p>
              <div className="space-y-4">
                {challenges.map((challenge) => (
                  <div key={challenge} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{challenge}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              transition={{ ...fadeUp.transition, delay: 0.2 }}
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={campus} alt="MediNova Campus" className="w-full h-[400px] object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="px-6 py-32 max-w-4xl mx-auto text-center">
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={fadeUp.viewport}
          transition={fadeUp.transition}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Our Vision</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            To build a digitally connected healthcare system across Africa, starting with midwives, 
            students, and hospitals. A future where every healthcare worker has the tools they need, 
            and every patient receives better care because of it.
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-medium border border-emerald-500/20">
            <Calendar className="w-4 h-4" />
            Building since 2025
          </div>
        </motion.div>
      </section>
    </div>
  );
}