---
title: "Structuring the app to work as a team"
week: 8
date: 2026-03-16
author: Natasha Png
summary: How we applied MVC and modular design to the SEAblings codebase, what the layout system looks like, and where the gaps still are.
tags:
  - modular design
  - MVC
  - architecture
  - templates
---

The lecture on modular design came at a useful point. We already had a rough sense of what the app needed to do but hadn't made deliberate decisions about how to structure the code so that multiple people could work on different parts at the same time.

The pattern we followed is MVC. Models handle all the database queries and nothing else. Getting a list of ingredient tips or inserting a new recipe lives in src/models/ and doesn't appear anywhere in the route logic. Controllers are the functions that handle incoming requests, pull from models, and pass data to views. Routes in index.ts are one line each. Views are the templates.

The layout that wraps every community page is defined once in views/layouts/hub.html.tmpl. It includes the sidebar nav with the current page marked, and every community page sets view.layout = 'hub' to get it. That one decision saved a lot of duplicated markup and means a change to the nav happens in one file rather than across every page.

HTMX fits into the modular structure in a specific way. The ingredient autocomplete on the recipe posting page uses it to query GET /api/ingredients as you type, swapping in just the dropdown results without touching the rest of the form. That's what modular UI actually means in practice: a self-contained interaction that doesn't depend on the state of the rest of the page.

Working this way made parallel development practical. The map page, the posting form, and the auth flow could all be built at the same time because each lives in its own view, controller, and model file. As long as the agreed route contracts stayed consistent, work on one part didn't block another.

What hasn't been built yet is a recipe detail page. The map is a standalone community page and the recipe feed lists recipes, but there is no view for an individual recipe. The map and a specific recipe are still two separate experiences. That gap is the biggest thing standing between what we have now and an app that feels connected end to end.
