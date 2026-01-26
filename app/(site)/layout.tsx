import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TopBar from "../components/layout/TopBar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopBar />
      <Header />
      <main className="min-h-screen mx-auto bg-white">{children}</main>
      <Footer />
    </>
  );
}
