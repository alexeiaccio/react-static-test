import React from 'react'
import { withRouteData, Link } from 'react-static'
import { Helmet } from 'react-helmet'
//
import favicon from './favicon-c-16x16.png'

export default withRouteData(({ posts }) => (
  <div>
    <Helmet>
      <title>Blog</title>
      <meta name="description" content="Some description" />
      <meta name="keywords" content="One, Two, Three" />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon} />
    </Helmet>
    <h1>It's blog time.</h1>
    <br />
    All Posts:
    <ul>
      {posts.map(post => (
        <li key={post.id}>
          <Link to={`/blog/post/${post.id}/`}>{post.title[0].text}</Link>
        </li>
      ))}
    </ul>
  </div>
))
