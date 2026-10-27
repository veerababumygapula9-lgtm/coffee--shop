import { useEffect, useRef, useState } from "react";
import {
  BackIcon,
  BeanIcon,
  CheckIcon,
  CloseIcon,
  CourierIcon,
  LocateIcon,
  MessageIcon,
  PhoneIcon,
  StarIcon,
} from "../assets/icons";
import { DESTINATION, MAP_HEIGHT, MAP_WIDTH, ROADS, BLOCKS, OUTLINES, ROUTE, SHOP, STREET_LABELS } from "../data/mapData";

/* ------------------------------------------------------------------ */
/* Order progress simulation                                           */
/* ------------------------------------------------------------------ */
const STEPS = ["Confirmed", "Brewing", "On the Way", "Delivered"];
const ETA_BY_STAGE = ["10–15 minutes left", "8–12 minutes left", "3–5 minutes left", "Order delivered!"];
const LAST_STAGE = STEPS.length - 1;
// Milliseconds spent in stages 0, 1 and 2 (the courier rides during stage 2).
const STAGE_DURATIONS = [4000, 5000, 14000];

const ZOOM_LEVEL = 1.8;

/* ------------------------------------------------------------------ */
/* Map                                                                 */
/* ------------------------------------------------------------------ */
function CityMap({ stage, progress, courier, routeRef }) {
  const showCourier = stage >= 2;

  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Delivery route from the coffee shop to your address"
    >
      <defs>
        <filter id="markerShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.14" />
        </filter>
      </defs>

      <rect width={MAP_WIDTH} height={MAP_HEIGHT} fill="#F5F5F5" />

      {BLOCKS.map((block) => (
        <rect key={`${block.x}-${block.y}`} {...block} />
      ))}

      {/* Roads: light casing first, white surface on top */}
      <g fill="none" stroke="#E6E6E6">
        {ROADS.map((road) => (
          <path key={`casing-${road.d}`} d={road.d} strokeWidth={road.width + 4} />
        ))}
      </g>
      <g fill="none" stroke="#FFFFFF">
        {ROADS.map((road) => (
          <path key={`road-${road.d}`} d={road.d} strokeWidth={road.width} />
        ))}
      </g>

      {OUTLINES.map((outline) => (
        <rect
          key={`${outline.x}-${outline.y}`}
          {...outline}
          rx="10"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="6"
        />
      ))}

      {/* Street names */}
      <g fontSize="22" fill="#666" letterSpacing="0.3" textAnchor="middle" dominantBaseline="central">
        {STREET_LABELS.map(({ text, x, y, rotate = 0 }) => (
          <text key={`${text}-${x}-${y}`} transform={`translate(${x} ${y}) rotate(${rotate})`}>
            {text}
          </text>
        ))}
      </g>

      {/* Invisible copy of the route used to measure length / courier position */}
      <path ref={routeRef} d={ROUTE} fill="none" stroke="none" />

      {/* Remaining route. pathLength=1 lets the dash pattern use 0-1 progress. */}
      <path
        d={ROUTE}
        pathLength="1"
        fill="none"
        stroke="#C67C4E"
        strokeWidth="9"
        strokeLinejoin="round"
        strokeDasharray={`0 ${progress} ${1 - progress} 1`}
      />

      {/* Coffee shop marker (sits under the courier until it sets off) */}
      <g transform={`translate(${SHOP.x} ${SHOP.y})`}>
        {stage < 2 && <Pulse color="#313131" from={34} to={64} />}
        <circle r="34" fill="#313131" stroke="#fff" strokeWidth="6" filter="url(#markerShadow)" />
        <BeanIcon x={-16} y={-16} size={32} color="#fff" />
      </g>

      {/* Destination pin */}
      <g transform={`translate(${DESTINATION.x - 2} ${DESTINATION.y - 3})`}>
        <ellipse rx="14" ry="6" fill="#C67C4E" opacity="0.25">
          <animate attributeName="rx" values="10;38" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="ry" values="4;16" dur="1.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.35;0" dur="1.8s" repeatCount="indefinite" />
        </ellipse>
        <path
          d="M0 0 C-6 -10 -22 -26 -22 -40 A22 22 0 0 1 22 -40 C22 -26 6 -10 0 0 Z"
          fill="#C67C4E"
        />
        <circle cy="-40" r="8.5" fill="#fff" />
      </g>

      {/* Courier */}
      {showCourier && (
        <g transform={`translate(${courier.x} ${courier.y})`}>
          {stage < LAST_STAGE && <Pulse color="#C67C4E" from={40} to={72} />}
          <circle r="40" fill="#fff" filter="url(#markerShadow)" />
          <CourierIcon x={-17} y={-17} size={34} color="#C67C4E" />
        </g>
      )}
    </svg>
  );
}

function Pulse({ color, from, to }) {
  return (
    <circle r={from} fill={color} opacity="0.3">
      <animate attributeName="r" values={`${from};${to}`} dur="1.8s" repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.3;0" dur="1.8s" repeatCount="indefinite" />
    </circle>
  );
}

