function myFunction() {
  var txt;
  var person = prompt("请输入您的名字：", "哈利波特");
  if (person == null || person == "") {
    txt = "用户取消输入";
  } else {
    txt = "你好，" + person + "！今天过得好吗？";
  }
  document.getElementById("demo").innerHTML = txt;
}
