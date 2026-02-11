"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import styles from "./menu.module.css";

export default function MenuPage() {
    const { restaurantId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!restaurantId) return;

        setLoading(true);

        const unsub = onSnapshot(
            doc(db, "restaurants", restaurantId),
            (doc) => {
                if (doc.exists()) {
                    setData(doc.data());
                    setError(null);
                } else {
                    setError("Restaurant not found");
                    setData(null);
                }
                setLoading(false);
            },
            (err) => {
                console.error("Error fetching menu:", err);
                setError("Failed to load menu");
                setLoading(false);
            }
        );

        return () => unsub();
    }, [restaurantId]);

    if (loading) return <div className={styles.center}>Loading menu...</div>;
    if (error) return <div className={styles.center}>{error}</div>;
    if (!data) return null;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>{data.name}</h1>
            </header>

            <main className={styles.menu}>
                {data.categories?.map((category) => (
                    category.products?.length > 0 && (
                        <section key={category.id} className={styles.category}>
                            <h2 className={styles.categoryTitle}>{category.name}</h2>
                            <div className={styles.products}>
                                {category.products.map((product) => (
                                    <div key={product.id} className={styles.productCard}>
                                        {product.image && (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className={styles.productImage}
                                                onError={(e) => {
                                                    e.target.style.display = 'none'; // Fallback logic could be better
                                                }}
                                            />
                                        )}
                                        <div className={styles.productInfo}>
                                            <div className={styles.productHeader}>
                                                <h3 className={styles.productName}>{product.name}</h3>
                                                <span className={styles.price}>{data.currency}{product.price}</span>
                                            </div>
                                            {product.description && (
                                                <p className={styles.description}>{product.description}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )
                ))}
            </main>
        </div>
    );
}
