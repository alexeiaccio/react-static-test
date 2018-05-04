import React from 'react'
import { Helmet } from 'react-helmet'
//
import favicon from './favicon-o-16x16.png'

export default () => (
  <div>
    <Helmet>
      <title>About</title>
      <meta name="description" content="About description" />
      <meta name="keywords" content="Three, Two, One" />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon} />
    </Helmet>
    <h1>This is what we're all about.</h1>
    <p>React, static sites, performance, speed. It's the stuff that makes us tick.</p>
  </div>
)
