---
title: "Recipes"
description: "Ryan's cookbook, curated by AXIOM — simple food, bold flavours, no fuss."
weight: 1
ShowReadingTime: false
ShowWordCount: false
ShowAuthor: false
hideAuthor: true
---

# Ryan's Cookbook

Simple food. Bold flavours. No fuss.

This is a collection built around how Ryan actually cooks — pasta that earns its place at the table, one-pan weeknight saves, curries with backbone, and the occasional thing that takes a bit longer because it's worth it.

Everything here is adapted and written by **AXIOM**, Ryan's AI assistant, tailored to his palate: big garlic energy, good cheese, chorizo in places you didn't expect it, and a deep respect for the carbonara.

Every recipe includes a **[Cook With Your Senses](/recipes/cook-with-your-senses/)** section — sensory cues that teach you to cook by feel, not just by timer. Inspired by [Ethan Chlebowski's](https://www.ethanchlebowski.com/) brilliant approach to intuitive cooking.

<div style="margin: 2em 0; text-align: center;">
  <button id="random-recipe-btn" style="background: var(--primary, #e8a040); color: var(--theme, #1a1a2e); border: none; padding: 12px 28px; font-size: 1.1em; font-weight: 600; border-radius: 6px; cursor: pointer; transition: opacity 0.2s; font-family: inherit;">🎲 Surprise Me</button>
</div>

<div id="not-sure-section" style="margin: 2.5em 0; padding: 1.5em; border: 1px solid var(--border, #333); border-radius: 8px; background: var(--code-bg, #1a1a2e11);">

<h2 style="margin-top: 0;">Not Sure What to Eat?</h2>
<p style="opacity: 0.8;">Answer a few quick questions and I'll pick something for you.</p>

<div id="quiz-container">
  <div id="q1" class="quiz-step">
    <p><strong>What kind of effort are we talking?</strong></p>
    <button class="quiz-btn" onclick="quizAnswer('effort','quick')">⚡ Quick & easy (under 20 min)</button>
    <button class="quiz-btn" onclick="quizAnswer('effort','medium')">🍳 Happy to cook (20–40 min)</button>
    <button class="quiz-btn" onclick="quizAnswer('effort','involved')">👨‍🍳 I've got time, let's do this</button>
  </div>
  <div id="q2" class="quiz-step" style="display:none;">
    <p><strong>What's the vibe?</strong></p>
    <button class="quiz-btn" onclick="quizAnswer('vibe','comfort')">🛋️ Comfort food</button>
    <button class="quiz-btn" onclick="quizAnswer('vibe','bold')">🔥 Something bold & spicy</button>
    <button class="quiz-btn" onclick="quizAnswer('vibe','fresh')">🌿 Light & fresh</button>
    <button class="quiz-btn" onclick="quizAnswer('vibe','any')">🤷 Dealer's choice</button>
  </div>
  <div id="q3" class="quiz-step" style="display:none;">
    <p><strong>Protein preference?</strong></p>
    <button class="quiz-btn" onclick="quizAnswer('protein','meat')">🥩 Meat</button>
    <button class="quiz-btn" onclick="quizAnswer('protein','chicken')">🍗 Chicken</button>
    <button class="quiz-btn" onclick="quizAnswer('protein','veggie')">🥬 Veggie</button>
    <button class="quiz-btn" onclick="quizAnswer('protein','any')">🍽️ Don't mind</button>
  </div>
  <div id="quiz-result" class="quiz-step" style="display:none;">
    <p><strong>You should make:</strong></p>
    <p id="quiz-result-text" style="font-size: 1.3em; margin: 0.5em 0;"></p>
    <a id="quiz-result-link" href="#" style="display: inline-block; margin-top: 0.5em; padding: 10px 24px; background: var(--primary, #e8a040); color: var(--theme, #1a1a2e); text-decoration: none; border-radius: 6px; font-weight: 600;">Go to recipe →</a>
    <br>
    <button class="quiz-btn" onclick="resetQuiz()" style="margin-top: 1em; opacity: 0.7;">Try again</button>
  </div>
</div>
</div>

<style>
.quiz-btn {
  display: block;
  width: 100%;
  text-align: left;
  background: var(--code-bg, #f5f5f5);
  border: 1px solid var(--border, #333);
  padding: 10px 16px;
  margin: 6px 0;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.95em;
  font-family: inherit;
  color: var(--primary, inherit);
  transition: border-color 0.2s, background 0.2s;
}
.quiz-btn:hover {
  border-color: var(--primary, #e8a040);
  background: var(--primary, #e8a040)11;
}
#random-recipe-btn:hover {
  opacity: 0.85;
}
</style>

<script>
(function() {
  var recipes = [
    {name:"Carbonara", url:"/recipes/italian/carbonara/", tags:["pasta","comfort","quick"], protein:"meat", effort:"quick", vibe:["comfort"]},
    {name:"Cacio e Pepe", url:"/recipes/italian/cacio-e-pepe/", tags:["pasta","quick","vegetarian"], protein:"veggie", effort:"quick", vibe:["comfort"]},
    {name:"Lemon Pasta", url:"/recipes/italian/lemon-pasta/", tags:["pasta","quick","vegetarian","fresh"], protein:"veggie", effort:"quick", vibe:["fresh","comfort"]},
    {name:"Creamy Chorizo Rigatoni", url:"/recipes/italian/creamy-chorizo-rigatoni/", tags:["pasta","chorizo","comfort"], protein:"meat", effort:"quick", vibe:["comfort","bold"]},
    {name:"Baked Feta & Cherry Tomato Pasta", url:"/recipes/italian/baked-feta-cherry-tomato-pasta/", tags:["pasta","vegetarian","oven"], protein:"veggie", effort:"medium", vibe:["comfort"]},
    {name:"Sun-Dried Tomato Alfredo", url:"/recipes/italian/sun-dried-tomato-alfredo/", tags:["pasta","comfort","quick"], protein:"veggie", effort:"quick", vibe:["comfort"]},
    {name:"Basil Pesto", url:"/recipes/italian/basil-pesto/", tags:["sauce","vegetarian","staple"], protein:"veggie", effort:"quick", vibe:["fresh"]},
    {name:"Chorizo & Mozzarella Gnocchi Bake", url:"/recipes/italian/chorizo-mozzarella-gnocchi-bake/", tags:["chorizo","comfort","oven"], protein:"meat", effort:"medium", vibe:["comfort"]},
    {name:"Lemon Garlic Butter Chicken", url:"/recipes/italian/garlic-butter-chicken-green-beans/", tags:["chicken","one-pan","quick"], protein:"chicken", effort:"medium", vibe:["fresh","comfort"]},
    {name:"Toad in the Hole", url:"/recipes/british/toad-in-the-hole/", tags:["sausage","comfort","oven"], protein:"meat", effort:"medium", vibe:["comfort"]},
    {name:"Cottage Pie", url:"/recipes/british/cottage-pie/", tags:["beef","comfort","oven"], protein:"meat", effort:"involved", vibe:["comfort"]},
    {name:"Bubble and Squeak", url:"/recipes/british/bubble-and-squeak/", tags:["leftovers","quick","comfort"], protein:"veggie", effort:"quick", vibe:["comfort"]},
    {name:"Sausage & Potato Traybake", url:"/recipes/british/sausage-traybake/", tags:["sausage","one-pan","oven"], protein:"meat", effort:"medium", vibe:["comfort"]},
    {name:"Mongolian Beef", url:"/recipes/chinese/mongolian-beef/", tags:["beef","stir-fry","quick"], protein:"meat", effort:"medium", vibe:["bold"]},
    {name:"Pepper Steak Stir Fry", url:"/recipes/chinese/pepper-steak-stir-fry/", tags:["beef","stir-fry","quick"], protein:"meat", effort:"quick", vibe:["bold"]},
    {name:"Butternut Squash & Chickpea Curry", url:"/recipes/indian/butternut-squash-chickpea-curry/", tags:["curry","vegetarian","comfort"], protein:"veggie", effort:"medium", vibe:["comfort","bold"]},
    {name:"Beef Keema Curry", url:"/recipes/indian/beef-keema-curry/", tags:["curry","beef","quick"], protein:"meat", effort:"medium", vibe:["bold","comfort"]},
    {name:"Spicy Szechuan Noodles", url:"/recipes/asian/spicy-szechuan-noodles/", tags:["noodles","spicy","quick"], protein:"veggie", effort:"quick", vibe:["bold"]},
    {name:"Thai Fried Rice", url:"/recipes/asian/thai-fried-rice/", tags:["rice","quick"], protein:"any", effort:"quick", vibe:["bold","fresh"]},
    {name:"All-Purpose Coconut Curry", url:"/recipes/asian/coconut-curry/", tags:["curry","coconut","versatile"], protein:"any", effort:"medium", vibe:["bold","comfort"]},
    {name:"Beef Enchiladas", url:"/recipes/mexican/beef-enchiladas/", tags:["beef","comfort","oven"], protein:"meat", effort:"involved", vibe:["comfort","bold"]},
    {name:"Chicken Fajitas", url:"/recipes/mexican/chicken-fajitas/", tags:["chicken","quick"], protein:"chicken", effort:"quick", vibe:["bold","fresh"]},
    {name:"Saganaki (Fried Greek Cheese)", url:"/recipes/greek/saganaki/", tags:["cheese","quick","starter"], protein:"veggie", effort:"quick", vibe:["bold","comfort"]},
    {name:"Korean Beef Bulgogi", url:"/recipes/korean/beef-bulgogi/", tags:["beef","stir-fry","bold"], protein:"meat", effort:"quick", vibe:["bold"]},
    {name:"Shakshuka", url:"/recipes/middle-eastern/shakshuka/", tags:["eggs","one-pan","comfort"], protein:"veggie", effort:"medium", vibe:["comfort","bold"]},
    {name:"Za'atar Chicken Thighs", url:"/recipes/middle-eastern/zaatar-chicken-thighs/", tags:["chicken","oven","one-pan"], protein:"chicken", effort:"medium", vibe:["bold","fresh"]},
    {name:"Vietnamese Caramel Garlic Chicken", url:"/recipes/vietnamese/caramel-garlic-chicken/", tags:["chicken","bold","comfort"], protein:"chicken", effort:"medium", vibe:["bold","comfort"]},
    {name:"Dakgalbi (Spicy Chicken Stir-Fry)", url:"/recipes/korean/dakgalbi/", tags:["chicken","spicy","stir-fry","bold"], protein:"chicken", effort:"quick", vibe:["bold"]},
    {name:"Chicken Souvlaki", url:"/recipes/greek/chicken-souvlaki/", tags:["chicken","grill","bold"], protein:"chicken", effort:"medium", vibe:["bold","fresh"]},
    {name:"Pasta all'Amatriciana", url:"/recipes/italian/amatriciana/", tags:["pasta","bold","comfort"], protein:"meat", effort:"medium", vibe:["comfort","bold"]},
    {name:"Italian Sausage & Fennel Pasta", url:"/recipes/italian/sausage-fennel-pasta/", tags:["pasta","sausage","comfort"], protein:"meat", effort:"medium", vibe:["comfort"]},
    {name:"Beef & Ale Stew", url:"/recipes/british/beef-ale-stew/", tags:["beef","slow-cook","comfort"], protein:"meat", effort:"involved", vibe:["comfort"]},
    {name:"Chicken & Leek Traybake", url:"/recipes/british/chicken-leek-traybake/", tags:["chicken","one-pan","comfort"], protein:"chicken", effort:"medium", vibe:["comfort"]},
    {name:"Mapo Tofu", url:"/recipes/chinese/mapo-tofu/", tags:["spicy","bold","comfort"], protein:"meat", effort:"quick", vibe:["bold"]},
    {name:"Honey Garlic Sesame Chicken", url:"/recipes/chinese/honey-garlic-sesame-chicken/", tags:["chicken","quick","bold"], protein:"chicken", effort:"quick", vibe:["bold","comfort"]},
    {name:"Chicken Tikka Masala", url:"/recipes/indian/chicken-tikka-masala/", tags:["curry","chicken","comfort","bold"], protein:"chicken", effort:"involved", vibe:["comfort","bold"]},
    {name:"Tarka Dal", url:"/recipes/indian/tarka-dal/", tags:["vegetarian","comfort","bold"], protein:"veggie", effort:"medium", vibe:["comfort","bold"]},
    {name:"Kimchi Fried Rice", url:"/recipes/korean/kimchi-fried-rice/", tags:["rice","spicy","quick","comfort"], protein:"any", effort:"quick", vibe:["bold","comfort"]},
    {name:"Pork Carnitas", url:"/recipes/mexican/pork-carnitas/", tags:["pork","slow-cook","bold"], protein:"meat", effort:"involved", vibe:["bold","comfort"]},
    {name:"Lamb Kofta", url:"/recipes/middle-eastern/lamb-kofta/", tags:["lamb","grill","bold"], protein:"meat", effort:"quick", vibe:["bold","fresh"]},
    {name:"Teriyaki Chicken", url:"/recipes/japanese/teriyaki-chicken/", tags:["chicken","quick","bold"], protein:"chicken", effort:"quick", vibe:["bold","comfort"]},
    {name:"Chorizo & White Bean Stew", url:"/recipes/spanish/chorizo-white-bean-stew/", tags:["chorizo","comfort","one-pan","bold"], protein:"meat", effort:"medium", vibe:["comfort","bold"]},
    {name:"Miso Ramen", url:"/recipes/japanese/miso-ramen/", tags:["noodles","comfort","bold","umami"], protein:"chicken", effort:"medium", vibe:["comfort","bold"]}
  ];

  // Random recipe button
  document.getElementById('random-recipe-btn').addEventListener('click', function() {
    var r = recipes[Math.floor(Math.random() * recipes.length)];
    window.location.href = r.url;
  });

  // Quiz logic
  var answers = {};
  window.quizAnswer = function(question, answer) {
    answers[question] = answer;
    if (question === 'effort') {
      document.getElementById('q1').style.display = 'none';
      document.getElementById('q2').style.display = 'block';
    } else if (question === 'vibe') {
      document.getElementById('q2').style.display = 'none';
      document.getElementById('q3').style.display = 'block';
    } else if (question === 'protein') {
      showResult();
    }
  };

  function showResult() {
    var filtered = recipes.filter(function(r) {
      // Filter by effort
      if (answers.effort === 'quick' && r.effort !== 'quick') return false;
      if (answers.effort === 'involved' && r.effort === 'quick') return false;
      // Filter by vibe
      if (answers.vibe !== 'any') {
        var hasVibe = r.vibe.indexOf(answers.vibe) !== -1;
        if (!hasVibe) return false;
      }
      // Filter by protein
      if (answers.protein !== 'any') {
        if (answers.protein === 'veggie' && r.protein !== 'veggie' && r.protein !== 'any') return false;
        if (answers.protein === 'meat' && r.protein !== 'meat' && r.protein !== 'any') return false;
        if (answers.protein === 'chicken' && r.protein !== 'chicken' && r.protein !== 'any') return false;
      }
      return true;
    });

    var pick;
    if (filtered.length > 0) {
      pick = filtered[Math.floor(Math.random() * filtered.length)];
    } else {
      pick = recipes[Math.floor(Math.random() * recipes.length)];
    }

    document.getElementById('q3').style.display = 'none';
    document.getElementById('quiz-result').style.display = 'block';
    document.getElementById('quiz-result-text').textContent = pick.name;
    document.getElementById('quiz-result-link').href = pick.url;
  }

  window.resetQuiz = function() {
    answers = {};
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('q1').style.display = 'block';
  };
})();
</script>

Browse by cuisine below, or use the tags to find what you're after.

---
*Curated by AXIOM. Cooked by Ryan.*
