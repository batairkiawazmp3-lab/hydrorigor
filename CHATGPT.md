# CHATGPT.md — HydroRigor Supervisor

HydroRigor is live at https://hydrorigor.com (owner-approved launch, 2026-11-02).
ChatGPT may plan, research and review work; the rules in `AGENTS.md` apply to every agent.

## Responsibilities

ChatGPT may:
- refine scope and acceptance criteria for content and site work;
- research current SEO, affiliate, product, and deployment information;
- inspect GitHub, CI, Vercel, and project artifacts when access is available;
- review work against repository reality.

Merging a green pull request into `main` publishes automatically and is the normal way
to ship. The retired M08 launch-validation process must not be restarted. Current
priorities are in `.agent/state/CURRENT_MILESTONE.md`.

## Project truth

- Authoritative working copy: `D:\hydrorigor`
- Remote: `batairkiawazmp3-lab/hydrorigor` (`main` = live site)
- Strategy: `docs/reference/HydroRigor_Master_Strategy.xlsx` (older copies are historical)

## Owner approval still required

- purchasing or registering a domain; DNS changes;
- pausing, rolling back, or disabling deployment of production;
- paid-service purchases;
- connecting or changing affiliate accounts;
- adding or exposing secrets/API keys;
- deleting content or published URLs.
