'use client'
import Label from "@/components/Label/Label";
import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { useSession } from "next-auth/react";

function ChangePassword() {
    const session = useSession();
    const [userPass, setUserPass] = React.useState({
        currentPass: "",
        newPass: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setUserPass({
            ...userPass,
            [name]: value,
        });
    };

    const handleChangePasswordFetch = async () => {
        const res = await fetch(`${process.env.BASE_API_URL}/api/v1/user/password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.data?.user.token}`,
            },
            body: JSON.stringify({
                currentPass: userPass.currentPass,
                newPass: userPass.newPass,
            }),
        });

        const data = await res.json();
        if (data.code === 200) {
            alert("비밀번호가 변경되었습니다.");
        }
    }
    return (
        <div className="space-y-10 sm:space-y-12">
            <h2 className="text-2xl sm:text-3xl font-semibold">
                비밀번호 변경
            </h2>
            <div className=" max-w-xl space-y-6">
                <div>
                    <Label>현재 비밀번호</Label>
                    <Input
                        type="password"
                        className="mt-1.5"
                        onChange={handleChange}
                        name="currentPass"
                    />
                </div>
                <div>
                    <Label>새로운 비밀번호</Label>
                    <Input
                        type="password"
                        className="mt-1.5"
                        onChange={handleChange}
                        name="newPass"
                    />
                </div>
                <div>
                    <Label>비밀번호 확인</Label>
                    <Input
                        type="password"
                        className="mt-1.5"
                    />
                </div>
                <div className="pt-2">
                    <ButtonPrimary onClick={handleChangePasswordFetch}>비밀번호 변경</ButtonPrimary>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword