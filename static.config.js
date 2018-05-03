import React, { Component } from 'react'
import { ServerStyleSheet } from 'styled-components'
import fetchData from './src/prismic/fetch'

export default {
  getSiteData: async () => {
    const prismicData = await fetchData()
    const homepage = prismicData.filter(({ type }) => type === 'homepage')
    return {
      title: homepage[0].title[0].text,
      description: homepage[0].seodescription,
      keywords: homepage[0].seokeywords,
      maillink: homepage[0].maillink,
    }
  },
  getRoutes: async () => {
    const prismicData = await fetchData()
    const posts = prismicData.filter(({ type }) => type === 'artwork')
    return [
      {
        path: '/',
        component: 'src/containers/Home',
      },
      {
        path: '/about',
        component: 'src/containers/About',
      },
      {
        path: '/blog',
        component: 'src/containers/Blog',
        getData: () => ({
          posts,
        }),
        children: posts.map(post => ({
          path: `/post/${post.id}`,
          component: 'src/containers/Post',
          getData: () => ({
            post,
          }),
        })),
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  renderToHtml: (render, Comp, meta) => {
    const sheet = new ServerStyleSheet()
    const html = render(sheet.collectStyles(<Comp />))
    meta.styleTags = sheet.getStyleElement()
    return html
  },
  Document: class CustomHtml extends Component {
    render () {
      const {
        Html, Head, Body, children, renderMeta,
      } = this.props

      return (
        <Html>
          <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {renderMeta.styleTags}
          </Head>
          <Body>{children}</Body>
        </Html>
      )
    }
  },
}
