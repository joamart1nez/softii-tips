import { initServer } from "./src/server";

try {
  initServer();
} catch (error) {
  console.error(error);
}
