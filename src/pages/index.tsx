import React from 'react';
import '@fontsource/merriweather';
import './index.scss';
import { StaticImage } from 'gatsby-plugin-image';
import { SiLinkedin } from '@react-icons/all-files/si/SiLinkedin';
import { SiGithub } from '@react-icons/all-files/si/SiGithub';
import { Link } from 'gatsby';

function Landing(): JSX.Element {
  return (
    <div className="landing">
      <div className="grid">
        <div>
          <h1>Arad Margalit</h1>
          <h2>Software Engineering Manager at Hulu</h2>
          <h3>
            Hi there, I&apos;m Arad! I currently manage a team of software engineers for Hulu&apos;s Ad Platform, and
            love running, biking, hiking, swimming, and coding in my spare time.
          </h3>
        </div>
        <StaticImage
          className="main-photo"
          src="../images/profile.jpeg"
          alt="Picture of Arad hiking"
          placeholder="blurred"
          height={350}
        />
        <div className="resume-socials">
          <Link className="resume-link" to="/resume">
            <span>Résumé</span>
          </Link>
          <div className="socials">
            <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/arad-margalit-6a0271a6/">
              <SiLinkedin size="3em" />
            </a>
            <a target="_blank" rel="noreferrer" href="https://github.com/aradmargalit">
              <SiGithub size="3em" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
