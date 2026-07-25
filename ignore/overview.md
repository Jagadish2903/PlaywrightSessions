# AI-Assisted Testing Overview — IMS Automation Suite

> **Author**: GitHub Copilot
> **Profile**: Jagadish R
> **Repositories**: `ims-tests` | `xps-core-automation`
> **Last Updated**: July 2026

---

## 🏗️ Two-Repo Architecture

| Repo | Role |
|---|---|
| `xps-core-automation` | **Framework Library** — shared utilities, base classes, POJOs, AWS integrations |
| `ims-tests` | **Test Repository** — actual test classes, suite XMLs, environment configs |

---

## 🤖 AI Integration Strategy

Both repositories contain a **multi-AI-agent setup** under `.github/`:

### AI Tools Configured

| File / Folder | AI Tool | Purpose |
|---|---|---|
| `copilot-instructions.md` | **GitHub Copilot** | Coding standards, framework rules, behavioral constraints |
| `AGENTS.md` | **Copilot Coding Agent** | Autonomous test authoring instructions |
| `CLAUDE.md` | **Claude** | Task execution protocol for Claude agents |
| `agents/sample-agent.agent.md` | **Copilot Agent Mode** | Specialized IMS test agent definition |
| `FRAMEWORK_CONTEXT.md` | All AIs | Single source of truth for class hierarchy & patterns |
| `context/*.md` | All AIs | Per-module domain context (7 modules) |
| `prompts/*.md` | All AIs | Reusable prompt templates for test generation |
| `instructions/*.md` | Copilot / Claude | Path-scoped code review rules |

### How Each File Is Used

1. **`copilot-instructions.md`** → Loaded automatically by GitHub Copilot in VS Code / JetBrains —
   governs every autocomplete and chat response
2. **`AGENTS.md` + `CLAUDE.md`** → Instructions for autonomous agentic coding — AI reads these
   before writing any code
3. **`context/` folder** (`ims-tests` only) → Per-module context files that AI reads for domain knowledge
4. **`prompts/` folder** → Reusable prompt templates for generating tests from JIRA stories
5. **`instructions/` folder** → Path-scoped instruction files for RestAssured, TestNG, Selenium, Java review
6. **`FRAMEWORK_CONTEXT.md`** → Prevents AI from reinventing patterns — teaches singleton utils,
   POJO design, DataProvider conventions

---

## 📦 Module: Business Calc (`businesscalc`)

### Location

| Artifact | Path |
|---|---|
| Tests | `src/test/java/com/xps/qa/tests/businesscalc/api/` |
| Base class | `src/test/java/com/xps/qa/base/businesscalc/BaseTest.java` |
| Property interface | `src/test/java/com/xps/qa/testproperties/IBusinessCalcData.java` |
| Suite XMLs | `suitexmls/businesscalc/` |
| Test data | `src/test/resources/testdata/test-input/businesscalc/` |
| Env properties | `src/test/resources/testdata/envproperties/businesscalc/` |
| AI Context | `.github/context/BUSINESSCALC_CONTEXT.md` |

### Test Class Inventory (27 Classes)

| Test Class | Calculation Type |
|---|---|
| `DTIRatioTest` | Debt-to-Income Ratio |
| `LTVCalculationTest` | Loan-to-Value Ratio |
| `CLTVCalculationTest` | Combined LTV |
| `MonthlyPITest` | Monthly Principal & Interest |
| `AmortizationScheduleTest` | Amortization Schedule |
| `TotalLoanAmountTest` | Total Loan Amount |
| `DebtLiabilitiesTest` | Debt & Liabilities |
| `DiscountTest` | Discount Points |
| `DiscountAmountTest` | Discount Amount |
| `LockInFeeTest` | Lock-In Fee |
| `PerdiemAmountCalculationTest` | Per Diem |
| `PrepaidDaysCountTest` | Prepaid Days |
| `HousingSavingsTest` | Housing Savings |
| `LiabilityPaymentSavingsTest` | Liability Payment Savings |
| `LiabilityPercentageCalculationTest` | Liability-to-Income Ratio |
| `CashToFromBorrowerTest` | Cash To/From Borrower |
| `CashOutSavingsCalculationTest` | Cash-Out Savings |
| `NTBCalculationTest` | Net Tangible Benefit |
| `ProposedPaymentChangeCalcTest` | Proposed Payment Change |
| `BuyDownCalculationTest` | Interest Rate Buy-Down |
| `BusinessDateCalculationTest` | Business Date Arithmetic |
| `ComplianceEaseTest` | Compliance Ease API |
| `CreateFraudGuardOrderTest` | Fraud Guard Order |
| `GetOrderDetailsByOrderIdTest` | Order Details by ID |
| `GetOrderRiskManagementCategoryTest` | Risk Management Category |
| `GetProductCategoriesTest` | Product Categories |
| `OFACTest` | OFAC Screening (`@TestMode(Mode.UI_AND_API)`) |

