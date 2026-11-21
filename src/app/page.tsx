import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Awards } from "@/components/awards";
import { Services } from "@/components/services";
import { Contact, Writing } from "@/components/contact";
import { CommandPalette } from "@/components/command-palette";
import { Work } from "@/components/work";
import { formatPostCount, getBlogPostCount, getLatestPosts } from "@/lib/blog";
import { getFeaturedRepos } from "@/lib/github";
import { getServiceStatuses } from "@/lib/status";
import { profile, socials } from "@/lib/data";

export default async function Home() {
  const [count, latest, repos, { statuses, checkedAt }] = await Promise.all([
    getBlogPostCount(),
    getLatestPosts(),
    getFeaturedRepos(),
    getServiceStatuses(),
  ]);
  const posts = formatPostCount(count);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: [profile.nameKo, profile.handle],
    jobTitle: profile.role,
    url: "https://wlstmd.cloud",
    sameAs: [...socials.map((s) => s.url), profile.blog],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <About posts={posts} />
        <Work repos={repos} />
        <Awards />
        <Services statuses={statuses} checkedAt={checkedAt} />
        <Writing posts={posts} latest={latest} />
      </main>
      <Contact />
      <CommandPalette />
    </>
  );
}
