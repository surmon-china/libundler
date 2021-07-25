export interface BannerGetterOptions {
  name?: string
  version?: string
  license?: string
  author?: string
  authorURL?: string
}
export const getDefaultBanner = (options: BannerGetterOptions): string => {
  const bannerItems = []

  if (options.name) {
    options.version
      ? bannerItems.push(`${options.name} v${options.version}`)
      : bannerItems.push(options.name)
  }
  if (options.author) {
    bannerItems.push(`Copyright (c) ${options.author}. All rights reserved.`)
  }
  if (options.license) {
    bannerItems.push(`Released under the ${options.license} License.`)
  }
  if (options.author) {
    options.authorURL
      ? bannerItems.push(`${options.author} <${options.authorURL}>`)
      : bannerItems.push(options.author)
  }

  const prefix = `/*!`
  const suffix = `*/`
  const items = bannerItems.map((item) => `* ${item}`)
  const banner = items.length ? [prefix, ...items, suffix].join('\n') : ''

  return banner
}
