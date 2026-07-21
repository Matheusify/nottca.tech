import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";

function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://toasted.dev",
  compressHTML: true,
  integrations: [sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    processor: unified({
      remarkPlugins: [remarkReadingTime],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"],
              ariaHidden: "true",
              tabIndex: -1,
              ariaLabel: "Link to this heading",
            },
          },
        ],
      ],
    }),
  },

  output: "static",
  adapter: vercel(),
});
