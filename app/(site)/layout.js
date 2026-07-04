import SkinProvider from "@/components/SkinProvider";
import Frame from "@/components/Frame";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SkinToggle from "@/components/SkinToggle";
import { getSite } from "@/lib/content";

export default async function SiteLayout({ children }) {
  const site = await getSite();
  return (
    <SkinProvider>
      <Frame />
      <Nav />
      <main className="wrap">{children}</main>
      <Footer site={site} />
      <SkinToggle />
    </SkinProvider>
  );
}
