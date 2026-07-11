# 📌 Corrected Playwright Flow Notes

Please refer to the attached png file on architecture diagram 

## Test Script Layer
- Written in **JavaScript, TypeScript, Python, Java, or C#**
- Uses **@playwright/test** to send automation commands
- Commands are **not REST/HTTP calls** — they are **WebSocket messages**

---

## Connection Layer
- **WebSocket** is the default and critical communication channel:
  - Persistent, bi‑directional connection
  - Commands sent as **JSON‑RPC messages** (e.g., `{id:1, method:'page.goto'}`)
  - Connection stays open until closed by client or server
  - Example endpoint: `ws://127.0.0.1:9000/playwright`

- **HTTP** is mentioned only for contrast:
  - Traditional request/response cycle
  - Not used by Playwright for browser automation
  - Avoided because it’s slower and lacks real‑time bidirectional flow

---

## Playwright Driver
- Runs as a **Node.js server**
- Acts as the **middle layer** between test scripts and browser engines
- Translates JSON‑RPC commands into browser‑specific protocols

---

## Browser Engines
- **Chromium (Chrome, Edge, Opera)** → Uses **Chromium DevTools Protocol (CDP)**
- **Firefox** → Uses Playwright’s **patched binary** with its own protocol
- **WebKit (Safari)** → Uses Playwright’s **custom WebKit build**
- Installed via:
  - `npm install @playwright/test`
  - `npx playwright install`

---

## Binary Paths
- Browser binaries cached locally:
  - **Mac** → `~/Library/Caches/ms-playwright`
  - **Windows** → `%USERPROFILE%\AppData\Local\ms-playwright`

---

## Key Flow Summary
1. **Test script** sends API calls
2. Calls go through **WebSocket/JSON‑RPC** to the **Playwright driver**
3. Driver translates commands into **browser‑specific protocols**
4. Browser engines execute actions (open page, click, navigate)
5. Results return via the same WebSocket connection

---

# 🔄 Difference in Communication Flow

## Selenium
- Uses **HTTP protocol** (request/response)
- Each command = separate HTTP call
- Slower due to overhead
- Needs browser drivers (ChromeDriver, GeckoDriver, etc.)

## Playwright
- Uses **WebSocket protocol** (persistent, bi‑directional)
- Commands sent as **JSON‑RPC messages**
- Faster, fewer round trips
- No external drivers — Playwright ships patched browser binaries




# 🔄 Playwright Browser Interaction

## Chromium (Chrome, Edge, Opera)
- **Protocol:** Uses **Chromium DevTools Protocol (CDP)**
- **Flow:**
  1. Test script sends API calls → JSON‑RPC messages
  2. Playwright driver translates into CDP commands (e.g., `Page.navigate`, `Input.dispatchMouseEvent`)
  3. Chromium executes actions (navigate, click, type, screenshot)
- **Binary:** Standard Chromium builds shipped with Playwright
- **Browsers covered:** Google Chrome, Microsoft Edge, Opera
- **Advantage:** Direct CDP access → fast, reliable automation

---

## Firefox (Nightly Build)
- **Protocol:** Firefox does not support CDP → Playwright uses its **own custom protocol**
- **Binary:** Playwright ships a **patched Firefox Nightly build**
- **Flow:**
  1. Test script → JSON‑RPC message
  2. Driver communicates with patched Firefox via Playwright’s custom protocol
  3. Firefox executes actions and returns results
- **Limitations:**
  - No “channel” option (unlike Chrome/Edge)
  - Must rely on Playwright’s patched binary for full automation features
- **Advantage:** Ensures feature parity across browsers even though Firefox lacks CDP

---

## Safari (WebKit)
- **Protocol:** Safari/WebKit also lacks CDP → Playwright uses a **custom WebKit protocol**
- **Binary:** Playwright ships its **own WebKit build** (patched for automation)
- **Flow:**
  1. Test script → JSON‑RPC message
  2. Driver translates into Playwright’s WebKit protocol
  3. WebKit executes actions (navigation, clicks, rendering)
- **Browsers covered:** Safari (macOS, iOS)
- **Advantage:** Enables Safari testing with automation features not available in native Safari builds

---

## 📊 Side‑by‑Side Comparison

| Feature            | Chromium (Chrome/Edge/Opera) | Firefox (Nightly)                  | Safari (WebKit)                  |
|--------------------|-------------------------------|------------------------------------|----------------------------------|
| **Protocol**       | CDP (Chromium DevTools)       | Playwright’s custom Firefox protocol Playwright’s custom WebKit protocol |
| **Binary**         | Standard Chromium builds      | Patched Firefox Nightly            | Patched WebKit build             |
| **Channel option** | Supported (`chrome`, `msedge`) | Not supported                      | Not supported                    |
| **Automation depth** | Full CDP features           | Playwright‑specific hooks          | Playwright‑specific hooks        |
| **Installation**   | `npx playwright install`      | Ships patched Nightly              | Ships patched WebKit             |
