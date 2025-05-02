import React, { useState, Suspense, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Center, Float, PerspectiveCamera, useTexture, Sphere } from '@react-three/drei';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Check, Calendar, CreditCard, FileText, Mail, Copy, Timer, User, Clock, Loader } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import * as THREE from 'three';
import { generateRandomId } from '@/utils/id-generator';
import { PaymentTimer } from '@/components/PaymentTimer';
import { Receipt } from '@/components/Receipt';
import { Progress } from '@/components/ui/progress';

// 3D Components
const RotatingCubes = ({ count = 20, spread = 7 }) => {
  const meshes = useRef<THREE.Mesh[]>([]);
  const colors = [
    '#ff6b6b', '#ff9e7d', '#ffd166', 
    '#06d6a0', '#118ab2', '#073b4c',
    '#6a0572', '#ab83a1', '#7b2cbf',
    '#e63946', '#457b9d', '#f15bb5',
    '#bc6c25', '#ff006e', '#3a86ff'
  ];

  useFrame((state) => {
    for (let i = 0; i < meshes.current.length; i++) {
      const mesh = meshes.current[i];
      if (mesh) {
        const time = state.clock.getElapsedTime();
        mesh.rotation.x = Math.sin(time * 0.2 + i) * 0.5;
        mesh.rotation.y = Math.sin(time * 0.4 + i * 0.3) * 0.5;
        mesh.position.y = Math.sin(time * 0.5 + i) * 0.8;
        mesh.position.z = -5 + Math.sin(time * 0.3 + i * 0.2) * 2;
        // Pulsing scale effect
        const scale = 0.2 + Math.sin(time * 0.5 + i) * 0.05 + Math.random() * 0.3;
        mesh.scale.set(scale, scale, scale);
      }
    }
  });

  return Array.from({ length: count }).map((_, i) => {
    const shapeType = Math.floor(Math.random() * 3);
    return (
      <mesh
        key={i}
        ref={(el) => {
          if (el) {
            meshes.current[i] = el;
          }
        }}
        position={[
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * spread - 5,
        ]}
        scale={0.2 + Math.random() * 0.3}
      >
        {shapeType === 0 ? (
          <boxGeometry args={[1, 1, 1]} />
        ) : shapeType === 1 ? (
          <octahedronGeometry args={[0.8]} />
        ) : (
          <dodecahedronGeometry args={[0.7]} />
        )}
        <meshStandardMaterial 
          color={colors[i % colors.length]}
          metalness={0.8}
          roughness={0.2}
          emissive={colors[(i + 5) % colors.length]}
          emissiveIntensity={0.2}
        />
      </mesh>
    );
  });
};

const ParticleField = () => {
  const particles = useRef<THREE.Points>(null);
  const count = 500;
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 10;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (particles.current) {
      particles.current.rotation.y = time * 0.05;
      particles.current.rotation.x = time * 0.025;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.1} 
        color="#ffffff" 
        transparent 
        opacity={0.7} 
        sizeAttenuation 
      />
    </points>
  );
};

const FloatingLogo = () => {
  const mesh = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = time * 0.3;
      mesh.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={4} rotationIntensity={0.4} floatIntensity={0.8}>
      <Center ref={mesh}>
        <Text3D
          font="/fonts/inter_bold.json"
          size={0.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {"EL ACCESS 2.0"}
          <meshStandardMaterial 
            color="#3498db"
            metalness={0.9} 
            roughness={0.1}
            emissive="#1a73e8"
            emissiveIntensity={0.4}
          />
        </Text3D>
      </Center>
    </Float>
  );
};

