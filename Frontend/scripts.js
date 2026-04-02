//On inital load, prompt for DB information, save to current tab so that
//refreshing does not force another login
window.addEventListener("DOMContentLoaded", () => {


    const form = document.getElementById("table-display");
    if (form) {
        console.log("FORM FOUND", form);

        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            console.log("STEP 1: submit started");

            const table = Object.fromEntries(new FormData(form));

            // get session storage values properly
            const userInfo = {
                username: sessionStorage.getItem("username"),
                password: sessionStorage.getItem("password"),
                database: sessionStorage.getItem("database")
            };

            // combine everything into one payload
            const payload = {
                ...table,
                ...userInfo
            };

            try {
                console.log("STEP 3: before fetch");

                const res = await fetch("http://localhost:3000/api/getTable", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                });

                console.log("STEP 4: response received", res);

                const data = await res.json();
                console.log("STEP 5: JSON parsed", data);

            } catch (err) {
                console.error("🔥 ERROR CAUGHT:", err);
            }
        });
    }



    //Only prompt for credentials if we do not have them.
    if (sessionStorage.getItem('credentialsReceived') === 'true') {
        document.getElementById("dbModal").style.display = "none";
    } else {
        //Make the popup appear and get the form
        const dbModal = document.getElementById("dbModal");
        if (dbModal) {
            document.getElementById("dbModal").style.display = "flex";
            ////////
            const form = document.getElementById("dbForm");

            //Form event listener
            form.addEventListener("submit", async (e) => {
                e.preventDefault();

                const dbCredentials = Object.fromEntries(new FormData(form));
                const { username, password, database } = JSON.stringify(dbCredentials);

                try {
                    const res = await fetch("http://localhost:3000/api/connect-db", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(dbCredentials)
                    });

                    const data = await res.json();
                    console.log("Backend response:", data);

                    if (data.status === "success") {
                        document.getElementById("dbModal").style.display = "none";

                        //Set session storage to true so no relogging
                        sessionStorage.setItem('credentialsReceived', 'true');
                        sessionStorage.setItem('username', username);
                        sessionStorage.setItem('password', password);
                        sessionStorage.setItem('database', database);

                    } else {
                        alert("DB connection failed");
                    }

                } catch (err) {
                    console.error(err);
                    alert("Server error");
                }
            });
        }
    }


    if (display) {

        display.addEventListener("submit", async (e) => {
            console.log("event listener fired");
            e.preventDefault();

            const table = { table: new FormData(display).get("tableName") };

            try {
                const res = await fetch("http://localhost:3000/api/getTable", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(table)
                });

                const data = await res.json();

                if (data.status === "success") {

                    const tableData = data.data; // 👈 array of objects

                    const container = document.getElementById("table");
                    container.innerHTML = "";

                    container.appendChild(createTable(tableData));

                } else {
                    alert("DB connection failed");
                }

            } catch (err) {
                console.error(err);
                alert("Server error");
            }
        });
    }
});


//UNTESTED
function createTable(data) {
    console.log("create table called");
    const table = document.createElement("table");

    if (!data || data.length === 0) return table;

    // Get columns from first object
    const columns = Object.keys(data[0]);

    // HEADER ROW
    const headerRow = document.createElement("tr");

    columns.forEach(col => {
        const th = document.createElement("th");
        th.textContent = col;
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    // DATA ROWS
    data.forEach(rowObj => {
        const tr = document.createElement("tr");

        columns.forEach(col => {
            const td = document.createElement("td");
            td.textContent = rowObj[col];
            tr.appendChild(td);
        });

        table.appendChild(tr);
    });

    return table;
}


function addSupplier() {

}

function calculateExpenses() {

}

function budgetProjection() {

}

function addPhone() {
    const container = document.getElementById('extraPhones');

    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'phoneNumbers[]';
    input.placeholder = 'Additional phone';

    container.appendChild(input);
}