export default theme => ({
  commons: {
    fontSize: 24,
    height: 24,
    overflow: 'visible',
    position: 'absolute',
    width: 24,
  },
  head: {
    composes: '$commons',
    color: '#6B4',
    fontSize: '2em',
    marginTop: -4,
  },
  body: {
    composes: '$commons',
    color: '#094',
  }
})
