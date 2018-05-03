import React from 'react'
import { Helmet } from 'react-helmet'
import { withSiteData } from 'react-static'
import { Link as PrismicLink } from 'prismic-reactjs'

export default withSiteData(({
  title, description, keywords, maillink,
}) => (
  <div>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
    <h1 style={{ textAlign: 'center' }}>Welcome to {title}</h1>
    {maillink &&
      <a href={PrismicLink.url(maillink)} {...maillink.target}>
        {maillink.url.replace('mailto:', '')}
      </a>
    }
  </div>
))
