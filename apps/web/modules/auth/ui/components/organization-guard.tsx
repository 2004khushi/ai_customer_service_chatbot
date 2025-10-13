"use client";

import { useOrganization } from "@clerk/nextjs";
import { AuthLayout } from "../layouts/auth-layout";
import { OrgSelectionview } from "../views/org-selection-view";

export const OrganizationGuard = ({children}: {children:  React.ReactNode}) => {
    const {organization} = useOrganization();

    if(!organization){
        return(
            <AuthLayout>
                <OrgSelectionview />
            </AuthLayout>
        )
    }
    return(
        <div>
            {children}
        </div>
    )
}