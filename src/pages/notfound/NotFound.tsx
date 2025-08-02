import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  React.useEffect(() => {
    document.title = "404 - Page Not Found";
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Oops! The page you're looking for doesn't exist."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Oops! The page you're looking for doesn't exist.";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(https://img.freepik.com/premium-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg)`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex flex-col items-center justify-center h-full text-white text-center p-4">
        <h2 className="mt-4 text-3xl md:text-7xl font-medium animate-bounce">
          Page Not Found
        </h2>
        <p className="text-lg md:text-2xl mb-2 py-4 font-oswald tracking-wide">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link to="/">
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-300">
            Back to Home
          </button>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
