# arrayParseTree
改算法可以将扁平数组解析成一个树结构, 可以对大量数据解析解析(也许)
```js
// 扁平数组
[
  {id: 'a', parentId: ''}, 
  {id: 'b', parentId: 'a'},
  {id: 'c', parentId: 'b'},
]
// 树结构
[{
  id: 'a',
  child: [{
    id: 'b',
    parentId: 'a',
    child: [{
      id: 'c',
      parentId: 'b',
      child: []
    }]
  }]
}]
```

## 调用
```js
parseTree(list, (treeList) => {
  console.log(treeList);
});
```
