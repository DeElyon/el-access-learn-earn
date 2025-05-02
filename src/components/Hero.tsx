
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Transform Your Future with Coding Skills</h1>
            
            <p className="text-lg mb-6 text-blue-100">
              Join EL ACCESS 2.0 for comprehensive coding tutorials from beginner to advanced levels.
              Learn, grow, and unlock new career opportunities!
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center text-blue-100">
                <div className="h-6 w-6 rounded-full bg-blue-100 text-elblue flex items-center justify-center mr-3">
                  <span className="text-xs font-bold">✓</span>
                </div>
                <span>Expert-led coding courses</span>
              </div>
              
              <div className="flex items-center text-blue-100">
                <div className="h-6 w-6 rounded-full bg-blue-100 text-elblue flex items-center justify-center mr-3">
                  <span className="text-xs font-bold">✓</span>
                </div>
                <span>Hands-on projects and exercises</span>
              </div>
              
              <div className="flex items-center text-blue-100">
                <div className="h-6 w-6 rounded-full bg-blue-100 text-elblue flex items-center justify-center mr-3">
                  <span className="text-xs font-bold">✓</span>
                </div>
                <span>Comprehensive learning paths</span>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/courses" 
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-elblue font-medium rounded-md hover:bg-blue-100 transition-colors hover-scale"
              >
                Explore Courses
                <ArrowRight size={18} className="ml-2" />
              </Link>
              
              <Link 
                to="/registration" 
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors hover-scale"
              >
                Register Now
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-blue-400/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl"></div>
              
              <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 animate-float shadow-lg">
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <div className="h-3 w-3 rounded-full bg-red-400"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                    <div className="h-3 w-3 rounded-full bg-green-400"></div>
                  </div>
                  
                  <div className="space-y-1 font-mono">
                    <div className="text-blue-100"># Welcome to EL ACCESS 2.0</div>
                    <div className="text-blue-100">def <span className="text-yellow-300">learn_to_code</span>():</div>
                    <div className="text-blue-100 pl-4">skills = ["Python", "JavaScript", "HTML/CSS"]</div>
                    <div className="text-blue-100 pl-4">opportunities = ["Frontend", "Backend", "Mobile"]</div>
                    <div className="text-blue-100 pl-4">return skills + opportunities</div>
                    <div className="text-blue-100"></div>
                    <div className="text-blue-100">your_future = <span className="text-yellow-300">learn_to_code</span>()</div>
                    <div className="text-green-300"># Your coding journey starts here!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
