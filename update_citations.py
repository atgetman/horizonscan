#!/usr/bin/env python3
"""
Script to update all case law citations to proper legal format
"""

import re

# Define citation replacements
# Format: (old_source, new_source)
replacements = [
    # mockData.tsx citations
    (r'source="N\.Y\. Ct\. App\."\s+title="532 Madison Ave\. Gourmet Foods, Inc\. v\. Finlandia Ctr\., Inc\."',
     'source="532 Madison Ave. Gourmet Foods, Inc. v. Finlandia Ctr., Inc., 96 N.Y.2d 280, 292 (2001)"\n            title="532 Madison Ave. Gourmet Foods, Inc. v. Finlandia Ctr., Inc."'),
    
    (r'source="2d Cir\."\s+title="Bellevue South Assocs\. v\. HRH Constr\. Corp\."',
     'source="Bellevue South Assocs. v. HRH Constr. Corp., 78 F.3d 142, 145 (2d Cir. 1996)"\n            title="Bellevue South Assocs. v. HRH Constr. Corp."'),
    
    (r'source="2d Cir\."\s+title="Bridgestone/Firestone, Inc\. v\. Recovery Credit Servs\., Inc\."',
     'source="Bridgestone/Firestone, Inc. v. Recovery Credit Servs., Inc., 98 F.3d 13, 20 (2d Cir. 1996)"\n            title="Bridgestone/Firestone, Inc. v. Recovery Credit Servs., Inc."'),
    
    (r'source="S\.D\.N\.Y\."\s+title="Telecom Int\'l Am\., Ltd\. v\. AT&T Corp\."',
     'source="Telecom Int\'l Am., Ltd. v. AT&T Corp., 280 F.3d 175, 196 (2d Cir. 2001)"\n            title="Telecom Int\'l Am., Ltd. v. AT&T Corp."'),
    
    (r'source="2d Cir\."\s+title="Mills v\. Polar Molecular Corp\."',
     'source="Mills v. Polar Molecular Corp., 12 F.3d 1170, 1175 (2d Cir. 1993)"\n            title="Mills v. Polar Molecular Corp."'),
    
    (r'source="N\.Y\. Ct\. App\."\s+title="J\.A\.O\. Acquisition Corp\. v\. Stavitsky"',
     'source="J.A.O. Acquisition Corp. v. Stavitsky, 8 N.Y.3d 144, 148 (2007)"\n            title="J.A.O. Acquisition Corp. v. Stavitsky"'),
    
    (r'source="N\.Y\. Ct\. App\."\s+title="Rocanova v\. Equitable Life Assur\. Soc\'y"',
     'source="Rocanova v. Equitable Life Assur. Soc\'y, 83 N.Y.2d 603, 613 (1994)"\n            title="Rocanova v. Equitable Life Assur. Soc\'y"'),
]

def update_citations(filepath):
    """Update citations in a file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old_pattern, new_text in replacements:
        content = re.sub(old_pattern, new_text, content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated {filepath}")

if __name__ == "__main__":
    update_citations('/src/app/data/mockData.tsx')
    print("Citation updates complete!")
