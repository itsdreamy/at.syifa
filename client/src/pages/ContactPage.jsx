import React, { useState } from 'react';
import { ArrowRight, Mail, Linkedin, Github } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-white">
      <div className="w-full px-8 md:px-12">
        {/* Massive Header */}
        <div className="mb-16 border-b border-border pb-12">
          <h1 className="text-[14vw] font-extrabold tracking-tightest text-foreground uppercase leading-none select-none">
            Let's Talk!
          </h1>
        </div>

        {/* Form & Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Conversational Form (matches video frame_10) */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div className="p-12 rounded-2xl bg-[#F7F7F5] border border-border text-center space-y-4">
                <div className="text-4xl">✉️</div>
                <h2 className="text-3xl font-extrabold tracking-tight text-foreground">Message Sent!</h2>
                <p className="text-secondary text-base max-w-md mx-auto">
                  Thank you for reaching out. We've received your note and will be in touch shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 text-xl sm:text-2xl md:text-3xl font-bold text-foreground leading-relaxed">
                <div>
                  Hey at.syifa®, my name is{' '}
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Name *"
                    className="inline-block bg-[#F4F4F2] px-4 py-1.5 rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-black font-semibold text-lg sm:text-2xl min-w-[200px]"
                  />{' '}
                  and I'm writing from{' '}
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Company Name"
                    className="inline-block bg-[#F4F4F2] px-4 py-1.5 rounded-lg text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-black font-semibold text-lg sm:text-2xl min-w-[200px]"
                  />
                  .
                </div>

                <div>
                  I'm getting in touch because I'd like to
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, timeline, or idea here... *"
                    className="w-full mt-4 bg-[#F4F4F2] p-5 rounded-2xl text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-black font-medium text-base sm:text-lg block"
                  />
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-6">
                  <button
                    type="submit"
                    className="px-8 py-4 rounded-full bg-black text-white hover:bg-neutral-800 transition-all text-sm font-bold uppercase tracking-wider inline-flex items-center gap-3 shadow-lg"
                  >
                    <span>Get in Touch</span>
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
              <a href="mailto:syifa@example.com" className="text-xl font-bold text-foreground hover:underline">
                syifa@example.com
              </a>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-muted">Response Time</div>
              <p className="text-sm text-secondary">
                We typically respond within 24–48 hours on business days.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-muted">Availability</div>
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open for select engagements</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
