const PATHS = {
  back: "M15 18l-6-6 6-6",
  play: "M8 5v14l11-7z",
  pause: "M7 5h4v14H7zM13 5h4v14h-4z",
  reset: "M3 12a9 9 0 1 0 3-6.7M3 4v5h5",
  print: "M6 9V3h12v6M6 18H4a1 1 0 0 1-1-1v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a1 1 0 0 1-1 1h-2M6 14h12v7H6z",
} as const;

export type IconName = keyof typeof PATHS;

/** Small stroke icons (play and pause are filled). Decorative: label the button, not the icon. */
export default function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const filled = name === "play" || name === "pause";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
