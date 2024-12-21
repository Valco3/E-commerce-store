import { Link } from "react-router-dom";
const CategoryItem = ({ category }) => {
    return (
      <Link to={"/category" + category.href} className="flex flex-col items-center bg-gray-100 shadow-md rounded-lg overflow-hidden w-64 h-80 border-2 border-transparent hover:border-blue-600 transition-all duration-300">
                <img
          src={category.image}
          alt={category.name}
          className="w-full h-48 object-cover"
        />
        <div className="flex flex-col items-center justify-center p-2">
          <h2 className="text-xl font-bold text-gray-800">{category.name}</h2>
        </div>
      </Link>
    );
  };
  
  export default CategoryItem;
  