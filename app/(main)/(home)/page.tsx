import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";
import Hero from "../../../features/home/components/Hero";
import CoursesGrid from "../../../components/CoursesGrid";
import { getCourses } from "../../../features/courses/services/courses";
import FeaturedProductsGrid from "@/features/products/featuredProductsGrid/FeaturedProductsGrid";
import { fetchWithToken } from "@/lib/fetcher";

export default async function Home() {
  const courses = await fetchWithToken(`/courses`);
  const coursesData = await courses.json().then(d=>d.data);
  return (
    <main className="min-h-screen bg-white pt-16">
      <NavBar />
      <Hero />
      <CoursesGrid courses={coursesData} />
        <div className="text-center mb-16">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            Featured <span className="text-secondary">Products</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-500 md:text-lg">
            Check out our top selected lifestyle products.
          </p>
        </div>
       <FeaturedProductsGrid />
      <Footer />
    </main>
  );
  
}
