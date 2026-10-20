import assert from 'node:assert/strict';
import {mkdtemp,writeFile,readFile,mkdir,access,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {evidenceSanitizer} from './m08-evidence-safety.mjs';
const fake='S'.repeat(32);
const root=await mkdtemp(join(tmpdir(),'m08-safety-test-'));
try {
 for(const outcome of ['success','failure']) {
  const raw=join(root,outcome+'-raw'),out=join(root,outcome+'-evidence');
  await mkdir(raw);await mkdir(out);
  await writeFile(join(raw,'headers.json'),JSON.stringify({'x-vercel-protection-bypass':fake}),{mode:0o600});
  assert((await readFile(join(raw,'headers.json'),'utf8')).includes(fake));
  await writeFile(join(raw,'lhr.json'),JSON.stringify({configSettings:{extraHeaders:{'x-vercel-protection-bypass':fake}},headers:{Cookie:'cookie-test-value','Set-Cookie':'session-test-value',AUTHORIZATION:'auth-test-value'},records:[{name:'X-Vercel-Challenge-Token',value:'challenge-test-value'}],error:outcome==='failure'?fake:null,score:0.53}));
  await writeFile(join(raw,'lighthouse.log'),`failure detail ${fake}\nCookie: cookie-test-value\n`);
  await writeFile(join(out,'flags.json'),'{}');
  const safety=evidenceSanitizer(fake);
  await safety.publish(raw,out);
  await assert.rejects(access(join(out,'SAFE_TO_UPLOAD')));
  await safety.seal(out);
  await access(join(out,'SAFE_TO_UPLOAD'));
  const lhr=await readFile(join(out,'lhr.json'),'utf8');
  for(const value of [fake,'cookie-test-value','session-test-value','auth-test-value','challenge-test-value'])assert(!lhr.includes(value));
  assert.equal(JSON.parse(lhr).configSettings.extraHeaders,'[REDACTED]');
  assert.equal(JSON.parse(lhr).score,0.53);
  await assert.rejects(access(join(out,'headers.json')));
  await writeFile(join(out,'leak.txt'),fake);
  await assert.rejects(safety.seal(out));
  await assert.rejects(access(join(out,'SAFE_TO_UPLOAD')));
  await rm(join(out,'leak.txt'));
  await safety.seal(out);
  // An unsafe filesystem entry must remove any earlier marker and fail closed.
  const {symlink}=await import('node:fs/promises');
  await symlink(raw,join(out,'unsafe-link'),'junction');
  await assert.rejects(safety.seal(out));
  await assert.rejects(access(join(out,'SAFE_TO_UPLOAD')));
 }
 console.log('PASS: sentinel scratch-only, LHR/header/log redaction, success/failure marker, fail-closed scan, scores preserved');
} finally {await rm(root,{recursive:true,force:true});}

