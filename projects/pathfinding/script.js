// Global variables
let size = 20;
let grid = null;
let startPos = [-1, -1];
let endPos = [-1, -1];
let checkedCount = null;

// Initialise the grid
window.onload = function () {
    searchType = document.getElementById('searchType');
    checkedCount = document.getElementById('checkedCount');
    pathCount = document.getElementById('pathCount');
    searchTime = document.getElementById('searchTime');
    grid = document.getElementById('grid');
    unreachableError = document.getElementById('unreachableError');
    reset();
}


// Build the grid
function build() {
    grid.innerHTML = '';
    for (let row = 0; row < size; row++) {
        let newRow = grid.insertRow();
        for (let col = 0; col < size; col++) {
            newRow.insertCell(col);
        }
    }

    for (row = 0; row < size; row++) {
        for (col = 0; col < size; col++) {
            grid.rows[row].cells[col].onclick = obstacle;
        }
    }
}


// Reset the grid
function reset() {
    build();
    newStart();
    newEnd();
    // Reset stats text
    searchType.innerHTML = 'No search yet!';
    checkedCount.innerHTML = 0;
    pathCount.innerHTML = 0;
    searchTime.innerHTML = '0ms';
    extraInfo.innerHTML = '';
}


// Random obstacles
function randomObstacles() {
    build();
    clutter(100);
    grid.rows[startPos[0]].cells[startPos[1]].classList = 'start';
    grid.rows[endPos[0]].cells[endPos[1]].classList = 'end';
    // Reset stats text
    searchType.innerHTML = 'No search yet!';
    checkedCount.innerHTML = 0;
    pathCount.innerHTML = 0;
    searchTime.innerHTML = '0ms';
    extraInfo.innerHTML = '';
}


// Set cell to .obstacle
function obstacle() {
    let cL = this.classList;
    if (!cL.contains('obstacle') || cL.contains('path')) this.classList = 'obstacle';
    else if (cL.contains('obstacle')) this.classList = '';

    // Reset stats text
    searchType.innerHTML = 'No search yet!';
    checkedCount.innerHTML = 0;
    pathCount.innerHTML = 0;
    searchTime.innerHTML = '0ms';

    // Reset info display
    unreachableError.style.display = "none";
    grid.style.borderColor = '#ccc';
    stats.style.display = "block";

    // Reset cells
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            let thisClassList = grid.rows[i].cells[j].classList;
            if (thisClassList.contains('closed') || thisClassList.contains('path'))
                grid.rows[i].cells[j].classList = '';
        }
    }
}


// Set a random point to .start or .end
function place(type) {
    let row = Math.floor(Math.random() * size);
    let col = Math.floor(Math.random() * size);
    grid.rows[row].cells[col].classList = type;
    if (type === 'start' || type === 'end')
        grid.rows[row].cells[col].onclick = null;
    return [row, col];
}


// Generate x obstacles
function clutter(x) {
    for (let y = 0; y < x; y++) place('obstacle');
}


// New start cell
function newStart() {
    let start = document.getElementsByClassName('start');
    if (start.length > 0) start[0].classList = '';
    startPos = place('start');
}


// New end cell
function newEnd() {
    let end = document.getElementsByClassName('end');
    if (end.length > 0) end[0].classList = '';
    endPos = place('end');
}


// Make a square 2D array
function makeArray() {
    var arr = [];
    for(let i = 0; i < size; i++) {
        arr[i] = [];
        for(let j = 0; j < size; j++) {
            arr[i][j] = null;
        }
    }
    return arr;
}


// Is this a free cell?
function notObs(x, y) {
    return !(grid.rows[x].cells[y].classList.contains('obstacle'));
}


// Sleep for an amount of milliseconds
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Perform Dijkstra's search algorithm
async function dijkstra() {
    let startTime = new Date().getTime();
    search(0);
    let endTime = new Date().getTime();
    let timeTaken = endTime - startTime;
    searchTime.innerHTML = timeTaken + 'ms';
    searchType.innerHTML = 'Dijkstra\'s algorithm';
    extraInfo.innerHTML = '';
}


// Perform the A* search algorithm
async function aStar() {
    let startTime = new Date().getTime();
    search(1);
    let endTime = new Date().getTime();
    let timeTaken = endTime - startTime;
    searchTime.innerHTML = timeTaken + 'ms';
    searchType.innerHTML = 'A* search';
    extraInfo.innerHTML = '(heuristic = distance<sup>5</sup>)';
}


// Return the distance between a and b
function distance(a, b) {
    return Math.sqrt(Math.pow(a[0]-b[0], 2) + Math.pow(a[1]-b[1], 2));
}


