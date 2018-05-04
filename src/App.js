import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { Router, Route, Link, cleanPath } from 'react-static'
import { easeQuadOut } from 'd3-ease'
import { NodeGroup } from 'react-move'
import { withContext, getContext } from 'recompose'
import PropTypes from 'prop-types'
import styled, { injectGlobal } from 'styled-components'
import { hot } from 'react-hot-loader'
//
import Routes from 'react-static-routes'

import favicon from '../public/favicon-16x16.png'

injectGlobal`
  body {
    font-family: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial,
      'Lucida Grande', sans-serif;
    font-weight: 300;
    font-size: 16px;
    margin: 0;
    padding: 0;
  }
`

const AppStyles = styled.div`
  a {
    text-decoration: none;
    color: #108db8;
    font-weight: bold;
  }
  nav {
    width: 100%;
    background: #108db8;
    a {
      color: white;
      padding: 1rem;
      display: inline-block;
    }
  }
  .content {
    padding: 1rem;
  }
  img {
    max-width: 100%;
  }
`

// The magic :)
const AnimatedRoutes = getContext({
  // We have to preserve the router context for each route
  // otherwise, a component may rerender with the wrong data
  // during animation
  router: PropTypes.object,
  // We'll also look for the staticURL, so we can disable the animation during static render
  staticURL: PropTypes.string,
})(({ getComponentForPath, router, staticURL }) => (
  <Route
    path="*"
    render={props => {
      // Get the component for this path
      let Comp = getComponentForPath(cleanPath(props.location.pathname))
      if (!Comp) {
        Comp = getComponentForPath('404')
      }

      // When we're rendering for static HTML, be sure to NOT animate in.
      if (staticURL) {
        return (
          // This relative wrapper is necessary for accurate rehydration :)
          <div style={{ position: 'relative' }}>
            <Comp {...props} />
          </div>
        )
      }

      // Use React-Move to animate the different components coming in and out
      return (
        <NodeGroup
          // React-move will handle the entry and exit of any items we pass in `data`
          data={[
            {
              // pass the current Comp, props, ID and router
              id: props.location.pathname,
              Comp,
              props,
              router,
            },
          ]}
          keyAccessor={d => d.id}
          start={() => ({
            opacity: [0],
            scale: [0.9],
            translateY: [10],
          })}
          enter={() => ([
            {
              opacity: [1],
              timing: { duration: 600, delay: 200, ease: easeQuadOut },
            },
            {
              scale: [1],
              translateY: [0],
              timing: { duration: 200, delay: 200, ease: easeQuadOut },
            },
          ])}
          update={() => ({
            opacity: [1],
            scale: [1],
          })}
          leave={() => ([
            {
              opacity: [0],
              timing: { duration: 600, delay: 200, ease: easeQuadOut },
            },
            {
              scale: [1.1],
              translateY: [-10],
              timing: { duration: 400, ease: easeQuadOut },
            },
          ])}
        >
          {nodes => (
            <div style={{ position: 'relative' }}>
              {nodes.map(({ key, data, state: { opacity, translateY, scale } }) => {
                // Here, we override the router context with the one that was
                // passed with each route
                const PreservedRouterContext = withContext(
                  {
                    router: PropTypes.object,
                  },
                  () => ({
                    router: data.router,
                  }),
                )(props => <div {...props} />)

                return (
                  <PreservedRouterContext
                    key={key}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      transform: `translateY(${translateY}px) scale(${scale})`,
                      opacity,
                    }}
                  >
                    <data.Comp {...data.props} />
                  </PreservedRouterContext>
                )
              })}
            </div>
          )}
        </NodeGroup>
      )
    }}
  />
))

const App = () => (
  <Fragment>
    <Helmet
      titleTemplate="ACCIO - %s"
      defaultTitle="ACCIO"
      meta={[{
        name: 'apple-mobile-web-app-title',
        content: 'ACCIO',
      }]}
      links={[{
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: { favicon },
      }]}
    >
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      {/* <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> */}
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#9f00a7" />
      <meta name="theme-color" content="#ffffff" />
    </Helmet>
    <Router>
      <AppStyles>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
        </nav>
        <div className="content">
          <Routes component={AnimatedRoutes} />
        </div>
      </AppStyles>
    </Router>
  </Fragment>
)

export default hot(module)(App)
