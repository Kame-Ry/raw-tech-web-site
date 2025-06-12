---
title: "Building RAW-TECH: From Hand-Coded HTML to Hugo"
date: 2025-06-12
tags: ["web development", "tech"]
summary: "building and rebuilding my personal website—from pure HTML/CSS to Hugo with PaperMod."
type: post
cover:
  image: "/images/Logo.png"
  alt: "Terminal window open beside a Hugo website preview"
  relative: false
  hiddenInList: false
  hiddenInSingle: true
  responsiveImages: true
draft: false
---

## Prologue: The Impulse to Build Something Truly Mine

This was my **first proper attempt** at building my own website. I’d dabbled with HTML a few times—simple static pages with unstyled text, maybe the occasional `<br>` tag or `<center>`. But nothing serious.

This time, I wanted to make something meaningful. A site that reflected my interests, showcased my projects, and gave me control over every aspect from how it looked to how it was deployed.

When the site first went live, it felt surreal. I checked it on every device I had: my laptop, partner’s mobile, iPad. It brought a quiet kind of joy. A **technical landmark**, a **digital stamp** on the world. Sure, it was buggy, slow, and far from optimized but it was *mine*, out there for anyone to see.

## Chapter 1: The Frankenstein HTML Site

The original raw-tech.co.uk wasn’t pretty. It was hand-built with HTML, CSS, and vanilla JS. No frameworks, no tooling.

Everything was **hard-coded**. Want to update a project? That’s a new HTML file. Want tags? Manually copy/paste tag buttons and JavaScript filters. Want SEO? Hope you remembered your `<meta>` tags.

I was using Fasthosts to manage the domain "raw-tech.co.uk". I initially considered Vercel (I’d used it for my weather app), but eventually discovered that **GitHub Pages offers free static site hosting with HTTPS and custom domain support**. No build quotas, no ads, and I could push updates via Git. That sealed it. I set up DNS through Fasthosts and pointed my site to GitHub’s servers.

## Chapter 2: Questioning My Stack

Eventually, I asked myself: *Why am I doing this the hard way?* Every update felt like surgery. My repo was cluttered with `.html` and `.js` files for every page. If I wanted a new layout, I had to edit 5–10 files.

A conversation with someone who works in frontend dev helped shift my thinking:

> "It's admirable to build a site from scratch. But most professionals, especially when time is tight, use tools like Hugo. You still have full control over style and layout but you let Hugo handle the backend magic."

It wasn’t about shortcuts. It was about using the right tools so I could focus on the **content**, not the wiring.

I started looking into static site generators. I’d heard of Jekyll and Hugo. Hugo barely won out.

## Chapter 3: Hugo with PaperMod – A New Era Begins

Once I chose [Hugo](https://gohugo.io/) as the base, I went with [PaperMod](https://github.com/adityatelange/hugo-PaperMod) as the theme.

PaperMod is:

* Fast, minimal, and **actively maintained**
* Practical. No faff.

I liked my previous “loud” homepage, but PaperMod’s clean, minimalist approach won me over. It’s *practicality incarnate*, exactly my style.

### The Migration Checklist

Here’s what I tackled:

* Set up the repo with Hugo and PaperMod  
* Convert each project into Markdown  
* Organise `/content/` structure (e.g. posts, projects, photography)  
* Customise the homepage  
* Add SEO metadata  
* Configure GitHub Pages deployment  

I rebuilt it all. Out with the old, in with the new.

### It's Alive!

raw-tech.co.uk was live, served over HTTPS, built with Hugo, and deployed through GitHub.

## Chapter 5: What I Had to Let Go

### Contact Forms

I tried integrating a contact form using a free mail host (Zoho), but it quickly became frustrating. I couldn’t forward emails to my primary inbox, and I hate having redundant accounts. I prefer **one of everything**... one email, one purpose-built system. So, the form was dropped.

### My Custom Tag Filter System

This one hurt. I’d built a surprisingly advanced JavaScript tag filter. Tags were clickable, well-formatted, and filtered posts across the site. But pagination was a mess, and it didn’t scale. 


### Every new post meant I had to:

* Update the tag system  
* Duplicate and move files  
* “Fake” dynamic behavior with sketchy JS hacks  

It worked... barely. And it constantly broke.

### With Hugo + PaperMod:

I create a Markdown file, add front matter, drop it in `/content/`, push to GitHub—and I’m done. I probably only understand **40%** of what’s going on behind the scenes, but it works. So I left it.

## Chapter 6: Lessons Learned

### Don’t Overcommit to Raw HTML

It’s a great way to learn, but not sustainable for updates. A static site generator balances structure and flexibility. Learn HTML, but don’t rely on it entirely.

### Don’t Ignore Tooling

I avoided build tools early on, thinking I was “keeping it simple.” I ended up doing *more* manual work, not less.

### Automate Deployment Early

Using GitHub Actions or deploy hooks prevents mistakes and saves time.

### Embrace Markdown

Writing in Markdown is *so much easier* than juggling HTML templates. Plus, Hugo brings image processing, front matter, and more.

## Epilogue: From Chaos to Clarity

What began as a hardcoded experiment became a maintainable, scalable digital home. Hugo gave me structure. PaperMod gave me a visual foundation. GitHub Pages made deployment effortless.

And through it all I never burned out. I loved it. I spent hours tinkering. Sometimes for no reason. It was therapeutic.

That spark’s faded a bit as other projects have taken priority but this site remains my **slice of sanctuary**. A place to write, rant, archive, and create.

## Final Word: What is RAW-TECH?

It’s a double meaning:

* **RAW** are my initials.  
* **TECH** is what I do.  

But it’s also a mission statement: *Raw Technology*. Unfiltered, unrefined, foundational. It’s who I am—as a person and as a maker. Whether it stays a personal blog or becomes something more, RAW-TECH is **me**.

---

**Github Repo:** [RAW-TECH](https://github.com/Kame-Ry/raw-tech-web-site)

*Built with Hugo. Styled by PaperMod. Maintained by moi.*