const defaults = {nonTextBehavior: 'remove'}

const blocksToText = (blocks: Sanity.Schema.BlockContent, options = defaults) => {
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
      }

      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}

export { blocksToText };
