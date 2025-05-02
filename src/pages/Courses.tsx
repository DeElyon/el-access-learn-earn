
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { categories, courses, CourseType, CategoryType, findCoursesByCategory } from '@/data/courses';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SearchIcon, ArrowRight } from 'lucide-react';

const Courses = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState<CourseType[]>(courses);
  const navigate = useNavigate();
  const location = useLocation();
  
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
    
    // Check if there's a hash in the URL to set the active category
    const hash = location.hash.slice(1); // Remove the # character
    if (hash && categories.some(cat => cat.id === hash)) {
      setActiveCategory(hash);
      filterCourses(hash, searchQuery);
    }
  }, [location]);
  
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
  
  const filterCourses = (category: string, query: string) => {
    let filtered = courses;
    
    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(course => course.categoryId === category);
    }
    
    // Filter by search query
    if (query.trim() !== '') {
      const lowercaseQuery = query.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(lowercaseQuery) ||
        course.description.toLowerCase().includes(lowercaseQuery) ||
        course.category.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    setFilteredCourses(filtered);
  };
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    filterCourses(category, searchQuery);
    navigate(category === 'all' ? '/courses' : `/courses#${category}`);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterCourses(activeCategory, query);
  };
  
  const handleCourseClick = (courseId: string) => {
    navigate(`/courses/${courseId}`);
  };
  
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-elblue text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-4">Explore Our Courses</h1>
            <p className="text-lg text-blue-100 max-w-3xl">
              Browse through our comprehensive programming courses designed to help you master 
              in-demand skills for today's tech industry.
            </p>
          </div>
        </section>
        
        {/* Search and Filter */}
        <section className="py-8 bg-ashwhite dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative w-full md:w-auto md:min-w-[300px]">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-foreground"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`px-3 py-1 rounded-full text-sm ${
                    activeCategory === 'all'
                      ? 'bg-elblue text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                >
                  All Courses
                </button>
                
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeCategory === category.id
                        ? 'bg-elblue text-white'
                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Courses Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Bundles Section */}
            {activeCategory !== 'all' && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Course Bundle</h2>
                <div className="bg-gradient-to-r from-elblue to-blue-700 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">
                      {categories.find(cat => cat.id === activeCategory)?.name} Course Bundle
                    </h3>
                    <p className="text-blue-100 mb-4">
                      Get access to all {filteredCourses.length} courses in the {categories.find(cat => cat.id === activeCategory)?.name} category.
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold">{formatPrice(categories.find(cat => cat.id === activeCategory)?.bundlePrice || 0)}</p>
                        <p className="text-sm text-blue-200">One-time payment</p>
                      </div>
                      <button
                        onClick={() => navigate('/registration', { state: { bundle: activeCategory } })}
                        className="bg-white text-elblue px-4 py-2 rounded-md hover:bg-blue-50 transition-colors hover-scale"
                      >
                        Register for Bundle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Individual Courses */}
            <h2 className="text-2xl font-bold mb-6">
              {activeCategory === 'all' ? 'All Courses' : `${categories.find(cat => cat.id === activeCategory)?.name} Courses`}
            </h2>
            
            {filteredCourses.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No courses found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 animate-scale-up cursor-pointer"
                    onClick={() => handleCourseClick(course.id)}
                  >
                    <div className="h-3 bg-elblue w-full"></div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold">{course.title}</h3>
                        <span className="bg-blue-100 dark:bg-blue-900 text-elblue dark:text-blue-300 text-xs px-2 py-1 rounded-full">
                          {course.level}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 h-12 overflow-hidden">
                        {course.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.topics.slice(0, 3).map((topic, index) => (
                          <span key={index} className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                            {topic}
                          </span>
                        ))}
                        {course.topics.length > 3 && (
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                            +{course.topics.length - 3} more
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">{formatPrice(course.price)}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{course.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-elblue text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
              Join EL ACCESS 2.0 today and transform your future with in-demand coding skills. 
              Register now and take advantage of our course bundles!
            </p>
            <button 
              onClick={() => navigate('/registration')}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-elblue font-medium rounded-md hover:bg-blue-50 transition-colors hover-scale"
            >
              Register Now
              <ArrowRight size={18} className="ml-2" />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
