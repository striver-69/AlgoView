let srcrow, srccol, destrow, destcol, flag = false;
let totalDisks = 6;
let t1 = 1, t2 = 2, t3 = 3;

let isPathDrawn = false;

let arr1 = [6, 5, 4, 3, 2, 1];
let arr2 = []
let arr3 = []
let vis = [];
for (let i = 0; i <= 25; i++) {
    vis.push([]);
}
for (let i = 1; i <= 25; i++) {
    for (let j = 1; j <= 20; j++) {
        vis[i].push(0);
    }
}

$('.nav-link').click((e) => {
    if (!$(e.currentTarget).hasClass('active')) {
        $('.nav-link.active').removeClass('active');
        $(e.currentTarget).addClass('active');
        if ($(e.currentTarget).text() == "Sorting") {
            updateSelectionArea("Sorting");
            displayArray();
        }
        else if ($(e.currentTarget).text() == "Graphs") {
            updateSelectionArea("Graphs");
            displayGraph(true, false);
        }
        else if ($(e.currentTarget).text() == "Tower of Hanoi") {
            updateSelectionArea("Tower of Hanoi");
            displayTower([6, 5, 4, 3, 2, 1], [], []);
        }
    }
});

let updateSelectionArea = (option) => {
    $('.selection-area').html("");
    $('.d-grid').html("");
    if (option == "Sorting") {
        $('.selection-area').append(`<ul class="list-group list-group-flush">
            <li class="list-group-item bg-dark text-light">Bubble Sort</li>
            <li class="list-group-item">Selection Sort</li>
            <li class="list-group-item">Merge Sort</li>
            <li class="list-group-item">Quick Sort</li>
        </ul>`);

        $('.d-grid').append(`<button type="button" class="btn btn-success start-sort">Sort</button>
                            <button type="button" class="btn btn-danger shuffle">Shuffle</button>`);

        $('.start-sort').click(async () => {
            let selectedAlgo = $('.list-group-item.bg-dark').text();
            console.log(selectedAlgo);
            $('.start-sort').addClass('disabled');
            $('.shuffle').addClass('disabled');
            $('.nav-link').addClass('disabled');
            $('.list-group-item').addClass('disabled');
            if (selectedAlgo == "Bubble Sort")
                await bubble();
            else if (selectedAlgo == "Selection Sort")
                await selection();
            else if (selectedAlgo == "Merge Sort")
                await mergeSort(0, arr.length - 1);
            else if (selectedAlgo == "Quick Sort")
                await quickSort(0, arr.length - 1);
            $('.list-group-item').removeClass('disabled');
            $('.nav-link').removeClass('disabled');
            $('.start-sort').removeClass('disabled');
            $('.shuffle').removeClass('disabled');
        });
    }
    else if (option == "Graphs") {
        $('.selection-area').append(`<ul class="list-group list-group-flush">
            <li class="list-group-item bg-dark text-light">BFS</li>
            <li class="list-group-item">DFS</li>
        </ul>`);



        $('.d-grid').append(`<button type="button" class="btn btn-success start-path">Start</button>
                            <button type="button" class="btn btn-danger shuffle-path">Shuffle</button>`);

        $('.start-path').click(async () => {
            let selectedAlgo = $('.list-group-item.bg-dark').text();
            $('.start-path').addClass('disabled');
            $('.shuffle-path').addClass('disabled');
            $('.nav-link').addClass('disabled');
            $('.list-group-item').addClass('disabled');
            if (selectedAlgo == "BFS")
                await bfs();
            else if (selectedAlgo == "DFS")
            {
                isPathDrawn = false;
                await dfs(srcrow, srccol, "");
            }
            $('.list-group-item').removeClass('disabled');
            $('.nav-link').removeClass('disabled');
            $('.start-path').removeClass('disabled');
            $('.shuffle-path').removeClass('disabled');

        });

        $('.shuffle-path').click(() => {
            console.log("hello");
            for (let i = 1; i <= 25; i++) {
                for (let j = 1; j <= 20; j++) {
                    vis[i][j] = 0;
                }
            }

            srcrow = Math.floor(Math.random() * 25) + 1;
            srccol = Math.floor(Math.random() * 20) + 1;

            destrow = Math.floor(Math.random() * 25) + 1;
            destcol = Math.floor(Math.random() * 20) + 1;
            if (destrow == srcrow && destcol == srccol) {
                if (destcol > 1)
                    destcol--;
                else
                    destcol++;
            }
            displayGraph(1);
            flag = false;
        })

        $('.list-group-item').click(() => {
            srcrow = Math.floor(Math.random() * 25) + 1;
            srccol = Math.floor(Math.random() * 20) + 1;

            destrow = Math.floor(Math.random() * 25) + 1;
            destcol = Math.floor(Math.random() * 20) + 1;
            if (destrow == srcrow && destcol == srccol) {
                if (destcol > 1)
                    destcol--;
                else
                    destcol++;
            }
            displayGraph(1);
        })
    }

    else if (option == "Tower of Hanoi") {
        console.log("hello");
        $('.selection-area').append(`<ul class="list-group list-group-flush">
            <li class="list-group-item bg-dark text-light">Tower of Hanoi</li>
        </ul>`);



        $('.d-grid').append(`<button type="button" class="btn btn-success start-presentation">Start</button>
                            <button type="button" class="btn btn-danger reset">Reset</button>`);

        $('.start-presentation').click(async () => {
            arr1 = [6, 5, 4, 3, 2, 1];
            arr2 = [];
            arr3 = [];
            $('.start-presentation').addClass('disabled');
            $('.reset').addClass('disabled');
            $('.nav-link').addClass('disabled');
            $('.list-group-item').addClass('disabled');
            await toh(totalDisks, t1, t2, t3);
            $('.list-group-item').removeClass('disabled');
            $('.nav-link').removeClass('disabled');
            $('.start-presentation').removeClass('disabled');
            $('.reset').removeClass('disabled');
        });

        $('.reset').click(() => {
            displayTower([6, 5, 4, 3, 2, 1], [], []);
        })
    }

    // Adding event listeners
    $('.list-group-item').click((e) => {
        if (!$(e.currentTarget).hasClass('bg-dark')) {
            $('.shuffle').click();
        }
        $('.list-group-item.bg-dark').removeClass('bg-dark text-light');
        $(e.currentTarget).addClass('bg-dark text-light');
    });

    $('.shuffle').click(() => {
        if ($('.nav-link.active').text() == "Sorting") {
            let t = 100;
            while (t--) {
                let stpt = Math.floor(Math.random() * arr.length);
                let enpt = Math.floor(Math.random() * arr.length);
                let temp = arr[stpt];
                arr[stpt] = arr[enpt];
                arr[enpt] = temp;
            }
            displayArray();
        }
    });
}

