---
title: n8n Expressions Cheat-Sheet
description: The Complete Guide to Powerful JavaScript One-Liners
date: 2025-06-06
version: 1.0
---

<small>Current version: {{ page.version }}</small>
{% if page.date %}<small><br>Published on: {{ page.date | date: "%B %d, %Y" }}</small>{% endif %}

This guide provides a detailed overview of n8n expressions, covering everything from basic variable access to advanced data transformations. The cheat sheet is organized by skill level to help you master JavaScript expressions in n8n workflows.

## Table of Contents

### Intro

1. [What are n8n expressions?](#what-are-expressions)
2. [How and when to use them](#how-and-when)
3. [Quick Reference](#quick-reference)
4. [Learning resources](#learning-resources)

### n8n Workflow Templates Analysis

{:start="5"}
5. [Beginner Level](#total-beginner)
6. [Novice Level](#novice)
7. [Intermediate Level](#intermediate)
8. [Expert Level](#expert)

## What are n8n expressions? {#what-are-expressions}

n8n expressions are [short JavaScript code snippets](https://docs.n8n.io/code/expressions/) within {% raw %}`{{ }}`{% endraw %} brackets that provide dynamic capabilities. They allow you to access and transform data from previous nodes, the workflow context, and your n8n environment.

Expressions rely on [Tournament - n8n's templating language](https://github.com/n8n-io/tournament), extended with custom methods, variables, and data transformation functions. You can execute JavaScript snippets within expressions without using a separate [Code Node](https://docs.n8n.io/code/code-node/).

**Basic syntax:** {% raw %}`{{ your JavaScript expression here }}`{% endraw %}

![n8n expression example]({{ page.url }}/01-expression-example.png)

{% include caption t="Expressions are available in every n8n node in the majority of input fields (including configuration fields)" %}

### Key Capabilities

- **Previous node data access**: Reference outputs from any node in your workflow (JSON and binary data)
- **Built-in helper functions**: Access n8n's specialized [data transformation functions](https://docs.n8n.io/code/builtin/data-transformation-functions/) and [convenience methods](https://docs.n8n.io/code/builtin/convenience/)
- **Standard JavaScript**: Use any Vanilla [JavaScript methods and operations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference), built-in [Luxon (for date-time operations)](https://docs.n8n.io/code/cookbook/luxon/), and [JMESPath library (for advanced use-cases)](https://docs.n8n.io/code/builtin/jmespath/)
- **Environment information**: Access workflow and node [metadata, as well as environment variables](https://docs.n8n.io/code/builtin/n8n-metadata/)

## How and when to use them {#how-and-when}

| Use Case | Description |
|----------|-------------|
| **Simplify IF conditions** | Replace complex IF nodes with [inline ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator) for simple conditional logic. |
| **Conditional logic** | Use [logical operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators#logical_operators) for quick decisions within existing nodes. |
| **Smart parametrization** | Create dynamic endpoints, filenames, and parameters based on data from previous nodes. |
| **Data transformation** | Format, calculate, and manipulate data on-the-fly without separate transformation nodes. |
| **Array/object operations** | Transform data structures using JavaScript array methods and n8n's built-in transformation functions. |
| **Date and time manipulation** | Leverage Luxon integration for sophisticated date operations. |

## Quick Reference {#quick-reference}

Here's a very brief summary for the most common expressions. Curly {% raw %}`{{ }}`{% endraw %} brackets were removed for simplicity.

| Category | Expression | Description | Use Case |
|----------|------------|-------------|----------|
| **Current Data** | `$json` | Current item JSON data | Access current data |
| | `$json.fieldName` | Specific field from current item | Get specific property |
| | `$itemIndex` | Current item index (0-based) | Loop processing |
| | `$binary` | Current item binary data | File/image operations |
| **Node Access** | `$("NodeName").first()` | First item from named node | Get single result |
| | `$("NodeName").all()` | All items from named node | Process multiple items |
| | `$("NodeName").last()` | Last item from named node | Get latest item |
| | `$("NodeName").item` | Linked item from named node | Trace data lineage |
| **Date/Time** | `$now` | Current timestamp | Timestamps |
| | `$today` | Today at midnight | Date operations |
| | `$now.toFormat("yyyy-MM-dd")` | Format date as string | Date formatting |
| | `$now.plus({days: 7})` | Add 7 days to current date | Date calculations |
| **Conditionals** | `condition ? "yes" : "no"` | Ternary operator | Simple conditions |
| | `value ?? "default"` | Null coalescing operator | Handle null values |
| | `$if(condition, "true", "false")` | n8n if helper function | Complex conditions |
| | `value \|\| "fallback"` | Logical OR fallback | Default values |
| **String Methods** | `text.toUpperCase()` | Convert to uppercase | Text formatting |
| | `text.toLowerCase()` | Convert to lowercase | Text formatting |
| | `text.includes("search")` | Check if text contains substring | Text validation |
| | `text.extractEmail()` | Extract email from text | Data extraction |
| **Array Methods** | `array.length` | Get array length | Count items |
| | `array.filter(x => x > 5)` | Filter array items | Data filtering |
| | `array.map(x => x.name)` | Transform array items | Data transformation |
| | `array.join(", ")` | Join array to string | Text generation |
| **Utility** | `$execution.id` | Current execution ID | Workflow tracking |
| | `$prevNode.name` | Previous node name | Flow control |
| | `$runIndex` | Current run index | Loop counting |
| | `$vars.variableName` | Access custom variable | Configuration |

## Learning resources {#learning-resources}

- [**General JavaScript documentaion**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) - Complete reference on Mozilla Developer Network website

### Essential n8n Documentation Links

- [**Expressions Overview**](https://docs.n8n.io/code/expressions/) - Core concepts and basic usage
- [**Built-in Methods Reference**](https://docs.n8n.io/code/builtin/overview/) - Complete built-in function reference
- [**Data Transformation Functions**](https://docs.n8n.io/code/builtin/data-transformation-functions/) - Specialized helper functions
- [**JMESPath Query Language**](https://docs.n8n.io/code/cookbook/jmespath/) - JSON querying capabilities via JMESPath
- [**Date/Time with Luxon**](https://docs.n8n.io/code/cookbook/luxon/) - Advanced date operations
- [**Common Expression Issues**](https://docs.n8n.io/code/cookbook/expressions/common-issues/) - Troubleshooting guide

## n8n Community Templates Analysis

### Overview

This comprehensive guide analyzes **3,224 expressions** from **830 unique community workflows**, categorizing them by usage patterns and complexity. Each category includes actual expressions used in production workflows.

### Methodology

Initial analysis was conducted in three phases:

1. Data was ingested on 20th of May 2025. Template JSONs were analyzed via regular expressions. 1642 workflow templates had *ANY* JS expressions. 3200+ real-world expressions were extracted from 830 templates.
2. Raw data was analyzed with Google Gemini 2.5 Pro to categorize expressions into several groups and provide references to the original templates.
3. Final report was compiled from intermediary summaries + raw data via Perplexity Labs.

---

## Beginner Level {#total-beginner}

*This section covers the fundamental patterns. Master these before moving to novice-level expressions*

---

### 1. Basic Property Access and String Manipulation

**Overview:** The most common pattern in n8n - accessing properties of the `$json` object and applying basic JavaScript string methods like `trim()`, concatenation (`+`), and `replace()`. This is essential for cleaning up data, combining fields, or making simple text substitutions.

#### Basic Property Access
{% raw %}```javascript
// Access simple properties
{{$json.name}}
{{$json.email}}
{{$json.status}}

// Access nested properties
{{$json.user.firstName}}
{{$json.data.results}}
{{$json.settings.config}}
```{% endraw %}

#### String Cleaning and Formatting
{% raw %}```javascript
// Remove whitespace
{{$json.text.trim()}}

// Basic string concatenation
{{$json.title + $json.description}}
{{$json.firstName + " " + $json.lastName}}

// Simple text replacement
{{$json.topic.replace('"','')}}
{{$json.content.replace('old text', 'new text')}}

// Case conversion
{{$json.name.toLowerCase()}}
{{$json.title.toUpperCase()}}
```{% endraw %}

---

### 2. Working with JSON Strings

**Overview:** Converting JavaScript objects or parts of objects into JSON strings using `toJsonString()`. This is often necessary when passing data between nodes or when a node expects a string representation of an object.

#### Basic JSON Conversion
{% raw %}```javascript
// Convert entire object to JSON string; equivalent to JSON.stringify()
{{$json.toJsonString()}}

// Convert specific properties to JSON string
{{$json.tools.toJsonString()}}
{{$json.config.toJsonString()}}
{{$json.data.toJsonString()}}
```{% endraw %}

#### JSON with String Manipulation
{% raw %}```javascript
// JSON conversion with quote replacement
{{$json.toJsonString().replaceAll(/'/g,"''")}}

// Convert and format JSON
{{$json.categories.toJsonString()}}
{{$json.settings.toJsonString().trim()}}
```{% endraw %}

---

### 3. Checking for Existence and Null Values

**Overview:** Using comparison operators (`!== null`, `== null`) to check if a property exists and is not null. This is a simple way to determine if a specific piece of data is available before trying to use it.

#### Basic Existence Checks
{% raw %}```javascript
// Check if property is not null
{{$json.twitter.id !== null}}
{{$json.email !== null}}
{{$json.data !== null}}

// Check if property is null
{{$json.waiting_reply != null}}
{{$json.optional_field == null}}
```{% endraw %}

#### Boolean Conversion for Existence
{% raw %}```javascript
// Convert to boolean (double negation)
{{!!$json.value}}
{{!!$json.data}}
{{!!$json.settings}}

// Check object properties exist
{{!!$json.user.email}}
{{!!$json.config.enabled}}
```{% endraw %}

---

### 4. Checking Boolean Conditions

**Overview:** Directly checking if a property's value is equal to a specific boolean value or string representation of a boolean. Essential for conditional logic and workflow branching.

#### Simple Boolean Checks
{% raw %}```javascript
// String equality checks
{{$json.Action === "approve"}}
{{$json.status === "active"}}
{{$json.type === "premium"}}

// Boolean value checks
{{$json.enabled === true}}
{{$json.verified === false}}
{{$json.public === true}}
```{% endraw %}

#### Status and Type Verification
{% raw %}```javascript
// Check action types
{{$json.operation === "create"}}
{{$json.method === "POST"}}
{{$json.mode === "production"}}

// Verify boolean flags
{{$json.isActive === true}}
{{$json.hasPermission === true}}
{{$json.isComplete === false}}
```{% endraw %}

---

### 5. Node Data Access from Previous Workflow Steps

**Overview:** The `$('Node Name')` syntax is a common pattern for accessing data processed by earlier nodes in your workflow. While very useful, this pattern obscures data flow visibility within the workflow. Do not overuse this approach. One good suggestion is to use fixed `CONFIG` Set node in the beginning of the workflow and intelligent use of Merge nodes. This way the data is almost always accessible from the previous nodes and in rare cases only `CONFIG` node is referenced.

#### Basic Node Access Patterns
{% raw %}```javascript
// Access first item from a node
{{$('Node Name').first().json.property}}
{{$('Get Data').first().json.result}}
{{$('API Call').first().json.response}}

// Access last item from a node
{{$('Process Data').last().json.output}}
{{$('Transform').last().json.final}}

// Access current item in loops
{{$('Split Data').item.json.value}}
{{$('Each Item').item.json.field}}
```{% endraw %}

#### Common Node Access Patterns
{% raw %}```javascript
// Get configuration from setup nodes
{{$('Get Config').first().json.apiKey}}
{{$('Setup').first().json.endpoint}}
{{$('Initialize').first().json.settings}}

// Access processed data from previous steps
{{$('Clean Data').first().json.cleaned}}
{{$('Transform').first().json.formatted}}
{{$('Validate').first().json.verified}}
```{% endraw %}

---

### Common Beginner Patterns Summary

#### Best Practices for Beginners
- Use `.first()` when you expect a single item from a previous node or when the item linking between nodes could be broken.
- Use `trim()` to clean up user input and API responses
- Check for null values before performing operations on optional data
- Use clear, descriptive node names for better expression readability
- Start with simple property access before moving to complex transformations

#### Common Mistakes to Avoid
- Forgetting to use `.json` when accessing node data
- Not checking for null values before string operations
- Using complex expressions when simple property access would work
- Mixing up `===` (strict equality) with `==` (loose equality)

---

## Novice Level {#novice}

*This section builds upon basic property access with conditional logic, data fallbacks, string processing, and simple transformations. These patterns represent the next step in n8n mastery.*

---

### 1. Conditional Logic and Default Values

**Overview:** Using the logical OR operator (`||`) and ternary operators to provide fallback values when properties are null, undefined, or empty. This is essential for handling missing data and ensuring workflows don't break with incomplete inputs.

#### Basic Default Values with OR Operator
{% raw %}```javascript
// Provide fallback values
{{$json.textHtml || $json.textPlain}}
{{$json.title || "Untitled"}}

// Numeric defaults
{{$json.tries || 0}}
{{$json.maxLimit || 100}}

// Configuration defaults
{{$json.language || 'en'}}
{{$json.theme || 'light'}}
```{% endraw %}

#### Ternary Operators for Conditional Logic
{% raw %}```javascript
// Simple condition checks
{{$json.status === 'active' ? 'Online' : 'Offline'}}
{{$json.age >= 18 ? 'Adult' : 'Minor'}}
{{$json.verified ? 'Verified User' : 'Unverified'}}

// Complex conditional logic
{{$json.value.isEmpty() ? $json.id : $json.value[0].id}}
{{$json.type === 'premium' ? $json.premiumFeatures : $json.basicFeatures}}
```{% endraw %}

#### Boolean Logic Combinations
{% raw %}```javascript
// AND conditions
{{$json.type == 'audio' && Boolean($json.audio)}}
{{$json.enabled && $json.verified && $json.active}}

// OR conditions
{{$json.email || $json.alternateEmail || 'no-email@example.com'}}
{{$json.firstName || $json.username || 'Anonymous'}}
```{% endraw %}

---

### 2. String Splitting and Substring Operations

**Overview:** Breaking down strings into smaller parts using `split()` or extracting portions using `substring()`. This is crucial for parsing delimited data, extracting domains from URLs, and processing structured text.

#### String Splitting Patterns
{% raw %}```javascript
// Split by delimiter and take specific part
{{$json.title.split('(Severity:')[1].replace(')', '').trim()}}
{{$json.email.split('@')[1]}}  // Get domain from email
{{$json.fullName.split(' ')[0]}}  // Get first name

// URL parsing with split
{{$json.url.split('://')[1].split('/')[0]}}  // Extract domain
{{$json.path.split('/').pop()}}  // Get filename from path
```{% endraw %}

#### Substring Extraction
{% raw %}```javascript
// Extract fixed-length portions
{{$json.title.substring(14)}}
{{$json.id.substring(0, 8)}}  // First 8 characters
{{$json.description.substring(10, 50)}}  // Characters 10-50

// Combined with other operations
{{$json.code.substring(0, 3).toUpperCase()}}
{{$json.text.substring(5).trim()}}
```{% endraw %}

#### Chain Operations for Complex Processing
{% raw %}```javascript
// Multi-step string processing
{{$json.title.split('(Severity:')[1].replace(')', '').trim()}}
{{$json.filename.split('.')[0].toLowerCase()}}
{{$json.url.split('://')[1].split('/')[0].toLowerCase()}}
```{% endraw %}

---

### 3. Type Conversion and Date Manipulation

**Overview:** Converting between data types and working with dates using `toDateTime()`, `Number()`, and other conversion methods. Essential for API integrations and data formatting.

#### Date Conversion and Formatting
{% raw %}```javascript
// Convert to date and extract parts
{{$json.release_date.toDateTime().year}}
{{$json.timestamp.toDateTime().month}}
{{$json.createdAt.toDateTime().day}}

// Format dates
{{$json.eventDate.toDateTime().toISOString()}}
{{$json.birthday.toDateTime().toFormat('yyyy-MM-dd')}}
```{% endraw %}

#### Number Conversion
{% raw %}```javascript
// Convert strings to numbers
{{Number($json.price)}}
{{parseInt($json.quantity)}}
{{parseFloat($json.percentage)}}

// Conditional number conversion
{{$json?.query?.maxlimit == null ? 70000 : Number($json?.query?.maxlimit)}}
{{isNaN(Number($json.value)) ? 0 : Number($json.value)}}
```{% endraw %}

#### Arithmetic Operations
{% raw %}```javascript
// Simple math operations
{{$json.waitSeconds + 60}}
{{$json.price * $json.quantity}}
{{$json.total - $json.discount}}

// Percentage calculations
{{($json.completed / $json.total) * 100}}
{{Math.round($json.average * 100) / 100}}
```{% endraw %}

---

### 4. Accessing Data from Previous Nodes

**Overview:** Advanced patterns for referencing data processed in earlier workflow steps, including dynamic property access and node data integration with current item processing.

#### Dynamic Node Data Access
{% raw %}```javascript
// Access node data with dynamic property names
{{$json[$('Setup').first().json.domainCustomFieldId2]}}
{{$json[$('Config').first().json.fieldName]}}

// Conditional node access
{{$('Node').isExecuted ? $('Node').first().json.value : 'default'}}
{{$('API Call').all().length > 0 ? $('API Call').first().json.data : null}}
```{% endraw %}

#### Node Data Integration with String Operations
{% raw %}```javascript
// Replace text using node data
{{$json.Transfers.from_address.replace($('Edit Fields').item.json['Your Wallet Address'],"Your Wallet Address")}}
{{$json.template.replace('{{placeholder}}', $('Variables').first().json.value)}}

// Combine node data with current data
{{$('User Info').first().json.name + ': ' + $json.message}}
{{$json.prefix + $('Settings').first().json.suffix}}
```{% endraw %}

#### Error Handling with Node Access
{% raw %}```javascript
// Safe node access with fallbacks
{{$('Data Source').first()?.json?.result || 'No data'}}
{{$('API').isExecuted && $('API').first().json ? $('API').first().json.value : null}}
```{% endraw %}

---

### 5. Optional Chaining and Nullish Coalescing

**Overview:** Using the optional chaining operator (`?.`) and nullish coalescing operator (`??`) to safely access nested properties and provide defaults. This prevents errors when dealing with potentially missing or undefined data.

#### Safe Property Access
{% raw %}```javascript
// Basic optional chaining
{{$json?.user?.email}}
{{$json?.settings?.theme}}

// With fallback values
{{$json?.user?.name || "Anonymous"}}
{{$json?.config?.timeout ?? 30}}
{{$json?.response?.data?.items || []}}
```{% endraw %}

#### Complex Nested Access
{% raw %}```javascript
// Deep property access with safety
{{$json?.data?.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]}}
{{$json?.parameters?.model?.value || $json?.parameters?.model || $json?.parameters?.modelId?.cachedResultName}}

// Array and object safety
{{$json?.results?.[0]?.name}}
{{$json?.user?.preferences?.notifications?.email}}
```{% endraw %}

#### Multiple Fallback Chains
{% raw %}```javascript
// Cascade through multiple potential sources
{{$json?.primaryEmail || $json?.secondaryEmail || $json?.backupContact?.email || "no-email"}}
{{$json?.title?.en || $json?.title?.default || $json?.name || "Untitled"}}

// Type-safe operations
{{$json?.count ? $json.count + 1 : 1}}
{{$json?.items?.length ? $json.items.join(', ') : 'No items'}}
```{% endraw %}

---

### 6. String Processing

**Overview:** More sophisticated string operations including regular expressions, complex replacements, and multi-step text transformations commonly used in data cleaning and formatting.

#### Multi-step String Cleaning
{% raw %}```javascript
// Chain multiple string operations
{{$json.text.trim().toLowerCase().replace(/\s+/g, '-')}}
{{$json.title.replace(/[^\w\s]/g, '').trim().substring(0, 50)}}

// Remove and replace patterns
{{$json.content.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()}}
{{$json.filename.replace(/[<>:"/\\|?*]/g, '_').toLowerCase()}}
```{% endraw %}

#### Email and URL Processing
{% raw %}```javascript
// Extract domains and validate
{{$json.email.split('@')[1].toLowerCase()}}
{{$json.url.includes('https://') ? $json.url : 'https://' + $json.url}}

// Clean and format URLs
{{$json.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}}
{{$json.domain.startsWith('www.') ? $json.domain.substring(4) : $json.domain}}
```{% endraw %}

#### Text Validation and Formatting
{% raw %}```javascript
// Length validation with truncation
{{$json.description.length > 100 ? $json.description.substring(0, 97) + '...' : $json.description}}
{{$json.title.length < 5 ? $json.title + ' (short title)' : $json.title}}

// Format validation
{{$json.phone.replace(/\D/g, '').length === 10 ? $json.phone : 'Invalid phone'}}
{{$json.email.includes('@') && $json.email.includes('.') ? $json.email : 'Invalid email'}}
```{% endraw %}

---

### Common Novice Patterns Summary

#### Best Practices for Novice Level
- Always provide fallback values for optional data
- Use optional chaining (`?.`) when accessing nested properties
- Validate data types before conversion operations
- Chain string operations logically from left to right
- Test expressions with both complete and incomplete data

#### Common Mistakes to Avoid
- Forgetting fallback values when using logical OR (`||`)
- Not handling null/undefined values in nested access
- Mixing up `??` (nullish coalescing) with `||` (logical OR)
- Over-complicating string operations instead of using multiple steps
- Not validating data before type conversion

---

## Intermediate Level {#intermediate}

*This section covers intermediate-level n8n expression patterns that introduce more complex data manipulation techniques. These expressions often combine multiple operations, utilize advanced JavaScript methods, and solve specific data transformation challenges*

---

### 1. Array Manipulation and Transformation

**Overview:** Working with arrays in the `$json` object using JavaScript array methods like `join()`, `map()`, `filter()`, and more. These patterns are essential for transforming collections of data and restructuring complex information.

#### Array Joining Operations
{% raw %}```javascript
// Join array elements with separators
{{$json.topics.join('\n')}}
{{$json.tags.join(', ')}}
{{$json.items.join(' | ')}}

// Join with formatting
{{$json.names.map(n => n.toUpperCase()).join(' - ')}}
```{% endraw %}

#### Array Mapping and Transformation
{% raw %}```javascript
// Transform each array element
{{$json.items.map(item => item.name)}}
{{$json.users.map(user => user.firstName + ' ' + user.lastName)}}

// Combine mapping with filtering
{{$json.products.filter(p => p.inStock).map(p => p.name)}}
{{$json.emails.filter(e => e.includes('@gmail.com')).length}}
```{% endraw %}

#### Array Extraction
{% raw %}```javascript
// Extract and transform nested array data
{{$json.trend_scores.map(item => item.score).join("; ")}}
{{$json.attendees.map(person => person.name).join(', ')}}
{{$json.results.map(r => `${r.name}: ${r.score}`).join('\n')}}
```{% endraw %}

---

### 2. Regular Expressions for Pattern Matching

**Overview:** Using regular expressions with string methods like `match()` and `replace()` to extract specific patterns from text. This is powerful for parsing structured content like emails, dates, URLs, or cleaning data based on complex pattern-matching rules. Regular expressions are a broad topic - refer to [MDN's regex guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) for comprehensive coverage.

#### Basic Pattern Matching
{% raw %}```javascript
// Extract specific patterns
{{$json.email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/)[0]}}
{{$json.text.match(/\d{4}-\d{2}-\d{2}/)[0]}}  // Extract date YYYY-MM-DD

// Capture groups with regex
{{$json.title.match(/[^ ]* ([^:]*):/)[1].trim()}}
{{$json.URL.match(/(@[^\\/?]+)/)[1]}}
```{% endraw %}

---

### 3. String and Data Transformations

**Overview:** Complex manipulations combining multiple JavaScript methods, often involving string transformations, conditional logic, and object manipulation. These expressions represent the more sophisticated data processing in n8n workflows.

#### Multi-step String Processing
{% raw %}```javascript
// Multiple string operations chained
{{$json.title.split('Severity:')[1].replaceAll(')', '').trim().toLowerCase().toTitleCase()}}
{{$json.user_prompt.replace(/\n/g, " ").replace(/\s+/g, " ").trim()}}
{{$json.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}}

// Advanced text normalization
{{$json.content.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()}}
{{$json.tags.map(tag => tag.trim().toLowerCase()).filter(Boolean).join(',')}}
```{% endraw %}

#### Conditional String Transformations
{% raw %}```javascript
// Complex conditional string logic
{{$json.value.toLowerCase().includes('dkim=pass') ? "pass" : $json.value.toLowerCase().includes('dkim=fail') ? "fail" : $json.value.toLowerCase().includes('dkim=temperror') ? "error" : "unknown"}}
{{$json.virusTotalStats.suspicious + $json.virusTotalStats.malicious === 0 ? "✅ Harmless": "🚨 Malicous"}}
```{% endraw %}

---

### 4. Array Operations

**Overview:** Array manipulation techniques including filtering, mapping, reducing, and custom sorting. These patterns enable complex data transformation and aggregation operations essential for reporting and data processing.

#### Custom Sorting and Array Transformations
{% raw %}```javascript
// Sort arrays by property
{{$json.items.sort((a, b) => a.name.localeCompare(b.name))}}
{{$json.products.sort((a, b) => b.price - a.price)}}

// Get unique values
{{[...new Set($json.categories)]}}
{{$json.tags.filter((tag, index, array) => array.indexOf(tag) === index)}}
```{% endraw %}

---

### 5. JSON Object Property Manipulation

**Overview:** Working with complex object structures using JavaScript object methods like `Object.keys()`, `Object.values()`, and `Object.entries()`. These patterns enable dynamic property access, configuration handling, object introspection, and restructuring of complex data objects into more usable formats.

#### Object Property Operations
{% raw %}```javascript
// Get object keys and values
{{Object.keys($json.data)}}
{{Object.values($json.stats)}}
{{Object.entries($json.config).map(([key, value]) => `${key}: ${value}`).join('\n')}}

// Check property existence
{{Object.keys($json.user).includes('email')}}
{{Object.keys($json.settings).length > 0}}
{{$json.hasOwnProperty('config')}}
```{% endraw %}

---

### 6. Data Validation

**Overview:** Advanced patterns for validating data integrity, handling edge cases, and preventing errors in workflows. These expressions use type checking, format validation, and safe conversion techniques to create automations that gracefully handle unexpected or malformed data inputs.

#### Data Validation
{% raw %}```javascript
// Validate email format
{{/^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/.test($json.email) ? $json.email : 'Invalid email'}}

// Number validation
{{!isNaN(Number($json.price)) && Number($json.price) > 0 ? Number($json.price) : null}}

// String length and content validation
{{$json.password && $json.password.length >= 8 ? true : 'Password too short'}}
```{% endraw %}

#### Type Checking and Conversion
{% raw %}```javascript
// Type-safe operations
{{typeof $json.count === 'number' ? $json.count : 0}}
{{Array.isArray($json.items) ? $json.items : [$json.items].filter(Boolean)}}
{{typeof $json.enabled === 'boolean' ? $json.enabled : $json.enabled === 'true'}}

// Safe array operations
{{(Array.isArray($json.tags) ? $json.tags : [$json.tags]).filter(Boolean).join(', ')}}
{{$json.results?.length ? $json.results : []}}
```{% endraw %}

---

### Common Intermediate Patterns Summary

#### Best Practices for Intermediate Level
- Break complex transformations into steps for better readability
- Validate data existence before performing complex operations
- Use consistent chaining patterns for method sequences
- Add comments for complex regex patterns
- Test expressions with both normal and edge cases

#### Common Mistakes to Avoid
- Forgetting array bounds when accessing array indices
- Missing error handling for regex that might not match
- Creating overly complex chains that are hard to debug
- Assuming object properties always exist
- Not considering empty array or object cases

---

## Expert Level {#expert}

*This section covers the most sophisticated n8n expression patterns involving complex JavaScript logic, advanced data transformations, and dynamic code generation. These patterns enable highly customized automation solutions.*

---

### 1. Advanced Array Transformations with Reduce and FlatMap

**Overview:** Using advanced JavaScript array methods like `reduce()` for complex aggregations and data restructuring, `flatMap()` for mapping and flattening nested structures, and complex method chaining for sophisticated data analysis and transformation operations.

#### Using Reduce for Aggregation and Object Transformation
{% raw %}```javascript
// Transform array of objects into a single keyed object
{{$json.data.reduce((acc, { id, name }) => ({ ...acc, [id]: name }), {})}}

// Calculate aggregated statistics from multiple data points
{{$input.all().map(x => x.json.Data.DownloadLink).reduce((accumulator, currentValue) => accumulator && currentValue, true)}}

// Parse query strings into structured objects
{{$json.query.substring($json.query.indexOf('?') + 1).split('&').reduce((result, item) => (result[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]), result), {})}}
```{% endraw %}

#### Using FlatMap for Complex Restructuring
{% raw %}```javascript
// Flatten nested array structures after transformation
{{$json.recipe.tags.flatMap(tag => tag.preferences)}}

// Process hierarchical data with recursive-like flattening
{{$json.children.flatMap(item => [{ id: item.id, name: item.name }, ...item.children.flatMap(child => [child])])}}

// Aggregate data across multiple workflow runs
{{Array($runIndex+1).fill(0).flatMap((_,idx) => { 
  try { 
    return $('Generate Data').all(0,idx).flatMap(item => item.json.results) 
  } catch (e) { 
    return [] 
  } 
})}}
```{% endraw %}

#### Complex Method Chaining
{% raw %}```javascript
// Chain multiple operations for data discovery
{{$input.all().map(item => item.json).find(item => item.id === $('Config').first().json.tableId).fields.find(field => field.name === $('Config').first().json.inputField)}}

// Multi-step text parsing with chained transformations
{{$json.text
  .substring($json.text.search(/Section\./), $json.text.length)
  .split(/Section\./g)
  .filter(text => !text.isEmpty())
  .map(text => ({
    title: text.substring(0, text.indexOf('.')),
    content: text.substring(text.indexOf('.')+1).replaceAll('\n', ' ').trim()
  }))
}}
```{% endraw %}

---

### 2. Immediately Invoked Function Expressions (IIFEs)

**Overview:** Encapsulating complex multi-step logic, variable declarations, error handling, and conditional flows within [`(() => { ... })()` functions](https://developer.mozilla.org/en-US/docs/Glossary/IIFE). This enables creating sophisticated mini-programs directly within expression fields for complex data processing scenarios.

#### IIFEs for Error Handling and Safe Data Access
{% raw %}```javascript
// Safely access data from multiple potential sources
{{(() => {
    try { return $('variables').item.json.spotify_playlist_id } catch(e) {}
    try { return $('variables2').item.json.spotify_playlist_id } catch(e) {}
    return undefined;
})()}}

// Complex date parsing with validation
{{(() => {
    const rawDate = $json.body['11'];
    if (!rawDate || typeof rawDate !== 'string') return '';
    const [datePart, timePart] = rawDate.split(' ');
    if (!datePart || !timePart) return '';
    const [year, month, day] = datePart.split('-');
    if (!year || !month || !day || year.length !== 4) return '';
    const isoDateTime = `${year}-${month}-${day}T${timePart}:00+01:00`;
    return Math.floor(new Date(isoDateTime).getTime() / 1000);
})()}}
```{% endraw %}

#### IIFEs for Dynamic Content Generation
{% raw %}```javascript
// Generate visual progress indicators
{{(function() {
    let p = $json.sum_value / $json.target;
    let n = Math.round(p * 10);
    n = Math.max(0, Math.min(10, n));
    return '💧'.repeat(n) + '⬜'.repeat(10 - n);
})()}}

// Complex HTML generation with data processing
{{(function(items) {
  const grouped = items.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});
  
  return Object.keys(grouped).map(category => 
    `<div class="category">${category}: ${grouped[category].length} items</div>`
  ).join('');
})(
  $input.all().map(item => item.json).filter(item => item.category)
)}}
```{% endraw %}

---

### 3. Advanced JMESPath Integration

**Overview:** Leveraging JMESPath for sophisticated JSON querying combined with JavaScript operations for complex data extraction, aggregation, and transformation. JMESPath provides declarative querying capabilities that complement JavaScript's procedural approach.

#### JMESPath with JavaScript Aggregation
{% raw %}```javascript
// Calculate comprehensive statistics using JMESPath filtering
{{{ 
  global_total: $input.all().length,
  global_active: $jmespath($input.all(),'[?json.wf_stats.wf_active == `true`]').length,
  global_trigger: $jmespath($input.all(),'[].json.wf_trigcount').reduce((accumulator, currentValue) => accumulator + currentValue, 0) 
}}}

// Extract and format unique values as structured output
{{[...new Set($jmespath($input.all(),'[].json.tags[].name'))].map(tag => `- [${tag}](tag-${encodeURIComponent(tag)})`).join('\n')}}
```{% endraw %}

#### Complex JMESPath Queries with Post-Processing
{% raw %}```javascript
// Extract node types and process for analysis
{{{ 
  nodes_unique: [...new Set($jmespath($json,'nodes[*].type').map(item => item.split('.').pop().toUpperCase()))],
  nodes_count: $jmespath($json,'nodes[*].type').length,
  trigger_nodes: $jmespath($json,'nodes[?type == `n8n-nodes-base.manualTrigger`]').length
}}}

// Filter and transform complex nested structures
{{$jmespath($input.all(), '[].json.data[?status == `active` && priority > `5`].{name: name, score: metrics.performance}')}}
```{% endraw %}

---

### 4. Dynamic Code and Configuration Generation

**Overview:** Expressions that dynamically generate code snippets, SQL queries, JSON schemas, HTML templates, or complex configurations based on runtime data. This enables highly adaptive workflows that can modify their behavior based on input characteristics.

#### Dynamic SQL Query Construction
{% raw %}```javascript
// Generate parameterized SQL WHERE clauses
{{$json.where && Object.keys($json.where).length > 0
  ? `WHERE ` + Object.keys($json.where).map((key,idx) => `${key} = $${idx+1}`).join(' AND ')
  : ''
}}

// Build complex SELECT statements with dynamic columns
{{`SELECT ${$json.columns.join(', ')} FROM ${$json.table}` + 
  ($json.conditions ? ` WHERE ${Object.entries($json.conditions).map(([k,v]) => `${k} = '${v}'`).join(' AND ')}` : '')
}}
```{% endraw %}

#### Dynamic JSON Schema Generation
{% raw %}```javascript
// Generate JSON schema for API validation
{{(function(node) {
  if (!node) return {};
  const inputs = node.parameters.workflowInputs.values;
  return {
    "type": "object",
    "required": inputs.map(input => input.name),
    "properties": inputs.reduce((acc, input) => ({
      ...acc,
      [input.name]: { type: input.type ?? 'string' }
    }), {})
  }
})(
  $json.nodes.filter(node => node.type === 'n8n-nodes-base.executeWorkflowTrigger').first()
).toJsonString()}}
```{% endraw %}

#### Dynamic Template Generation
{% raw %}```javascript
// Generate complex API payloads with conditional structure
{{JSON.stringify({
  "contents": [{
    "role": "user", 
    "parts": [
      { "text": $json.meta_prompt },
      ...(($json.file_url) ? [{ "file_data": { "file_uri": $json.file_url }}] : [])
    ]
  }],
  "generationConfig": Object.fromEntries(
    Object.entries($json.config || {}).filter(([k,v]) => v !== null)
  ),
  "model": $json.model || "default-model"
})}}

// Generate HTML templates with dynamic styling
{{$json.data
  .map(item => `
    <div style="display:flex;margin-bottom:16px;${item.priority === 'high' ? 'border-left:3px solid red;' : ''}">
      <div style="width:60px;color:#ccc;">${DateTime.fromISO(item.timestamp).format('MMM dd')}</div>
      <div style="width:100%">
        <div style="font-weight:${item.urgent ? 'bold' : 'normal'};">${item.title}</div>
        <div style="color:#666;">${item.description}</div>
      </div>
    </div>
  `)
  .join('\n')
}}
```{% endraw %}

---

### 5. Complex Regular Expressions and Parsing

**Overview:** Employing sophisticated regular expressions for specialized data extraction, validation, and transformation tasks. These patterns often combine regex with multi-step string processing for handling complex, structured, or semi-structured text data.

#### Advanced Pattern Extraction
{% raw %}```javascript
// Extract duration from ISO 8601 format and convert to milliseconds
{{$json.contentDetails.duration.match(/(\d+)(?=[MHS])/g).reduce((acc, time, i) => acc + time * [60000, 1000, 1][i], 0)}}

// Parse and validate complex data formats
{{$json.text.match(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i)?.[0] || 'No email found'}}
{{$json.content.match(/\bphone:\s*(\+?\d[\d\s-]{8,}\d)\b/i)?.[1] || 'No phone found'}}
```{% endraw %}

#### Multi-Step Text Processing with Regex
{% raw %}```javascript
// Complex document parsing with multiple regex operations
{{$json.document
  .replace(/<!--[\s\S]*?-->/g, '')  // Remove comments
  .replace(/<script[\s\S]*?<\/script>/gi, '')  // Remove scripts
  .match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]  // Extract body content
  ?.replace(/<[^>]*>/g, '')  // Remove HTML tags
  ?.replace(/\s+/g, ' ')  // Normalize whitespace
  ?.trim()
}}

// Extract structured data from formatted text
{{$json.logEntry
  .match(/\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (\w+): (.+)/)?
  .slice(1)  // Remove full match, keep groups
  ?.reduce((obj, val, idx) => ({
    ...obj,
    [['timestamp', 'level', 'message'][idx]]: val
  }), {})
}}
```{% endraw %}

---

### 6. Error Handling and Robust Data Processing

**Overview:** Advanced patterns for building fault-tolerant expressions that gracefully handle edge cases, missing data, and unexpected input formats. These techniques ensure workflows remain stable and continue processing even when encountering problematic data.

#### Comprehensive Error Handling
{% raw %}```javascript
// Multi-level fallback with error recovery
{{(() => {
  try {
    const data = $json.response?.data?.results;
    if (!Array.isArray(data)) throw new Error('Invalid data format');
    return data.filter(item => item.status === 'active').length;
  } catch (e) {
    try {
      return $json.fallback?.count || 0;
    } catch (e2) {
      return 0;
    }
  }
})()}}

// Safe deep property access with validation
{{(() => {
  const path = ['user', 'profile', 'settings', 'notifications'];
  let current = $json;
  for (const key of path) {
    if (!current || typeof current !== 'object' || !(key in current)) {
      return null;
    }
    current = current[key];
  }
  return current;
})()}}
```{% endraw %}

#### Type-Safe Data Processing
{% raw %}```javascript
// Robust array processing with type checking
{{(() => {
  const items = $json.items;
  if (!Array.isArray(items)) {
    return typeof items === 'object' && items !== null ? [items] : [];
  }
  return items.filter(item => 
    item && 
    typeof item === 'object' && 
    typeof item.id !== 'undefined'
  );
})()}}

// Safe numeric operations with validation
{{(() => {
  const values = [$json.price, $json.tax, $json.shipping]
    .map(v => parseFloat(v))
    .filter(v => !isNaN(v) && isFinite(v));
  
  return values.length > 0 
    ? values.reduce((sum, val) => sum + val, 0).toFixed(2)
    : '0.00';
})()}}
```{% endraw %}

---

### Common Expert Patterns Summary

#### Best Practices for Expert Level
- **Encapsulate Complex Logic**: Use IIFEs to group related operations and manage variable scope
- **Document Complex Expressions**: Use comments within IIFEs to explain non-obvious logic
- **Implement Robust Error Handling**: Always account for missing data, type mismatches, and edge cases
- **Leverage JMESPath**: Combine JMESPath querying with JavaScript for efficient data processing
- **Test Thoroughly**: Validate expressions with diverse input data including edge cases

#### Common Mistakes to Avoid
- **Over-Engineering**: Don't use complex patterns when simpler solutions suffice
- **Performance Neglect**: Be mindful of expression complexity in high-volume workflows
- **Poor Error Handling**: Provide fallbacks for potentially failing operations
- **Readability Sacrifice**: Maintain code clarity even in sophisticated expressions
- **Side Effects**: Avoid modifying external state within expressions (use Set or Code nodes instead)

*Found an error or want to suggest an update? Please raise an issue or make a pull request in the [n8narena GitHub repository](https://github.com/teds-tech-talks/n8n-community-leaderboard)*

## What's next?

### Learn how to self-host n8n

[Click here to see what's included](https://mini-course.parsedventures.com/)

<div style="margin: auto;">
<script async data-uid="73046fb308" src="https://eduard-parsed-ventures.kit.com/73046fb308/index.js"></script>
</div>
