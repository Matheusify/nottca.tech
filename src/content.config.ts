import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blog" }),
    schema: ({ image }) =>
      z.object({
        title: z.string(),
        description: z.string().optional(),
        createdAt: z.date(),
        image: image().optional(),
      }),
  }),
};