/****************************** Array for performing Sort operations******************************** */
let arr = [5, 3, 10, 40, 7, 35, 25, 15, 27, 19, 12, 10, 14, 40, 45, 32, 31, 18, 6, 12, 14, 7, 9, 20, 17];
let maxele = -1;
for (let i of arr) {
    maxele = Math.max(maxele, i);
}
/******************************************************************************************************/



/****************************** To display array **************************************************** */
let displayArray = () => {
    $('.array-dashboard').html("");
    $('.array-dashboard').css("border", "");
    $('.array-dashboard').css("border-top", "5px solid");
    $('.array-dashboard').css("padding", "");
    $('.array-dashboard').css({ "display": "flex", "flex-direction": "row" });
    for (let i = 0; i < arr.length; i++) {
        $('.array-dashboard').append(`<div class="array-element" id="${i}" style="height: ${(arr[i] / maxele) * 100}%; width: ${100 / arr.length}%">${arr[i]}</div>`)
    }
}


/******************************* Displaying array in the starting ************************************ */
if ($('.nav-link.active').text() == "Sorting") {
    updateSelectionArea("Sorting");
    displayArray();
}

/****************************** To display grid **************************************************** */
let displayGraph = (shuffle = false, wantPrevious = false) => {
    $('.array-dashboard').html("");
    $('.array-dashboard').css("border", "5px solid");
    $('.array-dashboard').css("padding", "0");
    $('.array-dashboard').css({ "display": "flex", "flex-direction": "column" });

    if (shuffle) {
        for (let i = 1; i <= 25; i++) {
            for (let j = 1; j <= 20; j++) {
                vis[i][j] = 0;
            }
        }

        if (!wantPrevious) {
            srcrow = Math.floor(Math.random() * 25) + 1;
            srccol = Math.floor(Math.random() * 20) + 1;

            destrow = Math.floor(Math.random() * 25) + 1;
            destcol = Math.floor(Math.random() * 20) + 1;
        }
        if (destrow == srcrow && destcol == srccol) {
            if (destcol > 1)
                destcol--;
            else
                destcol++;
        }
        flag = false;
    }

    for (let i = 1; i <= 25; i++) {
        let cellRow = `<div class="cell-row" id="row-${i}"></div>`;
        $('.array-dashboard').append(cellRow);
    }

    for (let i = 1; i <= 25; i++) {
        let currcellrow = $(`#row-${i}`);
        //console.log(currcellrow)
        for (let j = 1; j <= 20; j++) {
            if (i == srcrow && j == srccol) {
                currcellrow.append(`<div class="cell source-cell" id="row-${i}-col-${j}" style="background-color: red;">Start</div>`)
            }
            else if (i == destrow && j == destcol) {
                currcellrow.append(`<div class="cell destination-cell" id="row-${i}-col-${j}" style="background-color: green;">End</div>`)
            }
            else if (vis[i][j] == 1) {
                currcellrow.append(`<div class="cell" id="row-${i}-col-${j}" style="background-color: lightgreen;"></div>`)
            }
            else {
                //console.log("helli");
                currcellrow.append(`<div class="cell" id="row-${i}-col-${j}" "></div>`)
            }
        }
    }
}
//displayGraph(0)

