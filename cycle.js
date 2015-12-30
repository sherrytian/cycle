;(function($, window, document,undefined) {
    //定义Cycle的构造函数
    var Cycle = function(eleId, opt) {
        // this.$elementId = $(eleId).attr("id"),
        this.moveObj = $(eleId),
        this.timer = null,
        this.defaults = {
            'direction': 'top',
            'step': 1,
            'speed': 40
        },
        this.options = $.extend({}, this.defaults, opt);
    }
    //定义Cycle的方法
    Cycle.prototype = {
        init: function() {
            var _this = this;
            if(_this._isScroll()){
	            _this.modifiedStyle();
	            _this.timer =setInterval(function(){_this.marquee(_this.moveObj.get(0),_this.options.step)},_this.options.speed);
	            _this.moveObj.on("mouseover",function(){
	            	if(_this.timer){
	            		clearInterval(_this.timer);
	            	}
	            }); 
	            _this.moveObj.on("mouseout",function(){
	            	_this.timer = setInterval(function(){_this.marquee(_this.moveObj.get(0),_this.options.step)},_this.options.speed);
	            });
            }
            return _this;
        },
        /**
         * [_isScroll 判断是否滚动]
         * @return {Boolean} [true:滚动;false:不滚动]
         */
        _isScroll:function(){
        	return  this.moveObj.get(0).scrollHeight > this.moveObj.get(0).offsetHeight ? true : false;
        },
        /**
         * [修饰样式]
         */
        modifiedStyle:function(){
        	var _this = this;
        	var newUl = _this.moveObj.find('ul').eq(0).clone(true);
        	this.moveObj.append(newUl);
        	
        },
        /**
         * [执行动作函数]
         * @param  {[obj]} jqobj  [有滚动条的元素]
         * @param  {[number]} step [每次滚动值]
         */
        marquee:function(obj, step){
        	var _this = this;
        	// console.log(obj.scrollTop+'==='+obj.offsetHeight+'==='+obj.scrollHeight);
        	if((obj.scrollTop + obj.offsetHeight) >= obj.scrollHeight){
        		var firstUl = _this.moveObj.find('ul').eq(0);
        		var newUl = firstUl.clone(true);
        		if(_this.moveObj.find('ul').length < 3){
        			_this.moveObj.append(newUl);
        		}else{
        			firstUl.remove();
        		}
        	}else{
        		obj.scrollTop += step;
        	}
        	
        }
    }
    //在插件中使用Cycle对象
    $.fn.cycle = function(options) {
        //创建Cycle的实体
        var cycle = new Cycle(this, options);
        //调用其方法
        return cycle.init();
    }
})(jQuery, window, document);