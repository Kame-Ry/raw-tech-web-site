---
title: "Film Affinity: Building a Film Critique Generator"
date: 2025-03-14
summary: "A Python-powered app that scrapes Letterboxd ratings and generates AI-based film critiques with GPT-3.5."
type: post
tags: ["film", "ai", "python", "tech"]
cover:
  image: "/images/Letterboxd.png"
  alt: "Film Critique Generator UI"
  relative: false
  hiddenInList: false
  hiddenInSingle: false
  responsiveImages: true
draft: false
---

------------

The **Film Critique Generator** is a Python app I built to take your [Letterboxd](https://letterboxd.com/Wittsy/) film ratings and turn them into personalized critiques using GPT-3.5. It scrapes your ratings, runs them through some AI magic, and spits out a neat little write-up of your movie taste. Quick, nerdy, and surprisingly insightful.

---

## Project Overview

This tool does all the heavy lifting:

* Pulls your film ratings from Letterboxd.
* Runs them through GPT-3.5 to write custom critiques.
* Saves the output as both `.txt` and `.html` for easy sharing or archiving.

---

## Core Functionality

* **Data Extraction**: Grabs your ratings from Letterboxd.
* **AI-Powered Analysis**: Feeds your data into GPT-3.5 for critique generation.
* **GUI Frontend**: Simple, no-fuss interface to run it.
* **Output Files**: Saves results as text and HTML files.

---

## Setup Instructions

1. Grab your OpenAI API key (GPT-3.5).
2. Download and launch `Film_Affinity.exe`.
3. Pop in your Letterboxd username and API key.
4. Hit **Generate Critique**.
5. Review the output in the generated files.

---

## How It Works

### Fetching Ratings

```python
def fetch_page(username, page):
    url = f"https://letterboxd.com/{username}/films/page/{page}/"
    response = requests.get(url)
    return response.text if response.status_code == 200 else None
```

### Scraping the Data

```python
def scrape_letterboxd(username):
    ratings = []
    for page in range(1, 5):
        content = fetch_page(username, page)
        ratings.extend(parse_ratings(content))
    return ratings
```

### Generating Critiques with GPT-3.5

```python
def generate_film_critique(film_ratings):
    prompt = f"Based on these ratings, generate a personalized critique: {film_ratings}"
    response = openai.Completion.create(engine="gpt-3.5-turbo", prompt=prompt, max_tokens=500)
    return response['choices'][0]['text']
```

### Outputting as HTML

```python
def generate_html_critique(critique_text):
    return f"""
    <html>
    <head><title>Film Critique</title></head>
    <body><h1>Your Personalized Film Critique</h1><p>{critique_text}</p></body>
    </html>
    """
```

---

## Final Thoughts

Film Affinity is a fun little blend of Python, scraping, and AI that turns your movie ratings into something more reflective. If you’re into data-driven media insights (or just like seeing your film taste summed up by a robot), give it a try.

[Film Affinity – Python App](https://github.com/Kame-Ry/Film_Affinity-Python-App)

