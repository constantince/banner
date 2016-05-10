//负责判断滑动对象
function scroll(fatherSelector) {
  var father = $(fatherSelector), children = father.children();
  children.first().addClass('active');
  children.last().addClass('prev');
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
  }

  //开始侦听事件
  children.on('swipeLeft', function(e) {
    move($(e.currentTarget), 'left');
  }).on('swipeRight', function(e) {
    move($(e.currentTarget), 'right');
  });

  return move;
}