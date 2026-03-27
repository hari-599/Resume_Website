/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require('react');

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    React.createElement('script', {
      key: 'google-tag-manager-src',
      async: true,
      src: 'https://www.googletagmanager.com/gtag/js?id=G-QSKN3FWD9N',
    }),
    React.createElement('script', {
      key: 'google-tag-manager-inline',
      dangerouslySetInnerHTML: {
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QSKN3FWD9N');
        `,
      },
    }),
  ]);
};
