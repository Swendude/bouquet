import { Flower2, GitBranchIcon, Github } from "lucide-react";
import { ReactNode } from "react";

const Header = () => {
  return (
    <section className="p-2 w-full text-xs md:text-base ">
      <h1 className="flex items-center gap-3 text-xl md:text-4xl font-medium border-b border-neutral-300 mb-2">
        <Flower2 className="w-6 h-6 md:w-10 md:h-10" strokeWidth={1} />
        Bouquet
      </h1>
      <p>
        Hex flower editor inspired by{" "}
        <Link href="https://goblinshenchman.wordpress.com/hex-power-flower/">
          Goblin's Henchman
        </Link>
        . This site is{" "}
        <Link href="https://github.com/Swendude/bouquet">Open Source</Link>
      </p>
    </section>
  );
};

const Link = ({ children, href }: { children: ReactNode; href: string }) => (
  <a
    className="underline decoration-neutral-500 underline-offset-2 hover:decoration-neutral-300 transition-colors"
    target="_blank"
    href={href}
  >
    {children}
  </a>
);
export default Header;
