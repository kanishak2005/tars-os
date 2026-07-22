import Background from "@/components/background/Background";
import Logo from "@/components/shared/Logo";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <Background />

      <div className="relative z-10">
        <Logo />
      </div>
    </main>
  );
}