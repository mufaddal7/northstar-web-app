import nextVitals from "eslint-config-next/core-web-vitals";

const config = [...nextVitals, { ignores: [".next/**", "node_modules/**", "v1/**", "v2/**", "v3/**"] }];

export default config;
