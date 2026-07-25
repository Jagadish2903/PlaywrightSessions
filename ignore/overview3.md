# MISMO Mapping Validator Suite

A collection of **Node.js automation tools** that validate and generate field mappings between vendor service responses and the **MISMO 3.4 / 3.6 reference model** used in mortgage lending integrations.

Each validator reads a CSV mapping file as the source of truth, parses both vendor and MISMO payloads, compares values field-by-field, and produces detailed reports in **Markdown, CSV, and Excel** formats.

---

## Why This Exists

Mortgage integrations (Appraisal, Title, Flood, OFAC, VOA, EarlyCheck) involve vendors sending data in their own formats (XML or JSON). The lender platform consumes these responses in a standardised MISMO JSON structure. Manually verifying that every field is correctly transformed is time-consuming and error-prone. These validators automate that verification.

---

## Validators at a Glance

| Validator | Vendor Format | MISMO Format | Domain |
|-----------|:---:|:---:|--------|
| [AppraisalResponseMappingValidator](#1-appraisalresponsemappingvalidator) | XML | JSON | Property appraisal orders |
| [TitleResponseMappingValidator](#2-titleresponsemappingvalidator) | XML | JSON | Title search & examination |
| [FloodXmltoMISOJsonPathValidator](#3-floodxmltomisojsonpathvalidator) | XML | JSON | Flood zone determination |
| [EarlyCheckResponseMappingValidator](#4-earlycheckresponsemappingvalidator) | JSON | JSON | Pre-close loan validation |
| [VOAResponseMappingValidator](#5-voaresponsemappingvalidator) | JSON | JSON | Verification of assets |
| [OFACResponseMappingValidator](#6-ofacresponsemappingvalidator) | JSON | JSON | OFAC sanctions screening |
| [JsonCreator](#7-jsoncreator) | XML (vendor request) | JSON (lender payload) | Lender JSON generation |

---

## How It Works (Common Flow)

```
field-mapping.csv
      │
      ▼
 Parse CSV rows          ← Each row = one field mapping
      │
      ├──► Resolve Vendor Path  (XPath into XML  OR  JSONPath into vendor JSON)
      │
      └──► Resolve MISMO Path   (JSONPath into mismo-response.json)
                │
                ▼
         Compare values
                │
     ┌──────────┴──────────┐
   PASS                  FAIL / NOT FOUND / SKIP
                │
                ▼
   Write output/validation-report.{md, csv, xlsx}
```

### Status Codes (all validators)

| Status | Meaning |
|--------|---------|
| ✅ PASS | Vendor value found and matches MISMO value |
| ❌ FAIL | Value mismatch or MISMO path not found |
| 🔍 XML/JSON NOT FOUND | Vendor path absent or `xsi:nil="true"` |
| 🔍 EXTRA IN MISMO | MISMO has a value; vendor element is absent |
| ⬜ NOT FOUND IN BOTH | Path absent in both vendor and MISMO |
| ⚠️ PARTIAL | One path is blank; partial check only |
| ⏭ SKIP | Both paths blank or descriptive (`N/A`, `TBD`) |

---

## Validators — Detail

### 1. AppraisalResponseMappingValidator

**Direction:** Vendor XML → MISMO JSON

Validates that every attribute in an Appraisal vendor XML response (`vendor-response.xml`) is correctly mapped and reflected in the MISMO JSON response (`mismo-response.json`), using `field-mapping.csv` as the source of truth.

**Input files**

| File | Description |
|------|-------------|
| `input/field-mapping.csv` | `Section, Attribute Name, Event Field Path, MISMO JSON PATH` |
| `input/vendor-response.xml` | Raw Appraisal vendor XML response (MISMO 3.4 envelope) |
| `input/mismo-response.json` | MISMO-structured JSON version of the same response |

**Key capabilities**
- Namespace-stripped XPath traversal (`vtp:TransactionID` → `TransactionID`)
- Attribute XPath support (`/MESSAGE/.../CreatedDatetime/@DisplayTimeZoneText`)
- Conditional MISMO JSONPath (`deal.parties[].roles[].partyRoleType="Appraiser" and deal.parties[].roles[].licenseIdentifier`)
- Detects empty XML elements, nil XML elements, and extra MISMO-only values separately

**Run**
```bash
cd AppraisalResponseMappingValidator
npm install
npm run validate
```

---

### 2. TitleResponseMappingValidator

**Direction:** Vendor XML → MISMO JSON

Same engine as the Appraisal validator, configured for **Title** (title search, examination, and insurance) vendor responses. Handles `TitleFee`, `TitleCompany` party role, and Title-specific service product data.

**Input files**

| File | Description |
|------|-------------|
| `input/field-mapping.csv` | `Section, Attribute Name, Event Field Path, MISMO JSON PATH` |
| `input/vendor-response.xml` | Raw Title vendor XML response |
| `input/mismo-response.json` | MISMO-structured JSON version of the same response |

**Run**
```bash
cd TitleResponseMappingValidator
npm install
npm run validate
```

---

### 3. FloodXmltoMISOJsonPathValidator

**Direction:** Vendor XML → MISMO JSON

Validates Flood zone determination vendor XML fields against the lender MISMO JSON payload. Supports both **CSV and XLSX** mapping files (XLSX takes priority if both exist).

**Input files**

| File | Description |
|------|-------------|
| `input/field-mapping.csv` (or `.xlsx`) | `No., DATA FIELD NAME, Vendor xml path, Mismo JSON Path, …` |
| `input/xml-payload.xml` | Raw Flood vendor XML response |
| `input/mismo-payload.json` | MISMO-structured JSON version |

**Additional script**
```bash
npm run orchestrate        # interactive: validate → review → optionally file Jira bugs
npm run orchestrate:dry    # dry-run: shows what Jira tickets would be created
```

**Run**
```bash
cd FloodXmltoMISOJsonPathValidator
npm install
npm run validate
```

---

### 4. EarlyCheckResponseMappingValidator

**Direction:** Vendor JSON → MISMO JSON

Validates **EarlyCheck** (pre-close loan validation) vendor JSON responses against the MISMO JSON structure. Uses `jsonpath-plus` for both vendor and MISMO path resolution.

**Input files**

| File | Description |
|------|-------------|
| `input/field-mapping.csv` | `Section, Attribute Name, Field Path (json) in Vendor Response, MISMO Path for Vendor Response` |
| `input/vendor-response.json` | Raw EarlyCheck JSON response from vendor |
| `input/mismo-response.json` | MISMO-structured JSON version of the same response |

**Run**
```bash
cd EarlyCheckResponseMappingValidator
npm install
npm run validate
```

---

### 5. VOAResponseMappingValidator

**Direction:** Vendor JSON → MISMO JSON

Validates **Verification of Assets (VOA)** vendor JSON responses against the MISMO JSON structure. Identical engine to EarlyCheck; configured for VOA-specific field mappings (account types, balances, institution details).

**Input files**

| File | Description |
|------|-------------|
| `input/field-mapping.csv` | `Section, Attribute Name, Field Path (json) in Vendor Response, MISMO Path for Vendor Response` |
| `input/vendor-response.json` | Raw VOA JSON response from vendor |
| `input/mismo-response.json` | MISMO-structured JSON version of the same response |

**Run**
```bash
cd VOAResponseMappingValidator
npm install
npm run validate
```

---

### 6. OFACResponseMappingValidator

**Direction:** Vendor JSON → MISMO JSON

Validates **OFAC sanctions screening** vendor JSON responses against the MISMO JSON structure. Includes a `debug-entry.js` script for step-through inspection of individual mapping rows.

**Input files**

| File | Description |
|------|-------------|
| `input/field-mapping.csv` | `Section, Attribute Name, Field Path (json) in Vendor Response, MISMO Path for Vendor Response` |
| `input/vendor-response.json` | Raw OFAC JSON response from vendor |
| `input/mismo-response.json` | MISMO-structured JSON version of the same response |

**Run**
```bash
cd OFACResponseMappingValidator
npm install
npm run validate

# Debug a single mapping entry
node scripts/debug-entry.js
```

---

### 7. JsonCreator

**Direction:** Vendor XML (request) → Lender JSON (MISMO payload)

Generates and validates a **lender MISMO JSON payload** from a vendor XML request, driven by a field mapping CSV. This is a generation tool, not just a comparator — it reads mapping rules (including enums, conditionals, and default values) and constructs the output JSON.

**Input files**

| File | Description |
|------|-------------|
| `input/field-mapping.csv` | `Sno, Field Path (XML), AttributeName, MISMO Path for Lender Request (JSON), Vendor Enums, Lender Enums, Conditionality, Notes` |
| `input/vendor-payload.xml` | Source vendor XML request |
| `input/lender-payload.json` | Reference/expected lender JSON (for diff comparison) |

**Scripts**

| Script | Purpose |
|--------|---------|
| `scripts/create-lender-json.js` | Generates `lender-payload.generated.json` from vendor XML + mapping |
| `scripts/validate.js` | Compares generated JSON against reference JSON field-by-field |
| `scripts/orchestrate.js` | Runs creation → validation → optional Jira bug filing in one flow |
| `scripts/print-results.js` | Pretty-prints the last validation report to console |

**Run**
```bash
cd MappingValidator/JsonCreator
npm install
npm run orchestrate        # full flow
npm run validate           # validate only
```

---

## Output Reports

All validators write three report files to their `output/` folder:

| File | Description |
|------|-------------|
| `validation-report.md` | Human-readable Markdown with summary table, failures, and full results |
| `validation-report.csv` | Flat CSV for spreadsheet review or import |
| `validation-report.xlsx` | Excel workbook with **Summary**, **Full Results**, **Failures**, and **Not Found** sheets |

### Sample Summary (Markdown report)

```
## Summary

| Metric                                      | Value              |
|---------------------------------------------|--------------------|
| Overall Status                              | ✅ ALL MAPPINGS VALID |
| Total Mappings Checked                      | 48                 |
| ✅ Passed                                   | 45                 |
| ❌ Failed (mismatch + MISMO path missing)   | 0                  |
| 🔍 Extra Attributes in MISMO               | 0                  |
| ⬜ Not Found In Both                        | 3                  |
| ⏭ Skipped                                  | 6                  |
| Pass Rate                                   | 100.0%             |
```

---

## Tech Stack

| Technology | Role |
|------------|------|
| **Node.js ≥ 16** | Runtime for all validators |
| **jsonpath-plus** | JSONPath resolution with filter expressions |
| **fast-xml-parser** | Zero-dependency XML parser (namespace stripping, attribute support) |
| **exceljs** | Excel report generation with styled sheets |

---

## Prerequisites

```bash
node --version   # must be >= 16.0.0
npm --version    # any recent version
```

Each validator is self-contained. Run `npm install` inside the specific validator folder before first use.

---

## VS Code Copilot Agent Integration

Each validator ships with a GitHub Copilot agent definition under `.github/agents/`. Open GitHub Copilot Chat in VS Code, select the relevant agent from the agent picker, and type:

```
Validate my vendor response against the MISMO mapping
```

The agent will verify input files, run `npm install` if needed, execute the validation script, and present a summarised report with failure analysis directly in the chat panel.

---

## Project Structure

```
MappingValidator/
├── AppraisalResponseMappingValidator/
│   ├── .github/agents/earlycheck-response-validator.agent.md
│   ├── input/   field-mapping.csv  vendor-response.xml  mismo-response.json
│   ├── output/  validation-report.{md,csv,xlsx}
│   └── scripts/ validate.js
│
├── TitleResponseMappingValidator/
│   ├── .github/agents/title-response-validator.agent.md
│   ├── input/   field-mapping.csv  vendor-response.xml  mismo-response.json
│   ├── output/  validation-report.{md,csv,xlsx}
│   └── scripts/ validate.js
│
├── FloodXmltoMISOJsonPathValidator/
│   ├── input/   field-mapping.{csv,xlsx}  xml-payload.xml  mismo-payload.json
│   ├── output/  validation-report.{md,csv,xlsx}
│   └── scripts/ validate.js  orchestrate.js  print-results.js
│
├── EarlyCheckResponseMappingValidator/
│   ├── .github/agents/earlycheck-response-validator.agent.md
│   ├── input/   field-mapping.csv  vendor-response.json  mismo-response.json
│   ├── output/  validation-report.{md,csv,xlsx}
│   └── scripts/ validate.js
│
├── VOAResponseMappingValidator/
│   ├── .github/agents/earlycheck-response-validator.agent.md
│   ├── input/   field-mapping.csv  vendor-response.json  mismo-response.json
│   ├── output/  validation-report.{md,csv,xlsx}
│   └── scripts/ validate.js
│
├── OFACResponseMappingValidator/
│   ├── .github/agents/ofac-response-validator.agent.md
│   ├── input/   field-mapping.csv  vendor-response.json  mismo-response.json
│   ├── output/  validation-report.{md,csv,xlsx}
│   └── scripts/ validate.js  debug-entry.js
│
└── MappingValidator/JsonCreator/
    ├── input/   field-mapping.csv  vendor-payload.xml  lender-payload.json
    ├── output/  lender-payload.generated.json  validation-report.{md,csv,xlsx}
    └── scripts/ create-lender-json.js  validate.js  orchestrate.js  print-results.js
```
