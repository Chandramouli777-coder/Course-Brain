import { motion } from 'motion/react';
import { FileText, MessageSquare, Target, Clock, Shield, Globe } from 'lucide-react';

const features = [
  {
    name: 'AI Notes Generator',
    description: 'Transform any topic or textbook chapter into structured, easy-to-read notes in seconds.',
    icon: FileText,
    color: 'bg-[#ff3b3b]',
  },
  {
    name: '24/7 Doubt Solver',
    description: 'Stuck on a problem? Our AI tutor is available around the clock to explain complex concepts.',
    icon: MessageSquare,
    color: 'bg-[#8b0000]',
  },
  {
    name: 'Personalized Learning',
    description: 'Get study plans and practice questions tailored to your specific learning pace and goals.',
    icon: Target,
    color: 'bg-red-600',
  },
  {
    name: 'Time Saver',
    description: 'Reduce study time by 50% with summarized content and focused learning materials.',
    icon: Clock,
    color: 'bg-[#ff3b3b]',
  },
  {
    name: 'Secure & Private',
    description: 'Your study materials and data are encrypted and never shared with third parties.',
    icon: Shield,
    color: 'bg-[#8b0000]',
  },
  {
    name: 'Learn Anywhere',
    description: 'Access your notes and the AI tutor from any device, anywhere in the world.',
    icon: Globe,
    color: 'bg-red-600',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-[#f5f5f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold text-[#ff3b3b] uppercase tracking-wide">Features</h2>
          <p className="mt-2 text-3xl font-extrabold text-black sm:text-4xl">
            Everything you need to excel
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Powerful tools designed to help students study smarter, not harder.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(255, 59, 59, 0.1)" }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all"
            >
              <div className={feature.color + " w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-red-100"}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">{feature.name}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
