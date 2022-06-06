
    const datas={
        githubId:'',
        emailId:'',
        contact:'',
        user_name:''
    }
    async function getName(){
        try {
            const response = await fetch("http://localhost:5000/dashboard/",{
                method:"GET",
                headers:
                {
                    token:localStorage.token
                }
            });
            const parseRes = await response.json();
            console.log(parseRes);
            datas.user_name = parseRes.user_name;
            datas.emailId   = parseRes.user_email;
            datas.githubId  = parseRes.githubid;
            datas.contact   = parseRes.phone;
            
        } catch (error) {
            console.error(error.message);
        }
    }
    getName();

export {datas};
