import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-24 lg:grid-cols-12 relative overflow-hidden">
        {/* Background Blur Effect */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-secondary/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-primary/40 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

        <div className="mr-auto place-self-center lg:col-span-7 z-10">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-gray-900">
            Unlock Your Potential with{" "}
            <span className="text-secondary">Expert-Led</span> Courses
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl">
            Master the latest skills in tech, design, and business. Learn from
            industry leaders and join a community of lifelong learners.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link
              href="#courses"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-secondary hover:bg-secondary/90 focus:ring-4 focus:ring-red-100 transition-transform hover:scale-105"
            >
              Explore Courses
              <ArrowRight className="ml-2 -mr-1 w-5 h-5" />
            </Link>
            <Link
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 transition-colors"
            >
              <PlayCircle className="mr-2 -ml-1 w-5 h-5" />
              View Mentors
            </Link>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex relative z-10">
          {/* Minimalist Abstract Illustration / Placeholder */}
          <div className="relative w-full h-full min-h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-8 shadow-2xl backdrop-blur-sm rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <span className="text-4xl text-white font-bold">Aa</span>
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-48 bg-gray-200 rounded-full mx-auto"></div>
                  <div className="h-4 w-32 bg-gray-200 rounded-full mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
