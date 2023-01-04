import * as React from 'react';
import { Helmet } from 'react-helmet';

const plausible = process.env.GATSBY_PLAUSIBLE_SITE_ID;

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
    </Helmet>
  );
}

export default Scripts;
