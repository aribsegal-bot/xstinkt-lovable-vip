# 01_bankruptcy

Chapter 11 **cure schedules** and **assumed/assigned (and assumed/rejected)
unexpired-lease exhibits** for recent retail cases. These filings are the single
richest free source of store-level lease economics: each row is typically a
store address with a landlord and a **cure amount** (the dollars the debtor must
pay to bring the lease current), which is a strong read on contract rent and
arrears.

## Source sites (all free, no login)

- **Kroll** — `restructuring.ra.kroll.com/<Case>`
- **Epiq** — `dm.epiq11.com/<case>`
- **Stretto** — `cases.stretto.com/<case>`
- **BMC / Verita** — `cases.ra.kroll.com` / `veritaglobal.net`

These are the debtors' court-appointed claims & noticing agents. The documents
are the same ones filed on the court docket, published free (PACER charges for
the same PDFs).

## What we collect per case

1. **Notice(s) of Cure Amounts / Cure Schedule** — store-by-store cure $.
2. **Schedule / Exhibit of Assumed & Assigned Leases** — which stores transfer
   to a buyer and to whom.
3. **Schedule of Rejected Leases** (when published) — stores being closed.

## One subfolder per case

```
rite_aid/  big_lots/  joann/  party_city/
99_cents_only/  red_lobster/  express/  bed_bath_beyond/
```

Save the raw PDF/XLSX into the case subfolder, then add a row to the root
`manifest.csv`.

## Fetching

Network egress was restricted in the scaffolding environment, so files were
catalogued (real URLs in `manifest.csv`) but not downloaded in place. Run
`fetch_bankruptcy.sh` from the repo root on a machine with open network access
to pull every catalogued document into its case subfolder.
