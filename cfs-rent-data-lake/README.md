# cfs-rent-data-lake

Raw-data collection repo for commercial retail rent intelligence. This is a
**collection / shelving** repo, **not** the engine. The job here is narrow:

> **Fetch public source files and shelve them, unmodified, with a manifest entry.**

There is intentionally **no** DuckDB, no parsing into comps, no normalization,
no schema. Files land in a per-source folder exactly as published; every file is
logged in [`manifest.csv`](./manifest.csv). Downstream parsing into comps happens
in the separate `cfs-rent-engine` repo, which reads from this lake.

## Ground rules

- **Public sources only.** Never scrape behind logins or paywalls.
- **No Crexi, no LoopNet.** Not even public-looking pages from them.
- **Raw and unmodified.** Save the file as published (PDF / XLSX / HTML). Do not
  re-key, re-format, or "clean" it here. Note extraction needs in the manifest.
- **One subfolder per source case/entity** under each numbered source folder.
- **Log everything in `manifest.csv`** at the moment you shelve it.

## Folder layout (one folder per source)

| Folder | Source type |
|---|---|
| `01_bankruptcy`     | Chapter 11 cure schedules & assumed/assigned lease exhibits from free claims-agent sites (Kroll, Epiq, Stretto, BMC/Verita) |
| `02_netlease_abs`   | Net-lease ABS / securitization deal documents (issuer & rating-agency public sites) |
| `03_county_leases`  | County/municipal recorded lease & memorandum-of-lease documents (public recorder portals) |
| `04_retailer_10k`   | Retailer 10-K / 10-Q lease disclosures (SEC EDGAR) |
| `05_fdd`            | Franchise Disclosure Documents (state FDD registries: WI, MN, CA, etc.) |
| `06_broker_reports` | Public brokerage market reports (free, no-login PDFs) |
| `07_city_storefront`| City storefront / vacancy registries (e.g. SF, NYC public datasets) |
| `08_emma_muni`      | EMMA municipal bond disclosures with retail/lease economics |
| `09_reit_property`  | REIT property-level disclosures & supplementals (investor-relations PDFs) |
| `10_mall_outlet`    | Mall / outlet operator tenant & leasing disclosures (public IR) |

## manifest.csv

One row per shelved file. Columns:

| Column | Meaning |
|---|---|
| `source`            | Numbered source folder (e.g. `01_bankruptcy`) |
| `subfolder`         | Case/entity subfolder (e.g. `rite_aid`) |
| `source_url`        | Public URL the file came from |
| `filename`          | Exact filename as shelved in the subfolder |
| `pulled_date`       | ISO date the file was downloaded (blank = not yet pulled) |
| `format`            | `pdf`, `xlsx`, `html`, etc. |
| `approx_records`    | Approx record/store/lease count in the file (`unknown` if not yet confirmed) |
| `extraction_needed` | `yes` = needs OCR/parsing, `no` = already a clean table |
| `notes`             | Free text: doc title, docket #, table-vs-scan, caveats |

## How to actually pull the files

This repo was scaffolded in a sandboxed environment whose network egress is
restricted, so the claims-agent PDFs could **not** be downloaded in place. The
researched, real source URLs are recorded in `manifest.csv` (rows with a blank
`pulled_date` are catalogued-but-not-yet-downloaded), and a helper script is
provided to pull them on a machine with open network access:

```bash
# from the repo root, on your local machine:
bash 01_bankruptcy/fetch_bankruptcy.sh
```

After pulling, fill in the `pulled_date` and confirm `approx_records` /
`extraction_needed` for each row.

> **Note on location:** the original plan was to host this at
> `C:\Users\ari\cfs-rent-data-lake` (sibling to `cfs-rent-engine`, outside
> Dropbox). It was scaffolded inside the available repo instead. To relocate:
> copy the `cfs-rent-data-lake/` directory to the intended path and
> `git init` it as its own standalone repo.
