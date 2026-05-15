---
title: "Designing the data: why the map changes everything"
week: 9
date: 2026-03-23
author: Natasha Png
summary: The technical decisions behind SEAblings, and why the ingredient map shaped how we structured everything.
tags:
  - data
  - technical decisions
  - map
  - ERD
---

Once we committed to the ingredient map as our core feature, it changed how we thought about the data structure. The map isn't just a nice visual, which is what makes it actually useful, and that meant it had to be a first-class part of the database design, not an afterthought.

The key decision was separating ingredients from their locations. At first it seemed natural to store "pandan leaves from Viet Hoa, Cabramatta" as one record attached to a recipe. But that falls apart quickly. If ten different users post recipes using pandan leaves, you'd end up with ten separate location records for the same ingredient, duplicated, inconsistent, and impossible to map cleanly.

The design intent was for ingredients to exist once in a shared table, with locations in a separate table linked back to them, and recipes referencing ingredients through a junction table. In practice we got partway there: the ingredients table exists and powers a live autocomplete search when posting a recipe, and store locations live in their own table. What isn't wired up yet is the junction layer. Recipes currently store their ingredients as a plain text field rather than as foreign keys into the ingredients table. That gap means a new store pin doesn't automatically associate with all existing recipes that use that ingredient the way we designed. The architecture is right on paper and the tables are there; closing that join is what's still needed.

![SEAblings entity relationship diagram](assets/post4-erd.svg)

To get the map populated with real data, we wrote three SQL seed files, one for each SEA cuisine in the app: Malaysian, Vietnamese, and Thai. Separating them by cuisine was a deliberate choice. Each file reads as its own community, with users, recipes, ingredients, and store locations that belong together. The Malaysian seed has three users, nine recipes, and 21 shared ingredients, all linked through a recipe_ingredients junction table that stores the ingredient, quantity, and unit for each recipe. The ingredient_locations table ties each ingredient to real Sydney stores with suburb, latitude, longitude, and a confirmed_count that tracks how many community members have verified the stock. Cabramatta, Haymarket, Eastwood, and Burwood all appear across the three files because those are genuinely where these ingredients are found. Writing the seed data this way also stress-tested the schema before the UI was built. If the structure was awkward to write seed data for, it would be awkward to query. It also gave us something real to render on the map from day one rather than placeholder pins.

We chose to build the map feature over a simple store list because a list is static and hard to scan spatially. A map matches how people actually think about getting somewhere, what's near me, what's on my way. It also scales better as the community adds more pins. HTMX ended up being most useful in a different place than I initially expected. It powers the live ingredient autocomplete during recipe creation. As you type a name, it queries the ingredients table and updates the dropdown without a page reload. The map itself uses fetch() to pull location data from a JSON endpoint, which keeps it flexible and decoupled from the server templating.

For our MVP, we've identified three things that actually have to work: users can post a recipe with ingredients and a store location, that location appears on the map, and other users can confirm or flag whether the stock is still available. The festive collections page and location-aware filtering are features we want but aren't blocking the core experience.

Scoping this way was important. We're building on MojoJS, SQLite, and HTMX, a stack with a learning curve, and trying to build everything at once would mean building nothing well.

