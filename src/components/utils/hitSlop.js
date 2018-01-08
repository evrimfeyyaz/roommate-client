// @flow

type HitSlop = {
  top: number,
  bottom: number,
  left: number,
  right: number
}

/**
 * Calculates the required hit slop to have a clickable area of at least 45x45.
 *
 * @param contentSize
 * @param padding
 * @param onlyVertical If this is set to true, `left` and `right` properties of the returned object are 0.
 * @returns {{top: number, bottom: number, left: number, right: number}}
 */
export default function getHitSlop(contentSize: number, padding: number, onlyVertical: boolean = false): HitSlop {
  let value = (45 - contentSize - (2 * padding)) / 2
  value = Math.max(0, value) // Avoid negative hit slop.

  if (onlyVertical) {
    return { top: value, bottom: value, left: 0, right: 0 }
  }

  return { top: value, bottom: value, left: value, right: value }
}