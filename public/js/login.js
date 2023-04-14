
const danger = document.getElementById('danger');
const form = document.getElementById("login-form");
const appLogin = document.getElementById('app-login');
const appAccount = document.getElementById('app-account');

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = form.elements.username.value;
    const password = form.elements.password.value;

    const data = {
        username,
        password,
    };

    fetch("/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.error != undefined) {
                danger.removeAttribute('hidden');
                console.log(data.error.toString());
            } else {
                fetch("/panel.html", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${data.token}`
                    }
                })
            }
        });
});

/*

fetch("/products", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${data.token}`,
                    }
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                    })

*/