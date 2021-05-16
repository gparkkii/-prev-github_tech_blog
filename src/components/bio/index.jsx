import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'

import './index.scss'

export const Bio = () => (
  <StaticQuery
    query={bioQuery}
    render={data => {
      const { author, social, introduction } = data.site.siteMetadata

      return (
        <div className="bio">
          <div className="author">
            <div className="author-description">
              <Image
                className="author-image"
                fixed={data.avatar.childImageSharp.fixed}
                alt={author}
                style={{
                  borderRadius: `100%`,
                }}
              />
              <div className="author-name">
                <span className="author-name-prefix">
                  프론트엔드 개발자 박지연입니다.
                </span>
                <Link to={'/about'} className="author-name-content">
                  <span>@{author}</span>
                </Link>
                <div className="author-introduction">{introduction}</div>
                <p className="author-socials">
                  {social.github && (
                    <a
                      href={`https://github.com/${social.github}`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      ✤ GitHub
                    </a>
                  )}
                  {social.velog && (
                    <a
                      href={`https://velog.com/${social.velog}`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      ✤ Velog
                    </a>
                  )}
                  {social.twitter && (
                    <a
                      href={`https://twitter.com/${social.twitter}`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Twitter
                    </a>
                  )}
                  {social.facebook && (
                    <a
                      href={`https://www.facebook.com/${social.facebook}`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Facebook
                    </a>
                  )}
                  {social.linkedin && (
                    <a
                      href={`https://www.linkedin.com/in/${social.linkedin}/`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      ✤ LinkedIn
                    </a>
                  )}
                  {social.instagram && (
                    <a
                      href={`https://www.instagram.com/${social.instagram}`}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      ✤ Instagram
                    </a>
                  )}
                  <Link to={'/about'}>✤ Resume</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }}
  />
)

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile.png/" }) {
      childImageSharp {
        fixed(width: 72, height: 72) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        introduction
        social {
          twitter
          github
          velog
          facebook
          linkedin
          instagram
        }
      }
    }
  }
`

export default Bio
