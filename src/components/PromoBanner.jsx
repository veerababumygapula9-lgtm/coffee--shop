export default function PromoBanner() {
  return (
    <section className="relative flex h-40 overflow-hidden rounded-2xl bg-coffee-promo p-4 shadow-lg">
      <div className="relative z-10 flex w-3/5 flex-col items-start gap-2">
        <span className="rounded-md bg-danger px-2.5 py-1 text-xs font-semibold text-white">Promo</span>
        <h2 className="text-2xl font-semibold leading-tight text-white">
          <span className="bg-coffee-dark px-1">Buy one get</span>
          <br />
          <span className="bg-coffee-dark px-1">one FREE</span>
        </h2>
      </div>
      <img
        src="/images/coffee-1.png"
        alt=""
        className="absolute -right-6 top-0 h-full w-1/2 rounded-bl-[5rem] object-cover"
      />
    </section>
  );
}
