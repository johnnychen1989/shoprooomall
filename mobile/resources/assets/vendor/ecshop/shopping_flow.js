/* $Id : shopping_flow.js 4865 2007-01-31 14:04:10Z paulgao $ */

var selectedShipping = null;
var selectedPayment  = null;
var selectedAddress  = null;
var selectedPack     = null;
var selectedCard     = null;
var selectedSurplus  = '';
var selectedBonus    = 0;
var selectedIntegral = 0;
var selectedOOS      = null;
var alertedSurplus   = false;

var groupBuyShipping = null;
var groupBuyPayment  = null;

/* *
 * 改变配送方式
 */
function selectShipping(obj)
{
  if (selectedShipping == obj)
  {
    return;
  }
  else
  {
    selectedShipping = obj;
  }

  var supportCod = obj.attributes['supportCod'].value + 0;
  var theForm = obj.form;

  for (i = 0; i < theForm.elements.length; i ++ )
  {
    if (theForm.elements[i].name == 'payment' && theForm.elements[i].attributes['isCod'].value == '1')
    {
      if (supportCod == 0)
      {
        theForm.elements[i].checked = false;
        theForm.elements[i].disabled = true;
      }
      else
      {
        theForm.elements[i].disabled = false;
      }
    }
  }

  var now = new Date();

  $.get('index-test.php?r=flow/ajax/selectshipping', {shipping: obj.value}, function(data){
    orderShippingSelectedResponse(data);
  }, 'json');
}

/**
 *
 */
function orderShippingSelectedResponse(result)
{
  if (result.need_insure)
  {
    try
    {
      document.getElementById('ECS_NEEDINSURE').checked = true;
    }
    catch (ex)
    {
      alert(ex.message);
    }
  }

  try
  {
    if (document.getElementById('ECS_CODFEE') != undefined)
    {
      document.getElementById('ECS_CODFEE').innerHTML = result.cod_fee;
    }
  }
  catch (ex)
  {
    alert(ex.message);
  }

  orderSelectedResponse(result);
}

/**
 * 改变支付方式
 */
function selectPayment(value)
{
  if (selectedPayment == value)
  {
    return;
  }
  else
  {
    selectedPayment = value;
  }
  var shipping = $("form#theForm input[name='shipping[]']");
  var ru_id = $("form#theForm input[name='ru_id[]']");
  var arr = [];
  for(var i=0; i<shipping.length; i++){
    var arr2 = [];
    arr2.push(ru_id[i].value);
    arr2.push(shipping[i].value);
    arr[i] = arr2;
  }

  $.get(ROOT_URL + 'index.php?m=flow&a=select_payment', {payment:value,shipping_id:arr}, function(data){
    orderSelectedResponse(data);
  }, 'json');
}

/**
* 提交订单后更换支付方式
*/
function changePayment(obj){
  if (selectedPayment == obj)
  {
    return;
  }
  else
  {
    selectedPayment = obj;
  }
  var order_sn = obj.attributes['order_sn'].value;
  var payment_id = obj.value;

  $.post('index-test.php?r=flow/ajax/gettotal', {payment_id:payment_id, order_sn:order_sn}, function(data){
    if(data){
      document.getElementById("order_amount").innerHTML = data;
    }
    else{
      d_messages("请重新选择");
    }
  });
}

/* *
 * 团购购物流程 --> 改变配送方式
 */
function handleGroupBuyShipping(obj)
{
  if (groupBuyShipping == obj)
  {
    return;
  }
  else
  {
    groupBuyShipping = obj;
  }

  var supportCod = obj.attributes['supportCod'].value + 0;
  var theForm = obj.form;

  for (i = 0; i < theForm.elements.length; i ++ )
  {
    if (theForm.elements[i].name == 'payment' && theForm.elements[i].attributes['isCod'].value == '1')
    {
      if (supportCod == 0)
      {
        theForm.elements[i].checked = false;
        theForm.elements[i].disabled = true;
      }
      else
      {
        theForm.elements[i].disabled = false;
      }
    }
  }

  if (obj.attributes['insure'].value + 0 == 0)
  {
    document.getElementById('ECS_NEEDINSURE').checked = false;
    document.getElementById('ECS_NEEDINSURE').disabled = true;
  }
  else
  {
    document.getElementById('ECS_NEEDINSURE').checked = false;
    document.getElementById('ECS_NEEDINSURE').disabled = false;
  }

  $.get('index.php?m=default&c=group_buy&a=select_shipping', {shipping:obj.value}, function(data){
    orderSelectedResponse(data);
  });
}

