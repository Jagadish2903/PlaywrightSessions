Jira Product Context Agent Workspace
This folder contains Agent One, a Jira-to-product-context assistant focused on QA outcomes.
Its job is to convert Jira story content (plus optional API details) into a QA-ready Product Context document used for manual test case design and automation planning.

What this agent does
Supports two input modes:
Jira integration mode (preferred, when configured)
File fallback mode (current default)
Reads story content from jira/input/story-details.md
Optionally enriches output using jira/input/api-details.md
Produces structured output at jira/output/product-context.md
Enforces a rich format with:
Business and technical context
Validation rules
Success/error scenarios with JSON
Manual QA guidance and automation strategy
Traceability from acceptance criteria to test ideas
Key files in this workspace
Path	Purpose
.github/agents/agent-one.agent.md	Core behavior, rules, and output quality contract for Agent One
.github/prompts/generate-product-context.prompt.md	Invocation prompt and required section order/constraints
jira/input/story-details.md	Primary story source (fallback mode)
jira/input/api-details.md	Optional API enrichment source
jira/output/product-context.md	Generated Product Context output
jira/integration/jira-config.placeholder.md	Placeholder config for future Jira API integration
docs/product-context-agent-guide.md	End-user guide, workflow, and best practices
Current operating model
The repository is currently set up for file-based generation.
Jira integration is present as a placeholder and includes this expected fallback note:

Jira API integration is not configured yet. Using file-based Jira details as source of truth.

Typical workflow
Put story details in jira/input/story-details.md
Add API details in jira/input/api-details.md (recommended for API stories)
Run the Product Context generation prompt
Review jira/output/product-context.md and use it for:
Manual test design
Automation planning
Acceptance criteria traceability
Observations from the current sample
The existing sample output in jira/output/product-context.md shows a fully detailed QA-oriented document (FraudGuard MISMO max-length validation case), confirming that the workspace and agent contract are designed for deep test design support rather than brief story summaries.