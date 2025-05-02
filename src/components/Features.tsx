
import React from 'react';
import { BookOpen, Code, Users, CreditCard, FileText, Mail } from 'lucide-react';

const features = [
  {
    title: 'Comprehensive Courses',
    description: 'From beginner to advanced levels, covering Python, JavaScript, HTML/CSS, and more.',
    icon: BookOpen,
  },
  {
    title: 'Expert Instruction',
    description: 'Learn from experienced developers with practical industry knowledge.',
    icon: Users,
  },
  {
    title: 'Hands-on Projects',
    description: 'Build real-world applications to reinforce your learning and create a portfolio.',
    icon: Code,
  },
  {
    title: 'Secure Payments',
    description: 'Multiple payment options with secure transaction processing.',
    icon: CreditCard,
  },
  {
    title: 'Automatic Receipts',
    description: 'Get detailed receipts immediately after your payment.',
    icon: FileText,
  },
  {
    title: 'Dedicated Support',
    description: '24/7 support via WhatsApp and email to assist you throughout your learning journey.',
    icon: Mail,
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-ashwhite dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose EL ACCESS 2.0</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience a comprehensive coding education with features designed to help you succeed in today's tech-driven world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-lg bg-elblue/10 flex items-center justify-center mb-4">
                <feature.icon className="text-elblue" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
