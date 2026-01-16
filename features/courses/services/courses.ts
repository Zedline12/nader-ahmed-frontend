export interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  imagePlaceholder: string;
  category: string;
}

export const MOCK_COURSES: Course[] = [
  {
    id: "1",
    title: "Complete Web Development Bootcamp",
    description:
      "Master HTML, CSS, JavaScript, and React in this comprehensive bootcamp designed for beginners to advanced learners.",
    price: 49.99,
    imagePlaceholder: "/course-1.jpg",
    category: "Development",
  },
  {
    id: "2",
    title: "Advanced UI/UX Design Masterclass",
    description:
      "Learn to design beautiful, user-friendly interfaces with Figma and modern design principles.",
    price: 59.99,
    imagePlaceholder: "/course-2.jpg",
    category: "Design",
  },
  {
    id: "3",
    title: "Python for Data Science and Machine Learning",
    description:
      "Dive into data science with Python, Pandas, Scikit-Learn, and TensorFlow.",
    price: 69.99,
    imagePlaceholder: "/course-3.jpg",
    category: "Data Science",
  },
  {
    id: "4",
    title: "Digital Marketing Mastery 2024",
    description:
      "Become a digital marketing expert. Learn SEO, Social Media Marketing, and Email Strategy.",
    price: 39.99,
    imagePlaceholder: "/course-4.jpg",
    category: "Marketing",
  },
];

export const getCourses = async (): Promise<Course[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  return MOCK_COURSES;
};
