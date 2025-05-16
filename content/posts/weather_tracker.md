---
title: "Weather Tracker: A Real-Time Weather App"
date: 2025-05-16
summary: "A modern weather web app using OpenWeather API and Vercel serverless functions."
type: post
tags: ["weather", "api", "tech"]
cover:
  image: "/images/weather.png"
  alt: "Weather Tracker UI screenshot"
  relative: false
  hiddenInList: false
  hiddenInSingle: true
  responsiveImages: true
draft: false
---

The **Weather Tracker Web App** is a clean, responsive tool for checking real-time weather conditions using the [OpenWeather API](https://openweathermap.org/). It pulls in current conditions, hourly trends, and a 5-day forecast—all wrapped in a modern UI powered by Vercel and TailwindCSS.

---

## Project Overview

This app was built as a lightweight, responsive solution for tracking weather data across any location. It uses serverless functions on Vercel to safely handle API calls and keep the frontend lean.

---

## Core Features

* Search for any city’s weather
* View temperature, humidity, wind speed, and conditions
* 12-hour hourly forecast with graphs
* 5-day forecast with icons
* Secure API requests using Vercel serverless
* Fully responsive with TailwindCSS

---

## Getting Started

1. Try the live version: [Weather Tracker Web](https://ry-weather-app.vercel.app/)
2. Enter any city in the search bar.
3. Click "Get Weather" and view real-time weather updates.
4. Scroll down for hourly trends and extended forecast.

---

## How It Works

### Fetching Weather Data

```js
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;
const response = await fetch(weatherUrl);
const data = await response.json();
```

### Displaying Hourly Forecast

```js
const hourlyData = forecastData.list.slice(0, 8).map(entry => ({
  time: entry.dt_txt.split(" ")[1].slice(0, 5),
  temp: entry.main.temp
}));
```

Graph data is pulled using Chart.js for visual hourly trends.

### Handling API Securely (Vercel)

```js
export default async function handler(req, res) {
  const { city } = req.query;
  const API_KEY = process.env.WEATHER_API_KEY;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  const response = await fetch(weatherUrl);
  const data = await response.json();
  res.status(200).json(data);
}
```

Vercel serverless functions act as a proxy to keep your API keys safe.

---

## Final Thoughts

This was a fun build. The Weather Tracker is simple, reliable, and easy to expand. It's great for learning API handling, async functions, and secure deployments with Vercel.

[Check out the GitHub repo](https://github.com/Kame-Ry/Weather-Web-App)
