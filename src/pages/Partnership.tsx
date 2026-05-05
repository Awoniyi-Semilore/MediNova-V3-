import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Building2, GraduationCap, HeartHandshake, Landmark, 
  ArrowRight, CheckCircle2, TrendingUp, Users, Shield, Zap, Info, Send 
} from "lucide-react";
import gate1 from "../assets/medinova-gate1.jpg";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

const partners = [
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Hospitals & Clinics",
    desc: "Deploy digital patient management, streamline workflows, and improve care delivery with minimal disruption.",
  },
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Medical Training Institutions",
    desc: "Integrate structured, case-based learning modules with real clinical simulations for students and midwives.",
  },
  {
    icon: <HeartHandshake className="w-6 h-6" />,
    title: "NGOs & Health Organizations",
    desc: "Scale healthcare interventions with data-driven tools and unified training platforms across regions.",
  },
  {
    icon: <Landmark className="w-6 h-6" />,
    title: "Government Health Agencies",
    desc: "Enable policy-aligned digitization with scalable infrastructure designed for public health systems.",
  },
];

const benefits = [
  { icon: <TrendingUp className="w-5 h-5" />, title: "Scalable Growth", desc: "Infrastructure that grows with your organization" },
  { icon: <Users className="w-5 h-5" />, title: "Workforce Development", desc: "Train and retain skilled healthcare professionals" },
  { icon: <Shield className="w-5 h-5" />, title: "Data Security", desc: "Enterprise-grade protection for sensitive health data" },
  { icon: <Zap className="w-5 h-5" />, title: "Rapid Deployment", desc: "Get started quickly with minimal technical overhead" },
];

export default function Partnership() {
  const [formData, setFormData] = useState({ name: "", email: "", organization: "", message: "", type: "partner" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Partnership Inquiry: ${formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nOrganization: ${formData.organization}\nType: ${formData.type}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:medinovaafrica25@gmail.com?cc=cheagerald@yahoo.com&subject=${subject}&body=${body}`;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

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
            <HeartHandshake className="w-4 h-4" />
            Strategic Partnerships
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Partner With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              MediNova
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            We are building digital infrastructure for healthcare systems across Africa. 
            We partner with organizations ready to transform how healthcare is delivered, managed, and taught.
          </p>
        </motion.div>
      </section>

      {/* PARTNER TYPES */}
      <section className="px-6 py-20 bg-slate-100 dark:bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            viewport={fadeUp.viewport}
            transition={fadeUp.transition}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Who We Work With</h2>
            <p className="text-slate-600 dark:text-slate-400">Organizations committed to healthcare transformation</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.title}
                initial={fadeUp.initial}
                whileInView={fadeUp.whileInView}
                viewport={fadeUp.viewport}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="group p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-emerald-500/30 transition-all hover:shadow-xl hover:shadow-emerald-500/5"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                  {partner.icon}
                </div>
                <h3 className="font-bold text-lg mb-3">{partner.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{partner.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY MEDINOVA */}
      <section className="px-6 py-32 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            viewport={fadeUp.viewport}
            transition={fadeUp.transition}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Why MediNova?</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              MediNova is built from African realities — not imported assumptions. Our platform is designed 
              to work within existing healthcare limitations while enabling long-term digital transformation.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                "Built specifically for African healthcare environments",
                "Combines training and care in one unified system",
                "Minimal disruption to existing hospital workflows",
                "Designed to reduce staff burden, not add to it",
                "Scalable from single clinic to national deployment",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <div className="text-emerald-600 dark:text-emerald-400 mb-2">{benefit.icon}</div>
                  <div className="font-semibold text-sm mb-1">{benefit.title}</div>
                  <div className="text-xs text-slate-500">{benefit.desc}</div>
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
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src={gate1} alt="MediNova" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white font-bold text-xl mb-2">Ready to transform healthcare?</p>
                <p className="text-slate-300 text-sm">Let's build something impactful together.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PARTNERSHIP FORM */}
      <section className="px-6 py-20 bg-slate-100 dark:bg-white/[0.02]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            viewport={fadeUp.viewport}
            transition={fadeUp.transition}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Start a Partnership</h2>
            <p className="text-slate-600 dark:text-slate-400">Tell us about your organization and how we can collaborate</p>
          </motion.div>

          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            viewport={fadeUp.viewport}
            transition={fadeUp.transition}
            className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Partnership Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {["partner", "investor", "healthcare", "general"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, type })}
                      className={`py-3 px-4 rounded-xl text-sm font-medium border transition-all ${
                        formData.type === type
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400"
                          : "bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm"
                  placeholder="you@organization.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Organization</label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm"
                  placeholder="Hospital, NGO, or institution name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm resize-none"
                  placeholder="Tell us about your organization and how we can work together..."
                />
              </div>

              <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-800 dark:text-amber-400 text-xs">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  Clicking send will open your email app with the message pre-filled. 
                  Please press <strong>Send</strong> in your mail client to complete delivery.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-emerald-600 text-white font-semibold text-sm tracking-wide hover:bg-emerald-700 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {submitted ? "Opening Email..." : "Send Partnership Inquiry"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* PARTNERSHIP AREAS */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            viewport={fadeUp.viewport}
            transition={fadeUp.transition}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Partnership Areas</h2>
            <p className="text-slate-600 dark:text-slate-400">Multiple ways to collaborate and create impact</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Platform Adoption",
                desc: "Integrate MediNova into your hospital or institution. Full deployment support, staff training, and ongoing optimization.",
              },
              {
                title: "Training Integration",
                desc: "Embed our learning modules into your curriculum. Case-based simulations, progress tracking, and certification pathways.",
              },
              {
                title: "Regional Expansion",
                desc: "Partner with us to bring MediNova to new regions. Localized support, custom features, and shared infrastructure costs.",
              },
            ].map((area, i) => (
              <motion.div
                key={area.title}
                initial={fadeUp.initial}
                whileInView={fadeUp.whileInView}
                viewport={fadeUp.viewport}
                transition={{ ...fadeUp.transition, delay: i * 0.15 }}
                className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold mb-4">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{area.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{area.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 max-w-4xl mx-auto text-center">
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={fadeUp.viewport}
          transition={fadeUp.transition}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Let's Build the Future of African Healthcare</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            Whether you are a hospital, training institution, NGO, or government agency — 
            we are ready to partner with you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="group px-8 py-4 rounded-2xl bg-emerald-600 text-white font-semibold text-sm tracking-wide hover:bg-emerald-700 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Start a Conversation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="mailto:medinovaafrica25@gmail.com?cc=cheagerald@yahoo.com"
              className="px-8 py-4 rounded-2xl border-2 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold text-sm tracking-wide hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300"
            >
              medinovaafrica25@gmail.com
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}