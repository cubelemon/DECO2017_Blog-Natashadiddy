---
title: "How we'll know if it works: evaluation, accessibility, and responsibility"
week: 9
date: 2026-03-23
author: Natasha Png
summary: Thinking through how SEAblings will be tested, what accessibility means for our community, and what responsibilities come with storing user data.
tags:
  - accessibility
  - evaluation
  - testing
  - compliance
---

Building something is only half the job. Knowing whether it actually works for the people using it is the other half, and for SEAblings that question matters more than usual because we're building for a community with a specific cultural context.

Our plan for user testing is to run think-aloud sessions with students from South East Asian backgrounds at uni. We'll give them a task, like finding where to buy pandan leaves near campus or posting a recipe, and observe without helping. The goal isn't to validate that the app looks good. It's to find out whether the ingredient map is actually useful, whether the posting flow is too tedious, and whether someone unfamiliar with the app can figure out how to contribute. Three to five participants is enough to surface the most critical issues.

For performance, we'll use Lighthouse, which is built into Chrome DevTools and gives us a score across load time, accessibility, and best practices in one run. Our target is under one second load time for the feed and map pages, which is the brief's ideal threshold. The map in particular is a risk here since it's the most interactive part of the app.

![Evaluation plan diagram](assets/post5-evaluation.svg)

On accessibility, we're targeting AA compliance as required by the brief. In practice that means all images have alt text, colour contrast meets the 4.5:1 ratio for normal text, and the app is navigable by keyboard. We'll use WAVE or axe DevTools to audit this before submission. Responsive design across screen sizes is also non-negotiable, since a lot of our target users will be checking ingredient locations on their phone while they're actually at the shops.

The data responsibility side is something we've thought about carefully. Users are posting location data, real store names and suburbs. We're not collecting anything beyond what's needed for the app to function. Session handling is managed through BlaBla Corp's existing login system, which means we're not storing passwords ourselves. For cookies, our session cookie is strictly necessary for the app to work, so we don't need a consent banner for that specifically. If we were to add analytics later, that would change.

The "still available" confirmation mechanic is also a form of data responsibility, as it's how we keep community-submitted location data accurate without a moderation team. Users flag outdated pins, the community keeps the map honest. It's a design decision that doubles as a trust and integrity mechanism.
