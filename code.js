/**
 * Sends emails with data from the current spreadsheet.
 */
function sendEmails() {
  //sheet
  var sheetSent = getSheet('sent');
  var sheetTmpl = getSheet('tmpl');
  var dataTmpl = getDataRankValue(sheetTmpl);
  var dataSent = getDataRankValue(sheetSent);
  
  //
  var row;
  var email;
  var msg;
  var name;
  var subject;
  var indexTmp; 
  var tag;
  for (i in dataSent) {
    row = dataSent[i];
    email = row[0];
    name = row[1];
    indexTmp = row[2]-1;
    
    //subject
    subject = dataTmpl[indexTmp][2];
    
    //msg
    msg = dataTmpl[indexTmp][1];
    msg = replaceAll(msg, '<name>', name);
    //Logger.log(msg);
    
    //sent
    MailApp.sendEmail(email, subject, msg);
  }
}

function getSheet(sheetName){
  return SpreadsheetApp.getActive().getSheetByName(sheetName);
}

function getDataRankValue(sheet){
  var startRow = 2;
  var numRows = sheet.getLastRow()-1;
  var numCol = sheet.getLastColumn();
  var dataRange = sheet.getRange(startRow, 1, numRows, numCol);
  return dataRange.getValues();
}

function replaceAll(str, beforeStr, afterStr){
  var reg = new RegExp(beforeStr, "g");
  return str.replace(reg, afterStr);
}