/* ------------------------------------------------------------------ */
/* Bottom-sheet pieces                                                 */
/* ------------------------------------------------------------------ */
function ProgressStepper({ stage }) {
  const isComplete = stage === LAST_STAGE;

  return (
    <ol className="mt-4 flex" aria-label="Order progress">
      {STEPS.map((label, index) => {
        const isDone = index < stage || isComplete;
        const isCurrent = index === stage && !isComplete;

        return (
          <li key={label} className="relative flex flex-1 flex-col items-center">
            {index < STEPS.length - 1 && (
              <span
                aria-hidden
                className={`absolute left-1/2 top-3 h-0.5 w-full -translate-y-1/2 transition-colors duration-500 ${
                  index < stage ? "bg-success" : "bg-coffee-muted"
                }`}
              />
            )}
            <span
              className={`relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                isDone
                  ? "border-success bg-success text-white"
                  : isCurrent
                  ? "border-coffee bg-white"
                  : "border-coffee-muted bg-white"
              }`}
            >
              {isDone && <CheckIcon size={13} strokeWidth={3} />}
              {isCurrent && (
                <>
                  <span className="absolute inset-0 animate-ping rounded-full bg-coffee/40" />
                  <span className="relative h-2 w-2 rounded-full bg-coffee" />
                </>
              )}
            </span>
            <span
              className={`mt-1.5 whitespace-nowrap text-[10px] ${
                isDone || isCurrent ? "font-semibold text-coffee-dark" : "text-gray-400"
              }`}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function CourierCard() {
  const actionButton =
    "flex h-10 w-10 items-center justify-center rounded-xl transition active:scale-90";

  return (
    <div className="mt-4 flex items-center gap-3 rounded-2xl border border-coffee-muted p-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-coffee text-sm font-semibold text-white">
        BS
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">Brooklyn Simmons</p>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
          <StarIcon size={12} className="fill-gold text-gold" />
          <span className="font-semibold text-coffee-dark">4.9</span>
          <span>· Personal Courier</span>
        </p>
      </div>
      <button aria-label="Message courier" className={`${actionButton} border border-coffee-muted hover:bg-coffee-cream`}>
        <MessageIcon size={18} />
      </button>
      <button aria-label="Call courier" className={`${actionButton} bg-coffee text-white hover:brightness-110`}>
        <PhoneIcon size={18} />
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Screen                                                              */
/* ------------------------------------------------------------------ */
export default function OrderTrackingScreen({ onBack }) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0); // 0-1 along the route
  const [courier, setCourier] = useState(SHOP);
  const [isZoomed, setIsZoomed] = useState(false);
  const routeRef = useRef(null);

  const isDelivered = stage === LAST_STAGE;

  // Advance Confirmed -> Brewing -> On the Way -> Delivered
  useEffect(() => {
    if (stage >= LAST_STAGE) return undefined;
    const timer = setTimeout(() => setStage((current) => current + 1), STAGE_DURATIONS[stage]);
    return () => clearTimeout(timer);
  }, [stage]);

  // Drive the courier along the route while "On the Way"
  useEffect(() => {
    if (stage < 2) return undefined;
    if (isDelivered) {
      setProgress(1);
      return undefined;
    }

    const startedAt = performance.now();
    let frame;
    const tick = (now) => {
      const ratio = Math.min((now - startedAt) / STAGE_DURATIONS[2], 1);
      setProgress(ratio);
      if (ratio < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [stage, isDelivered]);

  // Convert route progress into x/y coordinates for the courier marker
  useEffect(() => {
    const route = routeRef.current;
    if (!route) return;
    const point = route.getPointAtLength(route.getTotalLength() * progress);
    setCourier({ x: point.x, y: point.y });
  }, [progress]);

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white">
      {/* The map takes whatever height the bottom sheet leaves free */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-gray-100">
        <div
          className="absolute inset-0 transition-transform duration-500 ease-out"
          style={{
            transform: `scale(${isZoomed ? ZOOM_LEVEL : 1})`,
            transformOrigin: `${(courier.x / MAP_WIDTH) * 100}% ${(courier.y / MAP_HEIGHT) * 100}%`,
          }}
        >
          <CityMap stage={stage} progress={progress} courier={courier} routeRef={routeRef} />
        </div>

        {/* Floating map controls */}
        <div className="absolute inset-x-6 top-8 z-10 flex items-center justify-between">
          <button
            onClick={onBack}
            aria-label="Back to home"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-200/80 transition active:scale-90"
          >
            <BackIcon size={22} />
          </button>
          <button
            onClick={() => setIsZoomed((zoomed) => !zoomed)}
            aria-label={isZoomed ? "Zoom out" : "Zoom to courier"}
            aria-pressed={isZoomed}
            className={`flex h-11 w-11 items-center justify-center rounded-xl transition active:scale-90 ${
              isZoomed ? "bg-coffee text-white" : "bg-gray-200/80"
            }`}
          >
            <LocateIcon size={22} />
          </button>
        </div>
      </div>

      {/* Bottom sheet: overlaps the map edge slightly, scrolls on very short screens */}
      <section className="no-scrollbar relative z-10 -mt-8 max-h-[60%] shrink-0 overflow-y-auto rounded-t-[2rem] bg-white px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_30px_rgba(0,0,0,0.1)]">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-coffee-muted" />

        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">{ETA_BY_STAGE[stage]}</h2>
            <p className="mt-1 text-xs text-gray-400">
              Delivery to <span className="font-semibold text-coffee-dark">Jl. Kpg Sutoyo</span>
            </p>
          </div>
          <button
            onClick={onBack}
            aria-label="Close tracking"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-coffee-cream text-coffee transition active:scale-90"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <ProgressStepper stage={stage} />
        <CourierCard />

        <button
          onClick={onBack}
          className="mt-4 h-12 w-full rounded-2xl bg-coffee text-sm font-semibold text-white transition hover:brightness-110 active:scale-[0.98]"
        >
          Back to Home
        </button>
      </section>
    </div>
  );
}
