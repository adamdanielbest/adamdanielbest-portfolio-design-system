import { renderMediaBlock, defaultArgs, mediaBlockArgTypes } from './media-block.shared.js';

export default {
  title: 'Components/MediaBlock',
  argTypes: mediaBlockArgTypes,
  args: defaultArgs,
};

const render = (args) => renderMediaBlock(args);

export const FourThree   = { name: '4:3',  args: { ratio: '4:3'  }, render };
export const SixteenNine = { name: '16:9', args: { ratio: '16:9' }, render };
export const WithCaption = { args: { ratio: '4:3', showCaption: true }, render };
