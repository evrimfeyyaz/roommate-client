// @flow
import _ from 'lodash'

import type { ShoppingCategory } from '../../types/shopping'

// TODO: Create a separate class to handle "hours and minutes."
export function isCurrentlyAvailable(category: ShoppingCategory) {
  const { availableFrom: from, availableUntil: til } = category

  if (from == null && til == null) {
    return true
  }

  const currentTime = asHoursAndMinutesInUTC(new Date())
  return isTimeBetween(currentTime, from, til)
}

export function asHoursAndMinutesInUTC(date: Date): string {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC', hour12: false }) || ''
}

// TODO: Add locale and timezone parameter to this.
export function utcHoursAndMinutesToLocaleTimeString(hoursAndMinutes: string) {
  if (hoursAndMinutes == null) {
    return ''
  }

  const dummyDate = new Date()
  const hours = getHours(hoursAndMinutes)
  const minutes = getMinutes(hoursAndMinutes)

  dummyDate.setUTCHours(hours)
  dummyDate.setUTCMinutes(minutes)

  return dummyDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

/**
 * Returns a string that explains the availability times in English.
 *
 * @param category
 * @param prefix: Prefix that will be prepended to the message.
 * @returns {string}
 */
export function availabilityTimesMessage(category: ShoppingCategory, prefix: ?string = null) {
  const availableFromTimeString = utcHoursAndMinutesToLocaleTimeString(category.availableFrom)
  const availableUntilTimeString = utcHoursAndMinutesToLocaleTimeString(category.availableUntil)
  let message = ''

  if (!availableFromTimeString) {
    message = `available until ${availableUntilTimeString}`
  } else if (!availableUntilTimeString) {
    message = `available after ${availableFromTimeString}`
  } else {
    message = `available between ${availableFromTimeString} and ${availableUntilTimeString}`
  }

  if (prefix) {
    return `${prefix} ${message}`
  }

  return message
}

function getHours(hoursAndMinutes: string): number {
  return Number(hoursAndMinutes.split(':')[0])
}

function getMinutes(hoursAndMinutes: string): number {
  return Number(hoursAndMinutes.split(':')[1])
}

function isTimeBetween(time: string, fromParam: string, tilParam: string) {
  let from = fromParam
  let til = tilParam

  if (from == null) {
    from = '00:00'
  }

  if (til == null) {
    til = '23:59'
  }

  if (from <= til) {
    return time >= from && time <= til
  }

  return time >= from || time <= til
}
