# new-project.ps1 — Akilli & Minimal Token Proje Olusturucu (herproje)
# Kullanim:
#   .\scripts\new-project.ps1                                       -> 3 soruluk interaktif sihirbaz
#   .\scripts\new-project.ps1 <ad> -Type webpage -Goal "Kisa hedef" -> Dogrudan kurulum
# Tipler: webpage | webapp | desktop | android | minimal
param(
  [string]$Name = '',
  [ValidateSet('', 'webpage', 'webapp', 'desktop', 'android', 'minimal')]
  [string]$Type = '',
  [string]$Goal = '',
  [string]$Parent = ''
)
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$interactive = (-not $Name) -and (-not $Type)

if (-not $Name) {
  Write-Host ''
  $Name = (Read-Host '1/3 Yeni proje adi (orn: teklif-studyo)').Trim()
}
if (-not $Name) { Write-Error 'Proje adi bos olamaz.'; exit 1 }

if (-not $Type) {
  if ($interactive) {
    Write-Host ''
    Write-Host '2/3 Proje turunu secin (En az token & hazir tasarim kalibi):' -ForegroundColor Cyan
    Write-Host '  [1] Webpage      — Sifir paketli hizli Web Sayfasi / Dijital Arac (Varsayilan)' -ForegroundColor Green
    Write-Host '  [2] Web App/PWA  — Telefona/PCye kurulabilir Web Uygulamasi + Node API' -ForegroundColor Green
    Write-Host '  [3] Masauestu    — Cercevesiz hafif Masauestu Uygulamasi (--app + yerel motor)' -ForegroundColor Yellow
    Write-Host '  [4] Android App  — Hazir SDK baglantili yalin Mobil Uygulama' -ForegroundColor Yellow
    Write-Host '  [5] Bos Minimal  — Sadece 5 cekirdek kural dosyasi (Genel amacli)' -ForegroundColor DarkGray
    $choice = (Read-Host 'Seciminiz (1-5, Enter=1)').Trim()
    $Type = switch ($choice) {
      '2' { 'webapp' }
      '3' { 'desktop' }
      '4' { 'android' }
      '5' { 'minimal' }
      default { 'webpage' }
    }
  } else {
    $Type = 'minimal'
  }
}

if (-not $Goal) {
  if ($interactive) {
    Write-Host ''
    $Goal = (Read-Host '3/3 Ne yapacak? (1 cumlelik hedef, HANDOFF.md icine yazilir)').Trim()
  }
  if (-not $Goal) {
    $Goal = "$Name uygulamasi icin temel kullanici akisini ve arayuzunu olustur."
  }
}

$repoRoot = Split-Path -Parent $PSScriptRoot

$templateFolder = switch ($Type) {
  'webpage' { 'starter-webpage' }
  'webapp'  { 'starter-webapp' }
  'desktop' { 'starter-desktop' }
  'android' { 'starter-android' }
  default   { 'proje-temeli-minimal' }
}

$template = Join-Path $repoRoot "templates\$templateFolder"
if ((-not (Test-Path $template)) -and $env:DEVSTACK) {
  $template = Join-Path $env:DEVSTACK "templates\$templateFolder"
}
if (-not (Test-Path $template)) {
  $template = Join-Path $repoRoot 'templates\proje-temeli-minimal'
}
if (-not (Test-Path $template)) { Write-Error "Sablon bulunamadi: $template"; exit 1 }

$parentDir = if ($Parent) { $Parent } else { Split-Path -Parent $repoRoot }
if (-not (Test-Path $parentDir)) { New-Item -ItemType Directory -Path $parentDir | Out-Null }
$target = Join-Path $parentDir $Name

if (Test-Path $target) {
  $visible = Get-ChildItem $target -Force | Where-Object { $_.Name -notin @('.zcode', '.claude') } | Select-Object -First 1
  if ($visible) { Write-Error "Hedef klasor zaten var ve bos degil: $target"; exit 1 }
} else {
  New-Item -ItemType Directory -Path $target | Out-Null
}

Get-ChildItem -Path $template -Force | ForEach-Object {
  Copy-Item -Path $_.FullName -Destination $target -Recurse -Force
}

