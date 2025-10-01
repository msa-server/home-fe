type Series = {
    tagId: number;
    tagName: string;
    count: number | null;
}

// 서버에서 시리즈 정보 받아오기
async function fetchCategories(): Promise<Series[]> {
  const res = await fetch(`http:/localhost:9000/v1/tags`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to load categories");
  }
  return res.json();
}

export default async function Sidebar() {
  const categories = await fetchCategories();

  const total = categories.reduce((sum, c) => sum + (c.count ?? 0), 0);

  return (
    <div>
      <h3 className="font-bold mb-4">
        Tag List
      </h3>

      <ul className="space-y-3 text-sm overflow-y-auto max-h-[500px] pr-2">
        {categories.map((c) => (
          <li key={c.tagName} className="space-y-1">
            <div className="font-medium">
              {c.tagName} ({c.count})
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}

Sidebar.Skeleton = function SidebarSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-5 w-40 bg-gray-200 rounded" />
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-4 w-48 bg-gray-200 rounded" />
      ))}
    </div>
  );
};
