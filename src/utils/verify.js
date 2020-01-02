/* 表单验证 */
import cardArea from '@/config/areaCode';
// 检验手机号
export function testPhone(phone) {
  return phone.match(/^1\d{10}$/gi);
}

// 检验身份证
export function testIdCard(sId) {
  if (!sId){
    return '请输入证件号码';
  }
  sId = String(sId);
  if (!sId.match(/^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/gi)){
    return '身份证号格式不正确';
  }

  let iSum = 0;
  const cardInfo = Array(2);
  sId = sId.replace(/x$/i, 'a');
  if (sId.length === 0){
    return '身份证为空';
  }

  if (cardArea[parseInt(sId.substr(0, 2))] == null){
    return '非法证件，你的地区填写有错误请仔细填写';
  }
  const sBirthday =
    `${sId.substr(6, 4) 
    }-${ 
      Number(sId.substr(10, 2)) 
    }-${ 
      Number(sId.substr(12, 2))}`;
  const d = new Date(sBirthday.replace(/-/g, '/'));
  if (
    sBirthday !==
    `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  ){
    return '非法证件，请仔细填写';
  }

  for (let i = 17; i >= 0; i--){
    iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
  }

  if (iSum % 11 !== 1 || sId.length > 19){
    return '非法证号，请认真填写';
  }

  const age = new Date().getFullYear() - d.getFullYear();
  cardInfo[0] = cardArea[parseInt(sId.substr(0, 2))];
  cardInfo[1] = sBirthday;
  cardInfo[2] = age;
  cardInfo[3] = sId.substr(16, 1) % 2 ? '男' : '女';
  return cardInfo;
}

// 银行卡验证
export function testBankcard(val) {
  if (val.length > 19 || val.length < 16){
    return false;
  }
  return val.match(/^\d*$/gi);
}

// 姓名正则
export const nameRegExp = /[^a-zA-Z\u4e00-\u9fa5]/g;
