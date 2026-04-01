/*let userName = null;
let password = null;
let database = null;

// SHOW POPUP WHEN PAGE LOADS
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dbModal").style.display = "flex";

    const form = document.getElementById("dbForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); 

        const dbCredentials = Object.fromEntries(new FormData(form));

        console.log("Credentials:", dbCredentials);

        
        try {
            const res = await fetch("http://localhost:3000/api/connect-db", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dbCredentials)
            });

            const data = await res.json();
            console.log("Backend response:", data);

            if (data.success) {
                document.getElementById("dbModal").style.display = "none";
            } else {
                alert("DB connection failed");
            }

        } catch (err) {
            console.error(err);
            alert("Server error");
        }
            
    });
});



function checkTable(){

}

function addSupplier(){

}

function calculateExpenses(){

}

function budgetProjection(){

}