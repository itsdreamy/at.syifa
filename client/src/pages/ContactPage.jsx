import React, { useState } from 'react';
import { ArrowRight, Mail, Linkedin, Github } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputBase =
    'h-11 px-4 rounded-xl bg-[#F4F4F2] text-foreground placeholder:text-muted text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black transition-shadow w-full block';

  return (
    <div className="pt-28 pb-24 min-h-screen bg-white">
      <div className="w-full px-8 md:px-12">
        {/* Massive Header */}
        <div className="mb-16 pb-10 border-b border-border">
          <h1 className="text-[12vw] md:text-[11vw] font-extrabold tracking-tightest text-foreground uppercase leading-none select-none">
            Let's Talk!
          </h1>
        </div>

        {/* Form & Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Form column */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div className="p-12 rounded-2xl bg-[#F7F7F5] border border-border text-center space-y-4">
                <div className="text-4xl">✉️</div>
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Message Sent!</h2>
                <p className="text-secondary text-base max-w-md mx-auto">
                  Thank you for reaching out. I'll get back to you within 24–48 hours on business days.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted block">
                      Your Name <span className="text-black">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Budi Santoso"
                      className={inputBase}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-muted block">
                      Email <span className="text-black">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* Company */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted block">
                    Company / Organisation
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Where are you writing from? (optional)"
                    className={inputBase}
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-muted block">
                    Message <span className="text-black">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, timeline, or idea…"
                    className="px-4 py-3 rounded-xl bg-[#F4F4F2] text-foreground placeholder:text-muted text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black transition-shadow w-full block resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-5">
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 transition-all text-sm font-bold uppercase tracking-wider inline-flex items-center gap-3 shadow-md hover:shadow-lg"
                  >
                    <span>Send Message</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-muted font-normal">
                    By submitting, you agree to our Terms and Privacy Policy.
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Quick Contact Sidebar */}
          <div className="lg:col-span-4 space-y-8 border-t lg:border-t-0 lg:border-l border-border pt-12 lg:pt-0 lg:pl-12">
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-muted">Direct Email</div>
              <a href="mailto:syifasaepulbachri@gmail.com" className="text-base font-bold text-foreground hover:underline break-all">
                syifasaepulbachri@gmail.com
              </a>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-muted">Response Time</div>
              <p className="text-sm text-secondary leading-relaxed">
                I typically respond within 24–48 hours on business days.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-muted">Availability</div>
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                <span>Open for select engagements</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
