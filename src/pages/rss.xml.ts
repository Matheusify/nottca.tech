import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(ctx: APIContext) {
  const posts = await getCollection("blog");
  return rss({
    title: "ToastedToast's blog",
    description: "The place where I dump my thoughts.",
    site: ctx.site ?? "https://toasted.dev",
    items: posts
      .sort((a, b) => b.data.createdAt.getTime() - a.data.createdAt.getTime())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.createdAt,
        description: post.data.description,
        link: `/blog/${post.id}`,
        content: sanitizeHtml(parser.render(post.body!), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        }),
      })),
  });
}
