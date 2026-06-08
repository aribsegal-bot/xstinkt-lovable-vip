#!/usr/bin/env bash
#
# fetch_bankruptcy.sh — pull the catalogued retail Ch.11 cure / assumed-lease
# documents into their case subfolders.
#
# WHY THIS SCRIPT EXISTS:
#   The lake was scaffolded in a sandbox whose network egress is allowlisted, so
#   the claims-agent sites (Kroll / Epiq / Stretto) returned 403 host_not_allowed
#   and the PDFs could not be pulled in place. Run this on a machine with open
#   network access. The real, search-surfaced URLs are below (mirrors manifest.csv).
#
# CAVEAT:
#   Kroll/Epiq/Stretto front their document servers with Cloudflare/anti-bot.
#   A plain curl may still get a 403 challenge page instead of the PDF. If a file
#   comes down tiny or as HTML, open the URL in a real browser and save manually,
#   or use the docket-browser pages noted in manifest.csv to locate the current
#   document IDs. After pulling, set pulled_date and confirm approx_records /
#   extraction_needed in manifest.csv.
#
# USAGE:  bash 01_bankruptcy/fetch_bankruptcy.sh
#         (run from the repo root)

set -u
UA='Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36'
BASE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"   # .../01_bankruptcy

# subfolder | filename | url   (only direct-document rows; docket index pages are
# left for manual browsing — see manifest.csv *_DOCKET_INDEX.url rows)
DOCS=(
  "rite_aid|riteaid_notice_assumed_assigned_cure_2023.pdf|https://restructuring.ra.kroll.com/RiteAid/Home-DownloadPDF?id1=MzA4MDk3OA%3D%3D&id2=-1"
  "joann|joann2025_exhibit_b_assumed_leases_redline.pdf|https://cases.ra.kroll.com/Joann2025/Home-DownloadPDF?id1=Mjc1Nzg2NQ%3D%3D&id2=0"
  "99_cents_only|99only_notice_assumption_assignment_cure.pdf|https://cases.ra.kroll.com/99only/Home-DownloadPDF?id1=MjU1NzE1Ng%3D%3D&id2=0"
  "red_lobster|redlobster_notice_assumed_assigned_cure_doc515.pdf|https://document.epiq11.com/document/getdocumentbycode?docId=4353302&projectCode=RLR"
  "express|express_plan_supplement_assumption_schedule.pdf|https://cases.stretto.com/public/x266/12360/PLEADINGS/1236003202480000000042.pdf"
  "bed_bath_beyond|bbby_notice_assumed_leases_cure_doc714.pdf|https://restructuring.ra.kroll.com/bbby/Home-DownloadPDF?id1=MTUzNjM4Mw%3D%3D&id2=-1"
  "bed_bath_beyond|bbby_lease_sale_exhibit_a.pdf|https://restructuring.ra.kroll.com/bbby/ExternalCall-DownloadPDF?id1=MTUzNjg2Nw%3D%3D&id2=0&cid=0"
)

# Cases with no direct PDF surfaced — browse these docket pages in a browser:
#   big_lots    : https://cases.ra.kroll.com/biglots/Home-DocketInfo
#   joann (2024): https://cases.ra.kroll.com/Joann/
#   party_city  : https://cases.ra.kroll.com/PCHI2024/
#   filter docket titles for: cure / assumed and assigned / rejected / unexpired lease

echo "Fetching ${#DOCS[@]} catalogued documents into $BASE ..."
for row in "${DOCS[@]}"; do
  IFS='|' read -r sub fname url <<<"$row"
  dest="$BASE/$sub/$fname"
  mkdir -p "$BASE/$sub"
  echo ">> $sub/$fname"
  curl -fSL --retry 3 --retry-delay 2 -A "$UA" \
       -H 'Accept: application/pdf,*/*' "$url" -o "$dest" \
    && echo "   saved ($(wc -c <"$dest") bytes)" \
    || echo "   FAILED — open in a browser: $url"
done

echo
echo "Done. Verify each PDF opened (not a Cloudflare challenge page), then update"
echo "manifest.csv: set pulled_date, confirm approx_records and extraction_needed."
