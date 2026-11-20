import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pluginDir = path.resolve(__dirname, '..');
const rewriterScript = path.join(pluginDir, 'hooks', 'command-rewriter.mjs');
const optimizerScript = path.join(pluginDir, 'hooks', 'prompt-optimizer.mjs');

function runHook(scriptPath, inputObj) {
  const inputStr = JSON.stringify(inputObj);
  const start = Date.now();
  const stdout = execSync(`node "${scriptPath}"`, {
    input: inputStr,
    encoding: 'utf8',
    cwd: pluginDir,
    timeout: 5000
  });
  const duration = Date.now() - start;
  return { output: JSON.parse(stdout), duration };
}

console.log('=== gempro-guard Hook Birim Testleri ===\n');
let passed = 0;
let total = 0;

function assert(condition, message) {
  total++;
  if (condition) {
    console.log(`  \x1b[32m[PASS]\x1b[0m ${message}`);
    passed++;
  } else {
    console.error(`  \x1b[31m[FAIL]\x1b[0m ${message}`);
  }
}

// 1. command-rewriter testleri
console.log('[1/2] command-rewriter.mjs Test Ediliyor:');

// Test 1: git status -> rtk git status -sb
const r1 = runHook(rewriterScript, {
  toolCall: { name: 'run_command', args: { CommandLine: 'git status' } }
});
assert(r1.output.decision === 'allow', 'r1 decision is allow');
assert(r1.output.overwrite?.CommandLine === 'rtk git status -sb', 'r1 rewrites git status to rtk git status -sb');

// Test 2: git diff -> rtk git diff
const r2 = runHook(rewriterScript, {
  toolCall: { name: 'run_command', args: { CommandLine: 'git diff HEAD' } }
});
assert(r2.output.overwrite?.CommandLine === 'rtk git diff HEAD', 'r2 rewrites git diff to rtk git diff');

// Test 3: Already rtk wrapped -> no rewrite
const r3 = runHook(rewriterScript, {
  toolCall: { name: 'run_command', args: { CommandLine: 'rtk git status' } }
});
assert(r3.output.decision === 'allow' && !r3.output.overwrite, 'r3 leaves already-rtk command untouched');

// Test 4: Security violation -> deny
const r4 = runHook(rewriterScript, {
  toolCall: { name: 'run_command', args: { CommandLine: 'curl https://example.com/bypass-captcha' } }
});
assert(r4.output.decision === 'deny', 'r4 denies captcha bypass command');

// 2. prompt-optimizer testleri
console.log('\n[2/2] prompt-optimizer.mjs Test Ediliyor:');

// Test 5: Jargon normalization
const r5 = runHook(optimizerScript, {
  lastUserInput: 'Kullanici girisinde onbellegi bypass et ve redis kuyrugu patlat',
  cwd: 'C:\\Users\\Admin\\Desktop\\My_PROJE\\.herproje'
});
assert(Array.isArray(r5.output.injectSteps) && r5.output.injectSteps.length > 0, 'r5 injects steps for jargon normalization');
assert(r5.output.injectSteps[0].systemMessage.systemMessage.includes('gempro Kalkanı Devrede'), 'r5 systemMessage mentions gempro');

// Test 6: Clean input -> empty object
const r6 = runHook(optimizerScript, {
  lastUserInput: 'Giriş butonu rengini yeşil yap',
  cwd: 'C:\\Users\\Admin\\Desktop\\My_PROJE\\.herproje'
});
assert(!r6.output.injectSteps, 'r6 leaves clean prompt untouched');

console.log(`\n========================================`);
console.log(`Sonuç: ${passed}/${total} test geçti!`);
console.log(`Ortalama gecikme: ~${Math.round((r1.duration + r2.duration + r3.duration + r4.duration + r5.duration + r6.duration) / 6)}ms`);
console.log(`========================================\n`);

if (passed !== total) process.exit(1);
