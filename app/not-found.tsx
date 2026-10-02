export default function NotFound() {
  return (
    <section className="relative grid min-h-[80svh] place-items-center px-6 pt-28 text-center">
      <div>
        <p className="font-serif text-[clamp(5rem,16vw,10rem)] leading-none text-gold/25">404</p>
        <h1 className="mt-2 text-4xl">This page isn’t here</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">The link may be old or mistyped.</p>
        <a href="/" className="btn btn-gold mt-8">Back to home</a>
      </div>
    </section>
  );
}
