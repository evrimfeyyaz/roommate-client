// @flow
import _ from 'lodash'

// https://stackoverflow.com/questions/196972/convert-string-to-title-case-with-javascript
export function titleCase(str: string) {
  let result = str.replace(/([^\W_]+[^\s-]*) */g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())

  // Certain minor words should be left lowercase unless
  // they are the first or last words in the string.
  const lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
    'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
  lowers.forEach((lower) => {
    result = result.replace(new RegExp(`\\s${lower}\\s`, 'g'), txt => txt.toLowerCase())
  })

  // Certain words such as initialisms or acronyms should be left uppercase.
  const uppers = ['Id', 'Tv', 'Am', 'Pm']
  uppers.forEach((upper) => {
    result = result.replace(new RegExp(`\\b${upper}\\b`, 'g'), upper.toUpperCase())
  })

  return result
}