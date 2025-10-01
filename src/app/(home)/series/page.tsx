import SeriesList from "./SeriesList";
import { Series } from "@/types/series";

async function fetchSeriesPageAction(): Promise<Series[]> {
  
  const res = await fetch("http://localhost:9000/v1/series", { cache: "no-store", method: "GET" });
  if (!res.ok) throw new Error("시리즈 정보 불러오지 못했습니다.");
  const all: Series[] = await res.json();

  return all;
}

export default async function SeriesPage() {
  
  const totalSeries = await fetchSeriesPageAction();


  return (
    <main className="mx-auto max-w-4xl">
      <SeriesList  totalSeries={totalSeries} />
    </main>
  );
}
