import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import Styles from "../../styles/pages/workshop/Id.module.scss"
import Router from "next/router";

const Workshops = () => {
    const [user, setUser] = useState();
    const [workshops, setWorkshops] = useState([]);

    const getUserWorkshops = async () => {
        const userRes = await fetch(`/api/user/${localStorage.userId}`);
        const userData = await userRes.json();
        setUser(userData);
        console.log(userData)

        const workshopRes = await fetch('api/workshop');
        const workshopsData = await workshopRes.json();

        if (userData.isInstructor) {
            setWorkshops(workshopsData);
        } else {
            workshopsData.map((workshop, idx) => {
                if (workshop.users.length && workshop.users[idx] === user) {
                    setWorkshops(workshops => [...workshops, workshop]);
                }
            });
        }
    };

    const addNew = () => {
        Router.push('workshop/new');
    };

    const viewWorkshop = workshopId => {
        localStorage.setItem('workshopId', workshopId);
        Router.push('workshop/[wid]/prompt', `workshop/${workshopId}/prompt`);
    };

    useEffect(() => {
        getUserWorkshops();
    }, []);

    return (workshops.length
        ? <Layout>
            <div className={Styles.workshopsIndexContainer}>
                <header>
                    <h1 className={Styles.h1}>Workshops</h1>
                    {user.isInstructor ? <button onClick={() => addNew()} className={Styles.addButton}>+</button> : ''}
                </header>

                <main>
                    {workshops.map((workshop, idx) => (
                        <div onClick={() => viewWorkshop(workshop.id)} className={Styles.workshopButton} key={idx}>
                            <h3>{workshop.name}</h3>
                        </div>
                    ))}
                </main>
            </div>
        </Layout>
        : <Loading />
    );
};

export default Workshops;