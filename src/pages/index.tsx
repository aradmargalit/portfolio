import React from 'react';
import '@fontsource/merriweather';
import './index.scss';
import { StaticImage } from 'gatsby-plugin-image';
import { SiLinkedin } from '@react-icons/all-files/si/SiLinkedin';
import { SiGithub } from '@react-icons/all-files/si/SiGithub';
import { Link } from 'gatsby';
import { Helmet } from 'react-helmet';

function Landing(): JSX.Element {
  return (
    <div className="landing">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Arad Margalit</title>
        <html lang="en" />
      </Helmet>
      <div className="grid">
        <div>
          <h1>Arad Margalit</h1>
          <h3>Hi there, I&apos;m Arad!</h3>
          <p>
            I&apos;m currently working as a Staff Software Engineer at <a href="https://tempo.fit/">Tempo</a>. In my
            free time, I love running, biking, hiking, swimming, coding, and spending quality time with my cat, Phoebe.
          </p>
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
            <a
              aria-label="LinkedIn Icon"
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/arad-margalit-6a0271a6/"
            >
              <SiLinkedin size="3em" />
            </a>
            <a aria-label="Github Icon" target="_blank" rel="noreferrer" href="https://github.com/aradmargalit">
              <SiGithub size="3em" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
