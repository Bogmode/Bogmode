# Google measurement setup — pending account selection

The consent component is inactive until NEXT_PUBLIC_GA_MEASUREMENT_ID is configured. No Analytics or Search Console connection has been completed by this change.

1. Confirm Google owner account. Reuse the appropriate existing property; do not create duplicates.
2. Create one GA4 web stream per website, in separate properties. Use Canada/Central reporting time and CAD.
3. Disable Enhanced Measurement (including history pageviews and form tracking): the site sends sanitized manual pageviews. Keep Google Signals and advertising personalization off. Use the shortest practical retention period.
4. Set NEXT_PUBLIC_GA_MEASUREMENT_ID in production and rebuild. Pageviews exclude private routes and query strings; form contents and auth tokens must never be event parameters.
5. Verify Search Console domain ownership through DNS, or use the exact public token in GOOGLE_SITE_VERIFICATION for an HTTPS URL-prefix property. Never use another account’s verification token.
6. Submit /sitemap.xml and link Search Console to the matching GA4 web stream.
7. Check declined consent generates no Google tag requests, acceptance yields one pageview per public route, and withdrawal clears first-party GA cookies and stops collection. Verify a consented visit in GA4 Realtime.

Reports: GA4 for consented traffic and page use; Search Console for queries, impressions, clicks, indexing and Core Web Vitals. Neither replaces server error logs or uptime monitoring.

The sitemap currently lists public top-level routes. Expand dynamic content coverage as published records become available.