### Suite XMLs (businesscalc)

| Suite File | Purpose |
|---|---|
| `BusinessCalculation.xml` | Full business calculation suite |
| `ComplianceEase.xml` | Compliance Ease API tests |
| `FraudGuard.xml` | Fraud Guard order tests |
| `LakeWoodCalculation.xml` | Lakewood-specific calculation tests |
| `Ofac.xml` | OFAC screening tests |
| `jsonSchemaValidation.xml` | JSON schema validation for all calc APIs |
| `framework-build-test.xml` | CI / CodeBuild validation suite |

### Key Business Rules (for AI context)

- **DTI Ratio**: Total monthly debts ÷ Gross monthly income × 100. FNMA/FHLMC max typically 45–50%
- **LTV**: Loan Amount ÷ Appraised Value × 100
- **CLTV**: (First Mortgage + All Subordinate Liens) ÷ Appraised Value × 100
- **NTB**: Refi must meet state-specific benefit thresholds
- **OFAC**: Special case — uses `@TestMode(Mode.UI_AND_API)` for browser-based token retrieval

### Key Utility Classes

| Utility | Purpose |
|---|---|
| `ImsBusinessCalculatorUtils` | Core calculation API helpers |
| `ImsBusinessCalcPayloadBuilder` | Build business calc request payloads |
| `ImsApiUtils` | Generic API call helpers |
| `ImsTokenManagerUtil` | Token management (cleared at suite start) |
| `ImsFraudGuardUtils` | FraudGuard-specific API helpers |
| `ImsOfacUtils` | OFAC screening API helpers |
| `ImsComplianceEaseSaveFieldMapperUtils` | Compliance Ease field mapping |

---

## 🔄 AI-Assisted Test Generation Workflow

```
JIRA Story
    ↓
generate-test.prompt.md  (5-phase structured prompt)
    ↓
Phase 1: Fetch story → parse acceptance criteria → identify edge cases
Phase 2: Scan framework (xps-core-automation) + test repo (ims-tests)
Phase 3: Design test cases (happy / sad / boundary paths)
Phase 4: Generate code with quality gates (compile-free, no hardcoding)
Phase 5: Deliver test class + suite XML + documentation
```

---

## 🔧 `xps-core-automation` — Framework Modules

```
XPSCommon      → shared utilities (FileHandler, CommonConstants)
XPSTestNG      → TestBase, CommonTestBase, UnifiedTestListener, @TestMode
XPSDBConnect   → parameterized DB queries (MSSQL)
XPSIMS         → IMS API clients, POJOs, AWS utils, payload builders
XPSPODIUM      → Podium vendor integration
XPSAppium      → Mobile automation (Appium)
XPSLap         → Load/performance testing
XPSBoss        → Specialized testing utilities
SampleModule   → Reference template for new modules
```

### Module Dependency Order

```
XPSCommon
    ↑
XPSTestNG (depends on XPSCommon)
    ↑
XPSDBConnect (depends on XPSCommon, XPSTestNG)
    ↑
XPSIMS (depends on XPSCommon, XPSTestNG, XPSDBConnect)
    ↑
XPSPODIUM (depends on XPSIMS)
    ↑
XPSAppium, XPSLap, XPSBoss (specialized)
    ↑
ims-tests (consumer)
```

