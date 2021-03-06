import React, { Component } from 'react';

import { DisclaimerModal, NewTabLink } from '@components';
import { socialMediaLinks, VERSION } from '@config';
import { ANALYTICS_CATEGORIES } from '@services';
import { translateRaw } from '@translations';
import './SocialsAndLegal.scss';
import { useAnalytics } from '@utils';

const SocialMediaLink = ({ link, text, icon }: { link: string; text: string; icon?: string }) => {
  const trackSocial = useAnalytics({
    category: ANALYTICS_CATEGORIES.FOOTER
  });

  if (icon) {
    return (
      <NewTabLink
        className="SocialMediaLink"
        key={link}
        href={link}
        aria-label={text}
        onClick={() => trackSocialIconClicked(text, trackSocial)}
      >
        <img src={icon} width="18px" height="18px" style={{ verticalAlign: 'top' }} />
      </NewTabLink>
    );
  }

  return (
    <NewTabLink
      className="SocialMediaLink"
      key={link}
      href={link}
      aria-label={text}
      onClick={() => trackSocialIconClicked(text, trackSocial)}
    >
      <i className={`sm-icon sm-logo-${text}`} />
    </NewTabLink>
  );
};

const trackSocialIconClicked = (
  socialNetworkName: string,
  trackSocial: ReturnType<typeof useAnalytics>
): void => {
  trackSocial({
    actionName: `${socialNetworkName.charAt(0).toUpperCase()}${socialNetworkName.slice(
      1
    )} social icon clicked`
  });
};

function Socials() {
  return (
    <section className="Socials">
      {socialMediaLinks.map((socialMediaItem, idx) => (
        <SocialMediaLink
          link={socialMediaItem.link}
          key={idx}
          text={socialMediaItem.text}
          icon={socialMediaItem.icon}
        />
      ))}
    </section>
  );
}

interface LegalState {
  modalOpen: boolean;
}

class Legal extends Component {
  public state: LegalState = {
    modalOpen: false
  };

  public render() {
    const { modalOpen } = this.state;

    return (
      <React.Fragment>
        <section className="Legal">
          <p>© {new Date().getFullYear()} MyCrypto, Inc.</p>
          <a onClick={this.toggleModal}>{translateRaw('DISCLAIMER')}</a>
          <p>{VERSION}</p>
        </section>
        <DisclaimerModal isOpen={modalOpen} handleClose={this.toggleModal} />
      </React.Fragment>
    );
  }

  private toggleModal = () =>
    this.setState((prevState: LegalState) => ({
      modalOpen: !prevState.modalOpen
    }));
}

export default function SocialsAndLegal() {
  return (
    <section className="SocialsAndLegal">
      <Socials />
      <Legal />
    </section>
  );
}
