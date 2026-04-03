import { motion } from 'motion/react';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free Starter',
    price: '0',
    description: 'Perfect for exploring AI-powered learning.',
    features: [
      'Basic AI Notes Generator',
      '5 Doubt Solves per day',
      'Standard Study Planner',
      'Community Support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro Student',
    price: '100',
    description: 'The ultimate tool for serious learners.',
    features: [
      'Unlimited AI Notes Generator',
      'Unlimited Doubt Solving',
      'Advanced Mind Mapping',
      'Career Path Guidance',
      'Priority AI Processing',
      'Exclusive Study Materials',
    ],
    cta: 'Upgrade to Pro',
    popular: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="text-base font-semibold text-[#ff3b3b] uppercase tracking-[0.3em]"
          >
            Simple Pricing
          </motion.h2>
          <motion.p 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="mt-2 text-4xl font-extrabold text-black sm:text-5xl tracking-tight"
          >
            Invest in your future
          </motion.p>
          <motion.p 
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto leading-relaxed"
          >
            Choose the plan that fits your learning goals. No hidden fees.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className={`relative bg-white p-12 rounded-[3rem] border ${
                plan.popular ? 'border-[#ff3b3b] shadow-2xl shadow-red-50' : 'border-gray-100 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-[#ff3b3b] text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center shadow-lg">
                  <Star className="w-3 h-3 mr-2 fill-white" />
                  Most Popular
                </div>
              )}
              
              <div className="mb-10">
                <h3 className="text-2xl font-black text-black mb-2 uppercase tracking-tight">{plan.name}</h3>
                <p className="text-gray-500 font-medium">{plan.description}</p>
              </div>
              
              <div className="mb-10 flex items-baseline">
                <span className="text-6xl font-black text-black tracking-tighter">₹{plan.price}</span>
                <span className="text-gray-400 font-bold ml-2 uppercase tracking-widest text-sm">/ month</span>
              </div>
              
              <ul className="mb-12 space-y-5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center text-gray-600 font-medium">
                    <div className="bg-red-50 p-1 rounded-full mr-4">
                      <Check className="w-4 h-4 text-[#ff3b3b]" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="mb-12">
                {/* CTA buttons removed */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
