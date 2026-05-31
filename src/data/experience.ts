import type { ExperienceEntry } from '@/lib/types'

export const experience: ExperienceEntry[] = [
  {
    role: 'Senior Team Lead',
    company: 'Technoboost Services Private Limited',
    period: 'Apr 2022 – Present',
    location: 'Bangalore, Karnataka, India',
    current: true,
    bullets: [
      'Lead a team of 15 developers building scalable, distributed backend microservices in Java and Spring Boot, including a large-scale platform for a major jewelry client processing ~100,000 transactions per day.',
      'Architected a 5-microservice system with RESTful APIs and optimised PostgreSQL interactions, sustaining 98.2% uptime while reducing latency and improving overall application performance.',
      'Established engineering best practices — CI/CD pipelines, unit testing, and structured code reviews — to ensure high-quality, reliable deliverables across the team.',
      'Partner with cross-functional teams to translate complex business requirements into technical specifications and roadmap planning.',
    ],
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'AWS', 'Python', 'Microservices'],
  },
  {
    role: 'Senior Java Developer',
    company: 'TrueVisual',
    period: 'Feb 2018 – Mar 2022',
    location: 'Bengaluru, India',
    bullets: [
      'Spearheaded the development of core web applications using Java, Spring MVC, and Thymeleaf.',
      'Designed and implemented RESTful Web Services to support third-party integrations and internal data flow.',
      'Optimised Hibernate data layers to handle high-volume transactions efficiently.',
      'Migrated legacy codebases to modern Spring Boot architectures, improving maintainability and deployment speed.',
    ],
    tech: ['Java', 'Spring Boot', 'Spring MVC', 'Hibernate', 'MySQL', 'PostgreSQL', 'AWS'],
  },
  {
    role: 'Junior Java Developer',
    company: 'CinivuComicsNFT',
    period: 'Jul 2017 – Jan 2018',
    location: 'Bengaluru, India',
    bullets: [
      'Developed backend components for web applications using Spring Boot, ensuring seamless data flow and high availability.',
      'Designed and documented RESTful Web Services to support frontend integration and mobile app connectivity.',
      'Participated in the full software development lifecycle, including requirements gathering, coding, and unit testing.',
      'Collaborated with senior developers to troubleshoot issues and optimise code performance.',
    ],
    tech: ['Spring Boot', 'Hibernate', 'REST APIs'],
  },
  {
    role: 'Java Developer Intern',
    company: 'CinivuComicsNFT',
    period: 'Jan 2017 – Jun 2017',
    location: 'Bengaluru, India',
    bullets: [
      'Gained hands-on experience in Core Java and backend development fundamentals.',
      'Assisted in building and testing REST APIs, learning industry standards for API design.',
      'Worked with version control (Git) and participated in daily stand-ups to track project progress.',
      'Contributed to bug fixing and code refactoring tasks to improve application stability.',
    ],
    tech: ['Core Java', 'REST APIs', 'Git'],
  },
  {
    role: 'Assistant Trainer',
    company: 'RCPL (Ritusha Consultants Pvt. Ltd.)',
    period: 'May 2016 – Jul 2016',
    location: 'Kolkata, West Bengal, India',
    bullets: [
      'Mentored students and professionals on Core Java and J2EE concepts, translating complex technical topics into approachable lessons.',
      'Conducted practical lab sessions focused on Maven build tools and Apache Tomcat server configuration.',
      'Assisted in evaluating student projects and code assignments to enforce best coding practices.',
    ],
    tech: ['Core Java', 'J2EE', 'Maven', 'Tomcat'],
  },
]

export const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'National Institute of Technology, Raipur',
    period: '2014 – 2017',
    notes: 'Specialised in Object-Oriented Programming and Software Engineering, with a focus on backend system architecture.',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Sikkim Manipal University',
    period: '2010 – 2013',
    notes: '',
  },
]
