import { Series } from "./series";

export type ArticleCount = {
  articleCount: number;
}

export type ArticleTag = {
  tagId: number;
  tagName: string;
  count: number;
};

export type Article = {
  articleId: number;
  title: string;
  content: string;
  articleTags: ArticleTag[];
  series: Series;
  createdAt: string;
  modifiedAt: string;
};