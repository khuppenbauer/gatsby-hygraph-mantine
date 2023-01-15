import * as React from 'react';
import { Helmet } from 'react-helmet';

const plausible = process.env.GATSBY_PLAUSIBLE_SITE_ID;
const umami = process.env.GATSBY_UMAMI_SITE_ID;
const umamiSrc = process.env.GATSBY_UMAMI_SITE_SRC;

function Scripts() {
  return (
    <Helmet>
      {process.env.NODE_ENV === 'production' && plausible && (
        <script
          key="plausible-script"
          defer
          data-domain={`${plausible}`}
          src="https://plausible.io/js/script.tagged-events.outbound-links.file-downloads.js"
        />
      )}
      {process.env.NODE_ENV === 'production' && umami && (
        <script
          key="umami-script"
          async
          defer
          data-website-id={`${umami}`}
          src={`${umamiSrc}/umami.js`}
        />
      )}
    </Helmet>
  );
}

export default Scripts;
