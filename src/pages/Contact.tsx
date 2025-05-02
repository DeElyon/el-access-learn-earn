
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  
  useEffect(() => {
    // Check for dark mode preference
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModePreference);
    
    // Apply dark mode class to html element
    if (darkModePreference) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out! We'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-elblue text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg text-blue-100 max-w-3xl">
              Have questions about our courses or need help with registration? 
              Our support team is here to help you.
            </p>
          </div>
        </section>
        
        {/* Contact Information and Form */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Have questions about our coding tutorials or need assistance with course 
                  selection? Reach out to us and we'll get back to you as soon as possible.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-lg bg-elblue/10 flex items-center justify-center mr-4">
                      <Mail className="text-elblue" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a href="mailto:elcoderssoftwares12@gmail.com" className="text-elblue hover:underline">
                        elcoderssoftwares12@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-lg bg-elblue/10 flex items-center justify-center mr-4">
                      <Phone className="text-elblue" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">WhatsApp Support</h3>
                      <a href="https://wa.me/2348088578817" className="text-elblue hover:underline">
                        08088578817
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-lg bg-elblue/10 flex items-center justify-center mr-4">
                      <MapPin className="text-elblue" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Follow Us</h3>
                      <a 
                        href="https://whatsapp.com/channel/0029Vae13b4BvvsYVV4a6C2z" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-elblue hover:underline"
                      >
                        ELCODERS WhatsApp Channel
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 p-6 bg-ashwhite dark:bg-gray-800 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Looking to Register?</h3>
                  <p className="mb-6">
                    Ready to start your coding journey? Register for our courses and begin learning today!
                  </p>
                  <button 
                    onClick={() => navigate('/registration')}
                    className="inline-flex items-center justify-center px-6 py-3 bg-elblue text-white font-medium rounded-md hover:bg-blue-600 transition-colors hover-scale"
                  >
                    Register Now
                    <ArrowRight size={18} className="ml-2" />
                  </button>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-foreground"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-foreground"
                      placeholder="Your email address"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone (Optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-foreground"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-foreground"
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center justify-center px-6 py-3 bg-elblue text-white font-medium rounded-md hover:bg-blue-600 transition-colors hover-scale ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : (
                      <>
                        Send Message
                        <Send size={18} className="ml-2" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-ashwhite dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-center mb-12">
              Find answers to common questions about our courses, registration process, and payment options.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-3">How do I register for a course?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You can register for a course by visiting the Registration page, filling out the form, and completing the payment process.
                  After registration, you'll receive instructions on how to access your course materials.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-3">What payment methods are accepted?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We currently accept bank transfers to Access Bank, Stanbic IBTC, and Kuda MFB. 
                  You'll need to provide the transaction reference after making the payment.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-3">How does the referral program work?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  For every friend who registers using your referral code, you earn ₦1,000 instantly. 
                  Additionally, when they make their second bi-weekly payment, you'll earn 50% of that payment every month.
                  Contact us via WhatsApp to get your referral code.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-3">What's included in a course bundle?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  A course bundle includes all courses in a specific category (e.g., Python, JavaScript) at a fixed price.
                  This is a cost-effective way to access multiple related courses and build comprehensive skills in a specific area.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
