import { defineConfig, presetUno } from 'unocss'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - package has no type declarations
import presetTheme from 'unocss-preset-theme'
import type { Theme } from 'unocss/preset-uno'
import { myTheme } from './math-project-vue/uno.theme'

export default defineConfig({
  presets: [
    presetUno({
      dark: 'class',
    }),
    presetTheme<Theme>({
      theme: myTheme,
    }),
  ],
})