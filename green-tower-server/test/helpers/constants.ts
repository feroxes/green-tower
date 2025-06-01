export const UseCases = {
  auth: {
    signUp: '/auth/signup',
    login: '/auth/login',
    confirmEmail: '/auth/confirmEmail',
    resendConfirmationEmail: '/auth/resendConfirmationEmail',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
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
  planting: {
    create: '/planting/create',
    update: '/planting/update',
    get: '/planting/get',
    delete: '/planting/delete',
    list: '/planting/list',
    setState: '/planting/setState',
    harvest: '/planting/harvest',
  },
  harvestEntry: {
    createCut: '/harvestEntry/createCut',
    createPlate: '/harvestEntry/createPlate',
    cutPlate: '/harvestEntry/cutPlate',
  },
} as const;