/* *
 * 团购购物流程 --> 改变支付方式
 */
function handleGroupBuyPayment(obj)
{
  if (groupBuyPayment == obj)
  {
    return;
  }
  else
  {
    groupBuyPayment = obj;
  }

  $.get('index.php?m=default&c=group_buy&a=select_payment', {payment:obj.value}, function(data){
    orderSelectedResponse(data);
  });
}

/* *
 * 改变商品包装
 */
function selectPack(value)
{
  if (selectedPack == value)
  {
    return;
  }
  else
  {
    selectedPack = value;
  }

  $.get(ROOT_URL + 'index.php?m=flow&a=select_pack', {pack:value}, function(data){
    orderSelectedResponse(data);
  }, 'json');
}

/* *
 * 改变祝福贺卡
 */
function selectCard(obj)
{
  if (selectedCard == obj)
  {
    return;
  }
  else
  {
    selectedCard = obj;
  }

  $.get('index-test.php?r=flow/ajax/selectcard', {card:obj.value}, function(data){
    orderSelectedResponse(data);
  }, 'json');
}

/* *
 * 选定了配送保价
 */
function selectInsure(needInsure)
{
  needInsure = needInsure ? 1 : 0;

  $.get('index-test.php?r=flow/ajax/selectinsure', {insure:needInsure}, function(data){
    orderSelectedResponse(data);
  }, 'json');
  //Ajax.call('flow.php?step=select_insure', 'insure=' + needInsure, orderSelectedResponse, 'GET', 'JSON');
}

/* *
 * 团购购物流程 --> 选定了配送保价
 */
function handleGroupBuyInsure(needInsure)
{
  needInsure = needInsure ? 1 : 0;

  $.get('index.php?m=default&c=group_buy&a=select_insure', {insure:needInsure}, function(data){
    orderSelectedResponse(data);
  }, 'json');
  //Ajax.call('group_buy.php?act=select_insure', 'insure=' + needInsure, orderSelectedResponse, 'GET', 'JSON');
}

/* *
 * 回调函数
 */
function orderSelectedResponse(result)
{
  if (result.error)
  {
    d_messages(result.error);
    location.href = './';
  }

  try
  {
    var layer = document.getElementById("ECS_ORDERTOTAL");

    layer.innerHTML = (typeof result == "object") ? result.content : result;

    if (result.payment != undefined)
    {
      var surplusObj = document.forms['theForm'].elements['surplus'];
      if (surplusObj != undefined)
      {
        surplusObj.disabled = result.pay_code == 'balance';
      }
        //支付方式信息 by wanglu
      if($("#payment_info").length > 0){
        str2 = '';
        if(result.pay_fee > 0){
          var str2 = "<em class='t-remark'>[手续费]</em></span><em class='t-first'>"+ result.format_pay_fee +"</em>";
        }
          var str = "<span>"+ result.pay_name + str2 + "<span>";
              $("#payment_info").html(str);
          if($(".j-filter-show-div").hasClass("show")){
              document.removeEventListener("touchmove", handler, false);
              $(".j-filter-show-div").removeClass("show");
              $(".mask-filter-div").removeClass("show");
          }
      }
      $("input[name=payment]").val(result.pay_id);
    }
      //包装 by wanglu
    if(result.pack_id != undefined){
        $("input[name=pack]").val(result.pack_id);
    }
    //总价
    if(result.amount != undefined){
        $("#amount").html(result.amount);
    }
  }
  catch (ex) { }
}

