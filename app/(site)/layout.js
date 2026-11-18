import SkinProvider from "@/components/SkinProvider";
import Frame from "@/components/Frame";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SkinToggle from "@/components/SkinToggle";
import PointerGlow from "@/components/PointerGlow";
import Parallax from "@/components/Parallax";
import Quest from "@/components/game/Quest";
import { getSite } from "@/lib/content";

export default async function SiteLayout({ children }) {
  const site = await getSite();
  return (
    <SkinProvider>
      <Frame />
      <Nav />
      <SkinToggle />
      <PointerGlow />
      <Parallax />
      <Quest />
      <main className="wrap">{children}</main>
      <Footer site={site} />
    </SkinProvider>
  );
}
