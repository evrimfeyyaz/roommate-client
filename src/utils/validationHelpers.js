// @flow
import _ from 'lodash'

import type { ValidationErrorsByObjectId } from '../types/validation'

export function hasValidationErrors(validationErrorsObject: ValidationErrorsByObjectId) {
  return _.keys(validationErrorsObject).length > 0
}