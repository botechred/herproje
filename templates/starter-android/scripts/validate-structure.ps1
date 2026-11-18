# validate-structure.ps1 — Ultra-hafif 5 cekirdek dosya dogrulamasi
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$required = @(
  'README.md',
  '.gitignore',
  '.backup-minimal',
  'AGENTS.md',
  'HANDOFF.md'
)
$missing = @($required | Where-Object { -not (Test-Path (Join-Path $root $_) -PathType Leaf) })
if ($missing.Count -gt 0) {
  Write-Error ('Eksik cekirdek dosyalar: ' + ($missing -join ', '))
  exit 1
}
Write-Output ("Minimal yapi dogrulandi: " + $required.Count + " cekirdek dosya tam.")
