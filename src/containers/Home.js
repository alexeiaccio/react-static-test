import React from 'react'
import { Helmet } from 'react-helmet'
import { withSiteData } from 'react-static'
//
import logoImg from '../logo.png'

export default withSiteData(({ title, description, keywords }) => (
  <div>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
    <h1 style={{ textAlign: 'center' }}>Welcome to {title}</h1>
    <img src={logoImg} alt="logo" />
  </div>
))
