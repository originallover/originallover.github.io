---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

<div class="home-hero">
  <div class="home-kicker">SPEECH · AUDIO · MACHINE LEARNING</div>
  <h1>Building systems that understand <em>what happened, when, and who.</em></h1>
  <p class="home-lede">I am <strong>Zekun Lan</strong>, working with the Auditory Cognition and Computational Acoustics Lab at Shanghai Jiao Tong University. My research focuses on unified audio understanding, speaker-aware acoustic modeling, and fine-grained paralinguistic event detection.</p>
  <div class="home-actions">
    <a class="home-button primary" href="/sa-uaed/">Explore SA-UAED demo <span>↗</span></a>
    <a class="home-button" href="mailto:blue_zz@sjtu.edu.cn">Get in touch</a>
  </div>
</div>

<div class="interest-row" id="research">
  <span>Sound event detection</span>
  <span>Speaker diarization</span>
  <span>Paralinguistic modeling</span>
  <span>Audio simulation</span>
</div>

<h1 id="news">News</h1>

<div class="news-list">
  <div class="news-item"><time>2026.06</time><p><strong>SA-UAED was accepted to INTERSPEECH 2026.</strong> The work introduces unified frame-level detection of sound events, speaker activity, and speaker-attributed laughter and coughs.</p></div>
</div>

<h1 id="publications">Selected Publications</h1>

<div class="paper-box featured-paper">
  <div class="paper-box-image">
    <div>
      <div class="badge">INTERSPEECH 2026</div>
      <img src="/images/sa-uaed/model-architecture.png" alt="Architecture of SA-UAED" width="100%">
    </div>
  </div>
  <div class="paper-box-text" markdown="1">

### SA-UAED: Joint Frame-Level Detection of Audio Events, Speaker Activities, and Speaker-Attributed Paralinguistic Events

**Zekun Lan**, Wangyou Zhang, Yanmin Qian

*Proceedings of INTERSPEECH, 2026*

SA-UAED uses task-specific speaker query spaces to attribute transient events such as coughing and laughter without sacrificing speaker diarization performance.

<div class="paper-links">
  <a href="/sa-uaed/">Interactive Demo</a>
  <a href="/files/interspeech-2026-sa-uaed.pdf">Paper</a>
  <a href="https://github.com/originallover/SA-UAED">Code</a>
</div>

  </div>
</div>

<div class="research-note">
  <span class="note-label">CURRENT DIRECTION</span>
  <p>I am interested in models that move beyond isolated audio tasks—systems that jointly reason about environmental sounds, overlapping speakers, and non-verbal vocal behavior at precise temporal resolution.</p>
</div>

<h1 id="education">Education</h1>

<div class="education-list">
  <div><time>2025.09 — 2028.04</time><p><strong>Shanghai Jiao Tong University</strong><span>Current</span></p></div>
  <div><time>2021.09 — 2025.06</time><p><strong>Beijing University of Posts and Telecommunications</strong></p></div>
</div>

<h1 id="contact">Contact</h1>

The best way to reach me is by email at [blue_zz@sjtu.edu.cn](mailto:blue_zz@sjtu.edu.cn). You can also find my public code and ongoing projects on [GitHub](https://github.com/originallover).
