function PARSE_DATE_TIME(input: any) {
    return new Date(Date.parse(input)).getTime();
  }

function DT_PARSE(input: any) {
    return new Date(Date.parse(input)).getTime();
}

function DT_DIFF_SEC(input1: string, input2: string) {
    let dt2 = new Date(Date.parse(input2)).getTime();
    let dt1 = new Date(Date.parse(input1)).getTime();
    return (dt2 - dt1) / 1000;
}

function DT_DIFF_MIN(input1: string, input2: string) {
    let dt2 = new Date(Date.parse(input2)).getTime();
    let dt1 = new Date(Date.parse(input1)).getTime();
    return (dt2 - dt1) / (60 * 1000);
}

function DT_DIFF_HOUR(input1: string, input2: string) {
    let dt2 = new Date(Date.parse(input1)).getTime();
    let dt1 = new Date(Date.parse(input2)).getTime();
    return (dt2 - dt1) / (60 * 60 * 1000);
}

function DT_ADD_MINS(date: string, mins: number){
    let dt = new Date( new Date(Date.parse(date)).getTime() + (60 * 1000));
    return Utilities.formatDate(dt, "PST", "h:mm a");
}

function DT_ADD_HOUR(date: string, hours: number){
    return new Date( new Date(Date.parse(date)).getTime() + (hours * 60 * 60 * 1000));
}

function DT_DIFF_DAYS(input1: string, input2: string){

}