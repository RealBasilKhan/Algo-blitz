const Sketch = (W, H) => (p) => {
  let values = [];
  let w = 10;

  let states = [];

  p.setup = function () {
    p.createCanvas(W, H);
    values = new Array(p.floor(p.width / w));
    for (let i = 0; i < values.length; i++) {
      values[i] = p.random(p.height);
      states[i] = -1;
    }
    quickSort(values, 0, values.length - 1);
  };

  async function quickSort(arr, start, end) {
    if (start >= end) {
      return;
    }
    let index = await partition(arr, start, end);
    states[index] = -1;

    await Promise.all([
      quickSort(arr, start, index - 1),
      quickSort(arr, index + 1, end),
    ]);
  }

  async function partition(arr, start, end) {
    for (let i = start; i < end; i++) {
      states[i] = 1;
    }

    let pivotValue = arr[end];
    let pivotIndex = start;
    states[pivotIndex] = 0;
    for (let i = start; i < end; i++) {
      if (arr[i] < pivotValue) {
        await swap(arr, i, pivotIndex);
        states[pivotIndex] = -1;
        pivotIndex++;
        states[pivotIndex] = 0;
      }
    }
    await swap(arr, pivotIndex, end);

    for (let i = start; i < end; i++) {
      if (i != pivotIndex) {
        states[i] = -1;
      }
    }

    return pivotIndex;
  }

  p.draw = function () {
    p.background(0);

    for (let i = 0; i < values.length; i++) {
      p.noStroke();
      if (states[i] == 0) {
        p.fill("#E0777D");
      } else if (states[i] == 1) {
        p.fill("#D6FFB7");
      } else {
        p.fill(255);
      }
      p.rect(i * w, p.height - values[i], w, values[i]);
    }
  };

  async function swap(arr, a, b) {
    await sleep(50);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
};
export default Sketch;
