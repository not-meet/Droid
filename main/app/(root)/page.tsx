"use client";
import { SignedIn, UserButton } from "@clerk/nextjs";
import React from "react";
import { useRouter } from "next/navigation";
import Modal from "../components/modal"; // Adjust the import path based on your project structure

const Home = () => {
  const router = useRouter();

  // Careers data for the modals
  const careers = [
    {
      title: "Software Engineer",
      description: "Explore a career in software engineering.",
      buttonLabel: "Learn More",
    },
    {
      title: "Data Scientist",
      description: "Discover the world of data science.",
      buttonLabel: "Learn More",
    },
    {
      title: "Product Manager",
      description: "Learn about managing innovative products.",
      buttonLabel: "Learn More",
    },
    {
      title: "UI/UX Designer",
      description: "Dive into creative design opportunities.",
      buttonLabel: "Learn More",
    },
  ];

  return (
    <>
      {/* Banner Section */}
      <div
        className="relative w-full h-[50vh] bg-cover bg-center shadow-lg flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/home-banner.png')",
        }}
      >
        <SignedIn>
          <div className="absolute top-4 right-4">
            <UserButton />
          </div>
        </SignedIn>

        {/* Banner Heading */}
        <h1 className="text-5xl font-bold text-gray-100">
          Welcome to Your Career Guide
        </h1>
      </div>

      {/* Career Modals Section */}
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {careers.map((career, index) => (
          <div key={career.title} className="flex justify-center">
            <Modal
              key={index}
              title={career.title}
              description={career.description}
              buttonLabel={career.buttonLabel}
              onButtonClick={() => router.push("/chat")}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
