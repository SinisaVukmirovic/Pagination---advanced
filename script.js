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
    },
    {
        "name": "Larry",
        "surname": "Bird",
        "rank": "17",
    },
    {
        "name": "Mario",
        "surname": "Super",
        "rank": "18",
    },
    {
        "name": "Joe",
        "surname": "Smith",
        "rank": "19",
    },
    {
        "name": "Jane",
        "surname": "Doe",
        "rank": "20",
    },
    {
        "name": "Marry",
        "surname": "Mit",
        "rank": "21",
    },
    {
        "name": "Joe",
        "surname": "Smith",
        "rank": "22",
    },
    {
        "name": "Jane",
        "surname": "Doe",
        "rank": "23",
    },
    {
        "name": "Jane",
        "surname": "Doe",
        "rank": "24",
    },
    {
        "name": "Marry",
        "surname": "Mit",
        "rank": "25",
    },
    {
        "name": "Tom",
        "surname": "Sowyer",
        "rank": "26",
    },
    {
        "name": "Larry",
        "surname": "Bird",
        "rank": "27",
    },
    {
        "name": "Mario",
        "surname": "Super",
        "rank": "28",
    },
    {
        "name": "Joe",
        "surname": "Smith",
        "rank": "29",
    },
    {
        "name": "Jane",
        "surname": "Doe",
        "rank": "30",
    },
    {
        "name": "Marry",
        "surname": "Mit",
        "rank": "31",
    },
    {
        "name": "Joe",
        "surname": "Smith",
        "rank": "32",
    },
    {
        "name": "Mario",
        "surname": "Super",
        "rank": "33",
    },
    {
        "name": "Jane",
        "surname": "Doe",
        "rank": "34",
    },
    {
        "name": "Marry",
        "surname": "Mit",
        "rank": "35",
    },
    {
        "name": "Tom",
        "surname": "Sowyer",
        "rank": "36",
    },
    {
        "name": "Larry",
        "surname": "Bird",
        "rank": "37",
    },
];

let state = {
    'querySet': tableData,
    'currPage': 1,
    'rows': 3,
    'window': 4
    // window is similar to rows, it limits how many page buttons will be displayed
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

function pageNumbs(pages) {
    let pageNumbsElem = document.querySelector('#page-numbs');
    pageNumbsElem.innerHTML = '';

    let maxLeft = (state.currPage - Math.floor(state.window / 2));
    // let maxRight = (state.currPage + Math.floor(state.window / 2));
    let maxRight = (state.currPage + Math.floor(state.window / 2));

    if (maxLeft < 1) {
        maxLeft = 1;
        maxRight = state.window;
    }
    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1);
        maxRight = pages;

        if (maxLeft < 1) {
            maxLeft = 1;
        }
    }

    // for (let page = 1; page <= pages; page++) {
    //     pageNumbsElem.innerHTML += `
    //         <button class="page" value="${page}">${page}</button>
    //     `;
    // }

    for (let page = maxLeft; page <= maxRight; page++) {
        pageNumbsElem.innerHTML += `
            <button class="page" value="${page}">${page}</button>
        `;
    }

    if (state.currPage != 1) {
        pageNumbsElem.innerHTML = `
            <button class="page" value="1">&#171 First</button> 
        `
        + pageNumbsElem.innerHTML;
    }

    if (state.currPage != pages) {
        pageNumbsElem.innerHTML += `
            <button class="page" value="${pages}">Last &#187</button>
        `;
    }

    let btns = document.querySelectorAll('.page');

    btns.forEach(btn => btn.addEventListener('click', function() {
        document.querySelector('#table-body').innerHTML = '';

        state.currPage = Number(this.value);

        buildTable();
    }));
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

    pageNumbs(data.pages);
}