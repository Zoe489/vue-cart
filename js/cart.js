Vue.filter("money",function(value,type){
  return "￥" + value.toFixed(2) + type;
});
var vm = new Vue({
  el:".container",
  data:{
    totalMoney:0,
    list:[],
    checkAllFlag:false,
    //delFlag:false
  },
  filters:{
    formatMoney:function(value) {
      return "￥" + value.toFixed(2);
    }
  },
  mounted:function(){
    this.$nextTick(function(){
        this.cartView();
    })
  },
  methods:{
    // 获取本地JSON数据
    cartView: function() {
      this.$http.get("data/cart.json").then(function (res){
        this.list = res.body.result.productList;
      });
    },
    // 增加减少商品数量
    changeMoney: function(product,way) {
      if(way>0){
        product.productQuentity ++;
      }else{
        product.productQuentity --;
        if(product.productQuentity < 1){
          product.productQuentity = 1;
        }
      }
      this.calTotalMoney();
    },
    // 单选按钮
    selectProduct: function(item) {
      if(typeof item.checked == 'undefined') {
        // Vue.set(item,"checked",true);
        this.$set(item,"checked",true);
      }else {
        item.checked = !item.checked;
      }
      this.calTotalMoney();
    },
    //全选按钮和取消全选
    checkAll: function(flag) {
      this.checkAllFlag = flag;
      var _this = this;
      //遍历list当中所有的product，function里第一个是返回的值，第二个是索引
      //当用户直接全选，这样是没有定义value中的checked属性的，所以checked属性如果没有注册，需要注册
      this.list.forEach(function(item , index) {
        //如果checked属性没有注册，则注册并赋值为true，如果注册了则直接赋值为true
        if(typeof item.checked == 'undefined') {
          _this.$set(item,"checked",_this.checkAllFlag);
        }else {
          item.checked = _this.checkAllFlag;
        }
      });
      this.calTotalMoney();
    },
    //计算总金额
    calTotalMoney: function(){
      var _this=this;
      _this.totalMoney = 0;
      this.list.forEach(function(item , index) {
        if(item.checked ) {
          _this.totalMoney += item.productPrice * item.productQuentity;
        }
      });
    }
  }
});
