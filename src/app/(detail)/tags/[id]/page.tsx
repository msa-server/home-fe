import { TagDetail } from "@/types/tags";
// import styles from "@/styles/Divider.module.css"

async function fetchTag(id: string): Promise<TagDetail> {
    const res = await fetch("http://localhost:9000/v1/tags/" + id, { cache: "no-store", method: "GET" });
    if (!res.ok) throw new Error("시리즈 정보 불러오지 못했습니다.");
    const all: TagDetail = await res.json();
    
    return all;
}

export default async function TagsDetailView({
  params,
}: { params: { id: string } }) {

  const { id } = await params; 
  const tagInfo = await fetchTag(id);

  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <section className="text-center select-none">
        <h1 className="text-5xl font-bold tracking-tight">{tagInfo.tagName}</h1>
        <div className=".divider" aria-hidden="true" />
        <p className="mt-3 text-gray-600">공부한 내용을 정리합니다</p>
      </section>
    </main>
  );
}
