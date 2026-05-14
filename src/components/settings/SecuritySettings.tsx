import { Button } from "../ui/button";
import React, { useState } from "react";
import { SelectSeparator } from "../ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { defaultButtonClassName } from "@/shared/utils/constants";
import UpdatePasswordForm from "../form/CommonForms/UpdatePasswordForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SecuritySettings: React.FC = () => {

    const [showForm, setShowForm] = useState<boolean>(false);

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-lg">Password</CardTitle>
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
                                <UpdatePasswordForm 
                                    onClose={() => setShowForm(false)}
                                />
                            </CardContent>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </div>
    )
}

export default SecuritySettings;