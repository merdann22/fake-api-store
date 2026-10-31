import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { getCurrentUser } from "../../services/api";
import "./Profile.scss";

export default function Profile() {

    const {token} = useAuth();
    console.log(token);

    useEffect(() => {
        getCurrentUser(token).then((data) => console.log(data));
    }, [token]);

    return (
        <section>
            <h1>Profile</h1>
        </section>
    )
}