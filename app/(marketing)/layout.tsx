import { Aurora } from "@/components/site/aurora";
import { Footer } from "@/components/site/footer";

// Funnel sin navbar: cero distracciones, cero salidas. Solo el flujo de conversión.
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-dvh">
      <Aurora />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
