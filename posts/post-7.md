---
title: "Three ways to know if it's working"
week: 11
date: 2026-04-07
author: Natasha Png
summary: Applying mechanical testing, user testing, and analytics thinking to SEAblings as we bring the pieces together.
tags:
  - testing
  - integration
  - analytics
  - accessibility
---

We're at the point where the different parts of the app are being connected and the question of whether it actually works has become concrete. There are three distinct ways to answer that question and they each reveal something different.

The first is mechanical: does the code do what we said it would? Right now we've run the tests that came with the project template using npm run. Those cover the auth flow and file storage, and they pass. We still need to write our own integration tests for the two routes that matter most for our features: POST /community/post, which should create records in both the recipes and ingredient_tips tables, and GET /api/ingredient-tips, which should return the correct location data for the map. The backwards design approach we want to follow is to write a specific, testable assertion for each feature before writing the code. Something like "GET /api/ingredient-tips returns a 200 with a location array when the database has a tip for that ingredient" gives us a clear definition of done and keeps scope from expanding mid-feature. That's the next step on the mechanical side.

The second lens is user effectiveness. We ran think-aloud sessions in the week 11 tutorial, giving participants two tasks: find where to buy a specific ingredient near USYD, and post a recipe with a store location. Two specific problems came out of it, one per page.

On the map page, there's a banner and a set of buttons that appear above the map with no functionality attached to them yet. Participants tried them, got no response, and lost confidence in the page. The map itself works, but the surrounding UI implies features that aren't there yet. The fix for MVP is to remove the non-functional elements rather than build them out. The search bar also had no dropdown or suggestions, so participants typed into it with no feedback on what they were searching or whether anything matched. Most gave up on it quickly.

On the recipe posting page, the bigger issue was around ingredient locations. When you add an ingredient to a recipe, the form gives no indication of whether that ingredient already has a location in the database or whether you need to add one. Pinning a location requires manual input, and there is no map on the page to reference while doing it. On top of that, the location has to be typed in separately for every ingredient, with no search or place autocomplete. Participants were unsure whether they were duplicating an existing pin and had no way of knowing what format the location field expected.

Both of those issues only became visible when someone unfamiliar with the app tried to complete a real task. That is what user testing surfaces that code review alone does not.

The third lens is in-the-wild behaviour. The "still available" confirmation mechanic we originally planned as an analytics source is still in the design phase. When it gets built, the question before collecting anything will be: what decision does this data enable? For this feature the answer is straightforward, it tells us which pins are going stale and should be deprioritised. That justifies collecting it. For anything else, we would need to answer the same question first.

On accessibility, we haven't run a formal audit yet. WCAG AA is the target and the plan is to use axe DevTools before submission. There are aria labels in the nav and keyboard handlers in the ingredient dropdown already, and a full pass on contrast, alt text, and screen reader output is still to come.
