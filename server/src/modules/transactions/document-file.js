export const matchesDocumentSignature=(header,mimeType)=>{
  if(mimeType==='application/pdf')return header.subarray(0,5).toString()==='%PDF-';
  if(mimeType==='image/jpeg')return header[0]===0xff&&header[1]===0xd8&&header[2]===0xff;
  if(mimeType==='image/png')return header.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  if(mimeType==='image/webp')return header.subarray(0,4).toString()==='RIFF'&&header.subarray(8,12).toString()==='WEBP';
  return false;
};
