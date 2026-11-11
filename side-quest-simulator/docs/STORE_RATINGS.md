# Store age-rating answers (launch build)

Prepared November 11, 2026 for the launch content ceiling: **Cheeky** language and **Gritty** violence (`MAX_TONE = 1`, `MAX_VIOLENCE = 1` in `src/game/contentSettings.ts`). Crude and Brutal are unreachable in this build. If either ceiling is raised, re-answer both questionnaires first.

Evidence: an audit of all 116 tone-variant passages rendered at Cheeky + Gritty found no swear words. The strongest material is rude insults and mild innuendo (Cheeky), "washable blood", "bleeding scrape" and "bloodied sleeve" injury lines (Gritty), "bloodshed" at a vegetable contest, a ghost that "died in line", and one cult that "had some wine". Combat is constant but fantasy and non-graphic.

## Apple App Store Connect (4+ / 9+ / 13+ / 16+ / 18+)

| Question | Answer | Why |
| --- | --- | --- |
| Parental controls / age assurance | No | None in the app |
| Unrestricted web access | No | No browser or links out |
| User-generated content | No | Players cannot post or share anything |
| Messaging and chat | No | Single player |
| Advertising | Yes | Optional rewarded ads (AdMob), content-rated Teen or lower |
| Profanity or crude humor | Infrequent | Insult humor and innuendo; no swear words at Cheeky |
| Horror or fear themes | Infrequent | Liches, ghosts, a hellhound, all played for comedy |
| Alcohol, tobacco or drug references | Infrequent | One wine reference |
| Medical or treatment information | None | |
| Mature or suggestive themes | Infrequent | Mild innuendo at Cheeky |
| Sexual content or nudity | None | |
| Cartoon or fantasy violence | Frequent | Every adventure has fantasy combat and injury lines |
| Realistic violence | None | Fantasy only; Gritty blood is non-graphic |
| Prolonged graphic or sadistic violence | None | Brutal is disabled |
| Guns or other weapons | Infrequent | Swords, axes and spears in a fantasy setting |
| Simulated gambling | None | d20 rolls are skill checks with no wagering or purchase |
| Contests | None | The rival "season" is a story device, not a contest between players |
| Loot boxes | None | Rewards are fixed, and no real money is involved |

Expected result: **13+** (frequent cartoon/fantasy violence and an infrequent alcohol reference each map to 13+).

Review notes for App Review: "Optional on-device AI narrator downloads an open-weight model (Qwen2.5) from Hugging Face on request; output is filtered against the selected content level and falls back to authored text. No accounts, no user-generated content."

## Google Play (IARC questionnaire)

| Topic | Answer |
| --- | --- |
| Category | Game |
| Violence | Yes: fantasy or cartoon violence against non-human or human-like fantasy characters; blood shown in text only; no realistic or graphic violence |
| Fear | Yes: mild, non-graphic (ghosts, undead, comedic) |
| Sexuality | No sexual content; mild innuendo in dialogue only |
| Language | Mild: crude humor and insults, no profanity |
| Controlled substances | Yes, references only: one alcohol reference, no use shown to the player |
| Gambling | No real or simulated gambling |
| Crude humor | Yes |
| User interaction / sharing | No user interaction, no location sharing, no purchases |
| Ads | Yes (also declare in App content > Ads) |

Expected result: roughly ESRB Teen, PEGI 12, USK 12. The exact result is set by the questionnaire.

## Also required in App content (Play) and App Privacy (Apple)

- **Target audience:** 13 and over. Do not select under-13 age groups; that would place the app under the Families policy and its ad restrictions.
- **Data safety / App Privacy:** data collected by the AdMob SDK: device or other IDs (advertising), approximate location from IP (advertising), app interactions and diagnostics (advertising, analytics and fraud prevention). The developer collects nothing directly. Data is encrypted in transit; there are no accounts to delete.
- **Privacy policy URL:** the published `PRIVACY.md`.
