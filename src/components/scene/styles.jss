export default theme => ({
  root: {
    flex: '1 1 auto',
    outline: 'none',
    overflow: 'hidden',
    position: 'relative',
    '&::-webkit-scrollbar': { display:'none' }
  },
  limits: {
    backgroundColor: '#000',
    bottom: 0,
    left: 0,
    margin: 'auto',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  loader: {
    left: '50%',
    margin: '-20px 0 0 -20px',
    position: 'absolute',
    top: '50%',
  },
  detail: {
    bottom: 10,
    fontSize: 12,
    position: 'absolute',
    left: 10,
  }
})
