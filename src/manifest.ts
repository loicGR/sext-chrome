import packageJson from '../package.json';
import { ManifestType } from '@src/manifest-type';

const manifest: ManifestType = {
  manifest_version: 3,
  name: 'Scapin Screen Scanner',
  short_name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  // options_page: 'src/options/index.html',
  options_ui: {
    page: 'src/options/index.html',
    open_in_tab: true
  },
  background: { service_worker: 'src/background/index.js' },
  permissions:  [
    "activeTab",
    "storage"
  ],
  action: {
    // default_popup: 'src/popup/index.html',
    default_icon: 'icon30.png',
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
      resources: ['icon128.png', 'src/sidebar/index.html', 'src/bubble/index.html'],
      matches: ['<all_urls>'],
    },
  ],
};

export default manifest;
