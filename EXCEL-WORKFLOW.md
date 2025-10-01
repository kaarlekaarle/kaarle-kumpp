# Excel Content Management

This project supports using Excel (.xlsx) files as the primary content source. The Excel file is automatically converted to JSON format for the website.

## Excel File Structure

The Excel file should be located at `content/works_content.xlsx` and contain the following sheets:

### 1. CATEGORIES Sheet
- **Column A**: Client names
- **Columns B-H**: Field categories (Identity Building, Strategic Vision, Advertising, etc.)
- **X marks**: Indicate which fields apply to each client

### 2. DESCRIPTION Sheet
- **Column A**: Client names
- **Column B**: Client descriptions/summaries

### 3. MATERIALS Sheet
- **Column A**: Client names
- **Column B**: Materials needed (for development reference)

### 4. LINKS Sheet
- **Column A**: Client names
- **Column B**: Links (URLs or platform names like "Youtube, Instagram")

### 5. TEAM Sheet
- **Column A**: Client names
- **Column B**: Team members (comma-separated names)

## Available Commands

### Convert Excel to JSON
```bash
npm run excel:convert
```
Converts the Excel file to JSON format and saves to `data/fields.json` and `data/clients.json`.

### Examine Excel Structure
```bash
npm run excel:examine
```
Shows the structure and content of your Excel file for debugging.

### Build from Excel
```bash
npm run build:excel
```
Runs the full conversion process and shows success/error messages.

## Workflow

1. **Edit Excel file**: Update `content/works_content.xlsx` with your content
2. **Convert to JSON**: Run `npm run excel:convert`
3. **Test changes**: The website will use the generated JSON files
4. **Commit changes**: Both Excel and JSON files should be committed

## Excel File Requirements

- File must be named `works_content.xlsx`
- Must be located in the `content/` directory
- Must contain all required sheets (CATEGORIES, DESCRIPTION, MATERIALS, LINKS, TEAM)
- Client names must match across all sheets
- Use "X" to mark field relationships in the CATEGORIES sheet

## Generated JSON Structure

The Excel converter generates:

- **`data/fields.json`**: Array of field objects with `id`, `name`, and `blurb`
- **`data/clients.json`**: Array of client objects with `slug`, `name`, `fields`, `summary`, `slides`, `links`, and `team`

## Field Mapping

Excel field names are automatically converted to slugs:
- "Identity Building" → "identity-building"
- "Message & Media" → "message-media"
- "Talk Shows" → "talk-shows"

## Link Processing

Links are automatically processed:
- URLs starting with "http" are kept as-is
- Platform names (like "Youtube") become "https://youtube.com"
- Multiple links are comma-separated in Excel

## Team Processing

Team members are comma-separated in Excel and converted to objects with `name` and `role` fields.
