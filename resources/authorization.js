const ROLES = {
  FULL_ADMIN: 'FULL_ADMIN',
  BASIC_ADMIN: 'BASIC_ADMIN',
  LANDLORD: 'LANDLORD',
  TENANT: 'TENANT',
  USER: 'USER',
};

const ACTIONS = {
  READ_OWN_PROFILE: 'READ_OWN_PROFILE',
  WRITE_OWN_PROFILE: 'WRITE_OWN_PROFILE',
};

const ACTIONS_PER_ROLE = {
  [ROLES.FULL_ADMIN]: Object.keys(ACTIONS).map(k => ACTIONS[k]),
  [ROLES.BASIC_ADMIN]: Object.keys(ACTIONS).map(k => ACTIONS[k]),
  [ROLES.LANDLORD]: [ ACTIONS.READ_OWN_PROFILE, ACTIONS.WRITE_OWN_PROFILE ],
  [ROLES.TENANT]: [ ACTIONS.READ_OWN_PROFILE, ACTIONS.WRITE_OWN_PROFILE ],
  [ROLES.USER]: [ ACTIONS.READ_OWN_PROFILE, ACTIONS.WRITE_OWN_PROFILE ],
};

module.exports = {
  ROLES,
  ACTIONS,
  ACTIONS_PER_ROLE,
};