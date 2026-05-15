import React, { useState } from "react";
import { Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import DetailField from "@/components/app/DetailField";
import { motion, AnimatePresence } from "framer-motion";
import { SelectSeparator } from "@/components/ui/select";
import { AuthUser } from "@/shared/interface/sliceInterface";
import { defaultButtonClassName } from "@/shared/utils/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UpdateUserInfoForm from "@/components/form/CommonForms/UpdateUserInfoForm";

interface UserInfoProps {
    authUser: AuthUser;
}

const UserInfo: React.FC<UserInfoProps> = ({
    authUser
}) => {

    const [showForm, setShowForm] = useState<boolean>(false);

    return (
        <>
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="">User Info</CardTitle>
                    <Button
                        title="Update Password"
                        variant={showForm ? "destructive" : "default"}
                        className={defaultButtonClassName}
                        onClick={(e) => {
                            e.preventDefault();
                            setShowForm(!showForm);
                        }}
                    >{showForm ? "Cancel" : "Update"}
                    </Button>
                </CardHeader>
                <SelectSeparator />
                <CardContent className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <DetailField label="Username" value={authUser?.username} Icon={User} />
                        <DetailField label="Phone" value={authUser?.phone} Icon={Phone} />
                    </div>
                </CardContent>
                <AnimatePresence initial={false}>
                    {showForm && (
                        <motion.div
                            key="password-form"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            style={{ overflow: "hidden" }}
                        >
                            <SelectSeparator />
                            <CardContent className="space-y-2 mt-4">
                                <UpdateUserInfoForm
                                    onClose={() => setShowForm(false)}
                                />
                            </CardContent>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </>
    )
}

export default UserInfo;