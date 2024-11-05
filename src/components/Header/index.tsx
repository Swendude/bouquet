import { ReactNode } from "react";

const Footer = () => {
  return (
    <section className="text-xs ">
      <h1 className="inline-block font-bold">Bouquet</h1>
      <span>{" - "}</span>
      <p className="inline-block">
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
export default Footer;
