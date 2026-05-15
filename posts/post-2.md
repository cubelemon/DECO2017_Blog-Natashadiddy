---
title: "From a shared frustration to a product idea"
week: 7
date: 2026-03-09
author: Natasha Png
summary: How a conversation about tapioca in Sydney became the concept for SEAblings, and what the core application flow looks like.
tags:
  - concept
  - application flow
  - SEA desserts
  - community
---

We'd been calling ourselves SEAblings from the start. Our team, Malaysian, Thai, Vietnamese, bonded early over food. We'd trade snacks in tutorials and talk about the desserts we grew up with. So when we pivoted away from BrewHub, the answer came from something I'd actually experienced.

I mentioned wanting to make a tapioca dessert from home, something my family makes in Malaysia, and not being able to find fresh tapioca anywhere in Sydney. It sounds small but it's a genuinely frustrating problem. The knowledge of where to find these ingredients exists, it's just scattered across Facebook groups, word of mouth, and personal experience. There's no central place for it.

That became our idea. SEAblings is a community hub where members post South East Asian dessert recipes and share where they sourced the ingredients, down to the specific store and suburb. Those locations get pinned on an interactive map. When someone views a recipe, they can see exactly where in Sydney they can find each ingredient right now, confirmed by the community.

![SEAblings system map](assets/post3-system-map.svg)

What makes this different from a recipe site is the ingredient map. The recipe is the context, but the map is the utility. Someone could search for pandan leaves and find every community-confirmed store in Sydney without needing to know a single recipe. That's the feature the community can't get elsewhere, and it's the one that justifies building this as its own hub rather than just posting in a Facebook group.

Thinking through the application flow made this concrete. A user lands on the feed, browses recipes, and clicks into one. They see the recipe and a map showing where to buy each ingredient nearby. If they want to contribute, they post their own recipe and optionally add a store location for any ingredient. Other users confirm or flag those pins over time. That loop is the whole product: browse, find, cook, contribute back.

The core functional requirement follows directly from that flow. The app needs to let users post recipes with ingredient locations, surface those locations on a map, and let the community keep that map accurate. Everything else is secondary to making that work.