// search(0) for Dijsktra, search(1) for A*
async function search(isAStar) {
    // Start the counters at zero
    checkedCount.innerHTML = 0;
    pathCount.innerHTML = 0;

    // Reset info display
    unreachableError.style.display = "none";
    grid.style.borderColor = '#ccc';
    stats.style.display = "block";

    // Ensure there is a valid start and end cell
    if ((startPos[0] != -1) && (endPos[0] != -1)) {
        // Declare the variables needed
        let lowestCost = Infinity;
        let lowestX = startPos[0];
        let lowestY = startPos[1];

        // Create the arrays needed
        let closed = makeArray();
        let cost = makeArray();
        let linkX = makeArray();
        let linkY = makeArray();

        // Populate the arrays
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                closed[i][j] = false;
                cost[i][j] = Infinity;
                linkX[i][j] = -1;
                linkY[i][j] = -1;

                // Reset cells' classes
                let thisCell = grid.rows[i].cells[j];
                if (thisCell.classList.contains('path')) thisCell.classList = '';
                if (thisCell.classList.contains('closed')) thisCell.classList = '';
            }
        }

        // Set the start position's cost to zero
        cost[startPos[0]][startPos[1]] = 0;

        let done = false;
        let checking = true;
        while (checking) {
            // Increase the counter by one
            checkedCount.innerHTML++;
            
            // Set the initial lowest cost to infinity
            lowestCost = Infinity;

            // If the end cell is closed, stop the search
            if (closed[endPos[0]][endPos[1]]) {
                checking = false;
            } else {
                // Loop through the grid of cells
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        /* If the current cell is not closed, is not an obstacle, and has a lower
                            and than the current lowest cost */
                        if (!closed[i][j] && notObs(i, j) && (cost[i][j] < lowestCost)) {
                            // If the cost is not the start, adjust its cost and the lowest costs
                            if (cost[i][j] > 0) lowestCost = cost[i][j];
                            lowestX = i;
                            lowestY = j;
                        }
                    }
                }

                // If the end node is unreachable, exit
                if (checkedCount.innerHTML > 400) {
                    unreachableError.style.display = "block";
                    grid.style.borderColor = '#f00';
                    stats.style.display = "none";
                    checking = false;
                    done = true;
                }

                // Close the cell with the lowest cost (this one) and pause momentarily
                closed[lowestX][lowestY] = true;
                let thisClassList = grid.rows[lowestX].cells[lowestY].classList;
                if (!(thisClassList.contains('start')) && !(thisClassList.contains('end')))
                    grid.rows[lowestX].cells[lowestY].classList = 'closed';
                if (document.getElementById('slow-btn').checked) await sleep(25);

                // If we are using diagonals, use eight neighbours, otherwise use four
                let dx = []; let dy = [];
                if (document.getElementById('diag-btn').checked) {
                    dx = [-1, 0, 1, -1, 1, -1, 0, 1];
                    dy = [-1, -1, -1, 0, 0, 1, 1, 1];
                } else {
                    dx = [-1, 0, 0, 1];
                    dy = [0, -1, 1, 0];
                }

                // For each neighbour
                for (let n = 0; n < dx.length; n++) {
                    // Get the distance between the current cell and this neighbour
                    let travel = (dx[n] + dy[n]) % 2 == 0 ? 1.4 : 1;

                    // Find this neighbour's coordinates
                    let nx = lowestX + dx[n];
                    let ny = lowestY + dy[n];

                    // If the neighbour is within the grid boundaries                    
                    if (nx > -1 && nx < size && ny > -1 && ny < size) {
                        // If this neighbour is not closed and is not an obstacle
                        let date = new Date();
                        let time = date.getMilliseconds();
                        if (!closed[nx][ny] && notObs(nx, ny)) {
                            // Calculate a new cost for the neighbour
                            let newCost = cost[lowestX][lowestY] + travel;

                            // Add a distance^5 heuristic to the cost if the user requested A*
                            if (isAStar) newCost += Math.pow(distance([nx, ny], endPos), 5);

                            // If the neighbour's cost is more than the newly calculated cost:
                            if ((cost[nx][ny] > newCost)) {
                                // Adjust the neighbour's cost
                                cost[nx][ny] = newCost;

                                // Add the neighbour to the link lists
                                linkX[nx][ny] = lowestX;
                                linkY[nx][ny] = lowestY;
                            }
                        }
                    }
                }
            }
        }

        // Find the final path from start to end using the link lists
        let nextClosedX = endPos[0];
        let nextClosedY = endPos[1];
        while (!done) {
            // Find this cell's classes
            let thisClass = grid.rows[nextClosedX].cells[nextClosedY].classList;
            
            // If this cell is not the start or end, set its class to 'path'
            if (!thisClass.contains('start') && !thisClass.contains('end'))
                grid.rows[nextClosedX].cells[nextClosedY].classList = 'path';

            // Find the next cell to check
            let tmpX = nextClosedX;
            let tmpY = nextClosedY;
            nextClosedX = linkX[tmpX][tmpY];
            nextClosedY = linkY[tmpX][tmpY];
            pathCount.innerHTML++;

            // Once the end of the list is reached, stop the loop
            done = ((nextClosedX == -1) && (nextClosedY == -1));
        }
    }
}