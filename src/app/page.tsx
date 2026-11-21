import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { About, Marquee } from "@/components/about";
import { Awards } from "@/components/awards";
import { Services } from "@/components/services";
import { Contact, Writing } from "@/components/contact";
import { CommandPalette } from "@/components/command-palette";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Awards />
        <Services />
        <Writing />
      </main>
      <Contact />
      <CommandPalette />
    </>
  );
}
