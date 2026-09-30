# Builds the static site on Windows PowerShell:
#   src/pages/*.html + src/partials/{header,footer}.html  ->  ./*.html
Set-Location $PSScriptRoot
$header = Get-Content -Raw -Encoding utf8 "src/partials/header.html"
$footer = Get-Content -Raw -Encoding utf8 "src/partials/footer.html"
$utf8 = New-Object System.Text.UTF8Encoding($false)
Get-ChildItem "src/pages/*.html" | ForEach-Object {
  $lines = Get-Content -Encoding utf8 $_.FullName
  $title = ($lines[0] -replace '^TITLE:\s*', '')
  $desc  = ($lines[1] -replace '^DESC:\s*', '')
  $body  = ($lines | Select-Object -Skip 2) -join "`n"
  $out = $header.Replace('{{TITLE}}', $title).Replace('{{DESC}}', $desc).Replace('{{FILE}}', $_.Name)
  [IO.File]::WriteAllText((Join-Path $PSScriptRoot $_.Name), "$out`n$body`n$footer", $utf8)
  Write-Host "built $($_.Name)"
}
