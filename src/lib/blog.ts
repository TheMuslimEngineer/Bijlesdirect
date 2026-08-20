import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  readingTime: number;
};

const postsDirectory = path.join(process.cwd(), "content", "blog");

function readPostFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
}

function parseFile(file: string) {
  const slug = file.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(postsDirectory, file), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).filter(Boolean).length;
  const meta: PostMeta = {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    author: data.author ?? "Bijlesdirect",
    category: data.category ?? "Studietips",
    readingTime: Math.max(1, Math.round(words / 200)),
  };
  return { meta, content };
}

export function getAllPosts(): PostMeta[] {
  return readPostFiles()
    .map((f) => parseFile(f).meta)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export function getPost(slug: string): { meta: PostMeta; html: string } | null {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(postsDirectory, file))) return null;
  const { meta, content } = parseFile(file);
  const html = marked.parse(content, { async: false }) as string;
  return { meta, html };
}

export function getAllSlugs(): string[] {
  return readPostFiles().map((f) => f.replace(/\.md$/, ""));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
