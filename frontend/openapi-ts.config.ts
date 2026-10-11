import { defineConfig } from "@hey-api/openapi-ts"

export default defineConfig({
  input: "../interfaces/api.yaml",
  output: "src/api",
  plugins: ["@tanstack/react-query"],
})