let displayTower = async (darr1, darr2, darr3) => {
    $('.array-dashboard').html("");
    $('.array-dashboard').css("border", "5px solid");
    $('.array-dashboard').css({ "display": "flex", "flex-direction": "column" });
    let fort1 = "";
    let fort2 = "";
    let fort3 = "";
    let bot1 = (darr1.length - 1) * 20;
    let bot2 = (darr2.length - 1) * 20;
    let bot3 = (darr3.length - 1) * 20;
    for (let i = darr1.length - 1; i >= 0; i--) {
        let toAdd = `<div class="disc-${darr1[i]}" style="bottom: ${bot1}px">${darr1[i]}</div>`;
        bot1 -= 20;
        fort1 += toAdd;
        console.log(darr1[i]);
    }
    for (let i = darr2.length - 1; i >= 0; i--) {
        let toAdd = `<div class="disc-${darr2[i]}" style="bottom: ${bot2}px">${darr2[i]}</div>`;
        bot2 -= 20;
        fort2 += toAdd;
        console.log(darr2[i]);
    }
    for (let i = darr3.length - 1; i >= 0; i--) {
        let toAdd = `<div class="disc-${darr3[i]}" style="bottom: ${bot3}px">${darr3[i]}</div>`;
        bot3 -= 20;
        fort3 += toAdd;
        console.log(darr3[i]);
    }
    $('.array-dashboard').append(`<div class="row" style="height: 100%;">
                    <div class="col-md-4" style="position: relative;">
                        <div class="tower tower-1"></div>
                    </div>
                    <div class="col-md-4" style="position: relative;">
                        <div class="tower tower-2"></div>
                    </div>
                    <div class="col-md-4" style="position: relative;">
                        <div class="tower tower-3"></div>
                    </div>
                </div>`);
    $('.tower-1').append(fort1);
    $('.tower-2').append(fort2);
    $('.tower-3').append(fort3);
}

/****************************** Swap to numbers of array **************************************************** */
let swap = (a, b) => {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}


/****************************** Making for-loop sleep for a particular duration ******************************** */
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(async () => {
        resolve();
    }, milliseconds))
};

let bubble = async () => {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                $(`#${j}`).css("background-color", "red");
                $(`#${j + 1}`).css("background-color", "red");
                await sleep(100);
                swap(j, j + 1);
                $(`#${j}`).css("background-color", "black");
                $(`#${j + 1}`).css("background-color", "black");
                displayArray();
            }
            else {
                $(`#${j}`).css("background-color", "green");
                $(`#${j + 1}`).css("background-color", "green");
                await sleep(100);
                $(`#${j}`).css("background-color", "black");
                $(`#${j + 1}`).css("background-color", "black");
                displayArray();
            }
        }
        $(`#${arr.length - i - 1}`).css("background-color", "blue");
    }
    displayArray();
}

let selection = async () => {
    for (let i = 0; i < arr.length - 1; i++) {
        let minidx = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minidx]) {
                $(`#${minidx}`).css("background-color", "red");
                $(`#${j}`).css("background-color", "red");
                await sleep(100);
                swap(j, minidx);
                $(`#${j}`).css("background-color", "black");
                $(`#${minidx}`).css("background-color", "black");
                displayArray();
            }
            else {
                $(`#${minidx}`).css("background-color", "green");
                $(`#${j}`).css("background-color", "green");
                await sleep(100);
                $(`#${j}`).css("background-color", "black");
                $(`#${minidx}`).css("background-color", "black");
                displayArray();
            }
        }
        swap(i, minidx);
        await sleep(100);
        displayArray();
        $(`#${i}`).css("background-color", "blue");
    }
    displayArray();
}

