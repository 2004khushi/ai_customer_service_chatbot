import { OrganizationList } from "@clerk/nextjs"

export const OrgSelectionview = () => {
    return(
        <OrganizationList 
        afterCreateOrganizationUrl="/"
        afterSelectOrganizationUrl="/"
        hidePersonal
        skipInvitationScreen
        />
    );
};