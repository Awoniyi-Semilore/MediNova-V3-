import { motion } from "framer-motion";
import { Shield, Eye, Lock, Share2, UserCheck, Info, Send } from "lucide-react";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
};

const sections = [
  {
    icon: <Eye className="w-5 h-5" />,
    title: "Data Collection",
    content: "We collect basic user information such as name, email, and healthcare-related data necessary for platform functionality. This includes patient registration details, appointment information, and learning progress data.",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "How We Use Data",
    content: "Data is used to improve user experience, enable healthcare workflows, enhance system performance, and provide personalized learning paths. We analyze usage patterns to optimize platform efficiency.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Data Protection",
    content: "We implement secure storage, encryption at rest and in transit, and strict access controls to prevent unauthorized access to sensitive information. Regular security audits ensure ongoing protection.",
  },
  {
    icon: <Share2 className="w-5 h-5" />,
    title: "Data Sharing",
    content: "We do NOT sell user data. Data is only shared when necessary for service functionality, such as between authorized healthcare staff within the same institution. Third-party sharing requires explicit consent.",
  },
  {
    icon: <UserCheck className="w-5 h-5" />,
    title: "User Rights",
    content: "Users may request access, correction, or deletion of their data at any time. Data deletion requests are processed within 30 days. Users can export their data in standard formats upon request.",
  },
];

export default function Privacy() {
  const [formData, setFormData] = useState({ name: "", email: "", inquiry: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent("Privacy Inquiry");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nInquiry:\n${formData.inquiry}`
    );

    window.location.href = `mailto:semiloreawoniyi@gmail.com?cc=cheagerald@yahoo.com&subject=${subject}&body=${body}`;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen pt-24">
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20">
            <Shield className="w-4 h-4" />
            Legal
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">Privacy Policy</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            MediNova is committed to protecting user and patient data. We prioritize security, 
            transparency, and responsible data handling across our platform.
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={fadeUp.initial}
              whileInView={fadeUp.whileInView}
              viewport={fadeUp.viewport}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold">{section.title}</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Privacy Inquiry Form */}
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={fadeUp.viewport}
          transition={fadeUp.transition}
          className="mt-12 p-8 rounded-3xl bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10"
        >
          <h3 className="font-bold text-lg mb-2">Privacy-Related Inquiry</h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-6">
            Have a question about your data? Reach out directly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm"
                placeholder="Your name"
              />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm"
                placeholder="you@email.com"
              />
            </div>

            <textarea
              required
              rows={4}
              value={formData.inquiry}
              onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm resize-none"
              placeholder="Describe your privacy concern or question..."
            />

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
              {submitted ? "Opening Email..." : "Send Inquiry"}
              <Send className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-slate-600 dark:text-slate-400 text-sm mt-6">
            Or email us directly at{" "}
            <a href="mailto:semiloreawoniyi@gmail.com?cc=cheagerald@yahoo.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">
              semiloreawoniyi@gmail.com
            </a>
          </p>
        </motion.div>

        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={fadeUp.viewport}
          transition={fadeUp.transition}
          className="mt-12 p-8 rounded-3xl bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 text-center"
        >
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Last updated: April 2026. For privacy-related inquiries, contact{" "}
            <a href="mailto:semiloreawoniyi@gmail.com?cc=cheagerald@yahoo.com" className="text-emerald-600 dark:text-emerald-400 hover:underline">
              semiloreawoniyi@gmail.com
            </a>
          </p>
        </motion.div>
      </section>
    </div>
  );
}