import { BackIcon } from "../assets/icons";

export default function ScreenHeader({ title, onBack, right }) {
  return (
    <header className="grid shrink-0 grid-cols-[2.5rem_1fr_2.5rem] items-center px-6 pb-4 pt-8">
      <button
        onClick={onBack}
        aria-label="Go back"
        className="flex h-10 w-10 items-center justify-start transition active:scale-90"
      >
        <BackIcon size={22} />
      </button>
      <h1 className="text-center text-base font-semibold">{title}</h1>
      <div className="flex justify-end">{right}</div>
    </header>
  );
}
