const errorMessage = {
  VALIDATION_ERROR: 'Validation Error, Please check your input fields carefully',
  SOMETHING_WRONG: 'OOps Something wrong happenned, you may try again',
  DUPLICATE_EMAIL: 'This email is already registered, please try with different mail',
  EMAIL_USER_NOT_FOUND: 'No user found for this email, Please create an account or try again',
  PASSWORD_NOT_MATCH: 'Password not match for this user, Please try again with correct password',
  DENIED_EDIT_BLOG: 'User is not allowed to edit the blog',
  NO_TOKEN: 'Access Token Not Given',
  NO_BLOG_FOUND_OR_NOT_FOUND: 'No blog is found where you are authorized to perform this action',
  NOT_AUTHORIZED: 'You are not authorized, Please login',
}

const HTTP_STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
}

export default { errorMessage, HTTP_STATUS_CODE }
