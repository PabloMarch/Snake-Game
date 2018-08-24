const buttonSize = 24

export default theme => ({
  root: {
    bottom: buttonSize*4,
    opacity: 0.4,
    position: 'absolute',
    right: buttonSize*4,
    transform: 'scale(2.2)',
    transformOrigin: '100%',

    '@media (pointer: fine)': {
      display: 'none',
    }
  },
  group: {
    height: buttonSize,
    position: 'relative',
    width: buttonSize,
  },
  button: {
    color: '#fff',
    height: buttonSize,
    position: 'absolute',
    width: buttonSize,

    '&:nth-child(1)': {
      right: '100%'
    },
    '&:nth-child(2)': {
      bottom: '100%'
    },
    '&:nth-child(3)': {
      left: '100%'
    },
    '&:nth-child(4)': {
      top: '100%'
    }
  }
})
