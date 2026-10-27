// Stylised map geometry traced from the "High-Fidelity (Delivery)" frame.
// Coordinates are SVG user units in a 750 x 985 viewBox.
export const MAP_WIDTH = 750;
export const MAP_HEIGHT = 985;

// White road surfaces with a light grey casing, drawn as centre lines.
export const ROADS = [
  { d: "M515 -10 L515 1000", width: 44 }, // Jawaharlal Nehru Road
  { d: "M-10 98 L494 98", width: 16 },
  { d: "M180 -10 L180 230", width: 14 },
  { d: "M100 -10 L100 590", width: 12 },
  { d: "M100 222 L494 222", width: 14 },
  { d: "M240 222 L240 590", width: 12 },
  { d: "M95 352 L494 352", width: 16 },
  { d: "M537 330 L760 330", width: 20 },
  { d: "M140 409 L300 409", width: 10 },
  { d: "M190 409 L190 590", width: 10 },
  { d: "M100 472 L300 472", width: 10 },
  { d: "M100 590 L494 590", width: 18 },
  { d: "M-10 668 L760 668", width: 18 },
  { d: "M330 590 L330 1000", width: 12 },
  { d: "M440 590 L440 1000", width: 12 },
  { d: "M140 668 L140 1000", width: 12 },
  { d: "M72 800 L72 1000", width: 10 },
  { d: "M30 895 L494 895", width: 14 },
  { d: "M100 590 L0 960", width: 22 }, // Kamarajar Salai
];

// Soft blocks and outlines that break up the flat grey background.
export const BLOCKS = [
  { x: 0, y: 470, width: 65, height: 95, fill: "#EAEAEA" },
];
export const OUTLINES = [
  { x: 310, y: 425, width: 127, height: 75 },
  { x: 560, y: 400, width: 160, height: 36 },
  { x: 560, y: 560, width: 140, height: 60 },
];

export const STREET_LABELS = [
  { text: "93rd St", x: 45, y: 98 },
  { text: "97th St", x: 180, y: 130, rotate: -90 },
  { text: "96th St", x: 292, y: 98 },
  { text: "95th St", x: 270, y: 222 },
  { text: "Lincoln St", x: 100, y: 285, rotate: -90 },
  { text: "2nd Ave", x: 690, y: 312 },
  { text: "86th Street", x: 260, y: 574 },
  { text: "Nirmala", x: 237, y: 690 },
  { text: "Girls HSS", x: 237, y: 718 },
  { text: "88th Street", x: 140, y: 735, rotate: -80 },
  { text: "85th Street", x: 72, y: 925, rotate: -85 },
  { text: "Kamarajar Salai", x: 36, y: 845, rotate: -75 },
  { text: "19th Avenue", x: 440, y: 755, rotate: 90 },
  { text: "18th", x: 330, y: 960, rotate: 90 },
  { text: "86th St", x: 433, y: 880 },
  { text: "3rd Ave", x: 690, y: 686 },
  { text: "Jawaharlal Nehru Road", x: 515, y: 845, rotate: 90 },
];

export const SHOP = { x: 506, y: 662 };
export const DESTINATION = { x: 160, y: 473 };
// Starts at the shop, runs up Nehru Road, then west and south to the address.
export const ROUTE = "M506 662 L506 335 L482 348 L240 355 L240 408 L190 410 L190 470 L160 473";
