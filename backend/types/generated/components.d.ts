import type { Schema, Attribute } from '@strapi/strapi';

export interface LayoutHeroSection extends Schema.Component {
  collectionName: 'components_layout_hero_sections';
  info: {
    displayName: 'Hero Section';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    subHeading: Attribute.Text;
    image: Attribute.Media<'images'>;
    link: Attribute.Component<'components.link'>;
  };
}

export interface ComponentsLink extends Schema.Component {
  collectionName: 'components_components_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    url: Attribute.String;
    text: Attribute.String;
    isExternal: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'layout.hero-section': LayoutHeroSection;
      'components.link': ComponentsLink;
    }
  }
}
