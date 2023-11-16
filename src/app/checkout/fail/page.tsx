import React from 'react'
import { useRouter } from "next/router";
import Link from 'next/link';

function page() {
    const { query } = useRouter();

    return (
        <main>
            <div className="result wrapper">
                <div className="box_section">
                    <h2 style={{ padding: "20px 0px 10px 0px" }}>
                        <img
                            width="30px"
                            src="https://static.toss.im/3d-emojis/u1F6A8-apng.png"
                        />
                        결제 실패
                    </h2>
                    <p>code = {query.code ?? "UNKNOWN_ERROR"}</p>
                    <p>message = {query.message ?? "알 수 없음"}</p>
                </div>
            </div>
        </main>
    )
}

export default page