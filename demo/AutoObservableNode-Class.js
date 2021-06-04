{
  let isCreating = false;
  const depCacheForCreating = new Set();

  class AutoObservableNode {
    value;
    type;
    depByList = [];
    computor = () => {};

    constructor(opts) {
      this.type = typeof opts === 'function' ? 'ob' : 'mut';

      if (this.type === 'mut') {
        this.value = opts;
      } else {
        this.computor = () => {
          this.value = opts();
          this.depByList.forEach((node) => node.computor());
        };
        isCreating = true;
        this.computor();
        isCreating = false;
        depCacheForCreating.forEach((node) => node.depByList.push(this));
        depCacheForCreating.clear();
      }
    }

    get() {
      if (isCreating === true) {
        depCacheForCreating.add(this);
      }
      return this.value;
    }

    set(nextValue) {
      if (this.type === 'ob') return;

      this.value = nextValue;
      this.depByList.forEach((node) => node.computor());
    }
  }

  // * ================================================================================

  var sleep = (n) => {
    const s = Date.now();
    while (Date.now() < s + n) {}
  };

  // * ---------------- mutable node

  // * initialization
  const x = new AutoObservableNode(0);

  // * mutation
  x.set(0);

  // * using
  console.log('first x', x.get());

  // * ---------------- auto observable node

  const y = new AutoObservableNode(() => {
    sleep(1000);
    return x.get() + 1;
  });

  const z = new AutoObservableNode(() => [x.get(), y.get(), x.get() + y.get()]);
  const w = new AutoObservableNode(() => [y.get(), y.get()]);

  // * ----------------

  x.set(1);

  console.log('second x', x.get());
  console.log('second y', y.get());
  console.log('second z', z.get());
  console.log('second w', w.get());

  x.set(10);

  console.log('third x', x.get());
  console.log('third y', y.get());
  console.log('third z', z.get());
  console.log('third w', w.get());
}
