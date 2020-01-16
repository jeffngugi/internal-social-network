// import userRouter from './users';
// import roleRouter from './userRoles';

const apiPrefix = '/api/v1';

// add your route to this list
const routes = [
    // userRouter,
    // roleRouter
];

export default (app) => {
    routes.forEach((route) => app.use(apiPrefix, route));
    return app;
};