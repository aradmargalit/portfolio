import '@fontsource/merriweather';
import './page.scss';

import { SiGithub } from '@react-icons/all-files/si/SiGithub';
import { SiLinkedin } from '@react-icons/all-files/si/SiLinkedin';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegFileAlt } from 'react-icons/fa';

import profile from './profile.jpeg';

export default function Landing() {
  return (
    <div className="landing">
      <div className="grid">
        <div>
          <h1>Arad Margalit</h1>
          <h3>Hi there, I&apos;m Arad!</h3>
          <p>
            I&apos;m currently working as an Engineering Manager at <a href="https://twitch.tv/">Twitch</a>. In my free
            time, I love running, biking, hiking, swimming, and coding.
          </p>
        </div>
        <Image className="main-photo" src={profile} alt="Picture of Arad hiking" placeholder="blur" />
        <div className="resume-socials">
          <Link className="resume-link" href="/resume">
            <FaRegFileAlt style={{ marginRight: 8, verticalAlign: 'middle' }} />
            <span>Résumé</span>
          </Link>
          <div className="socials">
            <a
              aria-label="LinkedIn Icon"
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/arad-margalit/"
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
