---
title: "Building a Apache Launchpad for My Homelab"
date: 2025-07-08
tags: ["web development", "tech", "apache"]
summary: "Building a Dockerised Apache Launchpad for My Homelab"
type: post
cover:
  image: "/images/apache/launchpadtitle.png"
  alt: "Terminal window open beside a Hugo website preview"
  relative: false
  hiddenInList: false
  hiddenInSingle: true
  responsiveImages: true
draft: false
---

## Why I Built It

I wanted to have a go at spinning up my own self-hosted website using Apache on my homelab. Partly out of curiosity, partly to test its usability and see what it’s like to get a basic web presence running locally. It was also a useful dry run for future internal tools or potential web-based projects.

At some point, the homelab spirals into tab chaos. Plex here, Radarr there, Proxmox status hidden behind five bookmarks. I wanted something simple a browser-based command centre that lived entirely within my network and made my life less fragmented. Obviously, I have homepage as my "official" solution to this problem, but I wanted to see what it would look like to create my own, stripped back version with a similar style and feel to my official website. 

No flashy monitoring stack. No Grafana. No Kubernetes. Just a quiet, reliable dashboard that would load fast, and show what’s up.

And because I enjoy suffering a little, I built it myself.

---

## The Goal

I wanted a launchpad that could:

* Show me what services are running (and whether they’re alive)
* Link to internal tools and utilities
* Let me write and keep track of checklist items
* Let me check disk usage at a glance
* Write Markdown locally without opening VS Code
* Be styled similar to my official website

---

## Serving It All – With Dockerised Apache

I spun up a basic Apache HTTPD container using Docker. I didn’t need a dynamic app server or fancy routing—just a place to dump HTML, CSS, and some lightweight JavaScript.

Here’s what the container looks like:

```yaml
services:
  apache:
    image: httpd:latest
    container_name: apache
    ports:
      - "8080:80"
    volumes:
      - /mnt/ssd-linux/launchpad:/usr/local/apache2/htdocs/
    restart: unless-stopped
```

There’s no magic here. No TLS termination. It doesn’t even have a domain name. It just listens on `8088` locally, and I get to it via Tailscale (`http://docker-host.ts.net:8088`). That’s it.

Everything lives in `/mnt/ssd-linux/apache`. It’s persistent, clean, and mapped straight into Apache’s document root.

---

## What It Looks Like

The homepage is a grid of cards, each representing a service: Plex, Tautulli, Sonarr, Radarr, Uptime Kuma, Portainer, and so on. Each card includes an icon, title, and a tiny green dot that tells me whether it’s reachable.

That green dot? It’s powered by simple JavaScript that pings the service's IP or port. If it responds, it adds a `.online` class and turns green. If not, it stays dead and grey.

At the top is a search bar that filters services live, and a “Toggle All” button to collapse or expand all categories.

![Launchpad Screenshot](/images/apache/launchpad.png)

---

### Disk Usage Status

Every 30 minutes, a cronjob runs this delightful bit of bash:

```bash
#!/bin/bash
OUTPUT_FILE="/mnt/ssd-linux/logs/sys-status/disk.html"

{
  echo "<html><body><pre>"
  echo "Disk Usage Check — $(date)"
  echo ""
  df -h | grep -E '/mnt/(hdd|plex-media|ssd-linux)' || echo "⚠ No /mnt/ mounts found."
  echo "</pre></body></html>"
} > "$OUTPUT_FILE"
```

The result? A browsable HTML dump of disk usage, readable in less than two seconds. If you think that’s janky, you’re absolutely right, but it’s fast, visible, and doesn’t rely on some bloated container chewing RAM just to tell me `/dev/sda` is full.

---

### Markdown Editor

Sometimes I want to jot notes without launching a full IDE. The Markdown editor is a local HTML page using `marked.js` to live-render text from a `<textarea>` into preview. It doesn’t save anything. There’s no backend. It’s just a scratchpad for writing. I’ve used it to draft trip plans, and write internal docs.

Not as pratical, but was still interesting to learn how online markdown editors/previewers work. 

![Markdown Editor](/images/apache/markdown.png)

---

### HTML Checklists

One of the more practical parts of this launchpad is the **Checklist Hub**. It’s a clean, minimal UI that links out to individual checklists each one fully written in HTML, with collapsible sections, checkboxes, and a percentage tracker that updates as you tick things off.

Clicking a card opens a full checklist page, complete with sections, toggle states, and a reset button. There’s also a handy link back to the hub, and from there, back to the main launchpad.

It’s fast and practical way better for bulk planning than something like Google Keep. The layout is clearer, items aren’t buried under endless scrolling, and there’s no login. That said, it’s static editing requires updating HTML manually, and there’s no sync. Making it a fancy digital paperweight.

Still, for an offline, local-only setup? It’s great.

![Checklist Hub](/images/apache/checklisthub.png)

![Ullswater Checklist](/images/apache/checklist.png)

---

## Security Notes

The launchpad isn’t exposed to the internet. It runs on an internal Docker network, port 8088, and is only reachable via Tailscale. I’ve locked it down with UFW, and there’s no external DNS entry. Even the green dots that show service status are local-only pings.

---

## Final Thoughts

Sometimes it’s fun to overengineer things. This wasn’t one of those times.

This launchpad is small and stupid. It gives me exactly what I needed, some visibility into my environment, fast access to tools, and a little place to dump thoughts.

If you’re juggling multiple services and your only dashboard is “ten Chrome tabs and muscle memory,” build yourself a local launchpad. Keep it small. Keep it fast.
