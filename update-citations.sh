#!/bin/bash

# Script to update all case law citations to proper legal format
# This updates the mockData.tsx file

FILE="/src/app/data/mockData.tsx"

# Update citation 1
sed -i 's|source="N.Y. Ct. App."\n            title="532 Madison Ave. Gourmet Foods, Inc. v. Finlandia Ctr., Inc."|source="532 Madison Ave. Gourmet Foods, Inc. v. Finlandia Ctr., Inc., 96 N.Y.2d 280, 292 (2001)"\n            title="532 Madison Ave. Gourmet Foods, Inc. v. Finlandia Ctr., Inc."|g' "$FILE"

#Update citation 2
sed -i 's|source="2d Cir."\n            title="Bellevue South Assocs. v. HRH Constr. Corp."|source="Bellevue South Assocs. v. HRH Constr. Corp., 78 F.3d 142, 145 (2d Cir. 1996)"\n            title="Bellevue South Assocs. v. HRH Constr. Corp."|g' "$FILE"

echo "Citations updated successfully!"