/* *
 * 改变余额
 */
function changeSurplus(val)
{
  if (selectedSurplus == val)
  {
    return;
  }
  else
  {
    selectedSurplus = val;
  }

  $.get('index-test.php?r=flow/ajax/changesurplus', {surplus:val}, function(data){
    changeSurplusResponse(data);
  }, 'json');
  //Ajax.call('flow.php?step=change_surplus', 'surplus=' + val, changeSurplusResponse, 'GET', 'JSON');
}

/* *
 * 改变余额回调函数
 */
function changeSurplusResponse(obj)
{
  if (obj.error)
  {
    try
    {
      document.getElementById("ECS_SURPLUS_NOTICE").innerHTML = obj.error;
      document.getElementById('ECS_SURPLUS').value = '0';
      document.getElementById('ECS_SURPLUS').focus();
    }
    catch (ex) { }
  }
  else
  {
    try
    {
      document.getElementById("ECS_SURPLUS_NOTICE").innerHTML = '';
    }
    catch (ex) { }
    orderSelectedResponse(obj.content);
  }
}

/* *
 * 改变积分
 */
function changeIntegral(val)
{
  if($(".radio-switching").hasClass("active")){
      val = 0;
  }
  /*获取配送方式 by kong */
  // 检查是否选择了支付配送方式
  var shipping = $("form#theForm input[name='shipping[]']");
  var ru_id = $("form#theForm input[name='ru_id[]']");
  var arr = [];
  for(var i=0; i<shipping.length; i++){
      var arr2 = [];
      arr2.push(ru_id[i].value);
      arr2.push(shipping[i].value);
      arr[i] = arr2;
  }
 /* if (selectedIntegral == val)
 {
    return;
 }
 else
 {
    selectedIntegral = val;
 }*/

  $.get(ROOT_URL + 'index.php?m=flow&a=change_integral', {points: val,shipping_id:arr}, function(data){
    changeIntegralResponse(data);
  }, 'json');
  //Ajax.call('flow.php?step=change_integral', 'points=' + val, changeIntegralResponse, 'GET', 'JSON');
}

/* *
 * 改变积分回调函数
 */
function changeIntegralResponse(obj)
{
  if (obj.error)
  {
    try
    {
      //document.getElementById('ECS_INTEGRAL_NOTICE').innerHTML = obj.error;
      d_messages(obj.error);
      document.getElementById('ECS_INTEGRAL').value = '0';
      //document.getElementById('ECS_INTEGRAL').focus();
    }
    catch (ex) { }
  }
  else
  {
    try
    {
      //document.getElementById('ECS_INTEGRAL_NOTICE').innerHTML = '';
        if($(".radio-switching").hasClass("active")){
            $(".radio-switching").removeClass("active");
            $("#ECS_INTEGRAL").val(0);
        }
        else{
            $(".radio-switching").addClass("active");
            $("#ECS_INTEGRAL").val(obj.integral);
        }
    }
    catch (ex) { }
    orderSelectedResponse(obj);
  }
}

/* *
 * 改变红包
 */
function changeBonus(val)
{
  if (selectedBonus == val)
  {
    return;
  }
  else
  {
    selectedBonus = val;
  }

  $.get('index-test.php?r=flow/ajax/changebonus', {bonus:val.value}, function(data){
    changeBonusResponse(data);
  }, 'json');
  //Ajax.call('flow.php?step=change_bonus', 'bonus=' + val, changeBonusResponse, 'GET', 'JSON');
}

/* *
 * 改变红包的回调函数
 */
function changeBonusResponse(obj)
{
  if (obj.error)
  {
    alert(obj.error);

    try
    {
      document.getElementById('ECS_BONUS').value = '0';
    }
    catch (ex) { }
  }
  else
  {
    orderSelectedResponse(obj.content);
  }
}

/**
 * 验证红包序列号
 * @param string bonusSn 红包序列号
 */
