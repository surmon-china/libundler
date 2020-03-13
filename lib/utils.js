
// Helpers for creating kebab-case/PascalCase versions of string
// Form from: https://github.com/team-innovation/vue-sfc-rollup/blob/master/lib/helpers.js
exports.pascalify = string => {
  const camelized = string.replace(/-([a-z])/g, (c) => c[1].toUpperCase())
  return camelized.charAt(0).toUpperCase() + camelized.slice(1)
}

exports.kebabcase = string => {
  return string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()
}