let merge = async (l, mid, r) => {
    let leftarr = [], rightarr = [];
    for (let i = l; i <= mid; i++) {
        leftarr.push(arr[i]);
    }
    for (let i = mid + 1; i <= r; i++) {
        rightarr.push(arr[i]);
    }
    let i = 0, j = 0, k = l;
    while (i < leftarr.length && j < rightarr.length) {
        let val1 = leftarr[i], val2 = rightarr[j];
        if (val1 < val2) {
            $(`#${i + l}`).css("background-color", "red");
            $(`#${j + mid + 1}`).css("background-color", "red");
            await sleep(100);
            $(`#${i + l}`).css("background-color", "black");
            $(`#${j + mid + 1}`).css("background-color", "black");
            arr[k++] = val1;
            i++;
            await sleep(100);
            displayArray();
        }
        else {
            $(`#${i + l}`).css("background-color", "red");
            $(`#${j + mid + 1}`).css("background-color", "red");
            await sleep(100);
            $(`#${i + l}`).css("background-color", "black");
            $(`#${j + mid + 1}`).css("background-color", "black");
            arr[k++] = val2;
            j++;
            await sleep(100);
            displayArray();
        }
    }
    while (i < leftarr.length) {
        $(`#${i + l}`).css("background-color", "red");
        $(`#${j + mid + 1}`).css("background-color", "red");
        await sleep(100);
        $(`#${i + l}`).css("background-color", "black");
        $(`#${j + mid + 1}`).css("background-color", "black");
        let val1 = leftarr[i];
        arr[k++] = val1;
        i++;
        await sleep(100);
        displayArray();
    }
    while (j < rightarr.length) {
        $(`#${i + l}`).css("background-color", "red");
        $(`#${j + mid + 1}`).css("background-color", "red");
        await sleep(100);
        $(`#${i + l}`).css("background-color", "black");
        $(`#${j + mid + 1}`).css("background-color", "black");
        let val2 = rightarr[j];
        arr[k++] = val2;
        j++;
        await sleep(100);
        displayArray();
    }
}

let mergeSort = async (l, r) => {
    if (l >= r) {
        return;
    }
    let mid = Math.floor((l + r) / 2);
    await mergeSort(l, mid);
    await mergeSort(mid + 1, r);
    await merge(l, mid, r);
}

let partition = async (pivot, l, r) => {
    let i = l, j = l;
    while (i <= r) {
        if (arr[i] <= pivot) {
            $(`#${i}`).css("background-color", "red");
            $(`#${j}`).css("background-color", "red");
            await sleep(100);
            swap(i, j);
            $(`#${i}`).css("background-color", "black");
            $(`#${j}`).css("background-color", "black");
            i++;
            j++;
            displayArray();
        }
        else {
            i++;
        }
    }
    return j - 1;
}

let quickSort = async (l, r) => {
    if (l >= r)
        return;

    let pivot = arr[r];
    let partitionIndex = await partition(pivot, l, r);
    $(`#${partitionIndex}`).css("background-color", "green");
    await sleep(100);
    await quickSort(l, partitionIndex - 1);
    await quickSort(partitionIndex + 1, r);
    $(`#${partitionIndex}`).css("background-color", "black");
}

let drawPath = async (str, color = "#00008aa2") => {
    let strtRow = srcrow, strtCol = srccol;

    for (let i = 0; i < str.length; i++) {
        let ch = str.charAt(i);
        if (ch == 'U') {
            if ((strtRow != srcrow || strtCol != srccol) && (strtRow != destrow || strtCol != destcol))
                $(`#row-${strtRow}-col-${strtCol}`).append(`<div class = "upperhalf" style="background-color: ${color};"></div>`);
            if ((strtRow - 1 != srcrow || strtCol != srccol) && (strtRow - 1 != destrow || strtCol != destcol))
                $(`#row-${strtRow - 1}-col-${strtCol}`).append(`<div class = "lowerhalf" style="background-color: ${color};"></div>`);
            await sleep(100);
            strtRow--;
        }
        else if (ch == 'D') {
            if ((strtRow != srcrow || strtCol != srccol) && (strtRow != destrow || strtCol != destcol))
                $(`#row-${strtRow}-col-${strtCol}`).append(`<div class = "lowerhalf" style="background-color: ${color};"></div>`);
            if ((strtRow + 1 != srcrow || strtCol != srccol) && (strtRow + 1 != destrow || strtCol != destcol))
                $(`#row-${strtRow + 1}-col-${strtCol}`).append(`<div class = "upperhalf" style="background-color: ${color};"></div>`);
            await sleep(100);
            strtRow++;
        }
        else if (ch == 'L') {
            if ((strtRow != srcrow || strtCol != srccol) && (strtRow != destrow || strtCol != destcol))
                $(`#row-${strtRow}-col-${strtCol}`).append(`<div class = "lefthalf" style="background-color: ${color};"></div>`);
            if ((strtRow != srcrow || strtCol - 1 != srccol) && (strtRow != destrow || strtCol - 1 != destcol))
                $(`#row-${strtRow}-col-${strtCol - 1}`).append(`<div class = "righthalf" style="background-color: ${color};"></div>`);
            await sleep(100);
            strtCol--;
        }
        else {
            if ((strtRow != srcrow || strtCol != srccol) && (strtRow != destrow || strtCol != destcol))
                $(`#row-${strtRow}-col-${strtCol}`).append(`<div class = "righthalf" style="background-color: ${color};"></div>`);
            if ((strtRow != srcrow || strtCol + 1 != srccol) && (strtRow != destrow || strtCol + 1 != destcol))
                $(`#row-${strtRow}-col-${strtCol + 1}`).append(`<div class = "lefthalf" style="background-color: ${color};"></div>`);
            await sleep(100);
            strtCol++;
        }
    }
}

