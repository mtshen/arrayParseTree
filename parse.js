function parseTree(list, callback, targetList) {
  // 如果节点有断裂, 提前结束递归, 以防止无限递归发生
  let crack = false;
  if (targetList) {
    // 非根节点
    let ids = targetList.map(item => item.id);
    let index = 0;
    while(index < list.length) {
      parseTree.stackIndexSize ++;
      const {parentId, id} = list[index];
      // 寻找匹配关系
      const indexof = ids.indexOf(parentId);
      if (indexof !== -1) {
        crack = true;
        const listData = list.splice(index, 1)[0];
        const child = [];
        targetList[indexof].child.push({...listData, child});
      } else {
        index ++;
      }
    }

    // 数据分批处理
    if (parseTree.stackIndexSize < (parseTree.maxStackSize || 50000)) {
      targetList.forEach(({child}) => parseTree(list, callback, child));
    } else {
      requestAnimationFrame(() => {
        targetList.forEach(({child}) => 
          parseTree(list, callback, child));
      });
    }
    
  } else {
    // 根节点
    // 根节点不需要匹配关系, 无parentId即可
    // 根节点与非根节点区分, 以达到性能最优
    targetList = [];

    let index = 0;
    while(index < list.length) {
      const {parentId, id} = list[index];
      if (!parentId) {
        const listData = list.splice(index, 1)[0];
        const child = [];
        crack = true;
        targetList.push({...listData, child});
      } else {
        index ++;
      }
    }

    parseTree.stackIndexSize = 0;
    parseTree.targetList = targetList;
    parseTree.callback = callback;
    parseTree(list, callback, targetList);
  }

  if (!list.length || crack) {
    parseTree.callback &&
    parseTree.callback(parseTree.targetList);
    parseTree.callback = null;
  }
}
