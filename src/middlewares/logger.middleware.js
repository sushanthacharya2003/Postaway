export const loggerMiddleware = (req, res, next) => {
  const excludedRoutes = ["/api/signup", "/api/signin"];

  if (!excludedRoutes.includes(req.originalUrl)) {
    console.log("METHOD:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("BODY:", req.body);
    console.log("------");
  }

  next();
};
