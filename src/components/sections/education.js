import React, { useEffect, useRef } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledEducationSection = styled.section`
  max-width: 900px;

  .education-list {
    display: grid;
    gap: 24px;
    margin-top: 40px;
  }

  .education-card {
    ${({ theme }) => theme.mixins.boxShadow};
    padding: 28px 26px;
    border-radius: var(--border-radius);
    background: var(--light-navy);
  }

  h3 {
    margin: 0 0 8px;
    font-size: var(--fz-xxl);
    color: var(--lightest-slate);
  }

  .school {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
  }

  .range {
    margin: 14px 0 18px;
    color: var(--light-slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    line-height: 1.8;
  }

  ul {
    ${({ theme }) => theme.mixins.fancyList};
    margin: 0;
  }
`;

const Education = () => {
  const data = useStaticQuery(graphql`
    query {
      education: allMarkdownRemark(
        filter: { fileAbsolutePath: { regex: "/(msc-robotics-ai|btech-applied-electronics)/" } }
        sort: { fields: [frontmatter___range], order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              company
              range
              url
            }
            html
          }
        }
      }
    }
  `);

  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const formatRange = range => {
    const [start, end] = range.split(' - ');
    return `Start: ${start}${end ? ` | End: ${end}` : ''}`;
  };

  return (
    <StyledEducationSection id="education" ref={revealContainer}>
      <h2 className="numbered-heading">Education</h2>

      <div className="education-list">
        {data.education.edges.map(({ node }) => {
          const { title, company, range, url } = node.frontmatter;

          return (
            <div className="education-card" key={title}>
              <h3>{title}</h3>
              <a href={url} className="school inline-link">
                {company}
              </a>
              <p className="range">{formatRange(range)}</p>
              <div dangerouslySetInnerHTML={{ __html: node.html }} />
            </div>
          );
        })}
      </div>
    </StyledEducationSection>
  );
};

export default Education;
