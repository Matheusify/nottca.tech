import type { MiddlewareHandler } from "astro";

export const onRequest: MiddlewareHandler = (context, next) => {
  // intercept response data from a request
  // optionally, transform the response
  // return a Response directly, or the result of calling `next()`
  context.locals.slug = new URL(context.request.url).pathname;
  return next();
};