function validateBonus(bonusSn)
{
  $.get('index-test.php?r=flow/ajax/validatebonus', {bonus_sn:bonusSn}, function(data){
    validateBonusResponse(data);
  }, 'json');
  //Ajax.call('flow.php?step=validate_bonus', 'bonus_sn=' + bonusSn, validateBonusResponse, 'GET', 'JSON');
}

function validateBonusResponse(obj)
{

if (obj.error)
  {
    alert(obj.error);
    orderSelectedResponse(obj.content);
    try
    {
      document.getElementById('ECS_BONUSN').value = '0';
    }
    catch (ex) { }
  }
  else
  {
    orderSelectedResponse(obj.content);
  }
}

/* *
 * 改变发票的方式
 */
function changeNeedInv()
{
  var obj        = document.getElementById('ECS_NEEDINV');
  var objType    = document.getElementById('ECS_INVTYPE');
  var objPayee   = document.getElementById('ECS_INVPAYEE');
  var objContent = document.getElementById('ECS_INVCONTENT');
  var needInv    = obj.checked ? 1 : 0;
  var invType    = obj.checked ? (objType != undefined ? objType.value : '') : '';
  var invPayee   = obj.checked ? objPayee.value : '';
  var invContent = obj.checked ? objContent.value : '';
  objType.disabled = objPayee.disabled = objContent.disabled = ! obj.checked;
  if(objType != null)
  {
    objType.disabled = ! obj.checked;
  }

  $.get(ROOT_URL + 'index.php?m=flow&a=change_needinv', {need_inv:needInv, inv_type:encodeURIComponent(invType), inv_payee:encodeURIComponent(invPayee), inv_content:encodeURIComponent(invContent)}, function(data){
    orderSelectedResponse(data);
  });
  //Ajax.call('flow.php?step=change_needinv', 'need_inv=' + needInv + '&inv_type=' + encodeURIComponent(invType) + '&inv_payee=' + encodeURIComponent(invPayee) + '&inv_content=' + encodeURIComponent(invContent), orderSelectedResponse, 'GET');
}

/* *
 * 改变发票的方式
 */
function groupBuyChangeNeedInv()
{
  var obj        = document.getElementById('ECS_NEEDINV');
  var objPayee   = document.getElementById('ECS_INVPAYEE');
  var objContent = document.getElementById('ECS_INVCONTENT');
  var needInv    = obj.checked ? 1 : 0;
  var invPayee   = obj.checked ? objPayee.value : '';
  var invContent = obj.checked ? objContent.value : '';
  objPayee.disabled = objContent.disabled = ! obj.checked;


    $.get('index.php?m=default&c=group_buy&a=change_needinv', {need_idv:needInv, payee:invPayee, content:invContent}, null);
  //Ajax.call('group_buy.php?act=change_needinv', 'need_idv=' + needInv + '&amp;payee=' + invPayee + '&amp;content=' + invContent, null, 'GET');
}

/* *
 * 改变缺货处理时的处理方式
 */
function changeOOS(obj)
{
  if (selectedOOS == obj)
  {
    return;
  }
  else
  {
    selectedOOS = obj;
  }

  $.get('index-test.php?r=flow/ajax/changeoos', {oos:obj.value}, null);
  //Ajax.call('flow.php?step=change_oos', 'oos=' + obj.value, null, 'GET');
}

/* *
 * 检查提交的订单表单
 */
