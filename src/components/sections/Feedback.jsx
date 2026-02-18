import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sami Ben Ali",
    role: "Standard User / Founder",
    text: "I had an idea for a Tunisian logistics app but no team. Within 48 hours of Admin approval, I matched with a senior developer.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sami"
  },
  {
    name: "Leila Mansour",
    role: "Verified Freelancer",
    text: "The VIP feed is a game changer. No more bidding against bots. Every client here is verified and serious about building.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leila"
  },
  {
    name: "Global Tech Tunis",
    role: "Brand Partner",
    text: "The biometric security gives us peace of mind. We found our lead UI designer through Chriki TN. High trust, high quality.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Brand"
  }
];

const Feedback = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center text-center mb-16">
        <h2 className="text-3xl lg:text-5xl font-black text-white uppercase tracking-tighter">
          Vetted Success
        </h2>
        <p className="text-blue-500 font-bold tracking-[0.3em] text-[10px] uppercase mt-2">
          Real Stories from the Alliance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-sm hover:border-blue-500/30 transition-all group"
          >
            {/* Quote Icon Accent */}
            <div className="absolute top-6 right-8 text-blue-500/20 group-hover:text-blue-500/40 transition-colors">
              <Quote size={40} />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full border-2 border-blue-500/30 overflow-hidden bg-slate-800">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">{t.name}</h4>
                <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">{t.role}</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">
              "{t.text}"
            </p>

            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="fill-blue-500 text-blue-500" />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;