---

## 🏛️ Class Hierarchy

```
TestBase                          (XPSTestNG — Extent Reports, Sumo Logic, logging)
  └── CommonTestBase              (XPSTestNG — WebDriver lifecycle, UnifiedTestListener)
        └── <module>.BaseTest     (ims-tests — @BeforeSuite, property loading, AWS init)
              └── YourTestClass   (ims-tests — the actual test)
```

> **Rule**: Every test class must extend its module's `BaseTest`. Never extend `CommonTestBase` or `TestBase` directly.

---

## ⚙️ Framework Compliance Rules (AI Enforced)

| Rule | Detail |
|---|---|
| `@TestMode(Mode.API)` | Must be declared on every concrete test class |
| No `@Listeners` re-declaration | Already inherited from `CommonTestBase` via `BaseTest` |
| Allure annotations required | `@Epic`, `@Feature`, `@Story`, `@Severity` on every test |
| No hardcoding | URLs, tokens, tenant IDs, AWS ARNs — use property interfaces |
| Singleton utilities | Always `ImsXxxUtils.getInstance()`, never `new ImsXxxUtils()` |
| Javadoc on all public methods | `@param`, `@return`, test case ID in comment |
| `reportLog()` throughout | Extent Report integration |

---

## 📊 All Modules in `ims-tests`

| Module | BaseTest FQCN | Suite XML Dir |
|---|---|---|
| `imscore` | `com.xps.qa.base.imscore.api.BaseTest` | `suitexmls/imscore/` |
| `incomecalc` | `com.xps.qa.base.incomecalc.api.BaseTest` | `suitexmls/incomeCalc/` |
| `businesscalc` | `com.xps.qa.base.businesscalc.BaseTest` | `suitexmls/businesscalc/` |
| `conditioncatalog` | `com.xps.qa.base.conditioncatalog.BaseTest` | `suitexmls/conditioncatalog/` |
| `controlplane` | `com.xps.qa.base.controlplane.api.BaseTest` | `suitexmls/controlplane/` |
| `imsintegrations` | `com.xps.qa.base.imsintegrations.BaseTest` | `suitexmls/imsintegrations/` |
| `initialdecisions` | `com.xps.qa.base.initialdecisions.BaseTest` | `suitexmls/initialdecisions/` |

---

## 🛠️ Tech Stack

| Tool / Library | Purpose |
|---|---|
| Java 21 | Primary language |
| Maven | Build and dependency management |
| TestNG | Test framework |
| RestAssured | API testing |
| Allure | Test reporting |
| Lombok | Boilerplate reduction (POJOs, builders) |
| AWS SDK | S3, DynamoDB, Step Functions, Secrets Manager |
| Owner (AEONBITS) | Environment-specific property management |
| GitHub Copilot | Inline code generation + agentic test authoring |
| Claude | Autonomous task execution (CLAUDE.md protocol) |

---

## ✅ Summary: AI Usage Model

| Capability | How It Is Used |
|---|---|
| **Inline code generation** | `copilot-instructions.md` governs every suggestion |
| **Autonomous test authoring** | `AGENTS.md` + `CLAUDE.md` for full test class generation |
| **Domain knowledge** | `context/*.md` + `FRAMEWORK_CONTEXT.md` teach AI IMS business rules |
| **Prompt templates** | `prompts/` for repeatable JIRA → test generation |
| **Code review** | `instructions/*.md` for language/framework-specific review rules |
| **CI/CD** | `workflows/` — automated build, deploy, test execution |
| **Commit discipline** | `git-commit-instructions.md` enforces Conventional Commits for AI commits |
| **Multi-agent support** | Copilot + Claude + Coding Agent all have dedicated instruction files |

> This is a **production-grade AI-augmented QA setup** — AI acts as a full team member with
> domain knowledge baked in, preventing hallucinations and enforcing framework standards automatically.
