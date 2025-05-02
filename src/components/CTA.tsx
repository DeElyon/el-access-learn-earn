
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-elblue to-blue-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Coding Journey?</h2>
            <p className="text-lg text-blue-100 mb-6">
              Join EL ACCESS 2.0 today and transform your future with in-demand coding skills. 
              Register now and take advantage of our course bundles for the best value!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/registration" 
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-elblue font-medium rounded-md hover:bg-blue-100 transition-colors hover-scale"
              >
                Register Now
                <ArrowRight size={18} className="ml-2" />
              </Link>
              
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors hover-scale"
              >
                Contact Us
              </Link>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Why Join Now?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-white text-elblue flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <span>Access to all course materials and resources</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-white text-elblue flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <span>Exclusive bundle offers with significant savings</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-white text-elblue flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <span>24/7 support from our expert instructors</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-white text-elblue flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-xs font-bold">✓</span>
                  </div>
                  <span>Earn while you learn with our referral program</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
