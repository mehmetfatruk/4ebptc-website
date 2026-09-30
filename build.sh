#!/usr/bin/env bash
# Builds the static site: src/pages/*.html  +  src/partials/{header,footer}.html  ->  ./*.html
# Page files start with two metadata lines:  "TITLE: ..."  and  "DESC: ..."  followed by the body.
set -euo pipefail
cd "$(dirname "$0")"

header="$(cat src/partials/header.html)"
footer="$(cat src/partials/footer.html)"

for page in src/pages/*.html; do
  file="$(basename "$page")"
  title="$(sed -n '1s/^TITLE: *//p' "$page")"
  desc="$(sed -n '2s/^DESC: *//p' "$page")"
  body="$(tail -n +3 "$page")"
  out="$header"
  out="${out//\{\{TITLE\}\}/$title}"
  out="${out//\{\{DESC\}\}/$desc}"
  out="${out//\{\{FILE\}\}/$file}"
  printf '%s\n%s\n%s\n' "$out" "$body" "$footer" > "$file"
  echo "built $file"
done
