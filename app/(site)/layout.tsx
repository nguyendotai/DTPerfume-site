import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TopBar from "../components/layout/TopBar";
import CompareBar from "../components/ui/CompareBar";
import ChatBox from "../components/chat/chatBox";

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
      <CompareBar />
      <Footer />
    </>
  );
}
