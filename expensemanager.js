function check(event) {
    event.preventDefault();
    addExpense();
    document.mainform.reset();
}

let date = document.getElementById('date');
let amount = document.getElementById('amount');
let description = document.getElementById('description');
let type = document.getElementById('type');
let table=document.getElementById('tabletag');
let records = [];
let color_class;

if(localStorage.getItem('records')) {
    records=JSON.parse(localStorage.getItem('records'));
    updateTable();
}

function updateTable() {
    table.innerHTML=`<tr> 
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Action</th>
                    </tr>`
    records.forEach((record,index) => {
        let colorstofill = record.color_class;
        table.innerHTML += `<tr>
                            <td class="${colorstofill}">${record.types}</td>
                            <td class="${colorstofill}">${record.amounts}</td>
                            <td class="${colorstofill}">${record.dates}</td>
                            <td class="${colorstofill}">${record.descriptions}</td>
                            <td class="${colorstofill}"><button onclick="deleteExpense(${index})" class="deleteButton">Remove</button></td>
                            </tr>`
    })
}

function updateStorage() {
    localStorage.setItem('records', JSON.stringify(records));
}

function addExpense(types, amounts, dates, descriptions) {
    dates=date.value;
    types=type.value;
    descriptions=description.value;
    amounts=amount.value;
    switch(types) {
        case 'Clothing':
            color_class='Clothing';
            break;
        case 'Travelling':
            color_class='Travelling';
            break;
        case 'Food':
            color_class='Food';
            break;
        case 'Family':
            color_class='Family';
            break;
        case 'Education':
            color_class='Education';
            break;
        case 'Bills':
            color_class='Bills';
            break;
        case 'Others':
            color_class='Others';
            break;
    }
    records.push({types,amounts,dates,descriptions,color_class})
    updateStorage();
    updateTable();
}

function deleteExpense(index) {
    records.splice(index,1);
    updateStorage();
    updateTable();
}