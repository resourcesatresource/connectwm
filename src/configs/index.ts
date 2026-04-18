const isDev =
  process.env.REACT_APP_API_ENV !== "prod" &&
  process.env.NODE_ENV === "development";

const url = (dev: string, prod: string) => (isDev ? dev : prod);

export const API = {
  BE: {
    BASE: {
      DEV: "http://localhost:3000/api",
      PROD: url(
        "http://localhost:3000/api",
        "https://node-api-452537150366.asia-south2.run.app/",
      ),
    },
    CUSTOMERS: {
      DEV: "http://localhost:3000/api/customers",
      PROD: url(
        "http://localhost:3000/api/customers",
        "https://node-api-452537150366.asia-south2.run.app/api/customers",
      ),
    },
    USERS: {
      DEV: "http://localhost:3000/api/users",
      PROD: url(
        "http://localhost:3000/api/users",
        "https://node-api-452537150366.asia-south2.run.app/api/users",
      ),
    },
    AUTH: {
      DEV: "http://localhost:3000/api/auth",
      PROD: url(
        "http://localhost:3000/api/auth",
        "https://node-api-452537150366.asia-south2.run.app/api/auth",
      ),
    },
    ME: {
      DEV: "http://localhost:3000/api/users/me",
      PROD: url(
        "http://localhost:3000/api/users/me",
        "https://node-api-452537150366.asia-south2.run.app/api/users/me",
      ),
    },
  },
};
