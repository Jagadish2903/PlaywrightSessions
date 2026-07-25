🤖 income-review-mcp-server — XPS IMS Automation MCP Server
A Java-based Model Context Protocol (MCP) server that bridges AI assistants (GitHub Copilot, Claude, etc.) with the XPS IMS Income Review test-automation framework — enabling AI to write production-ready automation tests by understanding your framework's exact APIs, constants, and coding style.

Java MCP SDK Maven Transport

📌 Table of Contents
What Is This Project?
Problem It Solves
How It Works
Architecture
MCP Primitives — Tools, Resources & Prompts
Tools
Resources
Prompts
Complete Tool Reference
Complete Resource Reference
Project Structure
Technology Stack
Getting Started
Connecting to AI Assistants
Extending the Server
Design Decisions
🧠 What Is This Project?
This project implements a Model Context Protocol (MCP) server — a standardised protocol that allows AI language models to interact with external tools, data sources, and systems in a structured, type-safe way.

Specifically, it exposes the XPS IMS (Intelligent Mortgage Solutions) Income Review test-automation framework to AI assistants. When an AI like GitHub Copilot is connected to this server, it can:

Discover every automation utility method available in the framework
Understand method signatures, parameters, return types, and usage examples
Access framework constants, API endpoints, base classes, and file paths
Generate test code that uses the real framework APIs — no hallucinated or generic code
🎯 Problem It Solves
Writing automation tests for a complex mortgage platform requires deep knowledge of:

Which utility methods exist and what they do
The exact method signatures and parameter types
Framework constants, base URIs, and authentication patterns
The project structure and where tests should be placed
Without this server, an AI assistant would either:

Generate generic, non-compilable test code
Make up method names that don't exist
Miss framework conventions and coding standards
With this MCP server, the AI calls the registered tools at generation time to get exact details from your framework, then generates tests that compile and follow your standards from day one.

📖 How It Works
Startup & Boot Sequence
mvn clean package → income-review-mcp-server-1.0-SNAPSHOT.jar
         │
         ▼ (launched by MCP host)
