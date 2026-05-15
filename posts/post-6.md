---
title: "Deploying the map and managing what we depend on"
week: 10
date: 2026-03-30
author: Natasha Png
summary: Choosing Leaflet.js for the ingredient map, deciding where to host a MojoJS app, and keeping secrets out of the repo.
tags:
  - deployment
  - APIs
  - maps
  - infrastructure
---

The map is the core feature of SEAblings, which means the first real infrastructure question was what powers it. We had two realistic options: a hosted maps API like Google Maps or Mapbox, or an open-source option like Leaflet.js backed by OpenStreetMap tiles.

We went with Leaflet.js. The reason is straightforward: it's free, open source, and doesn't require an API key. That matters because the map is called on every recipe detail page and on the standalone map view. A hosted API would mean every page load burns quota, and on a free tier that creates a risk of the map going dark mid-demo. With Leaflet and OpenStreetMap there's no key to manage and no billing threshold to watch. The tradeoff is that we don't get Google's geocoding or places search out of the box, but we don't need those. We're storing coordinates directly in the database when a user submits a store location, so the map is just rendering pins we already have.

Deployment was a separate problem. The blog is static and lives on GitHub Pages, but the app is MojoJS with SQLite, which means it needs a server running. We looked at Render and Railway. Both have free tiers and handle HTTPS through a reverse proxy automatically, which means we don't need to manage certificates ourselves. We chose Render for now because it deploys directly from the GitHub repo and the free tier is enough for a prototype with light traffic. The main limitation is that free tier instances spin down after inactivity, so the first load after a period of quiet takes a few seconds. That's acceptable for a demo but would be a problem in production.

On the GitHub side, we already had a GitHub Actions workflow running for the blog. We added a step to the app's workflow that runs the linter and integration tests before any deployment trigger. If those fail, nothing deploys. It's a simple version of continuous integration but it means a broken push doesn't reach the live app.

One thing we've been careful about is the config file. If we do add an API in future, keys go in config.yml which is in the .gitignore. The template already sets this up. It's an easy habit to form now and a painful one to fix after something accidentally lands in the repo history.
