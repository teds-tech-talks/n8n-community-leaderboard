#!/usr/bin/env python3

import os
import re
import sys

def update_page_status(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Check if the file has front matter (between --- markers)
    if not content.startswith('---'):
        print(f"Skipping {file_path} - no front matter found")
        return False
    
    # Check if page_status already exists
    if re.search(r'page_status:\s*"[^"]*"', content):
        print(f"Skipping {file_path} - page_status already exists")
        return False
    
    # Find the position to insert page_status (after layout line)
    layout_match = re.search(r'layout:\s*[^\n]+\n', content)
    if not layout_match:
        print(f"Skipping {file_path} - no layout line found")
        return False
    
    # Insert page_status after layout line
    insert_pos = layout_match.end()
    new_content = (
        content[:insert_pos] + 
        '# Page status: "new" (default), "claimed" (opt-in), "skip" (opt-out)\n' +
        'page_status: "new"\n' + 
        content[insert_pos:]
    )
    
    # Write the updated content back to the file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(new_content)
    
    print(f"Updated {file_path} - added page_status: \"new\"")
    return True

def main():
    creators_dir = '_creators'
    
    if not os.path.isdir(creators_dir):
        print(f"Error: {creators_dir} directory not found")
        sys.exit(1)
    
    updated_count = 0
    skipped_count = 0
    
    # Walk through all subdirectories in _creators
    for root, dirs, files in os.walk(creators_dir):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                if update_page_status(file_path):
                    updated_count += 1
                else:
                    skipped_count += 1
    
    print(f"\nSummary: Updated {updated_count} files, skipped {skipped_count} files")

if __name__ == "__main__":
    main()
