import React, { useEffect, useState } from "react";
import { json } from "react-router-dom";

export const Profile = (props) => {
    const [user, setUser] = useState([]);
    const [userLoaded, setUserLoaded] = useState(false);

    const fetchUser = async () => {
        let jwt_token = localStorage.getItem('access_token');
        try {
            let response = await fetch("/current/user", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + jwt_token
                }
            });

            let jsonResponse = await response.json();
            return { success: true, data: jsonResponse };
        } catch (error) {
            console.log(error);
            return { success: false };
        }
    }

    useEffect(() => {
        (async () => {
            setUserLoaded(false);
            let res = await fetchUser();
            if (res.success) {
                setUser(res.data);
                setUserLoaded(true);
            }
        })();
    }, []);

    return (
        <div className="flex flex-col w-full p-2 text-white">
            <div className="flex-auto text-3xl bg-black rounded-md w-full p-2">
                Profile
            </div>
            {userLoaded ?
                <div className="flex flex-row flex-wrap p-2 space-x-2 ">
                    <img className="rounded-md" src={user.profile_picture} alt="pic" width="250px" height="250px"></img>
                    <div id="profile-info" className="flex flex-col space-y-3">
                        <div className="flex flex-wrap">
                            <div className="flex-none w-32">First Name</div>
                            <div>{user.first_name}</div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="flex-none w-32">Last Name</div>
                            <div>{user.last_name}</div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="flex-none w-32">Email</div>
                            <div>{user.email}</div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="flex-none w-32">Phone</div>
                            <div>{user.phone}</div>
                        </div>
                        <div className="flex flex-wrap">
                            <div className="flex-none w-32">Company</div>
                            <div>{user.company}</div>
                        </div>
                    </div>
                </div>
                :
                <div>User not found</div>}

            <div>Friend Rrequest</div>
        </div>
    )
}