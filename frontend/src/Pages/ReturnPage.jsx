import React, { useCallback, useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const ReturnPage = () => {
    const [status, setStatus] = useState(null);
    const [customerEmail, setCustomerEmail] = useState("");
    const baseurl = import.meta.env.VITE_API_URL;
    const [searchParams] = useSearchParams();

    useEffect(() => {
        // const params = new URLSearchParams(window.location.search);
        // const sessionId = params.get("session_id");
        const sessionId = searchParams.get("session_id");
        console.log("Session ID from URL:", sessionId);
        if (!sessionId) return;
        fetch(`${baseurl}/session-status?session_id=${sessionId}`)
            .then((res) => res.json())
            .then((data) => {
                setStatus(data.status);
                setCustomerEmail(data.customer_email);
            });
    }, [searchParams]);

    if (status === "open") {
        return <Navigate to="/checkout" />;
    }

    if (status === "complete") {
        return (
            <section id="success">
                <p>
                    We appreciate your business! A confirmation email will be
                    sent to {customerEmail}. If you have any questions, please
                    email{" "}
                    <a href="mailto:orders@example.com">orders@example.com</a>.
                </p>
            </section>
        );
    }

    return null;
};

export default ReturnPage;