// Main registration form component
const RegistrationForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [courseCategory, setCourseCategory] = useState('');
  const [course, setCourse] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [step, setStep] = useState('personal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState('');
  const [receiptData, setReceiptData] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [paymentStarted, setPaymentStarted] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentProgress, setPaymentProgress] = useState(0);

  // Generate UserId when component mounts
  useEffect(() => {
    setUserId(generateRandomId());
  }, []);

  // Payment progress effect
  useEffect(() => {
    let interval;
    
    if (processingPayment) {
      // Start with 0% progress
      setPaymentProgress(0);
      
      // Update progress every 300ms to complete in 30 seconds
      interval = setInterval(() => {
        setPaymentProgress(prev => {
          const newProgress = prev + (100 / (30000 / 300));
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 300);
      
      // Complete payment after 30 seconds
      const timer = setTimeout(() => {
        setProcessingPayment(false);
        completePayment();
      }, 30000);
      
      return () => {
        clearInterval(interval);
        clearTimeout(timer);
      };
    }
  }, [processingPayment]);

  // Course data organized by category
  const courseData = {
    python: {
      name: 'Python',
      bundlePrice: 'N30,000',
      courses: [
        { id: 'python-basics', name: 'Python Basics', price: 'N30,000' },
        { id: 'python-dsa', name: 'Data Structures and Algorithms', price: 'N30,000' },
        { id: 'python-web', name: 'Web Development with Python', price: 'N30,000' },
        { id: 'python-data', name: 'Data Analysis and Visualization', price: 'N30,000' },
        { id: 'python-ml', name: 'Machine Learning with Python', price: 'N30,000' },
      ]
    },
    javascript: {
      name: 'JavaScript',
      bundlePrice: 'N25,000',
      courses: [
        { id: 'js-fundamentals', name: 'JavaScript Fundamentals', price: 'N25,000' },
        { id: 'js-react', name: 'Front-end Development with React', price: 'N25,000' },
        { id: 'js-node', name: 'Back-end Development with Node.js', price: 'N25,000' },
        { id: 'js-react-native', name: 'Mobile App Development with React Native', price: 'N25,000' },
        { id: 'js-advanced', name: 'Advanced JavaScript Topics', price: 'N25,000' },
      ]
    },
    htmlcss: {
      name: 'HTML/CSS',
      bundlePrice: 'N10,000',
      courses: [
        { id: 'html-basics', name: 'HTML5 and CSS3 Basics', price: 'N10,000' },
        { id: 'html-responsive', name: 'Responsive Web Design', price: 'N10,000' },
        { id: 'html-uiux', name: 'UI/UX Design Principles', price: 'N10,000' },
        { id: 'html-best', name: 'Web Development Best Practices', price: 'N10,000' },
        { id: 'html-preprocessors', name: 'CSS Preprocessors', price: 'N10,000' },
      ]
    },
    mobile: {
      name: 'Mobile Development',
      bundlePrice: 'N20,000',
      courses: [
        { id: 'mobile-intro', name: 'Introduction to Mobile App Development', price: 'N20,000' },
        { id: 'mobile-android', name: 'Android App Development', price: 'N20,000' },
        { id: 'mobile-ios', name: 'iOS App Development with Swift', price: 'N20,000' },
        { id: 'mobile-cross', name: 'Cross-Platform Development', price: 'N20,000' },
        { id: 'mobile-design', name: 'Mobile App Design and UX', price: 'N20,000' },
      ]
    },
    frontend: {
      name: 'Frontend Development',
      bundlePrice: 'N10,000',
      courses: [
        { id: 'fe-html', name: 'HTML5 and CSS3 Basics', price: 'N10,000' },
        { id: 'fe-js', name: 'JavaScript Fundamentals', price: 'N10,000' },
        { id: 'fe-frameworks', name: 'Front-end Frameworks', price: 'N10,000' },
        { id: 'fe-responsive', name: 'Responsive Web Design', price: 'N10,000' },
        { id: 'fe-uiux', name: 'UI/UX Design Principles', price: 'N10,000' },
      ]
    },
    backend: {
      name: 'Backend Development',
      bundlePrice: 'N15,000',
      courses: [
        { id: 'be-intro', name: 'Introduction to Backend Development', price: 'N15,000' },
        { id: 'be-node', name: 'Node.js Fundamentals', price: 'N15,000' },
        { id: 'be-express', name: 'Express.js Framework', price: 'N15,000' },
        { id: 'be-mongo', name: 'Database Management with MongoDB', price: 'N15,000' },
        { id: 'be-rest', name: 'RESTful API Development', price: 'N15,000' },
      ]
    }
  };

  // Bank account details
  const bankAccounts = [
    { bank: 'Access Bank', number: '1907856695', name: 'Ebubechukwu Ifeanyi Elijah' },
    { bank: 'Stanbic IBTC', number: '5190766096', name: 'Ebubechukwu Ifeanyi' },
    { bank: 'Kuda MFB', number: '2071073143', name: 'Onoha Ifeanyichukwu Happiness' },
  ];

  // Handle start payment timer
  const startPaymentTimer = () => {
    if (!paymentStarted) {
      setPaymentStarted(true);
      setTimerExpired(false);
    }
  };

  // Handle timer expiry
  const handleTimerExpiry = () => {
    setTimerExpired(true);
    toast({
      variant: "destructive",
      title: "Payment Time Expired",
      description: "Your payment time has expired. Please restart the payment process.",
    });
  };

  // Reset payment timer
  const resetPaymentTimer = () => {
    setPaymentStarted(false);
    setTimerExpired(false);
  };

  // Complete payment after processing
  const completePayment = () => {
    // Create receipt data
    const selectedCourse = courseData[courseCategory]?.courses.find(c => c.id === course) || 
                         { name: `${courseData[courseCategory]?.name} Bundle`, price: courseData[courseCategory]?.bundlePrice };
    
    const receiptId = `R${Date.now().toString(36).toUpperCase()}`;
    const today = new Date();
    const receipt = {
      receiptId,
      userId,
      date: today.toISOString(),
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      course: selectedCourse.name,
      amount: selectedCourse.price,
      paymentMethod,
      status: "Completed",
      transactionId: `T${Date.now().toString(36).toUpperCase()}`
    };
    
    setIsSubmitting(false);
    setReceiptData(receipt);
    
    toast({
      title: "Registration Successful!",
      description: "Thank you for registering! Your receipt has been generated.",
    });
    
    // Reset form or redirect
    setStep('confirmation');
    setShowReceipt(true);
  };

  // Get course price
  const getCoursePrice = () => {
    if (!courseCategory || !course) return null;
    
    if (course.includes('-bundle')) {
      return courseData[courseCategory]?.bundlePrice;
    }
    
    const selectedCourse = courseData[courseCategory]?.courses.find(c => c.id === course);
    return selectedCourse?.price || null;
  };

  // Course selection or bundle selection based on category
  const getCourseOptions = () => {
    if (!courseCategory || !courseData[courseCategory]) {
      return <option value="">Select a category first</option>;
    }

    const category = courseData[courseCategory];
    return (
      <>
        <option value={`${courseCategory}-bundle`}>Complete Bundle: {category.bundlePrice}</option>
        {category.courses.map((course) => (
          <option key={course.id} value={course.id}>{course.name} - {course.price}</option>
        ))}
      </>
    );
  };

  // Handle copy user ID
  const copyUserId = () => {
    navigator.clipboard.writeText(userId);
    toast({
      description: "User ID copied to clipboard",
    });
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-indigo-950 dark:to-blue-950 
                    min-h-screen flex flex-col">
      <Navbar isDarkMode={false} toggleDarkMode={() => {}} />
      
      <div className="pt-16 pb-8 relative overflow-hidden">
        <div className="absolute -top-10 left-0 w-full h-80 bg-gradient-to-r from-blue-500/20 via-purple-500/30 to-indigo-500/20 blur-3xl transform -rotate-12 z-0" />
        
        <div className="w-full h-72 relative z-10">
          <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight intensity={1.2} position={[10, 10, 10]} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 0, 5]} />
              <FloatingLogo />
              <RotatingCubes count={20} />
              <ParticleField />
              <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.5} autoRotate autoRotateSpeed={0.5} />
            </Suspense>
          </Canvas>
        </div>
        
        <div className="mt-8 md:mt-10 relative z-20">
          <h1 className="text-4xl md:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-3 animate-pulse-light">
            Register for EL ACCESS 2.0
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto text-lg animate-fade-in">
            Join our comprehensive coding courses and transform your future with in-demand skills.
            Plus, earn money through our exclusive referral program!
          </p>
        </div>
      </div>
      
      <main className="flex-grow container mx-auto px-4 animate-fade-in relative z-20 mb-16">
        <Card className="max-w-3xl mx-auto border-0 shadow-xl bg-white/90 backdrop-blur-lg dark:bg-gray-800/90 overflow-hidden rounded-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Course Registration</CardTitle>
                <CardDescription className="text-blue-100">Fill out the form below to enroll in our courses</CardDescription>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-lg p-3">
                <div className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-100" />
                  <div>
                    <div className="text-xs text-blue-100">User ID</div>
                    <div className="flex items-center">
                      <span className="text-sm font-mono font-bold">{userId}</span>
                      <button 
                        onClick={copyUserId} 
                        className="ml-2 text-blue-100 hover:text-white"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <Tabs value={step} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="personal" onClick={() => setStep('personal')} disabled={isSubmitting || processingPayment}>
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-2 
                      ${step === 'personal' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
                    <span className="hidden sm:inline">Personal Info</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="course" onClick={() => setStep('course')} disabled={isSubmitting || processingPayment}>
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-2
                      ${step === 'course' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
                    <span className="hidden sm:inline">Course</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="payment" onClick={() => setStep('payment')} disabled={isSubmitting || processingPayment}>
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-2
                      ${step === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>3</div>
                    <span className="hidden sm:inline">Payment</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="confirmation" disabled={step !== 'confirmation'}>
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-2
                      ${step === 'confirmation' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>4</div>
                    <span className="hidden sm:inline">Complete</span>
                  </div>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal" className="mt-0 animate-scale-up">
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName"
                        placeholder="Enter your full name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone"
                        placeholder="e.g. 08012345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => setStep('course')}
                    disabled={!fullName || !email || !phone}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  >
                    Continue to Course Selection
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="course" className="mt-0 animate-scale-up">
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="courseCategory">Course Category</Label>
                      <Select value={courseCategory} onValueChange={setCourseCategory}>
                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="python">Python</SelectItem>
                          <SelectItem value="javascript">JavaScript</SelectItem>
                          <SelectItem value="htmlcss">HTML/CSS</SelectItem>
                          <SelectItem value="mobile">Mobile Development</SelectItem>
                          <SelectItem value="frontend">Frontend Development</SelectItem>
                          <SelectItem value="backend">Backend Development</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="course">Select Course or Bundle</Label>
                      <Select value={course} onValueChange={setCourse} disabled={!courseCategory}>
                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Select a course or bundle" />
                        </SelectTrigger>
                        <SelectContent>
                          {courseCategory && courseData[courseCategory]?.courses.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                              {c.name} - {c.price}
                            </SelectItem>
                          ))}
                          {courseCategory && (
                            <SelectItem value={`${courseCategory}-bundle`}>
                              Complete Bundle: {courseData[courseCategory]?.bundlePrice}
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {course && courseCategory && (
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h3 className="font-semibold text-blue-800 dark:text-blue-200 flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        Course Details
                      </h3>
                      <div className="mt-2 space-y-2">
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          <span className="font-semibold">Category:</span> {courseData[courseCategory]?.name}
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          <span className="font-semibold">Selection:</span> {
                            course.includes('-bundle') 
                              ? `Complete ${courseData[courseCategory]?.name} Bundle`
                              : courseData[courseCategory]?.courses.find(c => c.id === course)?.name
                          }
                        </p>
                        <p className="text-sm text-blue-700 dark:text-blue-300">
                          <span className="font-semibold">Price:</span> {getCoursePrice()}
                        </p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setStep('personal')}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep('payment')}
                      disabled={!courseCategory || !course}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="payment" className="mt-0 animate-scale-up">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {!paymentStarted ? (
                    <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 border border-yellow-200 dark:border-yellow-800 rounded-md">
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2 text-yellow-600 dark:text-yellow-400" />
                        <h3 className="font-medium text-yellow-800 dark:text-yellow-300">Payment Time Limit</h3>
                      </div>
                      <p className="mt-2 text-sm text-yellow-700 dark:text-yellow-400">
                        You will have 15 minutes to complete the payment once you start the payment process.
                      </p>
                      <Button
                        type="button"
                        onClick={startPaymentTimer}
                        className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white"
                      >
                        Start Payment Process
                      </Button>
                    </div>
                  ) : (
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 border border-blue-200 dark:border-blue-800 rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Timer className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                          <h3 className="font-medium text-blue-800 dark:text-blue-300">Payment Timer</h3>
                        </div>
                        <PaymentTimer 
                          duration={15 * 60} 
                          onExpire={handleTimerExpiry} 
                          expired={timerExpired}
                        />
                      </div>
                      {timerExpired && (
                        <div className="mt-3">
                          <p className="text-sm text-red-600 dark:text-red-400 mb-2">
                            Your payment time has expired. Please restart the payment process.
                          </p>
                          <Button
                            type="button"
                            onClick={resetPaymentTimer}
                            className="bg-red-500 hover:bg-red-600 text-white text-sm"
                          >
                            Restart Payment Process
                          </Button>
                        </div>
                      )}
                    </div>
                  )}

                  {processingPayment && (
                    <div className="bg-green-50 dark:bg-green-900/30 p-6 border border-green-200 dark:border-green-800 rounded-md">
                      <div className="text-center space-y-4">
                        <div className="flex justify-center">
                          <div className="animate-spin relative w-14 h-14 flex justify-center items-center">
                            <Loader className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                        <h3 className="text-lg font-medium text-green-800 dark:text-green-300">Processing Payment</h3>
                        <p className="text-sm text-green-700 dark:text-green-400">
                          Please wait while we process your payment. This should take about 30 seconds.
                        </p>
                        <div className="w-full mt-4">
                          <Progress value={paymentProgress} className="w-full h-2" />
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-green-600 dark:text-green-400">Starting</span>
                            <span className="text-xs text-green-600 dark:text-green-400">{Math.round(paymentProgress)}%</span>
                            <span className="text-xs text-green-600 dark:text-green-400">Complete</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div className="rounded-md bg-blue-50 dark:bg-blue-900/30 p-4 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
                        <h3 className="font-medium text-blue-800 dark:text-blue-300">Payment Details</h3>
                      </div>
                      <p className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                        Please complete your payment using one of the bank accounts below:
                      </p>
                    </div>
                    
                    <div className="space-y-4">
                      {bankAccounts.map((account, index) => (
                        <div
                          key={index}
                          className="border rounded-md p-4 bg-white dark:bg-gray-800 hover:shadow-md transition-all"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-800 dark:text-gray-100">{account.bank}</h4>
                              <div className="mt-1 space-y-1">
                                <p className="text-sm text-gray-600 dark:text-gray-400">Account Number: <span className="font-mono font-medium">{account.number}</span></p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Account Name: {account.name}</p>
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              onClick={() => {
                                navigator.clipboard.writeText(account.number);
                                toast({ description: "Account number copied to clipboard" });
                              }}
                            >
                              Copy
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod">Payment Method Used</Label>
                      <Select value={paymentMethod} onValueChange={setPaymentMethod} disabled={processingPayment}>
                        <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                          <SelectItem value="bank_deposit">Bank Deposit</SelectItem>
                          <SelectItem value="mobile_banking">Mobile Banking</SelectItem>
                          <SelectItem value="ussd">USSD Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="rounded-md bg-green-50 dark:bg-green-900/30 p-4 border border-green-200 dark:border-green-800">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800 dark:text-green-300">After Payment</h3>
                        <div className="mt-2 text-sm text-green-700 dark:text-green-400">
                          <p>Upon verification of your payment, we will:</p>
                          <ul className="list-disc list-inside space-y-1 mt-2">
                            <li>Send you a receipt via email</li>
                            <li>Provide access to your course materials</li>
                            <li>Send further instructions to get started</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep('course')}
                      disabled={isSubmitting || processingPayment}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={!paymentMethod || isSubmitting || timerExpired || !paymentStarted || processingPayment}
                      className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                    >
                      {isSubmitting || processingPayment ? (
                        <div className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {processingPayment ? "Processing..." : "Submitting..."}
                        </div>
                      ) : "Complete Registration"}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="confirmation" className="mt-0 animate-scale-up">
                <div className="text-center py-6">
                  <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/50 mx-auto flex items-center justify-center mb-4">
                    <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Registration Complete!</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Thank you for registering with EL ACCESS 2.0. We've sent the course details and 
                    payment receipt to your email address.
                  </p>
                  
                  <div className="mt-8 space-y-4">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">Next Steps</h4>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="border rounded-lg p-4 bg-blue-50 dark:bg-blue-900/20 hover:shadow-md transition-all">
                        <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400 mb-2" />
                        <h5 className="font-medium">Course Access</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Check your email for course access details
                        </p>
                      </div>
                      <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-900/20 hover:shadow-md transition-all">
                        <FileText className="h-6 w-6 text-green-600 dark:text-green-400 mb-2" />
                        <h5 className="font-medium">Receipt</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Your payment receipt has been generated
                        </p>
                        <Button 
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowReceipt(!showReceipt)}
                          className="mt-2 text-green-600 hover:text-green-700 text-sm"
                        >
                          {showReceipt ? 'Hide Receipt' : 'View Receipt'}
                        </Button>
                      </div>
                      <div className="border rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20 hover:shadow-md transition-all">
                        <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
                        <h5 className="font-medium">Support</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Contact support if you need any assistance
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {showReceipt && receiptData && (
                    <div className="mt-6">
                      <Receipt receiptData={receiptData} />
                    </div>
                  )}
                  
                  <div className="mt-10">
                    <Button
                      onClick={() => window.location.href = '/courses'}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                      Explore More Courses
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-6">
            <div className="text-center w-full">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Need help? Contact our support:
                <a href="mailto:elcoderssoftwares12@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                  elcoderssoftwares12@gmail.com
                </a>
                <span className="mx-2">|</span>
                <a href="https://wa.me/2348088578817" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  WhatsApp: 08088578817
                </a>
              </p>
            </div>
          </CardFooter>
        </Card>
        
        {/* Referral Program */}
        <div className="max-w-3xl mx-auto mt-12 mb-16">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 md:p-8 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 animate-fade-in">🔥 Turn Your Phone into a Money Machine! 💰</h2>
              <p className="mb-6 text-blue-100">
                With our exclusive referral program, you can earn while you learn!
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:shadow-xl transition-all">
                  <h3 className="font-semibold text-xl mb-2">1️⃣ Invite a Friend</h3>
                  <p className="text-sm text-blue-100">For every friend who registers, you earn ₦1,000 instantly!</p>
                  <div className="mt-3 text-sm bg-white/20 p-2 rounded">
                    <span className="font-bold">Example:</span> Invite 10 friends = ₦10,000 cash!
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg hover:shadow-xl transition-all">
                  <h3 className="font-semibold text-xl mb-2">2️⃣ Keep Earning Monthly</h3>
                  <p className="text-sm text-blue-100">When your referrals make their 2nd bi-weekly payment, you'll earn 50% of that payment EVERY MONTH!</p>
                  <div className="mt-3 text-sm bg-white/20 p-2 rounded">
                    <span className="font-bold">Example:</span> 5 friends = ₦5,000 instantly + ₦10,000 monthly
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <a 
                  href="https://wa.me/2348088578817?text=I'm%20interested%20in%20the%20EL%20ACCESS%20referral%20program!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-indigo-700 font-bold py-3 px-6 rounded-full shadow-md hover:bg-blue-50 transition-all duration-300 hover:scale-105 transform"
                >
                  Get Your Referral Code Now!
                </a>
                
                <p className="mt-4 text-sm text-blue-100">
                  Don't miss out on this opportunity to Learn 📚, Earn 💸, and Level Up 🚀!
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 py-3 px-6 text-center">
              <p className="text-white font-medium">Money + Education = EL ACCESS! 🔥💰📱📚</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RegistrationForm;
