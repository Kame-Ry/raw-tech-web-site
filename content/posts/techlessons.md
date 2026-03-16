---
title: "Lessons from a technician"
date: 2026-03-16
tags: ["tech", "IT", "Education"]
summary: "Lessons learned over years working in IT: documentation, automation, security fundamentals, and the habits that quietly make systems more reliable."
type: post
cover:
  image: "/images/Post_images/techlessons.png"
  alt: "Illustration representing a technician managing complex systems"
  relative: false
  hiddenInList: false
  hiddenInSingle: true
  responsiveImages: true
draft: false
---

## Introduction

I entered IT because I enjoy solving problems.

Early in my career the most rewarding moments often involved troubleshooting something complex: restoring a failed server, recovering corrupted data, or fixing a network outage .

Those moments feel heroic.

Systems come back online.  
Users are grateful.  
Problems are solved.

But over time something becomes clear.

The technicians who build the most reliable environments are rarely the ones performing the most dramatic recoveries.

They are the ones quietly designing systems where those failures happen less often in the first place.

This article is a reflection on lessons that took me years to understand. Many of them came from mistakes, shortcuts and assumptions that seemed reasonable at the time.

None of these ideas are revolutionary. Most experienced engineers already know them.

But they are the principles I wish someone had emphasised when I first started working in IT.

---

## Documentation Matters More Than Hero Troubleshooting

Every IT environment eventually develops a **hero technician**.

When something breaks, everyone calls the same person. They know where everything lives. They remember which server runs which service and why a configuration was changed three years ago.

The problem is that this knowledge usually lives in one place: their head.

When environments rely on memory instead of documentation, they become fragile.

<div style="margin:1.6rem 0; border:1px solid #d85d1c; border-radius:12px; overflow:hidden;">

<div style="background:#d85d1c; color:white; padding:0.6rem 1rem; font-weight:600;">
Two very different IT environments
</div>

<div style="display:grid; grid-template-columns:1fr 1fr; gap:0;">

<div style="padding:1rem; border-right:1px solid #d85d1c;">
<strong>Memory-driven infrastructure</strong>

<ul style="padding-left:1rem;">
<li>One technician knows everything</li>
<li>Troubleshooting takes hours</li>
<li>Changes feel risky</li>
<li>New staff struggle to learn the system</li>
</ul>

</div>

<div style="padding:1rem; background:white; color:#d85d1c">
<strong>Documented infrastructure</strong>

<ul style="padding-left:1rem;">
<li>Multiple people understand the system</li>
<li>Problems are diagnosed quickly</li>
<li>Infrastructure evolves safely</li>
<li>Knowledge persists when people leave</li>
</ul>

</div>

</div>
</div>

Documentation rarely feels exciting.

But over time it quietly becomes one of the most valuable assets in any IT environment.

---

## Automation Beats Manual Skill

Early in my career I spent huge amounts of time doing things manually.

Building machines.  
Creating accounts.  
Deploying software.  
Checking logs.

At the time that felt like productivity.

Eventually you realise manual processes do not scale.

As environments grow, repetitive tasks begin to consume the majority of your time. Automation changes that completely.

A few small scripts or management tools can quietly remove hours of routine work every week.

Examples appear everywhere in real environments.

- Automatically provisioning user accounts when new staff or students join  
- Deploying applications across hundreds of machines without visiting each one  
- Patching devices automatically overnight instead of manually checking updates  
- Generating system health reports instead of manually reviewing logs  
- Alerting technicians when disks or certificates are about to expire  
- Automatically enrolling devices into management systems when they are first powered on  

None of these tasks are technically difficult. But they become extremely time-consuming when repeated hundreds or thousands of times.

Over the lifetime of an environment, automation compounds.

One script that saves ten minutes a day will save more than **60 hours of technician time each year**.

That time can then be spent improving infrastructure instead of repeating routine tasks.

---

## Security Fundamentals Are Often Ignored

Most security incidents are not sophisticated.

They happen because basic practices are missing.

Across many environments the same problems appear repeatedly:

- shared administrator accounts  
- systems that have not been patched for months  
- flat internal networks with no segmentation  
- services exposed unnecessarily to the internet  

These problems rarely appear all at once. They accumulate slowly as environments evolve.

<div style="margin:1.6rem 0; padding:1rem 1.2rem; border-left:4px solid #d85d1c; background:#fff8f5; color:#d85d1c">

<strong>A common pattern in real environments</strong>

Systems are built correctly at the start.  
Over time small changes are made.  
Documentation falls behind.  
Temporary fixes become permanent.

Eventually the environment no longer resembles the original design.

</div>

