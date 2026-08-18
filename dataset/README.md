# PropWise dataset policy

This repository does not bundle fabricated historical property prices or fake comparable transactions. The current development model uses transparent input heuristics and reports no real-world accuracy metrics.

| Directory | Purpose |
| --- | --- |
| `raw/` | Licensed public datasets kept in their original form with source and license notes. |
| `processed/` | Reproducible feature-engineered files derived from `raw/`. |
| `synthetic/` | Clearly labeled test fixtures only; never present as market evidence. |

Potential legitimate sources include open geospatial infrastructure data, government open-data portals, and public property datasets whose licenses permit analysis. Before adding any source, record the publisher, URL, access date, license, geography, time period, fields, missingness, and known bias. Do not scrape sites in violation of terms or use unverified listing data as market truth.

When a real labeled dataset is supplied, implement a JavaScript/TensorFlow.js training and evaluation pipeline with a train/test split and report MAE, RMSE, and R² only for the documented geography and period. Future appreciation remains uncertain even after calibration.
