import { describe,expect,it } from 'vitest';
import { matchesDocumentSignature } from './document-file.js';
describe('document content signatures',()=>{
  it('recognizes supported file headers',()=>{expect(matchesDocumentSignature(Buffer.from('%PDF-1.7 data'),'application/pdf')).toBe(true);expect(matchesDocumentSignature(Buffer.from([0xff,0xd8,0xff,0,0,0,0,0,0,0,0,0]),'image/jpeg')).toBe(true);expect(matchesDocumentSignature(Buffer.from([137,80,78,71,13,10,26,10,0,0,0,0]),'image/png')).toBe(true);expect(matchesDocumentSignature(Buffer.from('RIFF1234WEBP'),'image/webp')).toBe(true);});
  it('rejects spoofed content and unsupported MIME types',()=>{expect(matchesDocumentSignature(Buffer.from('not a pdf!!'),'application/pdf')).toBe(false);expect(matchesDocumentSignature(Buffer.from('%PDF-1.7 data'),'text/plain')).toBe(false);});
});
