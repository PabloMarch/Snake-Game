export default theme => ({
  root: {
    color: '#B00',
    position: 'absolute',

    '&::before': {
      content: '"bug_report"',
      fontSize: '1.4em',
      left: '-0.15em',
      position: 'relative',
      top: '-0.15em',
    }
  },
})
