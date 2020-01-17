let heroesData = [];

let state = {
    'querySet': heroesData,
    'currPage': 1,
    'rows': 10,
    'window': 5
    // window is similar to rows, it limits how many page buttons will be displayed
}

function fetchHeroNames() {
    dotaHeroes().then(results => {
        results.forEach(res => {
            heroesData.push({
                "id": res.id,
                "name": res.localized_name,
                "primary": res.primary_attr,
                "attack": res.attack_type,
                "role": res.roles
            });
        });
        // console.log(results);
        console.log(heroesData);

        buildTable();
    })
    .catch(err => {
        console.log(err);
    });
}

async function dotaHeroes() {
    let apiUrl = 'https://api.opendota.com/api/heroes';

    let response = await fetch(apiUrl);
    let data = await response.json();

    return data;
}

fetchHeroNames();



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
    heroList = data.querySet;

    heroList.forEach(hero => {
        let row = `<tr>
                       <td>${hero.id}</td>
                       <td>${hero.name}</td>
                       <td>${hero.primary}</td>
                       <td>${hero.attack}</td>
                       <td>${hero.role}</td>
                   </tr>`;

        tableBody.innerHTML += row;
    });

    pageNumbs(data.pages);
}