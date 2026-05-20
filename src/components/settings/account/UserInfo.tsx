import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import DataField from "@/components/app/DataField";
import { RootState } from "@/shared/redux/appStore";
import { motion, AnimatePresence } from "framer-motion";
import { SelectSeparator } from "@/components/ui/select";
import { Mail, Phone, ShieldUser, User } from "lucide-react";
import getBooleanStatusComponent from "@/components/app/GetBooleanStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { defaultButtonClassName, STATUS_PRESETS } from "@/shared/utils/constants";
import UpdateUserInfoForm from "@/components/form/CommonForms/UpdateUserInfoForm";

const UserInfo: React.FC = () => {

    const authUser = useSelector((store: RootState) => store.auth.authUser);
    const [showForm, setShowForm] = useState<boolean>(false);

    return (
        <>
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="">Profile Info</CardTitle>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DataField label="Username" value={authUser?.username} Icon={User} />
                        <DataField label="Phone" value={authUser?.phone} Icon={Phone} />
                        <DataField label="Email" value={authUser?.email} Icon={Mail} />
                        <DataField label="Account Status" value={getBooleanStatusComponent(authUser?.isBlocked, STATUS_PRESETS.accountStatus)} Icon={ShieldUser} />
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