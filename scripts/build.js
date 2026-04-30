import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import chalk from "chalk";
import { format } from "date-fns";

const POSTS_DIR = "./posts";
const DIST_DIR = "./dist";

/* clean up old distribution */
fs.rmSync(DIST_DIR, { recursive: true, force: true });
fs.mkdirSync(DIST_DIR, { recursive: true });

const REQUIRED_FIELDS = ["title", "date", "week"];

function validateFrontMatter(file, data) {
  const missing = REQUIRED_FIELDS.filter((f) => !data[f]);

  if (missing.length > 0) {
    console.error(
      chalk.red(`❌ ${file} missing front matter fields:`),
      missing.join(", "),
    );
    process.exit(1);
  }
}

function applyTemplate(template, replacements) {
  let output = template;

  for (const key in replacements) {
    output = output.replaceAll(`{{${key}}}`, replacements[key]);
  }

  return output;
}

/* Create a page for each blog post */
const posts = [];

for (const file of fs.readdirSync(POSTS_DIR)) {
  if (!file.endsWith(".md") || file.startsWith("_")) continue;

  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  validateFrontMatter(file, data);

  const html = marked(content);
  const slug = file.replace(".md", "");

  const template = fs.readFileSync("templates/post.html", "utf8");

  const tagsHtml =
    data.tags?.map((tag) => `<span class="tag">${tag}</span>`).join("") ?? "";

  const page = applyTemplate(template, {
    title: data.title,
    week: data.week,
    date: format(new Date(data.date), "yyyy-MM-dd"),
    author: data.author ?? "",
    content: html,
    tags: tagsHtml,
  });

  fs.writeFileSync(`${DIST_DIR}/${slug}.html`, page);

  posts.push({ ...data, slug });
}

/* Group posts by week */
const weeks = {};
for (const post of posts) {
  const week = String(post.week);
  if (!weeks[week]) weeks[week] = [];
  weeks[week].push(post);
}

/* Sort posts within each week by date */
for (const week of Object.values(weeks)) {
  week.sort((a, b) => new Date(a.date) - new Date(b.date));
}

const postListItemTemplate = fs.readFileSync("templates/postListItems.html", "utf8");

/* Create a page for each week */
const weekPageTemplate = fs.readFileSync("templates/weekPage.html", "utf8");

for (const [weekNum, weekPosts] of Object.entries(weeks)) {
  const postsHtml = weekPosts
    .map((p) => {
      const tagsHtml =
        p.tags?.map((tag) => `<span class="tag">${tag}</span>`).join("") ?? "";
      return applyTemplate(postListItemTemplate, {
        slug: p.slug,
        title: p.title,
        author: p.author ?? "",
        date: format(new Date(p.date), "yyyy-MM-dd"),
        summary: p.summary ?? "",
        tags: tagsHtml,
      });
    })
    .join("");

  const page = applyTemplate(weekPageTemplate, {
    weekNum,
    postList: postsHtml,
  });

  fs.writeFileSync(`${DIST_DIR}/week${weekNum}.html`, page);
}

/* Create Blog Index with week cards */
const indexTemplate = fs.readFileSync("templates/index.html", "utf8");
const weekCardTemplate = fs.readFileSync("templates/weekCard.html", "utf8");

const sortedWeeks = Object.entries(weeks).sort(
  ([a], [b]) => Number(a) - Number(b),
);

const weeksHtml = sortedWeeks
  .map(([weekNum, weekPosts]) =>
    applyTemplate(weekCardTemplate, {
      weekNum,
      postCount: weekPosts.length,
      postCountPlural: weekPosts.length === 1 ? "" : "s",
    }),
  )
  .join("");

const index = applyTemplate(indexTemplate, {
  weekList: weeksHtml,
});

fs.writeFileSync(`${DIST_DIR}/index.html`, index);

fs.cpSync("assets", `${DIST_DIR}/assets`, { recursive: true });

console.log(chalk.green("✔ Build complete"));
