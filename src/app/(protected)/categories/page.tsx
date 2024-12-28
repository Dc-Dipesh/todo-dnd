import { getCategories } from "@/app/actions/category";
import { CategoryCard } from "@/components/category/CategoryCard";
import Link from "next/link";

export default async function CategoryPage() {
  const categories = await getCategories();
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <Link
          href="/categories/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Category
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
