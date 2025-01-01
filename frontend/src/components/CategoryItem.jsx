
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <Link
      to={"/category" + category.href}
      className="flex flex-col items-center bg-gray-100 shadow-md rounded-lg overflow-hidden w-64 h-70 border-2 border-transparent hover:border-blue-300 transition-all duration-300 ease-in-out transform "
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="flex flex-col items-center justify-center p-4 space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">{category.name}</h2>
      </div>
    </Link>
  );
};

export default CategoryItem;