$utf8NoBom = [System.Text.UTF8Encoding]::new($false)
$textExts = @('.md', '.html', '.css', '.js', '.json', '.kts', '.bat', '.yml', '.example', '.gitignore')
Get-ChildItem $target -Recurse -File -Force | Where-Object {
  ($textExts -contains $_.Extension.ToLower()) -or ($_.Name -in @('.gitignore', '.env.example'))
} | ForEach-Object {
  $content = [System.IO.File]::ReadAllText($_.FullName)
  if (($content -like '*{{PROJE}}*') -or ($content -like '*{{HEDEF}}*')) {
    $updated = $content.Replace('{{PROJE}}', $Name).Replace('{{HEDEF}}', $Goal)
    [System.IO.File]::WriteAllText($_.FullName, $updated, $utf8NoBom)
  }
}

if ($Type -eq 'android') {
  $sdkCandidates = @($env:ANDROID_HOME, "$env:LOCALAPPDATA\Android\Sdk", 'C:\build-tools') | Where-Object { $_ -and (Test-Path $_) }
  $sdkPath = if ($sdkCandidates.Count -gt 0) { $sdkCandidates[0] } else { 'C:\Android\Sdk' }
  $escapedSdk = $sdkPath.Replace('\', '\\')
  [System.IO.File]::WriteAllText((Join-Path $target 'local.properties'), "sdk.dir=$escapedSdk`n", $utf8NoBom)
}

$handoffFile = Join-Path $target 'HANDOFF.md'
if ((Test-Path $handoffFile) -and ($Type -eq 'minimal')) {
  $ho = [System.IO.File]::ReadAllText($handoffFile)
  if ($ho -notlike "*$Goal*") {
    $ho = $ho + "`n## Ilk Hedef`n- $Goal`n"
    [System.IO.File]::WriteAllText($handoffFile, $ho, $utf8NoBom)
  }
}

# gempro-guard Antigravity eklentisini projenin .agents/plugins dizinine aktar
$pluginSrcCandidates = @(
  (Join-Path $repoRoot 'plugins\gempro-guard'),
  (Join-Path $env:DEVSTACK 'plugins\gempro-guard'),
  (Join-Path $env:USERPROFILE '.gemini\config\plugins\gempro-guard')
) | Where-Object { $_ -and (Test-Path $_) }

if ($pluginSrcCandidates.Count -gt 0) {
  $targetPluginDir = Join-Path $target '.agents\plugins\gempro-guard'
  New-Item -ItemType Directory -Force -Path $targetPluginDir | Out-Null
  Copy-Item -Path "$($pluginSrcCandidates[0])\*" -Destination $targetPluginDir -Recurse -Force
}

git -C $target init | Out-Null
git -C $target symbolic-ref HEAD refs/heads/main
git -C $target add -A
git -C $target commit -m "chore: scaffold $Type project ($Name)" | Out-Null

$calistirBat = Join-Path $target 'Calistir.bat'
$runIcon = Join-Path $repoRoot 'assets\calistir-app.ico'
if ((Test-Path $calistirBat) -and (Test-Path $runIcon)) {
  $sh = New-Object -ComObject WScript.Shell
  $sc = $sh.CreateShortcut((Join-Path $target 'Uygulamayi Baslat.lnk'))
  $sc.TargetPath = $calistirBat
  $sc.WorkingDirectory = $target
  $sc.IconLocation = "$runIcon,0"
  $sc.Description = "$Name canli onizlemeyi baslat"
  $sc.Save()
}

Write-Host ''
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " PROJE HAZIR [$Type]: $target" -ForegroundColor Green
Write-Host " HEDEF: $Goal" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ''
Write-Host 'Simdi ne yapmalisiniz?' -ForegroundColor White
Write-Host '  1. Klasoru Antigravity veya ZCode ile acin.'
Write-Host '  2. Sohbete sadece "/devam" (veya "HANDOFF.md oku") yazin.'
if (Test-Path $calistirBat) {
  Write-Host '  3. Canli onizleme icin klasordeki "Calistir.bat" dosyasina cift tiklayin.' -ForegroundColor Green
}
Write-Host ''
