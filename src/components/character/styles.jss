export default theme => ({
  body: {
    color: '#094',
    display: 'block',
    overflow: 'visible',
    position: 'absolute',

    '&::before': {
      content: '"brightness_1"',
      fontSize: '1.1em',
      position: 'relative',
      left: '-0.05em',
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
