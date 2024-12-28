import Link from "next/link";

export default async function TagesPage() {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Tags</h1>
        <Link
          href="/tags/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Tag
        </Link>
      </div>
      {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5">
        {tags.map((tag) => (
          <TagCard key={tag.id} tag={tag} />
        ))}
      </div> */}
    </div>
  );
}
