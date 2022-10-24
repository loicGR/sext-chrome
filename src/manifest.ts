import packageJson from '../package.json';
import { ManifestType } from '@src/manifest-type';

const manifest: ManifestType = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  // options_page: 'src/options/index.html',
  options_ui: {
    page: 'src/options/index.html',
    open_in_tab: false
  },
  background: { service_worker: 'src/background/index.js' },
  action: {
    default_popup: 'src/popup/index.html',
    default_icon: 'icon128.png',
  },
  icons: {
    '128': 'icon128.png',
  },
  content_scripts: [
    {
      matches: ['http://*/*', 'https://*/*', '<all_urls>'],
      js: ['src/content/index.js'],
    },
  ],
  devtools_page: 'src/devtools/index.html',
  web_accessible_resources: [
    {
      resources: ['icon128.png'],
      matches: [],
    },
  ],
};

export default manifest;
