
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { findCategoryById, findCourseById } from '@/data/courses';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  courseOrBundle: string;
  paymentMethod: string;
  transactionReference: string;
  referralCode: string;
}

const Registration = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [receipt, setReceipt] = useState<any>(null);
  
  const defaultFormData: FormData = {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    courseOrBundle: '',
    paymentMethod: 'Access Bank',
    transactionReference: '',
    referralCode: '',
  };
  
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  
  // Check if a specific course or bundle was selected from another page
  useEffect(() => {
    const state = location.state as any;
    if (state) {
      if (state.course) {
        const course = findCourseById(state.course);
        if (course) {
          setFormData(prev => ({
            ...prev,
            courseOrBundle: `Course: ${course.title}`,
          }));
        }
      } else if (state.bundle) {
        const category = findCategoryById(state.bundle);
        if (category) {
          setFormData(prev => ({
            ...prev,
            courseOrBundle: `Bundle: ${category.name}`,
          }));
        }
      }
    }

    // Check for dark mode preference
    const darkModePreference = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(darkModePreference);
    
    // Apply dark mode class to html element
    if (darkModePreference) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateStep1 = () => {
    if (!formData.fullName.trim()) {
      toast({
        title: "Error",
        description: "Please enter your full name",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.phone.trim()) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.address.trim()) {
      toast({
        title: "Error",
        description: "Please enter your address",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };
  
  const validateStep2 = () => {
    if (!formData.courseOrBundle.trim()) {
      toast({
        title: "Error",
        description: "Please select a course or bundle",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };
  
  const validateStep3 = () => {
    if (!formData.paymentMethod) {
      toast({
        title: "Error",
        description: "Please select a payment method",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.transactionReference.trim()) {
      toast({
        title: "Error",
        description: "Please enter your transaction reference",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };
  
  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const generateReceipt = () => {
    const date = new Date();
    const receiptNumber = `EL-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
    
    let courseName = formData.courseOrBundle;
    let amount = 0;
    
    if (courseName.startsWith('Course: ')) {
      const courseTitle = courseName.replace('Course: ', '');
      const course = [...findCourseById.length && Object.values(findCourseById)].find(c => c.title === courseTitle);
      if (course) {
        amount = course.price;
      }
    } else if (courseName.startsWith('Bundle: ')) {
      const bundleName = courseName.replace('Bundle: ', '');
      const category = [...findCategoryById.length && Object.values(findCategoryById)].find(c => c.name === bundleName);
      if (category) {
        amount = category.bundlePrice;
      }
    }
    
    return {
      receiptNumber,
      courseName: formData.courseOrBundle,
      studentName: formData.fullName,
      amount,
      paymentMethod: formData.paymentMethod,
      transactionReference: formData.transactionReference,
      date: date.toLocaleDateString(),
    };
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateStep3()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        const generatedReceipt = generateReceipt();
        setReceipt(generatedReceipt);
        setCurrentStep(4); // Move to receipt step
        setIsSubmitting(false);
        
        toast({
          title: "Registration Successful",
          description: "Your registration has been completed successfully!",
        });
      }, 1500);
    }
  };
  
  const formatPrice = (price: number) => {
    return `₦${price.toLocaleString()}`;
  };
  
  const downloadReceipt = () => {
    // In a real application, this would generate a PDF receipt
    toast({
      title: "Receipt Downloaded",
      description: "Your receipt has been downloaded successfully.",
    });
  };
  
  const restartRegistration = () => {
    setFormData(defaultFormData);
    setReceipt(null);
    setCurrentStep(1);
    navigate('/registration');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-elblue text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-4">Course Registration</h1>
            <p className="text-lg text-blue-100 max-w-3xl">
              Register for EL ACCESS 2.0 courses and start your journey to becoming a skilled programmer.
            </p>
          </div>
        </section>
        
        {/* Registration Form */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex flex-col items-center">
                    <div 
                      className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step 
                          ? 'bg-elblue text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-300'
                      }`}
                    >
                      {step}
                    </div>
                    <span 
                      className={`mt-2 text-xs ${
                        currentStep >= step 
                          ? 'text-elblue dark:text-elblue' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {step === 1 ? 'Personal Info' : step === 2 ? 'Course Selection' : step === 3 ? 'Payment' : 'Receipt'}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative">
                <div className="absolute top-0 left-0 h-1 bg-gray-200 dark:bg-gray-700 w-full"></div>
                <div 
                  className="absolute top-0 left-0 h-1 bg-elblue" 
                  style={{ width: `${(currentStep - 1) * 33.33}%` }}
                ></div>
              </div>
            </div>
            
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                <form>
                  <div className="mb-4">
                    <label htmlFor="fullName" className="block text-sm font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-foreground"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-foreground"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-foreground"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-foreground"
                      placeholder="Enter your address"
                    ></textarea>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-elblue text-white font-medium rounded-md hover:bg-blue-600 transition-colors hover-scale"
                    >
                      Next Step
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Step 2: Course Selection */}
            {currentStep === 2 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">Course Selection</h2>
                <form>
                  <div className="mb-4">
                    <label htmlFor="courseOrBundle" className="block text-sm font-medium mb-1">Select Course or Bundle</label>
                    <select
                      id="courseOrBundle"
                      name="courseOrBundle"
                      value={formData.courseOrBundle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-foreground"
                    >
                      <option value="">Select a Course or Bundle</option>
                      <optgroup label="Bundles">
                        <option value="Bundle: Python">Python Bundle - ₦30,000</option>
                        <option value="Bundle: JavaScript">JavaScript Bundle - ₦25,000</option>
                        <option value="Bundle: HTML/CSS">HTML/CSS Bundle - ₦10,000</option>
                        <option value="Bundle: Mobile Development">Mobile Development Bundle - ₦20,000</option>
                        <option value="Bundle: Frontend Development">Frontend Development Bundle - ₦10,000</option>
                        <option value="Bundle: Backend Development">Backend Development Bundle - ₦15,000</option>
                      </optgroup>
                      <optgroup label="Python Courses">
                        <option value="Course: Python Basics">Python Basics - ₦30,000</option>
                        <option value="Course: Data Structures and Algorithms">Data Structures and Algorithms - ₦30,000</option>
                        <option value="Course: Web Development with Python">Web Development with Python - ₦30,000</option>
                        <option value="Course: Data Analysis and Visualization">Data Analysis and Visualization - ₦30,000</option>
                        <option value="Course: Machine Learning with Python">Machine Learning with Python - ₦30,000</option>
                      </optgroup>
                      <optgroup label="JavaScript Courses">
                        <option value="Course: JavaScript Fundamentals">JavaScript Fundamentals - ₦25,000</option>
                        <option value="Course: Front-end Development with React">Front-end Development with React - ₦25,000</option>
                        <option value="Course: Back-end Development with Node.js">Back-end Development with Node.js - ₦25,000</option>
                        <option value="Course: Mobile App Development with React Native">Mobile App Development with React Native - ₦25,000</option>
                        <option value="Course: Advanced JavaScript Topics">Advanced JavaScript Topics - ₦25,000</option>
                      </optgroup>
                      <optgroup label="HTML/CSS Courses">
                        <option value="Course: HTML5 and CSS3 Basics">HTML5 and CSS3 Basics - ₦10,000</option>
                        <option value="Course: Responsive Web Design">Responsive Web Design - ₦10,000</option>
                        <option value="Course: UI/UX Design Principles">UI/UX Design Principles - ₦10,000</option>
                        <option value="Course: Web Development Best Practices">Web Development Best Practices - ₦10,000</option>
                        <option value="Course: CSS Preprocessors">CSS Preprocessors - ₦10,000</option>
                      </optgroup>
                      <optgroup label="More Courses">
                        <option value="Other">Other (Please specify in notes)</option>
                      </optgroup>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="referralCode" className="block text-sm font-medium mb-1">Referral Code (Optional)</label>
                    <input
                      type="text"
                      id="referralCode"
                      name="referralCode"
                      value={formData.referralCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-foreground"
                      placeholder="Enter referral code if you have one"
                    />
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 rounded-md mb-6">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                      <span className="font-bold">Note:</span> After completing this registration, you'll need to make payment to one of our bank 
                      accounts and provide the transaction details in the next step.
                    </p>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Previous Step
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-elblue text-white font-medium rounded-md hover:bg-blue-600 transition-colors hover-scale"
                    >
                      Next Step
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">Payment Information</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Bank Account Details</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <p className="font-semibold">Access Bank</p>
                        <p>Account Number: 1907856695</p>
                        <p>Account Name: Ebubechukwu Ifeanyi Elijah</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <p className="font-semibold">Stanbic IBTC</p>
                        <p>Account Number: 5190766096</p>
                        <p>Account Name: Ebubechukwu Ifeanyi</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <p className="font-semibold">Kuda MFB</p>
                        <p>Account Number: 2071073143</p>
                        <p>Account Name: Onoha Ifeanyichukwu Happiness</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="paymentMethod" className="block text-sm font-medium mb-1">Payment Bank</label>
                    <select
                      id="paymentMethod"
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-foreground"
                    >
                      <option value="Access Bank">Access Bank</option>
                      <option value="Stanbic IBTC">Stanbic IBTC</option>
                      <option value="Kuda MFB">Kuda MFB</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="transactionReference" className="block text-sm font-medium mb-1">Transaction Reference/ID</label>
                    <input
                      type="text"
                      id="transactionReference"
                      name="transactionReference"
                      value={formData.transactionReference}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-foreground"
                      placeholder="Enter transaction reference or ID"
                    />
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-400 p-4 rounded-md mb-6">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <span className="font-bold">Important:</span> Please make sure you've completed your payment before submitting this form.
                      Your registration will be verified against the payment details provided.
                    </p>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Previous Step
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-3 bg-elblue text-white font-medium rounded-md hover:bg-blue-600 transition-colors hover-scale ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Processing...' : 'Complete Registration'}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Step 4: Receipt */}
            {currentStep === 4 && receipt && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-scale-up">
                <div className="bg-elblue text-white py-4 px-6">
                  <h2 className="text-xl font-bold">Registration Receipt</h2>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receipt Number</p>
                      <p className="font-medium">{receipt.receiptNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                      <p className="font-medium">{receipt.date}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4 mb-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Student Name</p>
                        <p className="font-medium">{receipt.studentName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Course/Bundle</p>
                        <p className="font-medium">{receipt.courseName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Payment Method</p>
                        <p className="font-medium">{receipt.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Transaction Reference</p>
                        <p className="font-medium">{receipt.transactionReference}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-8">
                    <div className="text-lg font-bold">Total Amount</div>
                    <div className="text-2xl font-bold text-elblue">{formatPrice(receipt.amount)}</div>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-4 rounded-md mb-6">
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Your registration has been completed successfully! Please check your email for further instructions
                      on how to access your course materials.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={downloadReceipt}
                      className="px-6 py-3 bg-elblue text-white font-medium rounded-md hover:bg-blue-600 transition-colors hover-scale"
                    >
                      Download Receipt
                    </button>
                    <button
                      onClick={restartRegistration}
                      className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Register Another Course
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Registration;
