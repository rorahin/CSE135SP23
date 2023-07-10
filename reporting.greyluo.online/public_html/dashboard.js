// create by rudy for HW4 part 0
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if(!token) {
      alert("You need to login in first")
      location.href = '../login.html';
    } else if(role==1){
        window.addEventListener('load', () => {

            if (role==1 && !document.getElementById('user-management')){
                var btn = document.createElement("button");

                // Set the button's id
                btn.id = 'user-management';

                // Set the button's text
                btn.innerHTML = 'User Management';

                // Append the button to the body of the HTML document
                document.body.appendChild(btn);



            }
        }

    )

    }
    /* else{
        console.log(token)
        fetch('/api/role',{
            headers: {
                'authorization': token
            }
        })
        .then(response => {
            if (response.status===401){
                alert("You need to login in first")
                location.href = '../login.html';
            }
            if (response.ok){
                return response.json()
            }

        })
        .then(data=>{
            const role = data.role;
            console.log(role)
            window.addEventListener('load', () => {

                if (role==1 && !document.getElementById('user-management')){
                    var btn = document.createElement("button");

                    // Set the button's id
                    btn.id = 'user-management';

                    // Set the button's text
                    btn.innerHTML = 'User Management';

                    // Append the button to the body of the HTML document
                    document.body.appendChild(btn);



                }
            }

        )
    })
}
 */