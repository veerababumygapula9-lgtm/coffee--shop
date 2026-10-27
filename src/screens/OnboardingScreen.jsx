export default function OnboardingScreen({ onStart }) {
  return (
    <div className="relative flex h-full flex-col justify-end bg-black">
      <img
        src="/images/onboarding.png"
        alt="Steaming coffee cup surrounded by beans"
        className="absolute inset-x-0 top-0 h-3/4 w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

      <div className="relative z-10 px-6 pb-10 text-center">
        <h1 className="text-3xl font-semibold leading-snug text-white">
          Fall in Love with Coffee in Blissful Delight!
        </h1>
        <p className="mt-3 text-sm text-gray-400">
          Welcome to our cozy coffee corner, where every cup is a delightful for you.
        </p>
        <button
          onClick={onStart}
          className="mt-8 h-14 w-full rounded-2xl bg-coffee text-base font-semibold text-white transition hover:brightness-110 active:scale-[0.98]"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