AutomationMcpServerApp.main()
         │
         ├─ 1. Creates McpSyncServer with StdioServerTransportProvider
         │       └─ Communicates via STDIN/STDOUT using JSON-RPC 2.0
         │
         ├─ 2. Tool Registration (JsonFileFinder → ToolCreation)
         │       └─ Scans classpath tools/ recursively for *.json files
         │       └─ Deserialises each JSON → McpSchema.Tool + SyncToolSpecification
         │
         ├─ 3. Resource Registration (ResourceCreationAsTool)
         │       └─ Reads resource/incomereview/*.json (7 files)
         │       └─ Registers each as a callable MCP Tool
         │
         ├─ 4. Static Resource (ResourceCreation)
         │       └─ Registers one placeholder MCP Resource endpoint
         │
         ├─ 5. Prompt Registration (PromptCreation)
         │       └─ Registers "create-voie-e2e-test" prompt
         │
         ├─ 6. Notifies clients of all changes
         │
         └─ 7. Parks main thread (join) — serves requests indefinitely
                 └─ Shutdown hook calls closeGracefully() on SIGTERM/Ctrl+C
Request Lifecycle (when AI calls a tool)
AI Assistant                    MCP Server
     │                               │
     │  tools/call "create-applicant"│
     │──────────────────────────────►│
     │                               │  Looks up SyncToolSpecification
     │                               │  Invokes callHandler(exchange, request)
     │                               │  Returns details block as:
     │                               │    • structuredContent (Map<String,Object>)
     │                               │    • textContent (JSON string)
     │◄──────────────────────────────│
     │  CallToolResult with           │
     │  filePath, method-signature,   │
     │  purpose, parameters,          │
     │  returns, usage-example        │
     │                               │
   AI uses these details to write
   accurate, compilable test code
JSON Tool Discovery (JAR-compatible)
JsonFileFinder uses a dual-mode classpath scanner that works in both development (IDE file system) and production (fat-JAR):

Protocol = "file"  → Uses Paths.get(url.toURI()) directly
Protocol = "jar"   → Opens a new FileSystem via FileSystems.newFileSystem(jarUri)
                      then walks the virtual path inside the JAR
This means you can add new tool JSON files and they are picked up automatically at the next server start — no Java code changes required.

🏛️ Architecture
┌─────────────────────────────────────────────────────────────┐
│                    AI Assistant / MCP Host                  │
│         (GitHub Copilot in VS Code / Claude Desktop)        │
└────────────────────────┬────────────────────────────────────┘
                         │  STDIO · JSON-RPC 2.0
                         ▼
┌─────────────────────────────────────────────────────────────┐
│               AutomationMcpServerApp (main)                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  McpSyncServer                      │    │
│  │   ┌──────────┐  ┌──────────┐  ┌────────────────┐   │    │
│  │   │  Tools   │  │Resources │  │    Prompts     │   │    │
│  │   └────┬─────┘  └────┬─────┘  └───────┬────────┘   │    │
│  └────────┼─────────────┼────────────────┼────────────┘    │
│           │             │                │                  │
│  ┌────────▼──────┐ ┌────▼──────────┐ ┌───▼──────────────┐  │
│  │ ToolCreation  │ │ResourceCreat- │ │ PromptCreation   │  │
│  │               │ │ionAsTool      │ │                  │  │
│  │ Deserialises  │ │               │ │ create-voie-     │  │
│  │ tool JSON →   │ │ Loads config  │ │ e2e-test prompt  │  │
│  │ McpSchema.    │ │ JSON → MCP    │ │ (accepts JIRA ID)│  │
│  │ Tool          │ │ Tools         │ │                  │  │
│  └────────┬──────┘ └────┬──────────┘ └──────────────────┘  │
│           │             │                                   │
│  ┌────────▼─────────────▼──────────────────────────────┐    │
│  │                  JsonFileFinder                     │    │
│  │   Scans classpath (file:// + jar://) recursively   │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
  src/main/resources/tools/    src/main/resources/resource/
  (15 tool JSON files)          (7 resource JSON files)
🔧 MCP Primitives
🛠 Tools
Tools are the primary mechanism. Each tool is defined as a JSON file in src/main/resources/tools/. No Java code is needed to register a new tool — JsonFileFinder discovers all .json files recursively at startup.

Tool JSON Schema:

{
  "name":        "kebab-case-unique-tool-name",
  "title":       "Human-readable title shown in AI tool picker",
  "description": "What this tool/method does — used by AI to decide when to call it",
  "details": {
    "filePath":          "Module/path/to/JavaFile.java",
    "method-signature":  "public ReturnType methodName(Type param1, ...)",
    "purpose":           "Detailed explanation of what the method does",
    "parameters":        "param1: description, param2: description, ...",
    "returns":           "What the method returns",
    "usage-example":     "Exact code snippet showing how to call this method in a test"
  }
}
How it becomes an MCP Tool:

JsonFileFinder.getToolFilesContent() reads the file as a raw JSON string
ToolCreation.createTools(content) deserialises it into a ToolDefinition POJO
Shared templates (input-schema.json, output-schema.json, meta.json) are loaded and applied
A McpSchema.Tool is constructed with name, title, description, and schemas
A callHandler is registered that returns the details block as both:
Structured content — Map<String,Object> (queryable by AI)
Text content — JSON string (for display/logging)
📦 Resources
Resources expose framework configuration (base classes, constants, endpoints, project structure) as callable MCP Tools. The AI calls these to understand the project context before writing any code.

Each resource JSON in src/main/resources/resource/incomereview/ follows:

{
  "name":        "unique-resource-tool-name",
  "title":       "Human-readable title",
  "description": "What configuration this resource provides",
  "details": {
    "key": "value",
    ...
  }
}
ResourceCreationAsTool registers every resource JSON as a SyncToolSpecification. When called, it returns the details map as a JSON string so the AI gets the exact class names, constants, and paths to use.

💬 Prompts
The server registers a single reusable prompt template:

Prompt Name	Argument	What it generates
create-voie-e2e-test	jiraId (required)	Full AI instruction to: fetch acceptance criteria for the JIRA, design functional/integration/system tests, connect to this MCP server for tools/resources, and write compilable automation tests following the framework's coding standards
Prompt instruction generated (example for JIRA IMS-1234):

Fetch the Acceptance Criteria for JIRA IMS-1234.
Design functional, integration, and system-level tests based on the criteria.
Connect to my Automation Framework MCP Server, retrieve the available tools
and resources, and use them to write automation tests strictly following my
framework's coding style and standards.
Prioritize MCP tools and resources; do not create custom implementations
unless absolutely necessary.
If required tools/resources are unavailable, create clear placeholders.
Ensure that all generated code compiles successfully without errors.
📋 Complete Tool Reference
IMS Income Review Utility Tools
(src/main/resources/tools/xps-core-automation/xpsims/incomereviewutils/)

Tool Name	Method	Purpose
create-applicant	createApplicant(baseUri, endpoint, token, tenantId, borrowerMap)	Creates a new applicant record in IMS by generating a loan number, mapping borrower details, and POSTing the payload
create-rental-income	createRentalIncome(baseUri, endpoint, token, tenantId, rentalMap, applicantId)	Creates a rental income record for an existing applicant in the Income Review system
get-applicant-details	getApplicantDetails(baseUri, token, tenantId, applicantId)	Retrieves full borrower/applicant details by applicantId
get-applicant-id-from-response	—	Extracts the applicantId from an IMS API response using a predefined JSON path
get-calculation	getCalculation(baseUri, endpoint, token, tenantId, applicantId)	Fetches calculation results (income analysis) for a given applicant
get-rental-income-details	—	Retrieves rental income details for a specific applicant
is-successful-response	isSuccessfulResponse(response)	Validates that the API returned HTTP 200; logs unexpected status codes
validate-calculation-result	validateCalculationResult(response, jsonPath, expectedValue, tolerance, context)	Asserts that an actual calculation value matches expected within a numeric tolerance
verify-applicant-details	—	Validates applicant details in the response against expected values
verify-rental-income-details	—	Validates housing expenses in the rental income response against expected values
Source class for all IMS tools: XPSIMS/src/main/java/com/xps/qa/utils/ImsIncomeReviewUtils.java (Singleton via getInstance())

Common Framework Utility Tools
(src/main/resources/tools/xps-core-automation/common/)

Tool Name	Method	Purpose
Log-debug	Log.debug(message)	Writes a DEBUG-level log in test scripts
Log-info	Log.info(message)	Writes an INFO-level log in test scripts
Log-warn	Log.warn(message)	Writes a WARN-level log in test scripts
Log-error	Log.error(message)	Writes an ERROR-level log in test scripts
report-log	reportLog(object)	Writes a log entry to the Extent HTML test report
Source classes:

XPSCommon/src/main/java/com/xps/qa/utils/Log.java
XPSTestNG/src/main/java/com/xps/qa/driver/TestBase.java
Tool Template (Reference)
(src/main/resources/tools/tool-template.json)

A blank template showing all required fields — copy this when adding a new tool.

📚 Complete Resource Reference
All resources are in src/main/resources/resource/incomereview/ and registered by ResourceCreationAsTool.

Resource Tool Name	File	What It Provides
imsincomereview-base-test-resources-info	base-test-resources.json	BaseTest class path (com.xps.qa.base.incomecalc.api.BaseTest) and Config interface (com.xps.qa.testproperties.IIncomeCalcData)
imsincomereview-environment-variables-resources-info	environment-variables.json	API base URIs, all endpoint accessors (incomeCalc_base_URI(), rentalIncomeCreate_endpoint(), etc.), login URL and credentials
imsincomereview-error-constants-resources-info	error-constants.json	Error message constant names: INVALID_INPUT_MSG, AUTH_FAILED_MSG, TIMEOUT_ERROR_MSG, CONNECTION_ERROR_MSG
imsincomereview-global-constants-resources-info	global-constants.json	Global constants: BaseTest.tenantId, DEFAULT_TIMEOUT, MAX_RETRY_ATTEMPTS
imsincomereview-path-constants-resources-info	path-constants.json	Test data path variable: baseTestDataPath
imsincomereview-sample-files-resources-info	sample-files.json	Sample test data file references
imsincomereview-tests-project-structure-info	file-paths.json	Test package path (ims-tests/src/test/java/com/xps/qa/tests/incomecalc/api/), output directory, and suite XML directory
🗂️ Project Structure
income-review-mcp-server/
│
├── pom.xml                                      # Maven build — Java 17, shade plugin
│
└── src/
    ├── main/
    │   ├── java/org/xps/qa/
    │   │   │
    │   │   ├── app/
    │   │   │   ├── AutomationMcpServerApp.java  # Main entry point — wires all components
    │   │   │   ├── JsonFileFinder.java           # Dual-mode classpath scanner (IDE + JAR)
    │   │   │   └── Constants.java                # App-wide string constants
    │   │   │
    │   │   ├── model/tools/                      # Jackson-deserialisable POJOs for tool JSON
    │   │   │   ├── ToolDefinition.java           # Root: name, title, description, details
    │   │   │   ├── ToolDetails.java              # filePath, method-signature, purpose, etc.
    │   │   │   ├── InputSchema.java              # JSON schema for tool inputs
    │   │   │   ├── InputSchemaDefinition.java
    │   │   │   ├── InputSchemaProperties.java
    │   │   │   ├── OutputSchema.java             # JSON schema for tool outputs
    │   │   │   ├── OutputSchemaDefinition.java
    │   │   │   ├── OutputSchemaProperties.java
    │   │   │   ├── Meta.java                     # version, createdBy, timestamps
    │   │   │   ├── MetaDefinitions.java
    │   │   │   ├── Annotations.java
    │   │   │   ├── AnnotationsDefinition.java
    │   │   │   ├── ContentSchema.java
    │   │   │   ├── ContentItems.java
    │   │   │   ├── ContentProperties.java
    │   │   │   ├── ContentPropertiesText.java
    │   │   │   ├── ContentPropertiesType.java
    │   │   │   ├── ToolResult.java
    │   │   │   ├── StructuredContentResult.java
    │   │   │   ├── UnstructuredContentResult.java
    │   │   │   └── (other schema models…)
    │   │   │
    │   │   ├── tools/
    │   │   │   └── ToolCreation.java             # JSON → McpSchema.Tool + call handler
    │   │   │
    │   │   ├── resources/
    │   │   │   ├── ResourceCreation.java         # Static MCP Resource (placeholder)
    │   │   │   └── ResourceCreationAsTool.java   # Resource JSON → MCP Tools
    │   │   │
    │   │   └── prompts/
    │   │       └── PromptCreation.java           # "create-voie-e2e-test" prompt
    │   │
    │   └── resources/
    │       │
    │       ├── tools/
    │       │   ├── tool-template.json            # ← Copy this to create new tools
    │       │   └── xps-core-automation/
    │       │       ├── common/
    │       │       │   ├── log-debug-method.json
    │       │       │   ├── log-error-method.json
    │       │       │   ├── log-info-method.json
    │       │       │   ├── log-warn-method.json
    │       │       │   └── report-log-method.json
    │       │       └── xpsims/incomereviewutils/
    │       │           ├── create-applicant.json
    │       │           ├── create-rental-income.json
    │       │           ├── get-applicant-details.json
    │       │           ├── get-applicant-id-from-response.json
    │       │           ├── get-calculation.json
    │       │           ├── get-rental-income-details.json
    │       │           ├── is-successful-response.json
    │       │           ├── validate-calculation-result.json
    │       │           ├── verify-applicant-details.json
    │       │           └── verify-rental-income-details.json
    │       │
    │       ├── resource/incomereview/
    │       │   ├── base-test-resources.json
    │       │   ├── environment-variables.json
    │       │   ├── error-constants.json
    │       │   ├── file-paths.json
    │       │   ├── global-constants.json
    │       │   ├── path-constants.json
    │       │   └── sample-files.json
    │       │
    │       └── templates/                        # Shared schemas applied to every tool
    │           ├── annotations.json
    │           ├── input-schema.json
    │           ├── meta.json
    │           └── output-schema.json
    │
    └── test/
        └── java/org/xps/qa/
            └── AppTest.java
💻 Technology Stack
Technology	Version	Role
Java	17	Language runtime
MCP SDK (io.modelcontextprotocol.sdk:mcp)	0.12.1	Model Context Protocol server implementation
Jackson (com.fasterxml.jackson)	(via MCP SDK)	Deserialises tool/resource JSON into POJOs
Gson (com.google.code.gson)	2.13.1	Serialises structured content maps to JSON strings
Logback (ch.qos.logback:logback-classic)	1.5.18	SLF4J-backed structured logging
Maven	3.6+	Build system
Maven Shade Plugin	3.6.0	Packages all dependencies into a single executable fat-JAR
Transport	STDIO	JSON-RPC 2.0 over standard input/output — universally compatible with MCP hosts
🚀 Getting Started
Prerequisites
Java 17 or higher (java --version)
Maven 3.6+ (mvn --version)
Build
# Compile only (no JAR)
mvn clean compile

# Build executable fat-JAR with all dependencies
mvn clean package

# Output:
#   target/income-review-mcp-server-1.0-SNAPSHOT.jar  (shaded, runnable)
Verify the JAR
java -jar target/income-review-mcp-server-1.0-SNAPSHOT.jar
# The server starts and waits on stdin.
# You should see log lines confirming tools and resources were loaded.
# Press Ctrl+C to stop — the shutdown hook calls closeGracefully().
🤖 Connecting to AI Assistants
The server communicates via STDIO (standard input/output) — any MCP-compatible client can connect by launching the JAR as a subprocess.

GitHub Copilot (VS Code)
Add to .vscode/mcp.json in your workspace or to your user-level MCP settings:

{
  "servers": {
    "income-review-mcp": {
      "command": "java",
      "args": [
        "-jar",
        "C:\\path\\to\\income-review-mcp-server-1.0-SNAPSHOT.jar"
      ]
    }
  }
}
Claude Desktop
Add to claude_desktop_config.json:

{
  "mcpServers": {
    "income-review-mcp": {
      "command": "java",
      "args": [
        "-jar",
        "/path/to/income-review-mcp-server-1.0-SNAPSHOT.jar"
      ]
    }
  }
}
Once connected, the AI client will automatically discover and display all registered tools, resources, and prompts.

➕ Extending the Server
Adding a New Automation Tool
No Java code changes needed — just add a JSON file.

Copy the template:
src/main/resources/tools/tool-template.json
Place your new file anywhere under src/main/resources/tools/ (any subdirectory).
Fill in all fields:
{
  "name": "my-new-method",
  "title": "My New Method",
  "description": "Short description the AI uses to decide when to call this tool",
  "details": {
    "filePath":         "Module/path/to/MyUtils.java",
    "method-signature": "public ReturnType myMethod(Type param)",
    "purpose":          "What the method does in detail",
    "parameters":       "param: what it represents",
    "returns":          "What is returned",
    "usage-example":    "MyUtils.getInstance().myMethod(value);"
  }
}
Rebuild: mvn clean package
Restart the MCP server — the new tool is automatically picked up.
Adding a New Resource (Configuration / Constants)
Create src/main/resources/resource/incomereview/my-new-resource.json:
{
  "name":        "imsincomereview-my-new-resource-info",
  "title":       "My New Resource",
  "description": "What configuration this exposes to the AI",
  "details": {
    "some-constant": "ClassName.CONSTANT_NAME",
    "some-endpoint":  "testData.myEndpoint()"
  }
}
Register it in ResourceCreationAsTool.createResourceTool():
specs.add(getToolSpec("incomereview", "my-new-resource.json"));
Rebuild: mvn clean package
🏗️ Design Decisions
Decision	Rationale
JSON-driven tool definitions	Zero Java changes needed to add tools — automation engineers can contribute tools by writing JSON only
Resources exposed as Tools	MCP Resources require URI-based access; exposing them as Tools gives AI clients a simpler, uniform call interface
Fat-JAR (shade plugin)	Single deployable artifact with no external classpath dependencies — easy to configure in any MCP host
STDIO transport	Maximum compatibility — works with VS Code Copilot, Claude Desktop, and any future MCP host without network/auth configuration
Dual-mode classpath scanner	JsonFileFinder handles both file:// (IDE development) and jar:// (production fat-JAR) protocols transparently
Structured + unstructured response	Each tool call returns both a Map<String,Object> (structured, for AI parsing) and a JSON string (text, for display) — compatible with all MCP client implementations
Singleton pattern	ToolCreation, ResourceCreationAsTool, JsonFileFinder, etc. use getInstance() — keeps state consistent and avoids redundant classpath scanning