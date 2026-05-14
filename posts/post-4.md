---
title: "Designing the data: why the map changes everything"
week: 8
date: 2026-03-16
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

Instead we designed it so ingredients exist once in a shared table, locations exist in a separate table linked to ingredients, and recipes reference ingredients through a join table. This means when a new store pin is added by any community member, every recipe that uses that ingredient automatically benefits. That's a deliberate design choice, not just a tidy structure, which is what makes the community data compound over time.

![SEAblings entity relationship diagram](assets/post4-erd.svg)

We chose to build the map feature over a simple store list because a list is static and hard to scan spatially. A map matches how people actually think about getting somewhere, what's near me, what's on my way. It also scales better as the community adds more pins. Filtering by ingredient on the map, without a full page reload, is where HTMX earns its place in the stack, which keeps the interaction feeling responsive without us needing to build a full front-end framework.

For our MVP, we've identified three things that actually have to work: users can post a recipe with ingredients and a store location, that location appears on the map, and other users can confirm or flag whether the stock is still available. The festive collections page and location-aware filtering are features we want but aren't blocking the core experience.

Scoping this way was important. We're building on MojoJS, SQLite, and HTMX, a stack with a learning curve, and trying to build everything at once would mean building nothing well.
