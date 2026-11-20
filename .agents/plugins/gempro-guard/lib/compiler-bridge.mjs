import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const CANDIDATE_PATHS = [
  process.env.GEMPRO_DIR ? path.join(process.env.GEMPRO_DIR, 'src', 'compiler.mjs') : null,
  path.join(process.env.USERPROFILE || '', 'Desktop', 'My_PROJE', 'gempro', 'src', 'compiler.mjs'),
  path.join(process.env.USERPROFILE || '', 'Desktop', 'gempro', 'src', 'compiler.mjs')
].filter(Boolean);

let cachedCompiler = null;

export async function getGemproCompiler() {
  if (cachedCompiler) return cachedCompiler;

  for (const candidate of CANDIDATE_PATHS) {
    if (fs.existsSync(candidate)) {
      try {
        const fileUrl = url.pathToFileURL(candidate).href;
        const mod = await import(fileUrl);
        if (typeof mod.compilePrompt === 'function') {
          cachedCompiler = {
            compilePrompt: mod.compilePrompt,
            estimateTokens: mod.estimateTokens || ((t) => Math.ceil((t || '').length / 4)),
            path: candidate
          };
          return cachedCompiler;
        }
      } catch (err) {
        // Fallback to next candidate
      }
    }
  }

  // Standalone fallback if gempro directory is moved or not installed
  cachedCompiler = {
    compilePrompt: ({ rawPrompt = '' } = {}) => {
      const lower = rawPrompt.toLowerCase();
      const hasBypass = lower.includes('bypass') || lower.includes('patlat');
      return {
        status: 'ok',
        masterPrompt: rawPrompt,
        normalizations: hasBypass ? [{ from: 'bypass/patlat', to: 'standart muhendislik cozumu' }] : [],
        boundaryAlerts: []
      };
    },
    estimateTokens: (t) => Math.ceil((t || '').length / 4),
    path: null
  };
  return cachedCompiler;
}
