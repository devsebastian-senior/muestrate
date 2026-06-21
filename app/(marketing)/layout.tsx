import { Aurora } from "@/components/site/aurora";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh">
      <Aurora />
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
