
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { findCourseById, findCoursesByCategory } from '@/data/courses';
import { ArrowRight, Check, Clock, FileText, Users } from 'lucide-react';

const CourseDetails = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
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
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
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
  
  const course = courseId ? findCourseById(courseId) : null;
  const relatedCourses = course ? findCoursesByCategory(course.categoryId).filter(c => c.id !== courseId).slice(0, 3) : [];
  
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">The course you are looking for does not exist.</p>
            <button 
              onClick={() => navigate('/courses')}
              className="inline-flex items-center justify-center px-6 py-3 bg-elblue text-white font-medium rounded-md hover:bg-blue-600 transition-colors hover-scale"
            >
              Browse All Courses
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow">
        {/* Course Header */}
        <section className="bg-elblue text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">{course.category}</span>
                  <span className="text-sm bg-white/20 px-2 py-0.5 rounded-full">{course.level}</span>
                </div>
                <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
                <p className="text-blue-100 mb-4 max-w-2xl">{course.description}</p>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText size={18} />
                    <span>{course.topics.length} Topics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={18} />
                    <span>EL ACCESS Expert Instructors</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 lg:mt-0">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-lg">
                  <p className="text-3xl font-bold mb-1">{formatPrice(course.price)}</p>
                  <p className="text-sm text-blue-100 mb-4">One-time payment</p>
                  <button
                    onClick={() => navigate('/registration', { state: { course: course.id } })}
                    className="w-full bg-white text-elblue font-medium py-3 px-4 rounded-md hover:bg-blue-50 transition-colors hover-scale"
                  >
                    Register for This Course
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Course Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {course.topics.map((topic, index) => (
                    <div key={index} className="flex items-start">
                      <div className="mt-1 mr-3 h-5 w-5 flex-shrink-0 rounded-full bg-elblue flex items-center justify-center">
                        <Check size={12} className="text-white" />
                      </div>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
                
                <h2 className="text-2xl font-bold mb-6">Course Description</h2>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="mb-4">
                    This comprehensive {course.title} course is designed to take you from beginner to proficient, 
                    equipping you with the skills needed to excel in today's competitive tech industry.
                  </p>
                  <p className="mb-4">
                    Through a combination of lectures, hands-on exercises, and real-world projects, 
                    you'll gain practical experience and confidence in applying {course.category} concepts.
                  </p>
                  <p className="mb-4">
                    Our expert instructors will guide you through each topic, ensuring you understand the core principles 
                    and can implement what you've learned effectively.
                  </p>
                  <p>
                    By the end of this {course.duration} course, you'll have created several projects that 
                    demonstrate your skills and can be added to your portfolio.
                  </p>
                </div>
                
                <div className="mt-12">
                  <h2 className="text-2xl font-bold mb-6">Payment Options</h2>
                  <div className="bg-ashwhite dark:bg-gray-800 rounded-lg p-6">
                    <p className="mb-4">
                      To register for this course, you can make a direct bank transfer to any of the following accounts:
                    </p>
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                        <p className="font-semibold">Access Bank</p>
                        <p>Account Number: 1907856695</p>
                        <p>Account Name: Ebubechukwu Ifeanyi Elijah</p>
                      </div>
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                        <p className="font-semibold">Stanbic IBTC</p>
                        <p>Account Number: 5190766096</p>
                        <p>Account Name: Ebubechukwu Ifeanyi</p>
                      </div>
                      <div className="bg-white dark:bg-gray-700 rounded-lg p-4">
                        <p className="font-semibold">Kuda MFB</p>
                        <p>Account Number: 2071073143</p>
                        <p>Account Name: Onoha Ifeanyichukwu Happiness</p>
                      </div>
                    </div>
                    <p className="mt-4">
                      After making the payment, please complete the registration form to receive your course access details and receipt.
                    </p>
                    <div className="mt-6">
                      <button
                        onClick={() => navigate('/registration', { state: { course: course.id } })}
                        className="inline-flex items-center justify-center px-6 py-3 bg-elblue text-white font-medium rounded-md hover:bg-blue-600 transition-colors hover-scale"
                      >
                        Register Now
                        <ArrowRight size={18} className="ml-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                {/* Sidebar content */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-24">
                  <h3 className="text-xl font-bold mb-4">Course Details</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Price:</span>
                      <span className="font-semibold">{formatPrice(course.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Duration:</span>
                      <span className="font-semibold">{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Level:</span>
                      <span className="font-semibold">{course.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Category:</span>
                      <span className="font-semibold">{course.category}</span>
                    </div>
                  </div>
                  
                  <div className="bg-elblue/10 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-elblue mb-2">Bundle Offer</h4>
                    <p className="text-sm mb-2">
                      Get access to all courses in the {course.category} category.
                    </p>
                    <button
                      onClick={() => navigate('/registration', { state: { bundle: course.categoryId } })}
                      className="w-full text-center text-sm bg-elblue text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Register for Bundle
                    </button>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Have questions about this course or the registration process? Our support team is here to help!
                  </p>
                  <div className="space-y-2">
                    <a 
                      href="mailto:elcoderssoftwares12@gmail.com" 
                      className="flex items-center text-elblue hover:underline"
                    >
                      <span className="mr-2">Email Support</span>
                      <ArrowRight size={16} />
                    </a>
                    <a 
                      href="https://wa.me/2348088578817" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-elblue hover:underline"
                    >
                      <span className="mr-2">WhatsApp Support</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Courses */}
        {relatedCourses.length > 0 && (
          <section className="py-12 bg-ashwhite dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl font-bold mb-6">Related Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedCourses.map((relatedCourse) => (
                  <div
                    key={relatedCourse.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-scale-up cursor-pointer"
                    onClick={() => {
                      navigate(`/courses/${relatedCourse.id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div className="h-3 bg-elblue w-full"></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold">{relatedCourse.title}</h3>
                        <span className="bg-blue-100 dark:bg-blue-900 text-elblue dark:text-blue-300 text-xs px-2 py-1 rounded-full">
                          {relatedCourse.level}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 h-12 overflow-hidden">
                        {relatedCourse.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">{formatPrice(relatedCourse.price)}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{relatedCourse.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetails;
