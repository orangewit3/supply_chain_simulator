export default function getErrorResponse(error, functionName) {
  const errorText = typeof error === 'string' ? error : error.message
  const response = {
    message: `Error web3.${functionName}(): ${errorText}`,
  }

  const ABORTED = 'aborted'
  const EXCEPTION = 'exception'
  const UNKOWN = 'unknown error type'

  if (error.code) {
    response.code = error.code

    switch (error.code) {
      case 4001:
        response.txErrorType = ABORTED
        break
      case -32016:
        response.txErrorType = EXCEPTION
        break
      default:
        response.txErrorType = UNKOWN
    }
  }

  return { error: response }
}