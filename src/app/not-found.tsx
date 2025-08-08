import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center code-grid px-6">
      <div className="max-w-xl text-center">
        <h1 className="text-4xl font-semibold text-accent neon">$ 404</h1>
        <p className="mt-3 text-foreground/80">No encontramos lo que buscas. Vuelve al inicio y probemos otra ruta.</p>
        <div className="mt-6">
          <Link href="/" className="px-3 py-2 text-[13px] rounded border border-accent bg-black hover:bg-accent/10">
            ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
} 