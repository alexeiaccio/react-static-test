import React, { Fragment } from 'react'
import { withRouteData, Link } from 'react-static'
import { RichText } from 'prismic-reactjs'
//
const linkResolver = doc => {
  if (doc.type === 'blog') return `/post/${doc.uid}`
  return `/doc/${doc.id}`
}

export default withRouteData(({ post }) => (
  <div>
    <Link to="/blog/">{'<'} Back</Link>
    <br />
    {RichText.render(post.title, linkResolver)}
    <img src={post.image.url} alt={post.title} />
    {post.description.map((paragraph, i) => (
      <Fragment key={i} >
        {RichText.render(paragraph, linkResolver)}
      </Fragment>
    ))}
  </div>
))
