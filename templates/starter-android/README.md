# {{PROJE}} (Android)

> **Hedef:** {{HEDEF}}

`C:\build-tools` üzerindeki yerel SDK, JDK 21 ve Gradle 8.11.1 ile doğrudan derlenen yalın Android projesi.

## Derleme Komutu
```powershell
$env:JAVA_HOME = "C:\build-tools\jdk-21.0.13+9"
& "C:\build-tools\gradle-8.11.1\bin\gradle.bat" assembleDebug
```
