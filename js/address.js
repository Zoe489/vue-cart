new Vue({
  el: "#container",
  data: {
    AddressList:[],
    showAddrNum:3,
    curIndex:0,
    shippingway:1
  },
  mounted: function() {
    this.$nextTick(function () {
      // 代码保证 this.$el 在 document 中
      this.showAddress();
    });
  },
  computed: {
      filteredAddress: function() {
        return this.AddressList.slice(0,this.showAddrNum);
      }
  },
  methods: {
    //从后台获取地址数据
    showAddress: function() {
      var _this = this;
      this.$http.get("data/address.json").then(function(res) {
        _this.AddressList = res.body.result;
      });
    },
    //查看更多地址
    showMore: function() {
      this.showAddrNum = this.AddressList.length;
    },
    //设置默认地址
    setDefault: function(addressId) {
      this.AddressList.forEach(function (address ,index){
        if(address.isDefault == true) {
          address.isDefault = false;
        }
      });
      this.AddressList.forEach(function(item,index) {
        if( item.addressId == addressId) {
          item.isDefault = true;
        }
      });
    },
    //选择某个地址
    checkMethod: function(index) {
      this.curIndex = index;
    },
    //删除地址
    //这里，假设我设置第二个为默认地址，我又把第二个删掉的话，那要把默认地址设为第一个，被选择的那个橙色框也回到第一个，这个功能还没实现
    delAddress: function(item,index) {
      this.AddressList.splice(index,1);
      console.log('this.curIndex', this.curIndex);
      if(item.isDefault==true && this.AddressList.length > 0) {
        this.AddressList[0].isDefault = true;
        this.curIndex = 0;
        // const addressList = this.$els.addressList.getElementsByClassName('foods-item');
        // TODO
        // this.checkMethod(0);
      }
    }
  }
});
