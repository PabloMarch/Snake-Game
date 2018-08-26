const pkg = require('../package.json');
const PATHS = require('./webpack.paths');

module.exports = {
  'name':             pkg.description,
  'short_name':       pkg.name,
  'manifest_version': 1.0,
  'version':          pkg.version,
  'start_url':        '.',
  'display':          'fullscreen',
  'orientation':      'landscape',
  'background_color': '#000000',
  'theme_color':      '#3f51b5',
  'icon': {
    'src': PATHS.icon,
    'sizes': [48, 72, 96, 144, 168, 192]
  },
  'applications': {
    'gecko': {
      'id': 'clients@orbitdevs.com'
    },
    'edge': {
      'browser_action_next_to_addressbar': true
    }
  }
}
