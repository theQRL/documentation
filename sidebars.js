/**

QRL Docs Sidebar file -

- Add any new page to this sheet in the appropriate section.
- Single pages get a link 
- Add category sections with link s for directories that are multi-depth to generate a summary
  page for the section.

Don't forget to add links to the navbar as well!

 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
/*
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
*/
  // But you can create a sidebar manually
  
  docSidebar: [
     {
      type: 'doc',
      id: 'getting-started', // document ID
      label: 'Getting Started', // sidebar label
    },

    /////////////////////////////
    // learn collapsible section
    /////////////////////////////
    {
      type: 'category',
      label: 'Learn The QRL',
      link: {
        type: 'generated-index',
        title: 'Learn About the QRL',
        description: 'Learn about the basic QRL Concepts!',
        slug: '/learn',
        keywords: ['learn'],
        image: '/assets/img/icons/yellow.png',
      },
      items: [
        'Learn/what-is-qrl',
        'Learn/whitepaper',
        'Learn/qrl-emission',
        'Learn/ots-keys',
        'Learn/on-chain-voting',
        // Learn Blockchain
        /*{
          type: 'category',
          label: 'Blockchain',
          link: {
            type: 'generated-index',
            title: 'Blockchain',
            description: 'General blockchain info and how its used in QRL.',
            slug: '/learn/blockchain',
            keywords: ['blockchain'],
            image: '/assets/img/icons/yellow.png',
          },
          items: [
            'Learn/Blockchain/pow-overview',
            'Learn/Blockchain/pos-overview',
          ],
          collapsible: true, // Set the category to be collapsible
          collapsed: true, // Set the category to be initially collapsed or open by default
        },*/


      ],
      collapsible: true, // Set the category to be collapsible
      collapsed: true, // Set the category to be initially collapsed or open by default
    },



    /////////////////////////////////
    // Using-QRL collapsible section
    /////////////////////////////////
    {
      type: 'category',
      label: 'Use The QRL',
      link: {
        type: 'generated-index',
        title: 'Using The QRL',
        description: 'Covering QRL Wallet usage, Node installation, Mining, and all things QRL Network Interfacing',
        slug: '/use',
        keywords: ['use'],
        image: '/assets/img/icons/yellow.png',
      },
      items: [
        { // Wallet section //
          type: 'category',
          label: 'Wallet',
          link: {
            type: 'generated-index',
            title: 'QRL Wallet',
            description: 'Covering QRL Wallets across all distributions and supported devices.',
            slug: '/use/wallet',
            keywords: ['use'],
            image: '/assets/img/icons/yellow.png',
          },
          items: [
            'Use/Wallet/wallet-overview',
            'Use/Wallet/check-balance',
            'Use/Wallet/qrl-address-overview',
            { // web Wallet //
              type: 'category',
              label: 'Web Wallet',
              link: {
                type: 'generated-index',
                title: 'QRL Web Wallet',
                description: 'Covering the QRL Web Wallet usage.',
                slug: '/use/wallet/web',
                keywords: ['use-web-wallet'],
                image: '/assets/img/icons/yellow.png',
              },

              items: [
                'Use/Wallet/Web/web-wallet-overview',
                'Use/Wallet/Web/web-wallet-new',
                'Use/Wallet/Web/web-wallet-open',
                'Use/Wallet/Web/web-wallet-send',
                'Use/Wallet/Web/web-wallet-tools',
                'Use/Wallet/Web/web-wallet-backup',
              ],
              collapsible: true, // Set the category to be collapsible
              collapsed: true, // Set the category to be initially collapsed or open by default
            },
            { // Desktop Wallet //
              type: 'category',
              label: 'Desktop Wallet',
              link: {
                type: 'generated-index',
                title: 'QRL Web Wallet',
                description: 'Covering the QRL Desktop Wallet usage.',
                slug: '/use/wallet/desktop',
                keywords: ['use-desktop-wallet'],
                image: '/assets/img/icons/yellow.png',
              },
              items: [
                'Use/Wallet/Desktop/desktop-wallet-overview',
                'Use/Wallet/Desktop/desktop-wallet-install',
                'Use/Wallet/Desktop/desktop-wallet-new',
                'Use/Wallet/Desktop/desktop-wallet-open',
                'Use/Wallet/Desktop/desktop-wallet-send',
                'Use/Wallet/Desktop/desktop-wallet-tools',
                'Use/Wallet/Desktop/desktop-wallet-backup',
              ],
              collapsible: true, // Set the category to be collapsible
              collapsed: true, // Set the category to be initially collapsed or open by default
            },
            { // Ledger Wallet //
              type: 'category',
              label: 'Ledger Wallet',
              link: {
                type: 'generated-index',
                title: 'QRL Ledger Wallet',
                description: 'Covering the QRL Ledger device usage.',
                slug: '/use/wallet/ledger',
                keywords: ['use-ledger-wallet'],
                image: '/assets/img/icons/yellow.png',
              },

              items: [
                'Use/Wallet/Ledger/ledger-wallet-overview',
                'Use/Wallet/Ledger/ledger-wallet-new',
                'Use/Wallet/Ledger/ledger-wallet-open',
                'Use/Wallet/Ledger/ledger-wallet-send',
                'Use/Wallet/Ledger/ledger-wallet-recover',
                'Use/Wallet/Ledger/ledger-wallet-backup',
                'Use/Wallet/Ledger/ledger-wallet-plausable-deniability',
                'Use/Wallet/Ledger/ledger-wallet-known-issues',
              ],
              collapsible: true, // Set the category to be collapsible
              collapsed: true, // Set the category to be initially collapsed or open by default
            },
            
            { // Mobile Wallet //
              type: 'category',
              label: 'Mobile Wallet',
              link: {
                type: 'generated-index',
                title: 'QRL Mobile Wallet',
                description: 'Covering the QRL mobile Wallet usage.',
                slug: '/use/wallet/mobile',
                keywords: ['use-mobile-wallet'],
                image: '/assets/img/icons/yellow.png',
              },
              items: [
                'Use/Wallet/Mobile/mobile-wallet-overview',
                'Use/Wallet/Mobile/mobile-wallet-new',
                'Use/Wallet/Mobile/mobile-wallet-open',
                'Use/Wallet/Mobile/mobile-wallet-send',
                'Use/Wallet/Mobile/mobile-wallet-install',
                'Use/Wallet/Mobile/mobile-wallet-backup',
                'Use/Wallet/Mobile/mobile-wallet-switch-addresses',
              ],
              collapsible: true, // Set the category to be collapsible
              collapsed: true, // Set the category to be initially collapsed or open by default
            },
            
            { // offline Wallet //
              type: 'category',
              label: 'Offline Wallet',
              link: {
                type: 'generated-index',
                title: 'QRL Offline Wallet',
                description: 'Covering the QRL offline Wallet usage.',
                slug: '/use/wallet/offline',
                keywords: ['use-offline-wallet'],
                image: '/assets/img/icons/yellow.png',
              },              
              items: [
                'Use/Wallet/Offline/offline-wallet-overview',
                'Use/Wallet/Offline/offline-wallet-new',
                'Use/Wallet/Offline/offline-wallet-open',
                'Use/Wallet/Offline/offline-wallet-send',
                'Use/Wallet/Offline/offline-wallet-install',
                'Use/Wallet/Offline/offline-wallet-backup',
              ],
              collapsible: true, // Set the category to be collapsible
              collapsed: true, // Set the category to be initially collapsed or open by default
            },
          ],
          collapsible: true, // Set the category to be collapsible
          collapsed: true, // Set the category to be initially collapsed or open by default
        },

        { // Mining section //
          type: 'category',
          label: 'Mining',
          link: {
            type: 'generated-index',
            title: 'Mining QRL',
            description: 'Covering QRL Mining topics.',
            slug: '/use/mining',
            keywords: ['mining-qrl'],
            image: '/assets/img/icons/yellow.png',
          },
          items: [
            'Use/Mining/mining-qrl-overview',
            'Use/Mining/solo-mining',
            'Use/Mining/pool-mining',
          ],
          collapsible: true, // Set the category to be collapsible
          collapsed: true, // Set the category to be initially collapsed or open by default
        },        

        { // Node section //
          type: 'category',
          label: 'Node',
          link: {
            type: 'generated-index',
            title: 'QRL Node',
            description: 'Covering QRL Node installation and operation.',
            slug: '/use/node/overview',
            keywords: ['use-node'],
            image: '/assets/img/icons/yellow.png',
          },
          items: [
            'Use/Node/qrl-node',
            'Use/Node/node-requirements',
            'Use/Node/node-installation',
            'Use/Node/node-config',
            'Use/Node/node-cli',
            'Use/Node/node-uses',
            'Use/Node/node-update',
            'Use/Node/qrl-maintenance',
          ],
          collapsible: true, // Set the category to be collapsible
          collapsed: true, // Set the category to be initially collapsed or open by default
        },

        { // Tools section //
          type: 'category',
          label: 'Tools',
          link: {
            type: 'generated-index',
            title: 'QRL Tools',
            description: 'Covering QRL Tools and integrations.',
            slug: '/use/tools',
            keywords: ['use-tool'],
            image: '/assets/img/icons/yellow.png',
          },
          items: [
            //'Use/Tools/qrl-tools',

            // Tools Explorer
            {
              type: 'category',
              label: 'Explorer',
              link: {
                type: 'generated-index',
                title: 'QRL Explorer Usage',
                description: 'Using the QRL Explorer.',
                slug: '/use/tools/explorer',
                keywords: ['explorer'],
                image: '/assets/img/icons/yellow.png',
              },
              items: [
                'Use/Tools/explorer/qrl-explorer',
                'Use/Tools/explorer/address-lookup',
                'Use/Tools/explorer/transaction-lookup',
                'Use/Tools/explorer/block-lookup',
                'Use/Tools/explorer/token-lookup',
              ],
              collapsible: true, // Set the category to be collapsible
              collapsed: true, // Set the category to be initially collapsed or open by default
            },

            // Tools Messages
            {
              type: 'category',
              label: 'Messages',
              link: {
                type: 'generated-index',
                title: 'QRL Message Usage',
                description: 'QRL Message transaction usage',
                slug: '/use/tools/messages',
                keywords: ['messages'],
                image: '/assets/img/icons/yellow.png',
              },
              items: [
                'Use/Tools/messages/messages',
              ],
              collapsible: true, // Set the category to be collapsible
              collapsed: true, // Set the category to be initially collapsed or open by default
            },

            // Tools multi-sig
            {
              type: 'category',
              label: 'Multi-Sig',
              link: {
                type: 'generated-index',
                title: 'QRL Multi-signature Usage',
                description: 'Multi-sig transaction usage and guide.',
                slug: '/use/tools/multi-sig',
                keywords: ['multisig'],
                image: '/assets/img/icons/yellow.png',
              },
              items: [
                'Use/Tools/multisig/multisig',
                'Use/Tools/multisig/multisig-generate',
              ],
              collapsible: true, // Set the category to be collapsible
              collapsed: true, // Set the category to be initially collapsed or open by default
            },

            // Tools notarise
            {
              type: 'category',
              label: 'Notarise',
              link: {
                type: 'generated-index',
                title: 'Notarization Usage Guide',
                description: 'Usage for the Notarization functions.',
                slug: '/use/tools/notarise',
                keywords: ['notarise'],
                image: '/assets/img/icons/yellow.png',
              },
              items: [
                'Use/Tools/notarise/notarization-overview',
              ],
              collapsible: true, // Set the category to be collapsible
              collapsed: true, // Set the category to be initially collapsed or open by default
            },

            // Tools Tokens
            {
              type: 'category',
              label: 'Tokens',
              link: {
                type: 'generated-index',
                title: 'QRL Token Usage',
                description: 'Token Transactions and usage.',
                slug: '/use/tools/tokens',
                keywords: ['tokens'],
                image: '/assets/img/icons/yellow.png',
              },
              items: [
                'Use/Tools/tokens/qrl-tokens-overview',
                'Use/Tools/tokens/create-token',
                'Use/Tools/tokens/send-token',
              ],
              collapsible: true, // Set the category to be collapsible
              collapsed: true, // Set the category to be initially collapsed or open by default
            },
            // Tools Integrations
            {
              type: 'category',
              label: 'Integrations',
              link: {
                type: 'generated-index',
                title: 'QRL Integrations',
                description: 'QRL Integrations and usage.',
                slug: '/use/tools/integrations',
                keywords: ['tokens'],
                image: '/assets/img/icons/yellow.png',
              },
              items: [
                'Use/Tools/Integrations/integrations-overview',
              ],
              collapsible: true, // Set the category to be collapsible
              collapsed: true, // Set the category to be initially collapsed or open by default
            },
          ],
          collapsible: true, // Set the category to be collapsible
          collapsed: true, // Set the category to be initially collapsed or open by default
        },

      ],
      collapsible: true, // Set the category to be collapsible
      collapsed: true, // Set the category to be initially collapsed or open by default
    },



    /////////////////////////////
    // Build On collapsible section
    /////////////////////////////
    {
      type: 'category',
      label: 'Build On QRL',
      link: {
        type: 'generated-index',
        title: 'Developer Docs',
        description: 'Advanced documentation for developers and adventurers building on the QRL.',
        slug: '/build',
        keywords: ['developer', 'build'],
        image: '/assets/img/icons/yellow.png',
      },
      items: [
        'Build/developers-overview',
        'Build/qrl-status',
        'Build/qrllib',
        'Build/security',
        'Build/Docker/qrl-docker',
        'Build/Messages/message-tx-encoding',
        'Build/Mining/qrandomx',
        'Build/QIP/qip-overview',
        'Build/QRL-CLI/qrl-cli',
        'Build/Vote-QRL/vote-qrl',
        { // Address Scheme//
          type: 'category',
          label: 'Address Scheme',
          link: {
            type: 'generated-index',
            title: 'QRL Address Docs',
            description: 'Building blocks for the QRL Addresses',
            slug: '/build/addresses',
            keywords: ['learn'],
            image: '/assets/img/icons/yellow.png',
          },
          items: [
            'Build/Address/qrl-address-scheme',
            'Build/Address/hexphrase',
            'Build/Address/mnemonic',
            'Build/Address/wallet-json',
            'Build/Address/slave-keys',
          ],
          collapsible: true, // Set the category to be collapsible
          collapsed: true, // Set the category to be initially collapsed or open by default
        },

        { // QRL Node CLI //
          type: 'category',
          label: 'QRL Node CLI',
          link: {
            type: 'generated-index',
            title: 'QRL Node Command Line Tools',
            description: 'QRL node CLI tools and usage.',
            slug: '/build/node-cli',
            keywords: ['node-cli', 'node tools'],
            image: '/assets/img/icons/yellow.png',
          },
          items: [
            'Build/Node-CLI/node-cli-wallet',
            'Build/Node-CLI/backup-cli-wallet',
            'Build/Node-CLI/node-cli-slave-xmss',
          ],
          collapsible: true, // Set the category to be collapsible
          collapsed: true, // Set the category to be initially collapsed or open by default
        },

        { // QRL Node CLI //
          type: 'category',
          label: 'QRL Helpers',
          link: {
            type: 'generated-index',
            title: 'QRL Code Libraries and helpers',
            description: 'Main QRL node CLI tools and usage.',
            slug: '/developers/helpers',
            keywords: ['qrl-helpers', 'node-helpers'],
            image: '/assets/img/icons/yellow.png',
          },
          items: [
            'Build/QRL-Helpers/node-helpers',
            'Build/QRL-Helpers/validate-qrl-address',
            'Build/QRL-Helpers/explorer-helpers',
          ],
          collapsible: true, // Set the category to be collapsible
          collapsed: true, // Set the category to be initially collapsed or open by default
        },
      ],
      collapsible: true, // Set the category to be collapsible
      collapsed: true, // Set the category to be initially collapsed or open by default
    },

    //////////////////////////////
    // DEV Wallet collapsible section
    //////////////////////////////
//    {
//      type: 'category',
//      label: 'Advanced Wallet',
//      link: {
//        type: 'generated-index',
//        title: 'Advanced QRL Wallet Docs',
//        description: 'Covering advanced QRL wallet topics like building from source',
//        slug: '/developers/wallet',
//        keywords: ['advanced wallet'],
//        image: '/assets/img/icons/yellow.png',
//      },
//      items: [
//        { // web //
//          type: 'category',
//          label: 'Web Wallet',
//          link: {
//            type: 'generated-index',
//            title: 'Advanced QRL Web Wallet Docs',
//            description: 'Covering advanced QRL Web wallet topics like building from source',
//            slug: '/developers/wallet/web',
//            keywords: ['advanced web wallet'],
//            image: '/assets/img/icons/yellow.png',
//          },
//          items: [
//            'Build/Wallet/web/',
//          ],
//          collapsible: true, // Set the category to be collapsible
//          collapsed: true, // Set the category to be initially collapsed or open by default
//        },
//        { // desktop //
//          type: 'category',
//          label: 'Advanced Wallet',
//          link: {
//            type: 'generated-index',
//            title: 'Advanced QRL Wallet Docs',
//            description: 'Covering advanced QRL wallet topics like building from source',
//            slug: '/developers/wallet',
//            keywords: ['advanced wallet'],
//            image: '/assets/img/icons/yellow.png',
//          },
//          items: [
//            'Build/Wallet/desktop/',
//          ],
//          collapsible: true, // Set the category to be collapsible
//          collapsed: true, // Set the category to be initially collapsed or open by default
//        },
//        { // ledger //
//          type: 'category',
//          label: 'Advanced Wallet',
//          link: {
//            type: 'generated-index',
//            title: 'Advanced QRL Wallet Docs',
//            description: 'Covering advanced QRL wallet topics like building from source',
//            slug: '/developers/wallet',
//            keywords: ['advanced wallet'],
//            image: '/assets/img/icons/yellow.png',
//          },
//          items: [
//            'Build/Wallet/ledger/',
//          ],
//          collapsible: true, // Set the category to be collapsible
//          collapsed: true, // Set the category to be initially collapsed or open by default
//        },
//        { // mobile //
//          type: 'category',
//          label: 'Advanced Wallet',
//          link: {
//            type: 'generated-index',
//            title: 'Advanced QRL Wallet Docs',
//            description: 'Covering advanced QRL wallet topics like building from source',
//            slug: '/developers/wallet',
//            keywords: ['advanced wallet'],
//            image: '/assets/img/icons/yellow.png',
//          },
//          items: [
//            'Build/Wallet/mobile/',          
//          ],
//          collapsible: true, // Set the category to be collapsible
//          collapsed: true, // Set the category to be initially collapsed or open by default
//        },
//      ],
//      collapsible: true, // Set the category to be collapsible
//      collapsed: true, // Set the category to be initially collapsed or open by default
//    },



  ],
  // tutorialSidebar shown on the tutorials pages
  tutorialSidebar: [
    'Tutorials/qrl-tutorials',
    'Tutorials/notarize-qrl-cli',

    { // Node tutorials //
      type: 'category',
      label: 'Node',
      link: {
        type: 'generated-index',
        title: 'QRL Node Tutorials',
        description: 'Guides related to node operations.',
        slug: '/tutorials/node',
        keywords: ['node-tutorials'],
        image: '/assets/img/icons/yellow.png',
      },

      items: [
        'Tutorials/Node/dual-node-host',
        'Tutorials/Node/public-api-use',
      ],
      collapsible: true, // Set the category to be collapsible
      collapsed: true, // Set the category to be initially collapsed or open by default
    },

    { // Node tutorials //
      type: 'category',
      label: 'Wallet',
      link: {
        type: 'generated-index',
        title: 'QRL Wallet Tutorials',
        description: 'Guides related to wallet operations.',
        slug: '/tutorials/wallet',
        keywords: ['wallet-tutorials'],
        image: '/assets/img/icons/yellow.png',
      },

      items: [
      'Tutorials/Wallet/automatic-wallet-api-use', 
      'Tutorials/Wallet/automatic-wallet-api', 
      'Tutorials/Wallet/generate-address-dice',
      ],
      collapsible: true, // Set the category to be collapsible
      collapsed: true, // Set the category to be initially collapsed or open by default
    },
  ],

  apiSidebar: [
    'API/qrl-api',
    'API/wallet-api',
    'API/walletd-rest-proxy',
    'API/zeus-proxy-api',
    'API/explorer-api',
  ],

};

module.exports = sidebars;
