// https://developers.google.com/apps-script/reference/spreadsheet
// https://docs.google.com/spreadsheets/d/1QYop_BS_TuX3mkG_GrUcm80mEUDe9ltANRO4DXaquLM/edit#gid=0
// https://script.google.com/a/asu.edu/d/1dzK4ZIM_YbEMhHS5Qm5phZxpa2lOEF0bwrX3NH6kT7WvZq6ddGiPfM4T/edit


export interface Range {

  columnEnd:   number;
  columnStart: number;
  rowEnd:      number;
  rowStart:    number;

}

export interface User {

  email:    string;
  nickname: string;

}

export interface SheetEvent {
  authMode: any;
  oldValue?: string | number;
  range:    GoogleAppsScript.Spreadsheet.Range & Range;
  source:   GoogleAppsScript.Spreadsheet.Spreadsheet;
  triggerUid?: string | number;
  user:     User;
  value: string | number;
}

export interface TriggerEvent {
  triggerUid: string;
  [key: string]: any;
}


function myFunction() {
  
  const ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const ssgantt   = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Gantt");
  const ssmembers = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Members");
  
}

function getRangeByName(name: string, spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet = SpreadsheetApp.getActiveSpreadsheet()){
  return spreadsheet.getNamedRanges().find(x => x.getName() == name)?.getRange();
}

function onEdit(e: SheetEvent) {

  if ( e.range.getRow() < getRangeByName("HEADERS")!.getRow() +1 ) return;

  doTaskUpdateTriggers(e);
 // doStartDateTimeUpdateTriggers(e)
  
}





function doTaskUpdateTriggers(e: SheetEvent){
  // We don't want to edit anything above the headers.
  //if ( e.range.getRow() < getRangeByName("HEADERS")!.getRow() +1 ) return;
  
  // We are working below headers
  if ( e.source.getSheetName() == "Gantt" && e.range.getColumn() == 2) {

    const offset = e.range.offset(0, 1);
    const dataValidation = offset.getDataValidation();

    // cell has a value but no validation
    if (e.value && dataValidation == null) {
      const vr    = e.source.getNamedRanges().find(r => r.getName() == "MEMBER_REF")?.getRange();
      const rule  = SpreadsheetApp.newDataValidation().requireValueInRange(vr!).build();
      offset.setDataValidation(rule);

    // cell doesn't have value but has validation
    } else if (!e.value && dataValidation) {
      offset.clear().clearDataValidations();
    }
  }
}

function doStartDateTimeUpdateTriggers(e: SheetEvent) {

  if(e.range.getColumn() == 5) {
    
    const cell = e.range;
    const start = new Date(Date.parse(cell.getValue().toString()));
    const durat = parseInt(cell.offset(0, -1).getValue().toString());

    const finish = new Date(start.getTime() + (durat * 60 * 1000));

    const write = Utilities.formatDate(finish, "PST", "EEE MM/dd/yy HH:mm");
  
    cell.offset(0, 1).setValue(write);

  }
}
// https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html
function Dev(a1: string) {

  

 /*  return JSON.stringify({
    validation: cell.getDataValidation(),
    forumla: cell.getFormula(),
    format: cell.getNumberFormat()
  });
 */
}
