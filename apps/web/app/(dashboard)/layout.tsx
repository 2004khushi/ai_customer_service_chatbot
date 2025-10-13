import { OrganizationGuard } from "@/modules/auth/ui/components/organization-guard";
import { AuthLayout } from "@/modules/auth/ui/layouts/auth-layout";

const Layout = ({children} : {children: React.ReactNode}) => {
    return(
        <AuthLayout>
            <OrganizationGuard>
             {children}
            </OrganizationGuard>
        </AuthLayout>
    );
}

export default Layout;