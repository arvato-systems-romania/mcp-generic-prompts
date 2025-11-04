# Prompt Library Index

This document provides a comprehensive index of all available prompts organized by category and technology in a hierarchical tree structure.

## Table of Contents

- [General Prompts](#general-prompts)
- [Frontend](#frontend)
- [Backend](#backend)
- [Database](#database)
- [DevOps & Infrastructure](#devops--infrastructure)
- [Security](#security)
- [AI/ML](#aiml)

---

## General Prompts

**Directory:** `prompts/general/`

### Core Utilities

#### Code Review
**File:** [`general/code_review.json`](general/code_review.json)  
**ID:** `code_review`  
Reviews code snippets for issues, improvements, and best practices.

#### Documentation Writer
**File:** [`general/doc_writer.json`](general/doc_writer.json)  
**ID:** `doc_writer`  
Generates developer documentation for functions or modules.

### POC Starters

**File:** [`general/poc-starters.json`](general/poc-starters.json) (9 prompts)  
Traditional POC templates for various architectures:
- `poc-fullstack-webapp` - Modern full-stack web application
- `poc-rest-api` - RESTful API with authentication
- `poc-graphql-api` - GraphQL API server
- `poc-realtime-chat` - WebSocket real-time chat
- `poc-mobile-app` - React Native/Flutter mobile app
- `poc-microservices` - Microservices architecture
- `poc-serverless-function` - Serverless function deployment
- `poc-data-pipeline` - ETL/data processing pipeline
- `poc-ml-model-api` - ML model serving API

### Dependencies & Build

#### Multi-Language Dependencies
**File:** [`general/dependencies.json`](general/dependencies.json) (1 prompt)  
- `dependency-update-analysis` - Analyzes dependencies across npm, Maven, Gradle, pip with security risk assessment

### Compliance

**File:** [`general/compliance.json`](general/compliance.json) (2 prompts)  
- `sbom-generation` - Generates Software Bill of Materials in CycloneDX/SPDX format
- `license-compliance-check` - Audits open source licenses for compliance issues

### Performance

**File:** [`general/performance.json`](general/performance.json) (2 prompts)  
- `performance-profiling-plan` - Designs comprehensive performance profiling strategy
- `memory-leak-triage` - Systematically identifies and triages memory leaks

### Testing

**File:** [`general/testing.json`](general/testing.json) (2 prompts)  
- `flaky-test-diagnosis` - Analyzes flaky tests for root causes (timing, state, dependencies)
- `unit-test-gap-analysis` - Identifies untested code paths and prioritizes coverage improvements

### Refactoring

**File:** [`general/refactoring.json`](general/refactoring.json) (4 prompts)
- `modular-architecture-refactor` - Transforms monolithic code into modular components
- `api-deprecation-remediation` - Migrates deprecated APIs to modern alternatives
- `logging-standardization` - Standardizes logging practices across application
- `code-style-autofix` - Generates automated code style fix proposals

### Documentation

**File:** [`general/documentation.json`](general/documentation.json) (1 prompt)
- `documentation-completeness` - Audits documentation for gaps and outdated content

### Advanced Testing

**File:** [`general/testing-advanced.json`](general/testing-advanced.json) (3 prompts)
- `e2e-testing-strategy` - End-to-end testing architecture with tool selection and CI/CD integration
- `performance-testing-plan` - Performance and load testing strategy with bottleneck analysis
- `chaos-engineering-resilience` - Chaos engineering program for resilience validation

### Data & Analytics

**File:** [`general/data-analytics.json`](general/data-analytics.json) (multiple prompts)
- `data-pipeline-architecture` - Data pipeline design with ETL/ELT, orchestration, and optimization

### Modernization & Compliance

**File:** [`general/legacy-modernization.json`](general/legacy-modernization.json)
**ID:** `legacy_system_modernization`
Modernization strategy for legacy systems including migration approaches and risk assessment.

**File:** [`general/data-privacy-compliance.json`](general/data-privacy-compliance.json)
**ID:** `data_privacy_compliance_audit`
Data privacy compliance audit for GDPR, CCPA, and other regulations.

### Leadership & Organization

**File:** [`general/leadership-product.json`](general/leadership-product.json)
Leadership and product management prompts.

**File:** [`general/team-organization.json`](general/team-organization.json)
Team organization and collaboration prompts.

**File:** [`general/emerging-tech.json`](general/emerging-tech.json)
Emerging technology evaluation and adoption prompts.

---

## Frontend

**Directory:** `prompts/frontend/`

### Framework-Agnostic

**File:** [`frontend/frontend-prompts.json`](frontend/frontend-prompts.json) (6 prompts)
- `frontend-bundle-optimization` - Bundle size and webpack/Vite optimization
- `frontend-accessibility-audit` - WCAG compliance and a11y improvements
- `frontend-performance-metrics` - Core Web Vitals optimization
- `frontend-state-management` - Redux, Zustand, Pinia, Context API patterns
- `frontend-testing-strategy` - Unit, integration, E2E testing
- `frontend-css-architecture` - CSS-in-JS, Tailwind, SASS organization

### Animation & Accessibility

**File:** [`frontend/animation-performance.json`](frontend/animation-performance.json)
**ID:** `animation_performance_review`
Analyzes frontend animations for performance bottlenecks, jank, and optimization opportunities.

**File:** [`frontend/mobile-accessibility-audit.json`](frontend/mobile-accessibility-audit.json)
**ID:** `mobile_accessibility_audit`
Comprehensive mobile app accessibility audit for WCAG and platform-specific guidelines.

### React

**Directory:** `prompts/frontend/react/`

#### Hooks Optimization
**File:** [`frontend/react/hooks-optimization.json`](frontend/react/hooks-optimization.json)  
**ID:** `react-hooks-optimization`  
Analyzes React hooks usage for performance issues, missing dependencies, and optimization opportunities.

#### Component Patterns
**File:** [`frontend/react/component-patterns.json`](frontend/react/component-patterns.json)
**ID:** `react-component-patterns`
Reviews React architecture for compound components, render props, HOCs, and custom hooks.

#### React Architecture
**File:** [`frontend/react/react-architecture.json`](frontend/react/react-architecture.json)
**ID:** `react-architecture-patterns`
Comprehensive React architecture analysis including component design, code organization, and scalability.

#### React State Management
**File:** [`frontend/react/react-state-management.json`](frontend/react/react-state-management.json)
**ID:** `react-state-management-patterns`
In-depth state management patterns covering Context API, Redux, Zustand, React Query, and decision frameworks.

### Angular

**Directory:** `prompts/frontend/angular/`

#### RxJS Patterns
**File:** [`frontend/angular/rxjs-patterns.json`](frontend/angular/rxjs-patterns.json)
**ID:** `angular-rxjs-patterns`
Analyzes RxJS usage for proper observable patterns and subscription management.

#### Angular Architecture
**File:** [`frontend/angular/angular-architecture.json`](frontend/angular/angular-architecture.json)
**ID:** `angular-architecture-patterns`
Comprehensive Angular architecture including modules, dependency injection, lazy loading, and enterprise patterns.

#### Angular Testing
**File:** [`frontend/angular/angular-testing.json`](frontend/angular/angular-testing.json)
**ID:** `angular-testing-strategy`
Complete testing strategy for Angular with Jasmine, Karma, component testing, and E2E patterns.

### Vue

**Directory:** `prompts/frontend/vue/`

#### Composition API Patterns
**File:** [`frontend/vue/composition-api-patterns.json`](frontend/vue/composition-api-patterns.json)
**ID:** `vue-composition-api-patterns`
Reviews Vue 3 Composition API for proper composable design and reactivity patterns.

### Svelte

**Directory:** `prompts/frontend/svelte/`

#### Svelte Optimization
**File:** [`frontend/svelte/svelte-optimization.json`](frontend/svelte/svelte-optimization.json)
**ID:** `svelte-performance-optimization`
Analyzes Svelte applications for reactivity patterns, store management, and performance optimization.

### Next.js

**Directory:** `prompts/frontend/nextjs/`

#### Next.js Optimization
**File:** [`frontend/nextjs/nextjs-optimization.json`](frontend/nextjs/nextjs-optimization.json)
**ID:** `nextjs-performance-optimization`
Analyzes Next.js applications for App Router/Pages Router optimization, SSR, caching, and performance.

### JavaScript

**Directory:** `prompts/frontend/javascript/`

#### Modern JavaScript Patterns
**File:** [`frontend/javascript/modern-javascript-patterns.json`](frontend/javascript/modern-javascript-patterns.json)
**ID:** `modern-javascript-patterns`
Analyzes JavaScript for modern ES6+ patterns, async/await, functional programming, and TypeScript adoption.

---

## Backend

**Directory:** `prompts/backend/`

### Framework-Agnostic

**File:** [`backend/backend-prompts.json`](backend/backend-prompts.json) (6 prompts)  
- `backend-api-design` - REST/GraphQL API design best practices
- `backend-microservices-patterns` - Microservices architecture patterns
- `backend-database-optimization` - Query optimization and indexing
- `backend-caching-strategy` - Redis, Memcached, CDN strategies
- `backend-auth-patterns` - JWT, OAuth2, session management
- `backend-error-handling` - Error handling and logging patterns

### Python

**Directory:** `prompts/backend/python/`

#### Async Optimization
**File:** [`backend/python/async-optimization.json`](backend/python/async-optimization.json)  
**ID:** `python-async-optimization`  
Optimizes Python async/await code with asyncio patterns and concurrency.

#### FastAPI Patterns
**File:** [`backend/python/fastapi-patterns.json`](backend/python/fastapi-patterns.json)  
**ID:** `fastapi-best-practices`  
Analyzes FastAPI applications for dependency injection and production practices.

### Node.js

**Directory:** `prompts/backend/nodejs/`

#### Express Security
**File:** [`backend/nodejs/express-security.json`](backend/nodejs/express-security.json)  
**ID:** `express-security-hardening`  
Comprehensive security audit covering OWASP Top 10 and authentication.

#### Async Patterns
**File:** [`backend/nodejs/async-patterns.json`](backend/nodejs/async-patterns.json)  
**ID:** `nodejs-async-best-practices`  
Analyzes Node.js async code for Promise usage and callback hell prevention.

### Java

**Directory:** `prompts/backend/java/`

#### Spring Boot Optimization
**File:** [`backend/java/spring-boot-optimization.json`](backend/java/spring-boot-optimization.json)  
**ID:** `spring-boot-performance-optimization`  
Analyzes Spring Boot for JPA optimization and caching strategies.

#### Java Version Migration
**File:** [`backend/java/version-migration.json`](backend/java/version-migration.json)  
**ID:** `java-version-migration`  
Creates detailed migration plan for Java version upgrades (8→11→17→21).

#### Build Optimization
**File:** [`backend/java/build-optimization.json`](backend/java/build-optimization.json) (1 prompt)  
- `gradle-build-optimization` - Gradle build performance optimization and caching

#### Maven Convergence
**File:** [`backend/java/maven-convergence.json`](backend/java/maven-convergence.json) (1 prompt)
- `maven-dependency-convergence` - Maven dependency conflict resolution

#### Java Concurrency
**File:** [`backend/java/java-concurrency.json`](backend/java/java-concurrency.json)
**ID:** `java-concurrency-patterns`
Analyzes Java concurrency patterns, thread safety, parallel processing, and modern concurrent utilities.

#### Java Microservices
**File:** [`backend/java/java-microservices.json`](backend/java/java-microservices.json)
**ID:** `java-microservices-architecture`
Comprehensive microservices architecture with Spring Boot/Cloud, resilience patterns, and distributed systems.

### .NET/C#

**Directory:** `prompts/backend/dotnet/`

#### ASP.NET Core Optimization
**File:** [`backend/dotnet/aspnet-core-optimization.json`](backend/dotnet/aspnet-core-optimization.json)
**ID:** `aspnet-core-performance-optimization`
Analyzes ASP.NET Core for Entity Framework optimization, caching, and performance best practices.

#### .NET Architecture Patterns
**File:** [`backend/dotnet/dotnet-architecture-patterns.json`](backend/dotnet/dotnet-architecture-patterns.json)
**ID:** `dotnet-architecture-patterns`
Reviews .NET applications for Clean Architecture, CQRS, DDD, and design patterns.

### Ruby

**Directory:** `prompts/backend/ruby/`

#### Rails Optimization
**File:** [`backend/ruby/rails-optimization.json`](backend/ruby/rails-optimization.json)
**ID:** `rails-performance-optimization`
Analyzes Ruby on Rails for N+1 queries, ActiveRecord optimization, and caching strategies.

### Go

**Directory:** `prompts/backend/go/`

#### Go Optimization
**File:** [`backend/go/go-optimization.json`](backend/go/go-optimization.json)
**ID:** `go-performance-optimization`
Analyzes Go applications for concurrency patterns, memory optimization, and performance best practices.

---

## Database

**Directory:** `prompts/database/`

### SQL Optimization
**File:** [`database/sql-optimization.json`](database/sql-optimization.json)
**ID:** `sql-query-optimization`
Analyzes SQL queries for performance, indexing, and query plan optimization (PostgreSQL, MySQL).

### MongoDB/NoSQL

**File:** [`database/mongodb-optimization.json`](database/mongodb-optimization.json)
**ID:** `mongodb-optimization`
Analyzes MongoDB for indexing strategies, aggregation pipeline optimization, and schema design.

---

## API Design

**Directory:** `prompts/api/`

### GraphQL Optimization
**File:** [`api/graphql-optimization.json`](api/graphql-optimization.json)
**ID:** `graphql-api-optimization`
Analyzes GraphQL APIs for N+1 queries, DataLoader implementation, schema design, and performance.

---

## DevOps & Infrastructure

**Directory:** `prompts/devops/`

### Infrastructure Prompts

**File:** [`devops/devops-prompts.json`](devops/devops-prompts.json) (6 prompts)  
- `devops-ci-cd-optimization` - CI/CD pipeline improvements
- `devops-docker-optimization` - Container image optimization
- `devops-kubernetes-patterns` - K8s deployment and scaling
- `devops-monitoring-setup` - Prometheus, Grafana, ELK stack
- `devops-infrastructure-as-code` - Terraform, Pulumi patterns
- `devops-cloud-cost-optimization` - AWS, GCP, Azure cost reduction

### CI/CD Optimization

**File:** [`devops/ci-optimization.json`](devops/ci-optimization.json) (1 prompt)  
- `ci-pipeline-optimization` - Analyzes CI/CD pipeline for bottlenecks and optimization opportunities

---

## Security

**Directory:** `prompts/security/`

**File:** [`security/security-prompts.json`](security/security-prompts.json) (7 prompts)  
- `security-vulnerability-scan` - OWASP Top 10 vulnerability audit
- `security-dependency-audit` - npm/pip/maven dependency scanning
- `security-secrets-management` - Secrets and credential management
- `security-api-security` - API authentication and authorization
- `security-container-hardening` - Docker/K8s security hardening
- `security-compliance-check` - GDPR, SOC2, HIPAA compliance
- `security-penetration-testing` - Security testing methodology

---

## AI/ML

**Directory:** `prompts/ai-ml/`

### AI/ML POCs
**File:** [`ai-ml/ai-ml-pocs.json`](ai-ml/ai-ml-pocs.json) (5 prompts)  
- `poc-mcp-server` - MCP server with tools and resources
- `poc-ollama-integration` - Local LLM integration with Ollama
- `poc-rag-system` - RAG system with vector database
- `poc-langchain-agent` - LangChain agent with tool use
- `poc-model-finetuning` - Fine-tuning workflow setup

---

## Cloud Platforms

**Directory:** `prompts/cloud/`

### AWS Optimization
**File:** [`cloud/aws-optimization.json`](cloud/aws-optimization.json)
**ID:** `aws-cloud-optimization`
Analyzes AWS infrastructure for cost optimization, Well-Architected Framework compliance, and best practices.

### GCP Optimization
**File:** [`cloud/gcp-optimization.json`](cloud/gcp-optimization.json)
**ID:** `gcp-cloud-optimization`
Analyzes Google Cloud Platform for cost optimization, performance, security, and reliability.

### Azure Optimization
**File:** [`cloud/azure-optimization.json`](cloud/azure-optimization.json)
**ID:** `azure-cloud-optimization`
Analyzes Microsoft Azure for Well-Architected Framework compliance, cost optimization, and best practices.

---

## Directory Structure

```
prompts/
├── PROMPT_INDEX.md                          # This file
├── general/
│   ├── code_review.json                     # Code review utility
│   ├── doc_writer.json                      # Documentation generator
│   ├── poc-starters.json                    # 9 POC templates
│   ├── dependencies.json                    # Dependency analysis
│   ├── compliance.json                      # SBOM & license (2)
│   ├── performance.json                     # Profiling & memory (2)
│   ├── testing.json                         # Flaky tests & coverage (2)
│   ├── refactoring.json                     # Architecture & style (4)
│   └── documentation.json                   # Doc completeness audit
├── frontend/
│   ├── frontend-prompts.json                # 6 general frontend prompts
│   ├── react/
│   │   ├── hooks-optimization.json          # React hooks
│   │   └── component-patterns.json          # React patterns
│   ├── angular/
│   │   └── rxjs-patterns.json               # Angular RxJS
│   ├── vue/
│   │   └── composition-api-patterns.json    # Vue 3 Composition API
│   ├── svelte/
│   │   └── svelte-optimization.json         # Svelte performance
│   └── nextjs/
│       └── nextjs-optimization.json         # Next.js optimization
├── backend/
│   ├── backend-prompts.json                 # 6 general backend prompts
│   ├── python/
│   │   ├── async-optimization.json          # Python async/await
│   │   └── fastapi-patterns.json            # FastAPI architecture
│   ├── nodejs/
│   │   ├── express-security.json            # Express.js security
│   │   └── async-patterns.json              # Node.js async
│   ├── java/
│   │   ├── spring-boot-optimization.json    # Spring Boot performance
│   │   ├── version-migration.json           # Java version upgrade
│   │   ├── build-optimization.json          # Gradle optimization
│   │   └── maven-convergence.json           # Maven conflicts
│   ├── dotnet/
│   │   ├── aspnet-core-optimization.json    # ASP.NET Core performance
│   │   └── dotnet-architecture-patterns.json # .NET architecture
│   ├── ruby/
│   │   └── rails-optimization.json          # Rails performance
│   └── go/
│       └── go-optimization.json             # Go optimization
├── database/
│   ├── sql-optimization.json                # SQL query optimization
│   └── mongodb-optimization.json            # MongoDB optimization
├── api/
│   └── graphql-optimization.json            # GraphQL API optimization
├── cloud/
│   ├── aws-optimization.json                # AWS optimization
│   ├── gcp-optimization.json                # GCP optimization
│   └── azure-optimization.json              # Azure optimization
├── devops/
│   ├── devops-prompts.json                  # 6 infrastructure prompts
│   └── ci-optimization.json                 # CI/CD optimization
├── security/
│   └── security-prompts.json                # 7 security prompts
└── ai-ml/
    └── ai-ml-pocs.json                      # 5 AI/ML POC templates
```

---

## Usage

To use any prompt from the MCP server:

```typescript
// Example: Using a specific prompt
{
  "id": "react-hooks-optimization",
  "variables": {
    "component_name": "UserDashboard",
    "react_code": "...",
    "framework_version": "18.2.0"
  }
}
```

The MCP server recursively scans all subdirectories to discover prompts.

---

## Contributing

When adding new prompts:
1. Place in appropriate technology/category directory
2. Follow the JSON schema format with all required fields
3. Include comprehensive examples with realistic input/output_outline
4. Update this index file
5. Use kebab-case for IDs
6. Ensure no duplicate IDs across all files

---

## Notes

- All prompts follow consistent JSON schema: id, title, description, category, tags, template, input_schema, examples, version, author, timestamps
- Templates use `{{placeholder}}` syntax for variable substitution
- Input schemas are JSON Schema compliant
- The prompt loader ([`src/utils/loadPrompts.ts`](../src/utils/loadPrompts.ts)) recursively scans all subdirectories
- Build tested and verified: prompts, 0 duplicates
