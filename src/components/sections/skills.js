import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledSkillsSection = styled.section`
  max-width: 900px;

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    margin-top: 40px;
  }

  .skill-card {
    ${({ theme }) => theme.mixins.boxShadow};
    padding: 24px 22px;
    border-radius: var(--border-radius);
    background: var(--light-navy);
  }

  .skill-title {
    margin: 0 0 14px;
    color: var(--lightest-slate);
    font-size: var(--fz-xl);
  }

  ul {
    ${({ theme }) => theme.mixins.fancyList};
    margin: 0;
  }
`;

const skillGroups = [
  {
    title: 'Programming',
    items: ['Python', 'Java', 'SQL'],
  },
  {
    title: 'Machine Learning',
    items: ['PyTorch', 'Scikit-learn', 'TensorFlow', 'Hugging Face'],
  },
  {
    title: 'ML Systems',
    items: ['Feature Engineering', 'Model Evaluation', 'Experimentation', 'Data Pipelines'],
  },
  {
    title: 'Backend and MLOps',
    items: ['Docker', 'MLflow', 'FastAPI', 'Flask', 'Git'],
  },
];

const Skills = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledSkillsSection id="skills" ref={revealContainer}>
      <h2 className="numbered-heading">Skills</h2>

      <div className="skills-grid">
        {skillGroups.map(group => (
          <div className="skill-card" key={group.title}>
            <h3 className="skill-title">{group.title}</h3>
            <ul>
              {group.items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </StyledSkillsSection>
  );
};

export default Skills;
