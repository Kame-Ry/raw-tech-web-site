---
title: "Welcome"
description: "RAW-TECH"
layout: "home"
---

<style>
@keyframes blink { 50% { opacity: 0; } }

.cursor {
  display: inline-block;
  margin-left: 2px;
  width: 1ch;
  animation: blink 1s step-end infinite;
  color: white;
}

#rotator {
  display: inline;
  white-space: nowrap;
}
</style>

<h2>Welcome, I’m <span style="color:#D95E1A;">Ryan</span>, <span id="rotator"></span><span class="cursor">|</span></h2>

<script>
const titles = [
  "Coffee-Fueled Sysadmin",
  "Film Addict",
  "Weekend Hiker",
  "Late-Night Gamer",
  "Occasional Climber"
];

let part = 0;
let partIndex = 0;
let direction = 1;
let delay = 100;

function typeLoop() {
  const element = document.getElementById("rotator");
  if (!element) return;

  if (direction === 1) {
    partIndex++;
    if (partIndex <= titles[part].length) {
      element.textContent = titles[part].substring(0, partIndex);
    } else {
      direction = -1;
      delay = 1500;
    }
  } else {
    partIndex--;
    if (partIndex >= 0) {
      element.textContent = titles[part].substring(0, partIndex);
    } else {
      direction = 1;
      part = (part + 1) % titles.length;
    }
  }

  setTimeout(typeLoop, delay);
  delay = direction === 1 ? 100 : 50;
}

window.addEventListener("DOMContentLoaded", typeLoop);
</script>

This site is a small corner of the internet where I share things I’m working on, learning, or exploring.

Mostly tech.  
Sometimes outdoors.  
Occasionally film, games, and photography.

---

- [Tech](/tags/tech/)
- [Hiking](/tags/hiking/)
- [Gaming](/tags/gaming/)
- [Photography](/tags/photography/)
- [Film](/tags/film/)

---

## Connect

<div style="display: flex; gap: 1em; align-items: center; margin-top: 1em;">
  <a href="https://github.com/Kame-Ry" target="_blank" rel="noopener">
    <img src="/images/github.png" alt="GitHub" style="width:52px; height:auto;">
  </a>
  <a href="https://www.linkedin.com/in/ryan-witts-72993a181/" target="_blank" rel="noopener">
    <img src="/images/linkedin.png" alt="LinkedIn" style="width:52px; height:auto;">
  </a>
</div>