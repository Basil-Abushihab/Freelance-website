"use client";

const categories = [
  { name: "UI Design", image: "/img/1.jpeg" },
  { name: "UX Design", image: "/img/2.jpeg" },
  { name: "Graphic Design", image: "/img/3.jpeg" },
];

export default function CategoriesSection() {
  return (
    <section className="container mx-auto px-24 py-16">
      <h2 className="text-3xl font-bold mb-8">
        Find Freelance Jobs that
        <br />
        you'll actually love
      </h2>
      <p className="text-gray-600 mb-12">
        Join a network of over 40,000 freelancers that are finding work they
        love and making a great living
      </p>

      <div className="grid grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.name} className="relative group cursor-pointer">
            <img
              src={category.image}
              alt={category.name}
              className="rounded-lg shadow-lg w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg"></div>
            <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
