export const UseCases = {
  auth: {
    signUp: '/auth/signup',
    login: '/auth/login',
    confirmEmail: '/auth/confirmEmail',
    resendConfirmationEmail: '/auth/resendConfirmationEmail',
  },
  farm: {
    get: '/farm/get',
  },
  user: {
    create: '/user/create',
    update: '/user/update',
    get: '/user/get',
    list: '/user/list',
    delete: '/user/delete',
    setRole: '/user/setRole',
  },
  plant: {
    create: '/plant/create',
    update: '/plant/update',
    get: '/plant/get',
    list: '/plant/list',
    delete: '/plant/delete',
  },
};
