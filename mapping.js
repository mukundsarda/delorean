class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }
    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            if (element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }
    dequeue() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }
    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}

class WGraph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({ node: vertex2, weight });
        this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }
    display() {
        for (let vertex in this.adjacencyList) {
            console.log(vertex, " -> ", [...this.adjacencyList[vertex]]);
        }
    }
    Dijkstra(start, finish) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let path = [];
        let smallest;

        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }

        while (nodes.values.length) {
            smallest = nodes.dequeue().val;
            if (smallest === finish) {

                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {

                    let nextNode = this.adjacencyList[smallest][neighbor];

                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;
                    if (candidate < distances[nextNeighbor]) {

                        distances[nextNeighbor] = candidate;

                        previous[nextNeighbor] = smallest;

                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        return path.concat(smallest).reverse();
    }
}

//Cresting an object of Graph Class
const graph = new WGraph();

// Adding Nodes for Ground Floor
let ground = [11,12,13,14,15,16,17,18,19,20, 21, 22, 23, 24, 25, 26, 27,28,29,30,31,32,33,34,35,36,37,38,39];

let room = [
    'G1', 'G2', 'G3', 'G4', 'G5', 'G6',
    'G7', 'G8', 'G9', 'LT-1', 'LT-2', 'LT-3', 'PRINT-SHOP','UNIFORM-SHOP','HSS-DEPARTMENT','LANGUAGE-LAB','HOUSE-KEEPING','WASHROOM-G1',
    'WASHROOM-LT3','WASHROOM-LT2','WASHROOM-LT1','WASHROOM-LL','RECEPTION','STAIRS-G6','STAIRS-PS','STAIRS-LT2','STAIRS-R','ENG-DEPT','GROUND',
    //FIRST FLOOR
    'FF1', 'FF2', 'FF3', 'FF4', 'FF5', 'FF6',
    'FF7', 'FF8', 'FF9', 'BIOTECH-LAB-1', 'BIOTECH-LAB-2','BIOTECH-DEPARTMENT-1', 'TELEPHONE-EXCHANGE', 'MATHS-DEPARTMENT-1', 'ELECTRICAL-AND-MACHINE', 'TECHNOLOGY-SOLUTION-FOR-SOIL-AND-WATER','WASHROOM-BD','WASHROOM-MF','WASHROOM-BT1','WASHROOM-BT2','WASHROOM-BT3','WASHROOM-BT4','STAIRS-S1','STAIRS-S2','STAIRS-S3','STAIRS-S4','STAIRS-S5','STAIRS-S6',
    //SECOND FLOOR
    'TS1', 'TS2', 'TS3', 'TS4',
    'TS5', 'TS6', 'TS7', 'TS8', 'TS9', 'TS10', 'TS11', 'TS12', 'CS-1', 'CS-2', 'CS-3',
    'CS-4', 'PHYSICS-LAB', 'EDGER_F_CODD_HALL', 'PHD', 'WASHROOM-2', 'HSS-DEPARTMENT-2', 'COMMUNCATION-LAB', 'TNP-DEPARTMENT', 'SAMADHAN-SAMBHAG', 'WASHROOM-TS2','WASHROOM-TP','WASHROOM-H','WASHROOM-P1','WASHROOM-P2','WASHROOM-PL1','WASHROOM-PL2','WASHROOM-W','STAIR-F1','STAIR-F2','STAIR-F3'
];

let roomObj = {
    //GROUND-FLOOR
    'G1':11, 'G2':12, 'G3':13, 'G4':14, 'G5':15, 'G6':16,
    'G7':17, 'G8':18, 'G9':19, 'LT-1':20, 'LT-2':21, 'LT-3':22, 'PRINT-SHOP':23,'UNIFORM-SHOP':24,'HSS-DEPARTMENT':25,'LANGUAGE-LAB':26,'HOUSE-KEEPING':27,'WASHROOM-G1':28,
    'WASHROOM-LT3':29,'WASHROOM-LT2':30,'WASHROOM-LT1':31,'WASHROOM-LL':32,'RECEPTION':33,'STAIRS-G6':34,'STAIRS-PS':35,'STAIRS-LT2':36,'STAIRS-R':37,'ENG-DEPT':38,'GROUND':39,
    //FIRST FLOOR
    'FF1':101, 'FF2':102, 'FF3':103, 'FF4':104, 'FF5':105, 'FF6':106,
    'FF7':107, 'FF8':108, 'FF9':109, 'BIOTECH-LAB-1':110, 'BIOTECH-LAB-2':112, 'WASHROOM':113, 'BIOTECH-DEPARTMENT-1':114, 'TELEPHONE-EXCHANGE':115, 'MATHS-DEPARTMENT-1':116, 'ELECTRICAL-AND-MACHINE':117, 'TECHNOLOGY-SOLUTION-FOR-SOIL-AND-WATER':118,'WASHROOM-BD':119,'WASHROOM-MF':120,'WASHROOM-BT1':121,'WASHROOM-BT2':122,'WASHROOM-BT3':123,'WASHROOM-BT4':124,'STAIRS-S1':125,'STAIRS-S2':126,'STAIRS-S3':127,'STAIRS-S4':128,'STAIRS-S5':129,'STAIRS-S6':130,
    //SECOND FLOOR
    'TS1':201, 'TS2':202,
    'TS5':205, 'TS6':206, 'TS7':207, 'TS8':208, 'TS9':209, 'TS10':210, 'TS11':211, 'TS12':212, 'CS-1':213, 'CS-2':214, 'CS-3':215,
    'CS-4':216, 'PHYSICS-LAB':217, 'EDGER_F_CODD_HALL':218, 'PHD':219, 'WASHROOM-TS2':220, 'HSS-DEPARTMENT-2':221, 'COMMUNCATION-LAB':222, 'TNP-DEPARTMENT':223, 'SAMADHAN-SAMBHAG':224,'WASHROOM-TP':225,'WASHROOM-H':226,'WASHROOM-P1':227,'WASHROOM-P2':228,'WASHROOM-PL1':229,'WASHROOM-PL2':230,'WASHROOM-W':231,'STAIR-F1':232,'STAIR-F2':233,'STAIR-F3':234,
}


let groundObj = {
    11:'G1', 12:'G2', 13:'G3', 14:'G4', 15:'G5', 16:'G6',
    17:'G7', 18:'G8', 19:'G9', 20:'LT-1', 21:'LT-2', 22:'LT-3', 23:'PRINT-SHOP',24:'UNIFORM-SHOP',25:'HSS-DEPARTMENT',26:'LANGUAGE-LAB',27:'HOUSE-KEEPING',28:'WASHROOM-G1',
    29:'WASHROOM-LT3',30:'WASHROOM-LT2',31:'WASHROOM-LT1',32:'WASHROOM-LL',33:'RECEPTION',34:'STAIRS-G6',35:'STAIRS-PS',36:'STAIRS-LT2',37:'STAIRS-R',38:'ENG-DEPT',39:'GROUND',
    //FIRST FLOOR
    101:'FF1', 102:'FF2', 103:'FF3', 104:'FF4', 105:'FF5', 106:'FF6',
    107:'FF7', 108:'FF8', 109:'FF9', 110:'BIOTECH-LAB-1', 112:'BIOTECH-LAB-2',114:'BIOTECH-DEPARTMENT-1', 115:'TELEPHONE-EXCHANGE', 116:'MATHS-DEPARTMENT-1', 117:'ELECTRICAL-AND-MACHINE', 118:'TECHNOLOGY-SOLUTION-FOR-SOIL-AND-WATER',119:'WASHROOM-BD',120:'WASHROOM-MF',121:'WASHROOM-BT1',122:'WASHROOM-BT2',123:'WASHROOM-BT3',124:'WASHROOM-BT4',125:'STAIRS-S1',126:'STAIRS-S2',127:'STAIRS-S3',128:'STAIRS-S4',129:'STAIRS-S5',130:'STAIRS-S6',
    //SECOND FLOOR
    201:'TS1', 202:'TS2', 203:'TS3', 204:'TS4',
    205:'TS5', 206:'TS6', 207:'TS7', 208:'TS8', 209:'TS9', 210:'TS10', 211:'TS11', 212:'TS12', 213:'CS-1', 214:'CS-2', 215:'CS-3',
    216:'CS-4', 217:'PHYSICS-LAB', 218:'EDGER_F_CODD_HALL', 219:'PHD',220:'WASHROOM-TS2', 221:'HSS-DEPARTMENT-2', 222:'COMMUNCATION-LAB', 223:'TNP-DEPARTMENT', 224:'SAMADHAN-SAMBHAG', 225:'WASHROOM-TP',226:'WASHROOM-H',227:'WASHROOM-P1',228:'WASHROOM-P2',229:'WASHROOM-PL1',230:'WASHROOM-PL2',231:'WASHROOM-W', 232:'STAIR-F1',233:'STAIR-F2',234:'STAIR-F3'
}

for (let i = 0; i < ground.length; i++) {
    graph.addVertex(ground[i]);
}

//Adding edges for Ground Floor
graph.addEdge("19", "18", 1);
graph.addEdge("18", "17", 1);
graph.addEdge("17", "16", 2);
graph.addEdge("16", "15", 1);
graph.addEdge("15", "14", 1);
graph.addEdge("14", "13", 2);
graph.addEdge("13", "12", 1);
graph.addEdge("12", "11", 1);
graph.addEdge("11", "28", 1);
graph.addEdge("19", "38", 1);
graph.addEdge("23", "38", 1);
graph.addEdge("23", "24", 1);
graph.addEdge("24", "25", 1);
graph.addEdge("25", "29", 1);
graph.addEdge("29", "22", 1);
graph.addEdge("22", "25", 1);
graph.addEdge("22", "21", 2);
graph.addEdge("21", "30", 1);
graph.addEdge("30", "31", 1);
graph.addEdge("31", "20", 1);
graph.addEdge("21", "20", 2);
graph.addEdge("20", "32", 1);
graph.addEdge("26", "32", 1);
graph.addEdge("26", "21", 1);
graph.addEdge("26", "33", 2);
graph.addEdge("28", "33", 2);
graph.addEdge("16", "27", 1);
graph.addEdge("22", "23", 1);

graph.addEdge("34", "16", 1);
graph.addEdge("35", "23", 1);
graph.addEdge("36", "21", 1);
graph.addEdge("37", "26", 1);




//Adding Nodes for First Floor
let first = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 112,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130];

for (let i = 0; i < first.length; i++) {
    graph.addVertex(first[i]);
}

//Adding edges for First Floor

graph.addEdge("101", "102", 1);
graph.addEdge("102", "103", 1);
graph.addEdge("103", "104", 1);
graph.addEdge("104", "105", 1);
graph.addEdge("105", "106", 1);
graph.addEdge("106", "107", 1);
graph.addEdge("107", "108", 1);
graph.addEdge("108", "109", 1);
graph.addEdge("109", "117", 1);
graph.addEdge("117", "118", 1);
graph.addEdge("118", "124", 1);
graph.addEdge("124", "123", 1);
graph.addEdge("123", "112", 1);
graph.addEdge("112", "122", 1);
graph.addEdge("122", "121", 1);
graph.addEdge("121", "110", 1);
graph.addEdge("110", "119", 1);
graph.addEdge("119", "114", 1);
graph.addEdge("114", "115", 1);
graph.addEdge("115", "116", 1);
graph.addEdge("125", "117", 1);
graph.addEdge("126", "107", 1);
graph.addEdge("127", "104", 1);
graph.addEdge("128", "101", 1);
graph.addEdge("129", "116", 1);
graph.addEdge("130", "115", 1);



//Adding nodes for Second Floor
let second = [201, 202, 203, 204, 205, 206, 207, 208, 209, 210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234]

for (let i = 0; i < second.length; i++) {
    graph.addVertex(second[i]);
}

//Adding Edges For Second Floor
graph.addEdge("201", "202", 1);
graph.addEdge("202", "213", 1);
graph.addEdge("213", "214", 1);
graph.addEdge("214", "205", 1);
graph.addEdge("205", "206", 1);
graph.addEdge("206", "215", 1);
graph.addEdge("215", "207", 1);
graph.addEdge("207", "208", 1);
graph.addEdge("208", "209", 1);
graph.addEdge("209", "210", 1);
graph.addEdge("210", "216", 1);
graph.addEdge("216", "211", 1);
graph.addEdge("211", "212", 1);
graph.addEdge("212", "222", 1);
graph.addEdge("222", "221", 1);
graph.addEdge("221", "231", 1);
graph.addEdge("231", "229", 1);
graph.addEdge("229", "217", 1);
graph.addEdge("217", "230", 1);
graph.addEdge("230", "219", 1);
graph.addEdge("219", "228", 1);
graph.addEdge("228", "226", 1);
graph.addEdge("226", "218", 1);
graph.addEdge("218", "225", 1);
graph.addEdge("225", "223", 1);
graph.addEdge("223", "224", 1);
graph.addEdge("223", "224", 1);
graph.addEdge("224", "220", 1);

graph.addEdge("35", "125", 1);
graph.addEdge("34", "126", 1);
graph.addEdge("36", "127", 1);
graph.addEdge("37", "129", 1);
graph.addEdge("129", "232", 1);
graph.addEdge("127", "233", 1);
graph.addEdge("126", "234", 1);





let result = document.getElementById('searchBtn');
result.addEventListener('click', showPath);
let path;

function findclass(){
    let list = document.getElementById('myUL');
    let cls=document.getElementById('cls');
    displayclass(cls.value.toUpperCase());
    cls.value = '';
    list.classList.add('none')
}

function displayclass(value) {
    let a;
    let classContainer = document.getElementById('displayClass');
    classContainer.classList.remove('none');
    let classElement = document.createElement('div');
    for (let i = 0; i < room.length; i++) {
        if (room[i] == value) {
            a = getobj(roomObj[room[i]]);
            break;
        }
    }
    console.log(a);
    if (a == undefined) {
        classElement.innerText = 'Invalid Classroom';
    } else {
        classElement.innerText = a;
    }
    classElement.className = 'classElement';
    classContainer.append(classElement);
}

function showPath() {
    let start = document.getElementById('start').value;
    let end = document.getElementById('end').value;
    if (start == '' || end == '') {
        alert('Invalid Classroom');
        return;
    }
    path = graph.Dijkstra(start, end);
    console.log(path);
    let home = document.querySelector('.mainPage');
    let display = document.querySelector('.display');
    home.classList.add('none');
    displayPath(path);
    display.classList.remove('none');
}


function getobj(p) {
    let a = '';
    let j = 0;
    for (let i = 0; i < room.length; i++) {
        if (roomObj[room[i]] == p) {
            if (j == 0) {
                a = a.concat(room[i]);
                j++;
            } else {
                a = a.concat('/');
                a = a.concat(room[i]);
                j++;
            }
        }
    }
    console.log(a);
    return a;
}

function displayPath(path) {
    let pathContainer = document.getElementById('path');
    for (let i = 0; i < path.length; i++) {
        let pathElement = document.createElement('div');
        let a = getobj(path[i]);
        pathElement.innerText = (i != path.length - 1) ? `${a}    →` : a;
        pathElement.className = 'pathElement';
        pathContainer?.append(pathElement);
    }

}

function goBack() {
    window.location.reload();
}

function showOnMap(type = 'close') {
    let mapg = document.getElementById('ground');
    let mapf = document.getElementById('firstFloor');
    let maps = document.getElementById('SecondFloor');

    if (type == 'open') {

        mapg.classList.remove('none');
        mapf.classList.remove('none');
        maps.classList.remove('none');

        for (let i = 0; i < path.length; i++) {
            let room = document.getElementById(`${groundObj[path[i]]}`);
            if (i == 0 || i == path.length - 1) {
                room.style.background = 'turquoise';
                room.style.color = 'white';
            } else {
                room.style.background = 'greenyellow';
                room.style.color = 'black';
            }
        }

    } else {
        mapg.classList.add('none');
        mapf.classList.add('none');
        maps.classList.add('none');
    }

}