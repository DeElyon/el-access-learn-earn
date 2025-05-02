
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const courseCategories = [
  {
    id: 'python',
    name: 'Python',
    description: 'Master Python programming, data structures, algorithms, web development, and machine learning.',
    price: 'N30,000 per course',
    bundlePrice: 'N30,000 for all courses',
    image: '/placeholder.svg',
    color: 'bg-blue-500',
    courses: 5,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    description: 'Learn JavaScript fundamentals, React, Node.js, and mobile app development with React Native.',
    price: 'N25,000 per course',
    bundlePrice: 'N25,000 for all courses',
    image: '/placeholder.svg',
    color: 'bg-yellow-400',
    courses: 5,
  },
  {
    id: 'html-css',
    name: 'HTML/CSS',
    description: 'Explore HTML5, CSS3, responsive web design, and UI/UX design principles.',
    price: 'N10,000 per course',
    bundlePrice: 'N10,000 for all courses',
    image: '/placeholder.svg',
    color: 'bg-orange-500',
    courses: 5,
  },
  {
    id: 'mobile',
    name: 'Mobile Development',
    description: 'Create Android, iOS, and cross-platform mobile applications with the latest technologies.',
    price: 'N20,000 per course',
    bundlePrice: 'N20,000 for all courses',
    image: '/placeholder.svg',
    color: 'bg-green-500',
    courses: 5,
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    description: 'Master HTML, CSS, JavaScript, React, and modern frontend development tools and frameworks.',
    price: 'N10,000 per course',
    bundlePrice: 'N10,000 for all courses',
    image: '/placeholder.svg',
    color: 'bg-purple-500',
    courses: 10,
  },
  {
    id: 'backend',
    name: 'Backend Development',
    description: 'Build robust backend systems with Node.js, Express, MongoDB, and learn authentication and API development.',
    price: 'N15,000 per course',
    bundlePrice: 'N15,000 for all courses',
    image: '/placeholder.svg',
    color: 'bg-indigo-500',
    courses: 7,
  }
];

const CourseCategories = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Course Categories</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our comprehensive range of programming courses designed to build your skills from the ground up.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseCategories.map((category) => (
            <div 
              key={category.id}
              className="course-card animate-scale-up"
            >
              <div className={`h-3 ${category.color} w-full`}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 h-24 overflow-hidden">
                  {category.description}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium bg-blue-100 dark:bg-blue-900 text-elblue dark:text-blue-200 px-2 py-1 rounded-md">
                    {category.courses} Courses
                  </span>
                  <span className="text-sm font-medium">{category.price}</span>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-md mb-4">
                  <p className="text-sm font-medium">Bundle Offer: {category.bundlePrice}</p>
                </div>
                <Link 
                  to={`/courses#${category.id}`} 
                  className="inline-flex items-center text-elblue hover:text-blue-700 font-medium"
                >
                  View Courses
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            to="/courses" 
            className="inline-flex items-center justify-center px-6 py-3 bg-elblue text-white font-medium rounded-md hover:bg-blue-600 transition-colors hover-scale"
          >
            View All Courses
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CourseCategories;
