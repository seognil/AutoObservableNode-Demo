{
  let isCreating = false;
  const depCacheForCreating = new Set();

  const state = (opts) => {
    let value = opts;

    const type = typeof opts === 'function' ? 'ob' : 'mut';

    // * ---------------- node, getter setter

    const node = (nextValue) => {
      const isSet = type === 'mut' && nextValue !== undefined;

      if (isSet) {
        value = nextValue;
        node.depByList.forEach((n) => n.computor());
        return;
      }

      if (isCreating === true) {
        depCacheForCreating.add(node);
      }

      return value;
    };

    // * ---------------- constructor

    node.depByList = [];

    node.computor = () => {
      value = opts();
      node.depByList.forEach((n) => n.computor());
    };

    if (type === 'ob') {
      isCreating = true;
      node.computor();
      isCreating = false;
      depCacheForCreating.forEach((n) => n.depByList.push(node));
      depCacheForCreating.clear();
    }

    // * ----------------

    return node;
  };

  // * ================================================================================

  var sleep = (n) => {
    const s = Date.now();
    while (Date.now() < s + n) {}
  };

  // * ---------------- mutable node

  // * initialization
  const x = state(0);

  // * mutation
  x(0);

  // * using
  console.log('first x', x());

  // * ---------------- auto observable node

  const y = state(() => {
    sleep(1000);
    return x() + 1;
  });

  const z = state(() => [x(), y(), x() + y()]);
  const w = state(() => [y(), y()]);

  // * ----------------

  x(1);

  console.log('second x', x());
  console.log('second y', y());
  console.log('second z', z());
  console.log('second w', w());

  x(10);

  console.log('third x', x());
  console.log('third y', y());
  console.log('third z', z());
  console.log('third w', w());
}
