//负责判断滑动对象
function scroll(fatherSelector) {
  var father = $(fatherSelector), children = father.children(), len = children.length;
  _createPoint(len);
  //创建导航屑
  children.each(function(i){
    $(this).attr('index', i);
  });
  if(len==2) {
    _copyChild();
  }
  var children = father.children();
  children.first().addClass('active');
  children.last().addClass('prev');

  //创建导航标识
  function _createPoint(len) {
    var html  = '<em class="active"></em>';
    for(var i=0; i<len-1; i++) {
      html += '<em></em>';
    }
    father.after('<div class="banner-navigate">' + html + '</div>');
  }
  //如果只有两个子元素,复制一个元素，模拟无限循环
  function _copyChild() {
    var newChild = father.html();
    father.append(newChild);
  }
  //切换导航点
  function _tabPoint(index) {
    var children = father.next().children();
    children.removeClass('active');
    children.eq(index).addClass('active');
  }

  //判断正在激活的元素
  function _judeElement(current, direction) {
    var len = children.length - 1;
    var index = current.index();
    var fn = {
        left: function() {
            return (index == len ? children.first() : current.next());
        },
        right: function() {
            return (index == 0 ? children.last() : current.prev());
        }
    };
    return fn[direction]();
  }
  //判断下一个激活的元素
  function loadBrother (active, direction) {
    var u = active;
    if(direction === 'right') {
      var current = _judeElement(active, 'right');
      u = current.index() === 0 ? children.last() : current.prev();
    }
    return u;
  }
  // 执行动画
  function move(target, direction) {
    var current = _judeElement(target, direction);
    children.removeClass('prev').removeClass('active');
    current.addClass('active');
    loadBrother(target, direction).addClass('prev');
    _tabPoint(current.attr('index'));
  }

  //开始侦听事件
  children.on('swipeLeft', function(e) {
    move($(e.currentTarget), 'left');
  }).on('swipeRight', function(e) {
    move($(e.currentTarget), 'right');
  });

  return move;
}