Security improves dramatically when teams consistently address the fundamentals.

The **<a href="https://www.ncsc.gov.uk/collection/10-steps" target="_blank" rel="noopener">NCSC 10 Steps to Cyber Security</a>** framework exists largely because those fundamentals matter more than complex tools.

---

## Backups Are Still Broken in 2026

One of the most uncomfortable truths in IT is how many backup systems do not actually work.

Backups fail silently. Storage fills up. Jobs stop running.

Everything appears fine until the moment data is actually needed.

<div style="margin:1.6rem 0; border:1px solid #d85d1c; border-radius:12px; overflow:hidden;">

<div style="background:#d85d1c; color:white; padding:0.6rem 1rem; font-weight:600;">
Backup maturity
</div>

<div style="padding:1rem;">

<strong>Level 1 - False confidence</strong>  
Backups exist but restoration has never been tested.

<strong>Level 2 - Monitored backups</strong>  
Backup jobs are checked and failures investigated.

<strong>Level 3 - Recovery ready</strong>  
Restoration procedures are tested regularly and documented.

</div>

</div>

A backup strategy is only complete when recovery has been verified.

---

## Monitoring Prevents Most Emergencies

Many outages follow a predictable pattern.

A disk fills up.  
A certificate expires.  
A service stops responding.

Users discover the problem first.

Monitoring reverses this.

<div style="margin:1.6rem 0; border:1px solid #d85d1c; border-radius:12px; padding:1.2rem;">

<strong>How incidents unfold</strong>

<div style="margin-top:0.7rem; display:grid; grid-template-columns:1fr 1fr; gap:1rem;">

<div>

<strong>Reactive environment</strong>

1. Issue occurs  
2. Users report outage  
3. Technician investigates  
4. Service restored hours later

</div>

<div>

<strong>Monitored environment</strong>

1. Monitoring detects anomaly  
2. Alert triggered automatically  
3. Technician investigates early  
4. Issue resolved before disruption

</div>

</div>

</div>

Monitoring rarely receives much attention.

---

## The Most Important Skill Is Systems Thinking

Over time the biggest shift in perspective is understanding that IT is not about individual machines.

It is about systems.

Servers, networks, identity platforms, security controls and applications all interact with each other.

Small design decisions can have large downstream effects.

Technicians who understand these relationships build more stable environments.

<div style="margin:1.8rem 0; border:1px solid #d85d1c; border-radius:12px; overflow:hidden;">

<div style="background:#d85d1c; color:white; padding:0.6rem 1rem; font-weight:600;">
Compound Skills in IT
</div>

<div style="padding:1.4rem; font-size:0.95rem;">

<div style="margin-bottom:0.5rem; font-weight:600;">Foundations</div>

<div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.9rem;">
<div style="padding:0.5rem 0.8rem; border:1px solid #d85d1c; border-radius:8px;">Documentation</div>
<div style="padding:0.5rem 0.8rem; border:1px solid #d85d1c; border-radius:8px;">Monitoring</div>
<div style="padding:0.5rem 0.8rem; border:1px solid #d85d1c; border-radius:8px;">Backups</div>
</div>

<div style="margin-bottom:0.5rem; font-weight:600;">Operational Skills</div>

<div style="display:flex; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.9rem;">
<div style="padding:0.5rem 0.8rem; border:1px solid #d85d1c; border-radius:8px;">Automation</div>
<div style="padding:0.5rem 0.8rem; border:1px solid #d85d1c; border-radius:8px;">Security</div>
<div style="padding:0.5rem 0.8rem; border:1px solid #d85d1c; border-radius:8px;">Device Management</div>
</div>

<div style="margin-bottom:0.5rem; font-weight:600;">System Design</div>

<div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
<div style="padding:0.6rem 0.9rem; border:2px solid #d85d1c; border-radius:9px; font-weight:600;">Identity & Access</div>
<div style="padding:0.6rem 0.9rem; border:2px solid #d85d1c; border-radius:9px; font-weight:600;">Networking</div>
<div style="padding:0.6rem 0.9rem; border:2px solid #d85d1c; border-radius:9px; font-weight:600;">Infrastructure Architecture</div>
</div>

<div style="margin-top:1rem; font-size:0.85rem; color:#666;">
Each skill reinforces the others. Over time they compound into environments that are easier to maintain, easier to secure, and far more resilient.
</div>

</div>

</div>

---

## Final Thoughts

Early in your career it is easy to believe that technical excellence comes from solving difficult problems quickly.

The best technicians build environments where those problems appear less frequently in the first place.

That shift from **reactive troubleshooting to proactive engineering** is where the real growth in IT happens.