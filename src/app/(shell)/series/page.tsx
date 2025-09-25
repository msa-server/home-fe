import SeriesList from "./SeriesList";

type SeriesDetail = {
  seriesId: string;
  seriesName: string;
  articleCount: number;
  coverImageUrl?: string;
};

async function fetchSeriesPageAction(): Promise<SeriesDetail[]> {
  
  const res = await fetch("http://localhost:9000/v1/series", { cache: "no-store", method: "GET" });
  if (!res.ok) throw new Error("시리즈 정보 불러오지 못했습니다.");
  const all: SeriesDetail[] = await res.json();

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
