#  Playwright Commands Cheat Sheet

## Debugging Commands
```bash
DEBUG=pw:* npx playwright test          # Very verbose logs
DEBUG=pw:api npx playwright test        # Detailed API logs
DEBUG=pw:browser* npx playwright test   # Browser process logs
DEBUG=pw:protocol npx playwright test   # CDP protocol messages
DEBUG=pw:test npx playwright test       # Test runner internals





## CLI COMMANDS:

# Codegen with URL
npx playwright codegen <url>
# Example:
npx playwright codegen https://testautomationpractice.blogspot.com/

# Codegen without URL
npx playwright codegen

# Codegen with specific viewport size
npx playwright codegen --viewport-size=<w>,<h> <url>
# Example:
npx playwright codegen --viewport-size=1280,720 https://testautomationpractice.blogspot.com/

# Codegen with device emulation
npx playwright codegen --device="<device>" <url>
# Example:
npx playwright codegen --device="iPhone 13" https://testautomationpractice.blogspot.com/


 ## Reports

# Run tests with a specific reporter
npx playwright test --reporter=<reporter>
# Example:
npx playwright test --reporter=html

# Use multiple reporters
npx playwright test --reporter=list,html

# Run with dot reporter (minimal)
npx playwright test --reporter=dot

# Run with JSON reporter
npx playwright test --reporter=json

# Run with JUnit reporter
npx playwright test --reporter=junit

# Specify output dir for reports/results
npx playwright test --output=<dir>
# Example:
npx playwright test --output=xpanse-results/


Note: 
Usually preferene will be given to the CLI commands and generate the report ..and we can also use that report config in config.ts by default run command
example :   reporter: [
    ['html'],
    ['list']
  ]



