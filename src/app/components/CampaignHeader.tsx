import { Logo } from "./Logo";
import { Icon } from "./Icon";
import { contactInfo } from "../data/site-data";

export function CampaignHeader() {
  return (
    <header className="campaign-header">
      <Logo />
      <a className="campaign-header-phone" href={`tel:${contactInfo.phoneHref}`}>
        <Icon name="phone" />
        <span className="campaign-header-phone-text">{contactInfo.phone}</span>
      </a>
    </header>
  );
}
