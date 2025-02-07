import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navbar: {
        home: 'Home',
        about: 'About Us',
        courses: 'Courses',
        instructors: 'Our Instructors',
        language: 'English',
        logo: '<em>SCI</em>CODE ',
        login: 'Login',
       logout: 'Logout',
       game: 'game',
       dashboard:"Dashboard",


        register: 'Register',
      },
      hero: {
        welcome: 'Welcome we are ',
        book_now: 'Book Now',
        contact_us: 'Contact Us',
        discover_more: 'Discover more',
        company_name: "<em>SCI</em>CODE<em> Academy</em> "
      },
      featured: {
        card1_title: "All Courses",
        card1_description: "Explore a variety of courses designed to expand your knowledge and skills. Learn at your own pace with expert instructors.",
        card2_title: "Virtual Class",
        card2_description: "Join live, interactive classes from anywhere. Engage with instructors and fellow students in real-time.",
        card3_title: "Real Meeting",
        card3_description: "Meet with instructors and peers in person to discuss course material and engage in collaborative learning."
      },
      about: {
        heading: 'About Us',
        mission_title: 'Our Mission',
        mission_description: 'Our mission is to make learning Computer Science and Science accessible, engaging, and practical for everyone. We are committed to preparing students to tackle real-world challenges through hands-on experiences and up-to-date knowledge.',
        offer_title: 'What We Offer',
        offer_description: 'Explore a variety of programs in Computer Science and Science.',
        offer_list: [
          "Computer Science Programs: Learn everything from programming basics to advanced fields like AI, machine learning, and data Science.",
          "Science Programs: Explore classical mechanics, quantum Science, and more, preparing students for careers in research and engineering."
        ]
      },
      courses: {
        heading: 'Our Courses',
        description: 'Discover our courses that cover a wide range of topics, including Science fundamentals, programming basics, frontend development, backend development, and more!',
        course1: {
          title: "Science Fundamentals",
          description: "Master the basics of Science with this comprehensive course, covering topics from classical mechanics to modern Science principles.",
          technologies: [
            "Classical Mechanics",
            "Electromagnetism",
            "Quantum Science",
            "Relativity"
          ],
          features: [
            "In-depth explanations of fundamental Science concepts.",
            "Hands-on experiments and simulations.",
            "Quizzes to test your understanding.",
            "Access to a community of Science enthusiasts."
          ]
        },
        course2: {
          title: "Programming Basics",
          description: "Learn programming from scratch with easy-to-follow lessons covering variables, data types, control structures, and algorithms.",
          technologies: [
            "Variables",
            "Data Types",
            "Control Structures",
            "Algorithms"
          ],
          features: [
            "Step-by-step tutorials for beginners.",
            "Projects to build your first applications.",
            "Interactive coding exercises.",
            "Code review and feedback from instructors."
          ]
        },
        course3: {
          title: "Frontend Development",
          description: "Build modern, responsive websites using HTML, CSS, and JavaScript. Learn best practices for user interface design and interactivity.",
          technologies: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "Responsive Design",
            "UI/UX Principles"
          ],
          features: [
            "Learn the basics of HTML5, CSS3, and JavaScript.",
            "Understand responsive web design techniques.",
            "Build real-world web projects.",
            "Learn about UI/UX design principles."
          ]
        },
        course4: {
          title: "Backend Development",
          description: "Dive into server-side programming with Node.js, PHP, and more. Understand how to create powerful web servers and APIs.",
          technologies: [
            "Node.js",
            "PHP",
            "SQL Databases",
            "NoSQL Databases",
            "APIs"
          ],
          features: [
            "Master server-side programming with Node.js and PHP.",
            "Learn how to work with databases (SQL & NoSQL).",
            "Build APIs and integrate third-party services.",
            "Secure your backend applications."
          ]
        },
        course5: {
          title: "Arduino Programming",
          description: "Learn to program microcontrollers and build smart projects using Arduino. Perfect for beginners and electronics enthusiasts.",
          technologies: [
            "Arduino IDE",
            "Microcontrollers",
            "Sensors",
            "Actuators",
            "Basic Electronics"
          ],
          features: [
            "Introduction to Arduino hardware and software.",
            "Build hands-on projects like smart lights and sensors.",
            "Learn basic electronics and circuit design.",
            "Explore sensor and actuator integration."
          ]
        },
        course6: {
          title: "Artificial Intelligence",
          description: "Get started with machine learning and AI techniques. Understand algorithms like decision trees, neural networks, and deep learning.",
          technologies: [
            "Machine Learning",
            "Neural Networks",
            "Deep Learning",
            "TensorFlow",
            "Keras"
          ],
          features: [
            "Learn core machine learning algorithms.",
            "Understand deep learning and neural networks.",
            "Work with real-world datasets.",
            "Implement AI models using Python."
          ]
        }
      },
      instructors: {
        heading: 'Our Instructors',
        description: 'Meet our experienced instructors who are passionate about teaching and helping students succeed in their computer Science and Science programs.',
       showcv:" show cv",
        instructor1: {
          name: "Karem Mahmoud",
          bio: "Full stack web developer and instructor in software engineering"
        },
        instructor2: {
          name: "Shady Mahmoud",
          bio: "Front End web developer and instructor in software engineering"
        },
        instructor3: {
          name: "Mr Mohamed AbdElsamiee",
          bio: "Senior and supervisor of the teaching staff, Department of Physics"
        },
        instructor4: {
          name: "Jana  Mostafa",
          bio: "UI/UX developer, UI/UX designer, marketer"
        }
      },
      comming:{
        heading: 'Coming Soon',
        title:"Take <em>any online course</em> by <span className='text-yellow-500'>500LE</span> only",
        days:"days",
        weeks:"weeks",
        months:"months",
        years:"years",
        hours:"hours",
        minutes:"minutes",
        seconds:"seconds",
        button:"Book Now",
      },
      rating:{
        heading:"rating",
        description:"look at our rating",
        delete:"delete", 
        placeholder:"placeholder",
        submit:"submit"
      }
    }
  },
  ar: {
    translation: {
      navbar: {
        home: 'الرئيسية',
        about: 'حولنا',
        courses: 'الدورات',
        instructors: 'مدربونا',
        language: 'العربية',
        logo: '<em>ساي</em>-كود',
        login: 'تسجيل الدخول',
       logout: 'تسجيل الخروج',
       game: ' اللعبة',
       dashboard: 'لوحة التحكم',

        register: 'انشاء حساب'
      },
      hero: {
        welcome: 'مرحبًا بكم نحن ',
        book_now: 'احجز الآن',
        contact_us: 'اتصل بنا',
        discover_more: 'اكتشف المزيد',
        company_name: "  اكاديمية <em>ساي</em>-كود"
      },
      featured: {
        card1_title: "جميع الدورات",
        card1_description: "اكتشف مجموعة متنوعة من الدورات التي تهدف إلى توسيع معرفتك ومهاراتك. تعلم وفقًا لسرعتك مع المدربين الخبراء.",
        card2_title: "الصفوف الافتراضية",
        card2_description: "انضم إلى الصفوف التفاعلية المباشرة من أي مكان. تفاعل مع المدربين وزملائك في الوقت الفعلي.",
        card3_title: "الاجتماعات الحقيقية",
        card3_description: "اجتمع مع المدربين والزملاء شخصيًا لمناقشة المواد الدراسية والمشاركة في التعلم التعاوني."
      },
      about: {
        heading: 'من نحن',
        mission_title: 'مهمتنا',
        mission_description: 'مهمتنا هي جعل تعلم علوم الكمبيوتر والعلوم أمرًا سهلاً وجذابًا وعملية للجميع. نحن ملتزمون بإعداد الطلاب لمواجهة التحديات الواقعية من خلال التجارب العملية والمعرفة الحديثة.',
        offer_title: 'ما نقدمه',
        offer_description: 'استكشف مجموعة متنوعة من البرامج في علوم الكمبيوتر والعلوم.',
        offer_list: [
          "برامج علوم الكمبيوتر: تعلم كل شيء من أساسيات البرمجة إلى المجالات المتقدمة مثل الذكاء الاصطناعي، التعلم الآلي، وعلم البيانات.",
          "برامج العلوم: استكشف الميكانيكا الكلاسيكية، العلوم الكمومية، وأكثر، مما يعد الطلاب لمهن في البحث والهندسة."
        ]
      },
      courses: {
        heading: 'الدورات',
        description: 'اكتشف دوراتنا التي تغطي مجموعة واسعة من المواضيع، بما في ذلك أساسيات العلوم، وأساسيات البرمجة، وتطوير الواجهة الأمامية، وتطوير الواجهة الخلفية، والمزيد!',
        course1: {
          title: "أساسيات العلوم",
          description: "تعلم أساسيات العلوم من خلال هذه الدورة الشاملة التي تغطي مواضيع من الميكانيكا الكلاسيكية إلى المبادئ الحديثة للعلوم.",
          technologies: [
            "الميكانيكا الكلاسيكية",
            "الكهرومغناطيسية",
            "العلوم الكمومية",
            "النسبية"
          ],
          features: [
            "شرح مفصل للمفاهيم الأساسية في العلوم.",
            "تجارب عملية ومحاكاة.",
            "اختبارات لفحص مدى فهمك.",
            "الوصول إلى مجتمع من عشاق العلوم."
          ]
        },
        course2: {
          title: "أساسيات البرمجة",
          description: "تعلم البرمجة من الصفر من خلال دروس سهلة الفهم تغطي المتغيرات، الأنواع البيانات، الهياكل التحكمية، والخوارزميات.",
          technologies: [
            "المتغيرات",
            "أنواع البيانات",
            "الهياكل التحكمية",
            "الخوارزميات"
          ],
          features: [
            "دروس خطوة بخطوة للمبتدئين.",
            "مشاريع لبناء تطبيقاتك الأولى.",
            "تمارين تفاعلية للبرمجة.",
            "مراجعة الشيفرة البرمجية وتعليقات من المدربين."
          ]
        },
        course3: {
          title: "تطوير الواجهة الأمامية",
          description: "أنشئ مواقع ويب حديثة ومتجاوبة باستخدام HTML وCSS وJavaScript. تعلم أفضل الممارسات لتصميم واجهات المستخدم والتفاعل.",
          technologies: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "التصميم المتجاوب",
            "مبادئ تصميم واجهات المستخدم"
          ],
          features: [
            "تعلم أساسيات HTML5 وCSS3 وJavaScript.",
            "فهم تقنيات تصميم الويب المتجاوب.",
            "بناء مشاريع ويب حقيقية.",
            "تعلم عن مبادئ تصميم واجهات المستخدم."
          ]
        },
        course4: {
          title: "تطوير الواجهة الخلفية",
          description: "استمتع بالبرمجة من جانب الخادم باستخدام Node.js وPHP والمزيد. تعلم كيفية إنشاء خوادم ويب قوية وAPIs.",
          technologies: [
            "Node.js",
            "PHP",
            "قواعد البيانات SQL",
            "قواعد البيانات NoSQL",
            "APIs"
          ],
          features: [
            "إتقان البرمجة من جانب الخادم باستخدام Node.js وPHP.",
            "تعلم كيفية العمل مع قواعد البيانات (SQL وNoSQL).",
            "بناء APIs ودمج الخدمات الخارجية.",
            "تأمين تطبيقاتك الخلفية."
          ]
        },
        course5: {
          title: "برمجة Arduino",
          description: "تعلم برمجة الميكروكنترولر وبناء المشاريع الذكية باستخدام Arduino. مثالي للمبتدئين وعشاق الإلكترونيات.",
          technologies: [
            "Arduino IDE",
            "الميكروكنترولر",
            "المستشعرات",
            "المشغلات",
            "الإلكترونيات الأساسية"
          ],
          features: [
            "مقدمة في أجهزة وبرمجيات Arduino.",
            "بناء مشاريع عملية مثل الأضواء الذكية والمستشعرات.",
            "تعلم الإلكترونيات الأساسية وتصميم الدوائر.",
            "استكشاف دمج المستشعرات والمشغلات."
          ]
        },
        course6: {
          title: "الذكاء الاصطناعي",
          description: "ابدأ مع تعلم الآلة وتقنيات الذكاء الاصطناعي. فهم الخوارزميات مثل الأشجار القرار والشبكات العصبية والتعلم العميق.",
          technologies: [
            "تعلم الآلة",
            "الشبكات العصبية",
            "التعلم العميق",
            "TensorFlow",
            "Keras"
          ],
          features: [
            "تعلم الخوارزميات الأساسية لتعلم الآلة.",
            "فهم التعلم العميق والشبكات العصبية.",
            "العمل مع مجموعات بيانات حقيقية.",
            "تنفيذ نماذج الذكاء الاصطناعي باستخدام Python."
          ]
        }
      },
      instructors: {
        heading: 'Our Instructors',
        description: "تعرف على مدرسينا ذوي الخبرة الذين لديهم شغف بالتدريس ومساعدة الطلاب على النجاح في برامج علوم الكمبيوتر والعلوم.",
        showcv:"عرض السيره",
        instructor1: {
          name: "كارم محمود",
          bio: "مطور ويب متكامل ومدرس في هندسة البرمجيات"
        },
        instructor2: {
          name: "شادي محمود",
          bio: "مطور واجهات الويب الأمامية ومدرس في هندسة البرمجيات"
        },
        instructor3: {
          name: "أ. محمد عبد السميع",
          bio: "مدير ومسؤول عن فريق التدريس، قسم الفيزياء"
        },
        instructor4: {
          name: "جنى مصطفى",
          bio: "مطور واجهات المستخدم، مصمم واجهات المستخدم، مسوق"
        }
      },
      comming:{
        heading: 'القادم',
        title:"احجز أي دورة تدريبية الان ب  <span className='text-yellow-500'>500 جنيه مصري</span> فقط",
        days:"ايام",
        weeks:"اسابيع",
        months:"شهور",
        years:"سنوات",
        hours:"ساعات",
        minutes:"دقايق",
        seconds:"ثواني",
        button:" احجز الان",
      },
      rating:{
        heading:"تقيماتنا",
        description:"انظر حول تقيماتنا" ,
        delete:"حذف",
        placeholder:"اترك لنا رساله",
        submit:"ارسل",
        average:"متوسط",
        total:"المجموع",
        reviews:"التعليقات",
        stars:"النجوم",
      }
    }

    


  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
