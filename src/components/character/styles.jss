export default theme => ({
  charBody: {
    display: 'inline',
  },
  charBlock: {
    color: '#294',
    display: 'block',
    position: 'absolute',

    '&::before': {
      content: '"brightness_1"',
      fontSize: '1.1em',
      left: '-0.05em',
      position: 'relative',
      top: '-0.05em',
    },

    '&:last-of-type': {
      color: '#296',

      '&::before': {
        content: '"brightness_7"',
        fontSize: '1.3em',
        left: '-0.125em',
        top: '-0.125em',
      }
    },
  }
})
