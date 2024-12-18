// import CategoryItem from "../components/CategoryItem"

// const categories = [
//   {href: "/vegetables", name: "Vegetables", image: "/category_vegetables.webp"},
//   {href: "/fruits", name: "Fruits", image: "/category_fruits.jpg"},
//   {href: "/meats", name: "Meat", image: "/category_meat.jpg"},
//   {href: "/dairy", name: "Dairy", image: "/category_dairy.jpg"}
// ]

// const HomePage = () => {
//   return (

//     <div>
//         <h1 className="text-center">
//           Категории продукти
//         </h1>
//         <div className="flex flex-row mx-5 gap-4">
//             {categories.map((category) => (
//                 <CategoryItem category = {category} key = {category.name} />  
//             ))}
//         </div>
//     </div>
//   )
// }

// export default HomePage
import CategoryItem from "../components/CategoryItem";

const categories = [
  { href: "/vegetables", name: "Vegetables", image: "/category_vegetables.webp" },
  { href: "/fruits", name: "Fruits", image: "/category_fruits.jpg" },
  { href: "/meats", name: "Meat", image: "/category_meat.jpg" },
  { href: "/dairy_eggs", name: "Dairy and Eggs", image: "/category_dairy.jpg" },
];

const HomePage = () => {
  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Product categories
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {categories.map((category) => (
          <CategoryItem category={category} key={category.name} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

