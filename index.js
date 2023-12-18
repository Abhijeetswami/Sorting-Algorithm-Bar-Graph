let bars = [];

        document.addEventListener("DOMContentLoaded", function() {
            initializeBars();
            randomizeArray(); // Call randomizeArray after initializing bars
            updateLabels();
        });
        function setBar() {
            const positionInput = document.getElementById("positionInput");
            const heightRateInput = document.getElementById("heightRateInput");

            const position = parseInt(positionInput.value);
            const heightRate = parseInt(heightRateInput.value);

            if (isNaN(position) || isNaN(heightRate) || position < 1 || position > 100 || heightRate < 1 || heightRate > 100) {
                alert("Please enter valid values for position (1-100) and height rate (1-100).");
                return;
            }

            // Set the height of the bar at the specified position
            const index = position - 1;
            bars[index] = heightRate;

            // Update the bars in the DOM with animation
            updateBarsWithAnimation(index);
        }

        function updateBarsWithAnimation(index) {
            const barGraph = document.getElementById("barGraph");
            const barsElements = barGraph.children;
            const bar = barsElements[index];

            // Add the "clicked" class to apply the bounce animation
            bar.classList.add("clicked");

            // Wait for the animation to complete, then remove the class
            setTimeout(() => {
                bar.classList.remove("clicked");
            }, 500);

            // Update bars in the DOM based on the current array
            for (let i = 0; i < bars.length; i++) {
                const currentBar = barsElements[i];
                currentBar.style.height = bars[i] + "px";
                currentBar.style.backgroundColor = `rgb(${bars[i] * 2.55}, 0, 0)`;

                const barHeightLabel = currentBar.children[0];
                barHeightLabel.innerText = bars[i];
            }

            updateLabels();
        }

        function initializeBars() {
            const barGraph = document.getElementById("barGraph");
            const barLabels = document.getElementById("barLabels");
            const numberOfBars = 100;

            // Clear existing bars
            barGraph.innerHTML = "";
            barLabels.innerHTML = "";

            // Create 100 bars with random heights
            bars = Array.from({ length: numberOfBars }, () => Math.floor(Math.random() * 100) + 1);

            // Create bars in the DOM
            for (let i = 0; i < numberOfBars; i++) {
                const bar = document.createElement("div");
                bar.className = "bar";
                bar.style.height = bars[i] + "px";

                const barHeightLabel = document.createElement("div");
                barHeightLabel.className = "bar-height";
                barHeightLabel.innerText = bars[i];

                bar.appendChild(barHeightLabel);
                barGraph.appendChild(bar);

                const label = document.createElement("span");
                label.innerText = i + 1;
                barLabels.appendChild(label);
            }
        }

        function updateLabels() {
            const barLabels = document.getElementById("barLabels");

            // Update labels based on current bar heights
            for (let i = 0; i < bars.length; i++) {
                const label = barLabels.children[i];
                label.innerText = bars[i];
            }
        }

        function randomizeArray() {
            // Randomize the array and update the bars
            bars = bars.map(() => Math.floor(Math.random() * 100) + 1);
            updateBars();
        }

        function insertionSort() {
            // Perform insertion sort on the array and update the bars
            for (let i = 1; i < bars.length; i++) {
                let j = i - 1;
                const temp = bars[i];
                while (j >= 0 && bars[j] > temp) {
                    bars[j + 1] = bars[j];
                    j--;
                }
                bars[j + 1] = temp;
            }
            updateBars();
        }

        function selectionSort() {
            // Perform selection sort on the array and update the bars
            for (let i = 0; i < bars.length - 1; i++) {
                let minIndex = i;
                for (let j = i + 1; j < bars.length; j++) {
                    if (bars[j] < bars[minIndex]) {
                        minIndex = j;
                    }
                }
                const temp = bars[i];
                bars[i] = bars[minIndex];
                bars[minIndex] = temp;
            }
            updateBars();
        }

        function bubbleSort() {
            // Perform bubble sort on the array and update the bars
            for (let i = 0; i < bars.length - 1; i++) {
                for (let j = 0; j < bars.length - i - 1; j++) {
                    if (bars[j] > bars[j + 1]) {
                        const temp = bars[j];
                        bars[j] = bars[j + 1];
                        bars[j + 1] = temp;
                    }
                }
            }
            updateBars();
        }

        function quickSort() {
            // Perform quick sort on the array and update the bars
            function partition(low, high) {
                const pivot = bars[high];
                let i = low - 1;
                for (let j = low; j < high; j++) {
                    if (bars[j] < pivot) {
                        i++;
                        const temp = bars[i];
                        bars[i] = bars[j];
                        bars[j] = temp;
                    }
                }
                const temp = bars[i + 1];
                bars[i + 1] = bars[high];
                bars[high] = temp;
                return i + 1;
            }

            function quickSortHelper(low, high) {
                if (low < high) {
                    const pi = partition(low, high);
                    quickSortHelper(low, pi - 1);
                    quickSortHelper(pi + 1, high);
                }
            }

            quickSortHelper(0, bars.length - 1);
            updateBars();
        }

        function mergeSort() {
            // Perform merge sort on the array and update the bars
            function merge(left, right) {
                let result = [];
                let leftIndex = 0;
                let rightIndex = 0;

                while (leftIndex < left.length && rightIndex < right.length) {
                    if (left[leftIndex] < right[rightIndex]) {
                        result.push(left[leftIndex]);
                        leftIndex++;
                    } else {
                        result.push(right[rightIndex]);
                        rightIndex++;
                    }
                }

                return result.concat(left.slice(leftIndex), right.slice(rightIndex));
            }

            function mergeSortHelper(arr) {
                if (arr.length <= 1) {
                    return arr;
                }

                const middle = Math.floor(arr.length / 2);
                const left = arr.slice(0, middle);
                const right = arr.slice(middle);

                return merge(mergeSortHelper(left), mergeSortHelper(right));
            }

            bars = mergeSortHelper(bars);
            updateBars();
        }

        function shellSort() {
            // Perform shell sort on the array and update the bars
            const n = bars.length;
            for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
                for (let i = gap; i < n; i += 1) {
                    const temp = bars[i];
                    let j;
                    for (j = i; j >= gap && bars[j - gap] > temp; j -= gap) {
                        bars[j] = bars[j - gap];
                    }
                    bars[j] = temp;
                }
            }
            updateBars();
        }

        function changeSize() {
    // Shrink the size of the bars by dividing each height by 2
    bars = bars.map(height => Math.max(1, Math.floor(height / 2)));
    updateBars();
}

        function updateBars() {
            const barGraph = document.getElementById("barGraph");

            // Update bars in the DOM based on the current array
            for (let i = 0; i < bars.length; i++) {
                const bar = barGraph.children[i];
                bar.style.height = bars[i] + "px";
                bar.style.backgroundColor = `rgb(${bars[i] * 2.55}, 0, 0)`;

                const barHeightLabel = bar.children[0];
                barHeightLabel.innerText = bars[i];
            }

            updateLabels();
        }