module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: "babel-eslint",
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    "eslint:recommended"
  ],
  plugins: [
  ],
  rules: {
    "semi": [2, "never"],
    "no-console": "off"
  }
}
