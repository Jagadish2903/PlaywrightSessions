##  Browser Contexts in Playwright

### Real-world Example
- Suppose you open the same application in **two tabs** (same URL).
- Both tabs share the **same session** (cookies, localStorage).
- If you **logout** in the second tab, the session is invalidated.
- Jumping back to the first tab and clicking anything → session disconnects because logout already happened in the second tab.

### Why?
- Tabs inside the same browser **context** share storage (cookies, session data).
- Logging out in one tab clears the session for all tabs in that context.

### Playwright Solution
- **Browser contexts** allow you to create isolated sessions.
- Each context has its own cookies, localStorage, and session data.
- Perfect for simulating multiple users in the same test run.


### Multi User Scenario (RBAC-RoleBasedAccess)
- In one tab → login as **Admin**
- In another tab → login as **Seller**
- In a third tab → login as **Customer**
- Normally, in Selenium or Cypress, all tabs share the same session → logging out in one tab affects all others.
- Playwright solves this with **isolated browser contexts**.



