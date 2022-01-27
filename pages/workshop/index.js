import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loading from "../../components/Loading";
import Styles from "../../styles/pages/workshop/Id.module.scss"

const Workshops = () => {
    const [workshops, setWorkshops] = useState([]);

    const getWorkshops = async () => {
        const res = await fetch('api/workshop');
        const workshopsData = await res.json();
        workshopsData.reverse();
        setWorkshops(workshopsData);
    };

    useEffect(() => {
        getWorkshops();
    }, []);

    return workshops ? (
        <Layout>
            <div className={Styles.workshopsIndexContainer}>
                <h1 className={Styles.h1}>Workshops</h1>
                <main>
                    {workshops.map(workshop => (
                        <>
                            <p>date</p>
                            <div>
                                workshops component placeholder
                            </div>
                        </>
                    ))}
                </main>
            </div>
        </Layout>
    ) : (
        <Loading />
    )
};

export default Workshops;