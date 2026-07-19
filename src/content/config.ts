import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blog" }),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string().optional(),
        createdAt: z.date(),
        image: image().optional(),
        series: reference("series").optional(),
      }),
  }),
  series: defineCollection({
    loader: glob({ pattern: "**/[^_]*.json", base: "./src/content/series" }),
    schema: () =>
      z.object({
        title: z.string(),
        description: z.string(),
      }),
  }),
};
