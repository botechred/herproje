# validate-structure.ps1 — herproje Starter Platform Yapi Dogrulamasi
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot

$requiredFiles = @(
  'AGENTS.md',
  'HANDOFF.md',
  'README.md',
  'LICENSE',
  '.gitignore',
  '.backup-minimal',
  'Yeni-Proje-Olustur.bat',
  'Token-Koruma-Aktif-Et.bat',
  'scripts\new-project.ps1',
  'scripts\apply-token-guard.js',
  'scripts\generate-icons.py',
  'snippets\web\ui-kit.js',
  'snippets\web\storage.js',
  'assets\yeni-proje.ico',
  'assets\token-guard.ico',
  'assets\calistir-app.ico',
  'assets\standart-kontrol.ico'
)

$requiredTemplates = @(
  'templates\proje-temeli-minimal',
  'templates\starter-webpage',
  'templates\starter-webapp',
  'templates\starter-desktop',
  'templates\starter-android'
)

$missingFiles = @($requiredFiles | Where-Object { -not (Test-Path (Join-Path $root $_) -PathType Leaf) })
$missingDirs  = @($requiredTemplates | Where-Object { -not (Test-Path (Join-Path $root $_) -PathType Container) })

if ($missingFiles.Count -gt 0 -or $missingDirs.Count -gt 0) {
  $all = $missingFiles + $missingDirs
  Write-Error ('Eksik platform bilesenleri: ' + ($all -join ', '))
  exit 1
}

Write-Output "OK: herproje platform structure valid ($($requiredFiles.Count) files, $($requiredTemplates.Count) templates)"
