const fs = require("fs");
const path = require("path");

const registryPath = path.join(__dirname, "..", "site-registry.json");
const registry = JSON.parse(fs.readFileSync(registryPath, "utf8"));

const SITE = registry.site.replace(/\/$/, "");

function xmlEscape(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fullUrl(url) {
  if (url === "/") return SITE + "/";
  return SITE + url;
}

function buildUrlset(pages) {
  const urls = pages.map(page => {
    return `  <url>
    <loc>${xmlEscape(fullUrl(page.url))}</loc>
    <lastmod>${xmlEscape(page.lastmod)}</lastmod>
    <changefreq>${xmlEscape(page.changefreq || "monthly")}</changefreq>
    <priority>${xmlEscape(page.priority || "0.7")}</priority>
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function writeFile(filename, content) {
  fs.writeFileSync(path.join(__dirname, "..", filename), content, "utf8");
  console.log(`Generated ${filename}`);
}

const allPages = registry.pages;

const normalPages = allPages.filter(page =>
  !page.url.startsWith("/blog/") &&
  !page.url.startsWith("/resources/")
);

const blogPages = allPages.filter(page =>
  page.url.startsWith("/blog/")
);

const resourcePages = allPages.filter(page =>
  page.url.startsWith("/resources/")
);

const signalPages = allPages.filter(page =>
  page.url.includes("findable") ||
  page.url.includes("understandable") ||
  page.url.includes("verifiable") ||
  page.url.includes("trustable") ||
  page.url.includes("recommendable") ||
  page.url.includes("signals") ||
  page.url.includes("schema") ||
  page.url.includes("llms") ||
  page.url.includes("ai-json")
);

writeFile("sitemap-pages.xml", buildUrlset(normalPages));
writeFile("sitemap-blog.xml", buildUrlset(blogPages));
writeFile("sitemap-resources.xml", buildUrlset(resourcePages));
writeFile("sitemap-signals.xml", buildUrlset(signalPages));

const today = registry.updated || new Date().toISOString().slice(0, 10);

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE}/sitemap-blog.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE}/sitemap-resources.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE}/sitemap-signals.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;

writeFile("sitemap.xml", sitemapIndex);
