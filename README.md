# Edge Journal

Edge Journal is a modern Angular trading journal dashboard for tracking trades, analyzing trading performance and visualizing key trading metrics in a premium dark fintech interface.

The project was built as a portfolio project to demonstrate Angular fundamentals, component-based architecture, reactive state, form handling, dashboard design and business logic for analytics.

## Preview

[Edge Journal Dashboard](docs/screenshots/dashboard.png)

## Features

- Modern dark fintech dashboard UI
- Sidebar and top navigation layout
- Equity curve visualization
- KPI cards for trading performance
- Trade journal form
- Trade management table
- Searchable trade overview
- LocalStorage persistence
- Demo trading data
- Responsive dashboard layout
- Calculated trading metrics

## Trading Metrics

The dashboard currently calculates and displays:

- Balance
- Total profit/loss
- Win rate
- Average win
- Average loss
- Profit factor
- Average risk-reward ratio
- Best trade
- Worst trade
- Equity curve

## Tech Stack

- Angular
- TypeScript
- SCSS
- Angular Router
- Angular Signals
- Reactive Forms
- LocalStorage
- SVG-based chart visualization

## Project Structure


src/
  app/
    core/
      models/
      services/
      utils/
    features/
      dashboard/
      journal/
      trades/
    layout/
      shell/
    shared/
      components/


Pages

- Dashboard

The dashboard provides a quick overview of trading performance, including the equity curve, KPI cards, risk rules, daily summary, trading goals, recent trades and journal insights.

- Journal

The journal page allows users to add new trades with information such as symbol, direction, entry price, exit price, profit/loss, setup, tags and notes.

- Trades

The trades page displays all trades in a searchable table. Trades can currently be filtered by symbol, setup, direction, notes and tags.

- Current MVP Scope

This version is the first MVP of the project. It focuses on the frontend implementation and stores data locally in the browser.

Implemented:

* Dashboard layout
* KPI calculation
* Trade form
* Trade table
* Search functionality
* LocalStorage saving
* Demo data reset
* Dark UI styling

Planned Improvements

* Edit existing trades
* Advanced filtering
* Date range filter
* Analytics page
* Calendar view
* CSV import/export
* Real chart library integration
* Authentication
* Backend API
* PostgreSQL database
* FastAPI backend integration
* Screenshot upload per trade
* AI-based journal insights


Possible Future Backend

Angular Frontend
FastAPI Backend
PostgreSQL Database
JWT Authentication


Getting Started

- Install dependencies:

npm install

- Start the development server:

ng serve

- Open the app:

http://localhost:4200

Build

- ng build


Purpose

This project was created to practice and demonstrate practical Angular development skills in a realistic business application context.

The goal is to build a portfolio-ready dashboard application that combines UI design, data visualization, business logic and structured frontend architecture.