let bfs = async () => {
    if (flag == true) {
        displayGraph(true, true);
    }
    let q1 = [];
    let dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    console.log(vis.length, vis[1].length);
    q1.push([srcrow, srccol]);
    console.log(srcrow, srccol);
    console.log(destrow, destcol);
    vis[srcrow][srccol] = 1;
    let paths = [];
    for (let i = 0; i <= 25; i++) {
        paths.push([]);
    }
    for (let i = 1; i <= 25; i++) {
        for (let j = 1; j <= 20; j++) {
            paths[i].push("");
        }
    }

    while (q1.length > 0) {
        let s = q1.length;
        let toChange = [];
        while (s--) {
            let [row, col] = q1.shift();

            for (let i = 0; i < 4; i++) {
                let rowdash = row + dirs[i][0];
                let coldash = col + dirs[i][1];

                if (rowdash < 1 || rowdash > 25 || coldash < 1 || coldash > 25 || vis[rowdash][coldash] == 1)
                    continue;

                if (i == 0) {
                    paths[rowdash][coldash] = paths[row][col] + "R";
                }
                else if (i == 1) {
                    paths[rowdash][coldash] = paths[row][col] + "L";
                }
                else if (i == 2) {
                    paths[rowdash][coldash] = paths[row][col] + "D";
                }
                else {
                    paths[rowdash][coldash] = paths[row][col] + "U";
                }

                if (rowdash == destrow && coldash == destcol) {
                    await drawPath(paths[rowdash][coldash]);
                    return;
                }

                q1.push([rowdash, coldash]);
                toChange.push([rowdash, coldash]);
                //console.log(row, col, vis[row][col]);
                vis[rowdash][coldash] = 1;
                flag = true;
            }
        }

        displayGraph(false);
        await sleep(200);
    }
    console.log(q1.length);
    return;
}

let paths = [];
for (let i = 0; i <= 25; i++) {
    paths.push([]);
}
for (let i = 1; i <= 25; i++) {
    for (let j = 1; j <= 20; j++) {
        paths[i].push("");
    }
}
let finalPath;
let dfs = async (strtRow, strtCol, path) => {
    if (strtRow == destrow && strtCol == destcol) {
        finalPath = path;
        if(!isPathDrawn)
        {
            await drawPath(finalPath);
            isPathDrawn = true;
        }
        return;
    }
    if (strtRow < 1 || strtRow > 25 || strtCol < 1 || strtCol > 20 || vis[strtRow][strtCol] == true)
        return;
    vis[strtRow][strtCol] = true;
    await dfs(strtRow, strtCol - 1, path + "L");
    await dfs(strtRow, strtCol + 1, path + "R");
    await dfs(strtRow - 1, strtCol, path + "U");
    await dfs(strtRow + 1, strtCol, path + "D");
}
let toh = async (n, t1, t2, t3) => {
    if (n == 0)
        return;
    await toh(n - 1, t1, t3, t2);
    console.log(n, t1, t3);
    if (t1 == 1) {
        arr1.pop();
    }
    else if (t1 == 2) {
        arr2.pop();
    }
    else {
        arr3.pop();
    }
    displayTower(arr1, arr2, arr3);
    await sleep(500);
    if (t3 == 1)
        arr1.push(n);
    else if (t3 == 2)
        arr2.push(n);
    else
        arr3.push(n);
    displayTower(arr1, arr2, arr3);
    await sleep(500);
    console.log(arr1);
    console.log(arr2);
    console.log(arr3);
    await toh(n - 1, t2, t1, t3);
}