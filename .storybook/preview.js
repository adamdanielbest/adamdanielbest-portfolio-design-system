// Load fonts first so Eina04 is available when token vars resolve
import '../src/styles/fonts.css';
// Load all design token CSS files so every story has working var() references
import '../src/styles/generated/tokens-primitives.css';
import '../src/styles/generated/tokens-light.css';
import '../src/styles/generated/tokens-dark.css';
import '../src/styles/generated/tokens-desktop.css';
import '../src/styles/generated/tokens-mobile.css';

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    backgrounds: { disable: true },
  },
  globalTypes: {
    theme: {
      description: 'Colour theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme ?? 'light';
      const wrapper = document.createElement('div');
      wrapper.setAttribute('data-theme', theme);
      wrapper.style.background = 'var(--background-page)';
      wrapper.style.fontFamily = "var(--type-family-regular, 'Eina04'), Arial, sans-serif";
      wrapper.style.padding = '24px';
      wrapper.style.minHeight = '100px';
      wrapper.innerHTML = story();
      return wrapper;
    },
  ],
};

export default preview;
