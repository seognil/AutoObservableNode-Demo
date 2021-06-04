# AutoObservableNode Demo

A class based implement of the snippet [PureState.js](https://github.com/MaiaVictor/PureState)

for study purposes

varible dependencies auto collection and update

### class version

```js
const x = new AutoObservableNode(0);

x.set(0);

console.log('first x', x.get()); // 'first x 0'

const y = new AutoObservableNode(() => x.get() + 1);
const z = new AutoObservableNode(() => [x.get(), y.get(), x.get() + y.get()]);
const w = new AutoObservableNode(() => [y.get(), y.get()]);

x.set(1);

console.log('second x', x.get()); // 'second x 1'
console.log('second y', y.get()); // 'second y 2'
console.log('second z', z.get()); // 'second z [ 1, 2, 3 ]'
console.log('second w', w.get()); // 'second w [ 2, 2 ]'

x.set(10);

console.log('third x', x.get()); // 'third x 10'
console.log('third y', y.get()); // 'third y 11'
console.log('third z', z.get()); // 'third z [ 10, 11, 21 ]'
console.log('third w', w.get()); // 'third w [ 11, 11 ]'
```

### function version

```js
const x = state(0);

x(0);

console.log('first x', x()); // 'first x 0'

const y = state(() => x() + 1);
const z = state(() => [x(), y(), x() + y()]);
const w = state(() => [y(), y()]);

x(1);

console.log('second x', x()); // 'second x 1'
console.log('second y', y()); // 'second y 2'
console.log('second z', z()); // 'second z [ 1, 2, 3 ]'
console.log('second w', w()); // 'second w [ 2, 2 ]'

x(10);

console.log('third x', x()); // 'third x 10'
console.log('third y', y()); // 'third y 11'
console.log('third z', z()); // 'third z [ 10, 11, 21 ]'
console.log('third w', w()); // 'third w [ 11, 11 ]'
```
