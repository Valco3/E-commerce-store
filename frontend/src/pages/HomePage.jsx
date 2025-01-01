
import CategoryItem from "../components/CategoryItem";
import Snowfall from "react-snowfall";
import { useUserStore } from "../stores/useUserStore";

const categories = [
  { href: "/fruits", name: "Плодове", image: "/category_fruits.jpg" },
  { href: "/jams", name: "Сладка", image: "category_jams.jpeg" },
  { href: "/nuts", name: "Ядки", image: "category_nuts.jpg" },
  // {href: "/wines", name: "Вина", image: "category_wines.jpg"},
  // {href: }
];

const HomePage = () => {
  const { season } = useUserStore();
  return (
    <div className="flex flex-col items-center py-8">
      {season === "winter" && (
        <div>
          <Snowfall
            style={{
              position: "absolute",
              zIndex: 51,
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
          <div className="flex flex-wrap mb-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Зимен сезон
            </h1>
            <img className="ml-10 size-14" src="snowman.png" alt="Snowman" />
          </div>
        </div>
      )}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Категории продукти
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
