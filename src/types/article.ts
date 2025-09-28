import { Series } from "./series";
import { TagDetail } from "./tags";

export type ArticleCount = {
  articleCount: number;
}

export type Article = {
  articleId: number;
  title: string;
  content: string;
  articleTags: TagDetail[];
  series: Series;
  createdAt: string;
  modifiedAt: string;
};