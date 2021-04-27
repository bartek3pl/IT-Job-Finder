const constants = {
  INVALID_LOGIN: 'Login should have length between 6 and 24 characters.',
  INVALID_EMAIL: 'Email should be a valid email address.',
  INVALID_PASSWORD:
    'Password should contain at least one uppercase character, at least one number and should have length between 6 and 24 characters.',
  WRONG_PASSWORD: 'Wrong password.',

  NOT_UNIQUE_LOGIN: 'User with this login already exists.',
  NOT_UNIQUE_EMAIL: 'User with this email address already exists.',
  USER_NOT_EXISTS: 'User does not exists.',
  USER_SUCCESSFULLY_CREATED: 'User successfully created.',
  USER_SUCCESSFULLY_DELETED: 'User successfully deleted.',
  USER_SUCCESSFULLY_UPDATED: 'User successfully updated.',
  USER_SUCCESSFULLY_LOGGED_IN: 'User successfully logged in.',

  JOB_OFFER_ALREADY_FAVOURITE: 'Chosen job offer is already user favourite.',
  JOB_OFFER_NOT_FAVOURITE: 'Chosen job offer is not in user favourite.',
  JOB_OFFER_SUCCESSFULLY_ADDED:
    'Chosen job offer successfully added to user favourite.',
  JOB_OFFER_SUCCESSFULLY_DELETED:
    'Chosen job offer successfully deleted from user favourite.',
};

export default constants;
