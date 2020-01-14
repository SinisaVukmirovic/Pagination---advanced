let tableData = [
    {
        "name": "Joe",
        "surname": "Smith",
        "rank": "1",
    },
    {
        "name": "Jane",
        "surname": "Doe",
        "rank": "2",
    },
    {
        "name": "Marry",
        "surname": "Mit",
        "rank": "3",
    },
    {
        "name": "Tom",
        "surname": "Sowyer",
        "rank": "4",
    },
    {
        "name": "Larry",
        "surname": "Bird",
        "rank": "5",
    },
    {
        "name": "Mario",
        "surname": "Super",
        "rank": "6",
    },
    {
        "name": "Joe",
        "surname": "Smith",
        "rank": "7",
    },
    {
        "name": "Jane",
        "surname": "Doe",
        "rank": "8",
    },
    {
        "name": "Marry",
        "surname": "Mit",
        "rank": "9",
    },
    {
        "name": "Joe",
        "surname": "Smith",
        "rank": "10",
    },
    {
        "name": "Mario",
        "surname": "Super",
        "rank": "11",
    },
    {
        "name": "Jane",
        "surname": "Doe",
        "rank": "12",
    },
    {
        "name": "Marry",
        "surname": "Mit",
        "rank": "13",
    },
    {
        "name": "Tom",
        "surname": "Sowyer",
        "rank": "14",
    },
    {
        "name": "Larry",
        "surname": "Bird",
        "rank": "15",
    },
    {
        "name": "Mario",
        "surname": "Super",
        "rank": "16",
    }
];

let state = {
    'querySet': tableData,
    'currPage': 1,
    'rows': 5
}

buildTable();

// function that grabs our data set, trims it down and return that limited query set along with how many pages we have
function pagination(querySet, page, rows) {
    let trimStart = (page - 1) * rows;
    let trimEnd = trimStart + rows;

    let trimmedData = querySet.slice(trimStart, trimEnd);

    // figuring out how many pages our data set will have
    let pages = Math.ceil(querySet.length / rows);

    return {
        'querySet': trimmedData,
        'pages': pages
    }
}

function buildTable() {    
    let tableBody = document.querySelector('#table-body');

    let data = pagination(state.querySet, state.currPage, state.rows);
    console.log('Data:', data);

    // myList = state.querySet;
    myList = data.querySet;

    myList.forEach(item => {
        let row = `<tr>
            <td>${item.rank}</td>
            <td>${item.name}</td>
            <td>${item.surname}</td>
        </tr>`;

        tableBody.innerHTML += row;
    });
}