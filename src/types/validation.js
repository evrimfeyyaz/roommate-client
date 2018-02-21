// @flow

export type ValidationErrorsByObjectId = {
  [choiceId: string]: string[]
}

/**
 * State of a container that validates a form before submitting.
 */
export type ValidatingContainerState = {
  validationErrors: ValidationErrorsByObjectId,
  /**
   * After validation is done, we scroll to the validation
   * error to alert the user. This keeps track of whether
   * or not we have done it after validation, otherwise the
   * screen would scroll multiple times to different errors.
   */
  hasScrolledToValidationError: boolean
}