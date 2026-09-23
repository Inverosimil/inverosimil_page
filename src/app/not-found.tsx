import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center px-6">
      <div className="max-w-xl text-center">
        <h1 className="font-display text-6xl text-accent">404</h1>
        <p className="mt-3 text-foreground/80">No encontramos lo que buscas. Vuelve al inicio y probemos otra ruta.</p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex px-4 py-2 text-sm rounded-full border border-accent/30 text-accent hover:bg-accent/10 transition-colors"
          >
            ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
