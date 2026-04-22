import { motion } from "framer-motion";
import { Mail, MapPin, Send, ExternalLink, Info } from "lucide-react";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.7, ease: "easeOut" as const },
};

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", type: "general" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(`New ${formData.type.charAt(0).toUpperCase() + formData.type.slice(1)} Inquiry`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nType: ${formData.type}\n\nMessage:\n${formData.message}`
    );

    window.location.href = `mailto:semiloreawoniyi@gmail.com?cc=cheagerald@yahoo.com&subject=${subject}&body=${body}`;

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen pt-24">
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="max-w-3xl mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-6 border border-emerald-500/20">
            <Mail className="w-4 h-4" />
            Get in Touch
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Let's Start a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              Conversation
            </span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Whether you are a partner, investor, healthcare institution, or future team member — 
            we would love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* FORM */}
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            viewport={fadeUp.viewport}
            transition={fadeUp.transition}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">I am reaching out as...</label>
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
                {submitted ? "Opening Email..." : "Send Message"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

          {/* INFO */}
          <motion.div
            initial={fadeUp.initial}
            whileInView={fadeUp.whileInView}
            viewport={fadeUp.viewport}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="p-8 rounded-3xl bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10">
              <h3 className="font-bold text-lg mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Email</p>
                    <a href="mailto:semiloreawoniyi@gmail.com" className="text-slate-600 dark:text-slate-400 text-sm hover:text-emerald-600 transition-colors">
                      semiloreawoniyi@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Location</p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <h3 className="font-bold text-lg mb-4">Response Time</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                We typically respond to partnership and investment inquiries within 24-48 hours. 
                For general questions, expect a response within 72 hours.
              </p>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                <ExternalLink className="w-4 h-4" />
                <span>Priority support for partners</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}