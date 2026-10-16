export const EASE = [0.16, 1, 0.3, 1]

/** Stagger container + item variants for grids. */
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
export const staggerItem = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}
