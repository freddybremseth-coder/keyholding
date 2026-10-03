# Ecosystem linking standard

This project is part of a connected customer journey across several distinct brands.

## Core principle

Keep each brand focused on its own search intent and customer job, while linking contextually to the next relevant step in the wider customer journey.

The current ecosystem is:

- Zen Eco Homes — property buying and area guidance on the Costa Blanca
- Pinoso Eco Life — inland living, plots, new builds and area guidance
- Zen Eco Homes Care — keyholding, inspections and practical property care after purchase
- Costa Blanca Tours — curated experiences and day trips

## Linking rules

1. Do not add every brand to primary navigation.
2. Use contextual links where the user intent naturally overlaps.
3. Prefer descriptive anchor text over bare brand names.
4. Use footer/network links as a secondary discovery layer, not the only link.
5. Add UTM attribution on cross-domain commercial journey links.
6. Preserve the source brand's primary conversion goal.
7. Do not create circular, repetitive CTA blocks on every page.
8. Keep cross-links useful for the reader even if SEO value is ignored.

## Recommended journey links

- Zen area/viewing pages → Costa Blanca Tours when the user is trying to understand an area in real life.
- Zen post-purchase content → Care.
- Zen inland content → Pinoso Eco Life.
- Pinoso area/lifestyle content → Costa Blanca Tours where an experience helps the user understand inland life.
- Care owner journey → Costa Blanca Tours when the user is in Spain.
- Costa Blanca Tours coastal experiences → Zen Eco Homes when the visitor shows residential/area intent.
- Costa Blanca Tours inland experiences → Pinoso Eco Life when the visitor shows inland-living intent.
- Costa Blanca Tours → Care for existing property owners.

## Attribution convention

Use:
- utm_source=<source brand>
- utm_medium=referral
- utm_campaign=<journey-context>

Examples:
- zenecohomes / referral / viewing-trip-area-experience
- pinosoecolife / referral / inland-life-experience
- zeneco-care / referral / owner-journey
- costablancatours / referral / experiences-to-property

## SEO / AEO / GEO rule

Cross-domain links support discovery and entity relationships, but they do not replace internal linking within each site. Every new page must first be well-linked inside its own domain, then receive cross-domain links only where they make semantic sense.
