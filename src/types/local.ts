import { TagDetail } from "@/types/tags";

export type Post = {
  id: number | string;
  href: string;
  title: string;
  coverUrl: string; // 썸네일 이미지
  category?: string; // 카테고리 라벨
  authorName: string;
  authorAvatarUrl: string;
  createdAt: string; // "2023.04.05" 등
  tags?: TagDetail[];
};