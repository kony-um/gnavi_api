function myFunction() {
  var gurunaviAPI = '*************';//取得したアクセスキー
  var url = 'https://api.gnavi.co.jp/RestSearchAPI/20150630/?';
  url = url + 'keyid='+ gurunaviAPI;
  url = url + '&format=json';
  
  // リクエストパラメータ
  url = url + '&freeword=ラーメン';
  
  var response = UrlFetchApp.fetch(url);
  var json=JSON.parse(response.getContentText());
  
  var jsonLength = Object.keys(json.rest).length;//ヒットした件数を取得する
  var arrArea = [];//出力する値を入れるための配列
  
  if(jsonLength < 1){
    return;
  }

  for (var i=0;i<jsonLength;i++){
    // 出力したい情報を配列に入れていく
    arrArea.push([json.rest[i].url,
                  json.rest[i].name,
                  json.rest[i].id
                 ]);
  } 
  
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet1 = sheet.getSheetByName('シート1');
  var rows = arrArea.length;
  var cols = arrArea[0].length;
  sheet1.getRange(3,2,rows,cols).setValues(arrArea);//スプレッドシートに書き込む
}