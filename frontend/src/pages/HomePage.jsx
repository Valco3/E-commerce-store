
import CategoryItem from "../components/CategoryItem";
import Snowfall from "react-snowfall";

const categories = [
  { href: "/vegetables", name: "Зеленчуци", image: "/category_vegetables.jpg" },
  { href: "/fruits", name: "Плодове", image: "/category_fruits.jpg" },
  { href: "/meats", name: "Месни продукти", image: "/category_meat.jpg" },
  { href: "/dairy_eggs", name: "Млечни продукти и яйца", image: "/category_dairy.jpg" },
  {href: "/jams", name: "Сладка", image: "jams.jpg"},
  // {href: }
];

const HomePage = () => {
  return (
    <div className="flex flex-col items-center py-8">
      <Snowfall style={{ position: "absolute", zIndex: 2, top: 0, left: 0, width: "100%", height: "100%" }} />
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Категории продукти
      </h1>
      <div className="flex flex-wrap mb-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Зимен сезон
        </h1>
        <img className="ml-10 size-14" src="snowman.png"></img>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {categories.map((category) => (
          <CategoryItem category={category} key={category.name} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

// import React from "react";
// import CategoryItem from "../components/CategoryItem";
// import Snowfall from "react-snowfall"; // Install this library using: npm install react-snowfall

// const categories = [
//   { href: "/vegetables", name: "Vegetables", image: "/category_vegetables.webp" },
//   { href: "/fruits", name: "Fruits", image: "/category_fruits.jpg" },
//   { href: "/meats", name: "Meat", image: "/category_meat.jpg" },
//   { href: "/dairy_eggs", name: "Dairy and Eggs", image: "/category_dairy.jpg" },
//   { href: "/jams", name: "Jams", image: "jams.jpg" },
// ];

// const HomePage = () => {
//   return (
//     <div className="relative">
//       {/* Snowfall Effect */}
//       <Snowfall style={{ position: "absolute", zIndex: -1, top: 0, left: 0, width: "100%", height: "100%" }} />

//       {/* Content */}
//       <div className="flex flex-col items-center py-8 relative z-10">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">Product categories</h1>
//         <div className="flex flex-wrap mb-10">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">Winter season</h1>
//           <img className="ml-10 size-14" src="snowman.png" alt="Snowman" />
//         </div>
//         <div className="flex flex-wrap justify-center gap-8">
//           {categories.map((category) => (
//             <CategoryItem category={category} key={category.name} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
