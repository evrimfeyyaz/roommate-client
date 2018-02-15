// @flow
import type { ShoppingItem } from '../../types/shopping'

/**
 * Returns the thumbnail URL of a given item. Automatically picks the
 * right scale (1x, 2x, etc.) depending on the device pixel density.
 *
 * @param item
 */
export function getThumbnailUrlFromItem(item: ShoppingItem) {
  // TODO: This should depend on the device's pixel density.
  return item.thumbnail2x
}

/**
 * Returns the image URL of a given item. Automatically picks the
 * right scale (1x, 2x, etc.) depending on the device pixel density.
 *
 * @param item
 */
export function getImageUrlFromItem(item: ShoppingItem) {
  // TODO: This should depend on the device's pixel density.
  return item.image2x
}