function checkOrderForm(frm)
{
  var paymentSelected = false;
  var shippingSelected = false;

    // 检查是否选择了支付配送方式
    var shipping = $("form#theForm input[name='shipping[]']");
    var ru_name = $("form#theForm input[name='ru_name[]']");

    for(var i=0; i<shipping.length; i++){
        if(shipping[i].value == 0){
            var content = ru_name[i].value + '暂不支持该地区配送';
            d_messages(content);
            return false;
        }
    }

  // 检查是否选择了支付配送方式
  for (i = 0; i < frm.elements.length; i ++ )
  {
    /*if (frm.elements[i].name == 'shipping' && frm.elements[i].checked)
    {
      shippingSelected = true;
    }*/
    if (frm.elements[i].name == 'payment' && frm.elements[i].value > 0)
    {
      paymentSelected = true;
    }
  }

  /*if ( ! shippingSelected)
  {
    alert(flow_no_shipping);
    return false;
  }*/

  if ( ! paymentSelected)
  {
    //d_messages(flow_no_payment);
      d_messages("请选择支付方式");
    return false;
  }
var ECS_SURPLUS = '';
var ECS_INTEGRAL = '';
  // 检查用户输入的余额
  if (document.getElementById("ECS_SURPLUS"))
  {
    var surplus = document.getElementById("ECS_SURPLUS").value;

    var info = $.ajax({
                  url : ROOT_URL + 'index.php?m=flow&a=check_surplus',
                  async : false,
                  data: {surplus:surplus},
                  success: function(data){
                	  ECS_SURPLUS = data;
                  },
                  dataType: 'text'
                });

    if (ECS_SURPLUS)
    {
      try
      {
        document.getElementById("ECS_SURPLUS_NOTICE").innerHTML = ECS_SURPLUS;
      }
      catch (ex)
      {
      }
      return false;
    }
  }

  // 检查用户输入的积分
  if (document.getElementById("ECS_INTEGRAL"))
  {
    var integral = document.getElementById("ECS_INTEGRAL").value;

    var info = $.ajax({
                  url : ROOT_URL + 'index.php?m=flow&a=check_integral',
                  async : false,
                  data: {integral:integral},
                  success: function(data){
                	  ECS_INTEGRAL = data;
                  },
                  dataType: 'text'
                });

    if (ECS_INTEGRAL)
    {
      return false;
      try
      {
          d_messages(ECS_INTEGRAL);
        //document.getElementById("ECS_INTEGRAL_NOTICE").innerHTML = ECS_INTEGRAL;
      }
      catch (ex)
      {
      }
    }
  }
  //避免重复提交
  $("a.btn-submit").attr("disabled",true);
  setTimeout(function (){$("a.btn-submit").attr("disabled",false);},5000);

  //frm.action = frm.action + '&step=done';
  //frm.action = frm.action + '?step=done';
  return true;
}

/* *
 * 检查收货地址信息表单中填写的内容
 */
function checkConsignee(frm)
{
  var msg = new Array();
  var err = false;

  if (frm.elements['country'] && frm.elements['country'].value == 0 && frm.elements['country'].length > 1)
  {
    err = true;
    msg.push(country_not_null);
  }


  if (frm.elements['province'] && frm.elements['province'].value == 0 && frm.elements['province'].length > 1)
  {
    err = true;
    msg.push(province_not_null);
  }

  if (frm.elements['city'] && frm.elements['city'].value == 0 && frm.elements['city'].length > 1)
  {
    err = true;
    msg.push(city_not_null);
  }

  if (frm.elements['district'] && frm.elements['district'].length > 1)
  {
    if (frm.elements['district'].value == 0)
    {
      err = true;
      msg.push(district_not_null);
    }
  }

  if (Utils.isEmpty(frm.elements['consignee'].value))
  {
    err = true;
    msg.push(consignee_not_null);
  }


  if (frm.elements['address'] && Utils.isEmpty(frm.elements['address'].value))
  {
    err = true;
    msg.push(address_not_null);
  }

  if (Utils.isEmpty(frm.elements['mobile'].value))
  {
    err = true;
    msg.push(mobile_not_null);
  }
  else
  {
    if (!Utils.isTel(frm.elements['mobile'].value))
    {
      err = true;
      msg.push(mobile_invaild);
    }
  }

  if (err)
  {
    message = msg.join("\n");
    alert(message);
  }
  return !err;
}

/**
 * 改变配送地址
 */
function selectAddress(obj)
{
  if (selectedAddress == obj)
  {
    return;
  }
  else
  {
	  selectedAddress = obj;
  }

  $.get('index-test.php?r=flow/ajax/selectaddress', {address:obj.value}, function(data){
    orderSelectedResponse(data);
  }, 'json');
}
