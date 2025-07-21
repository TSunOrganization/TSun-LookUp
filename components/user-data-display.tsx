import { useTranslation } from "react-i18next"
import { Card, CardContent } from "@/components/ui/card"

// Updated interface to reflect both possible key casings from different APIs
interface UserData {
  Name?: string
  name?: string
  Mobile?: string
  mobile?: string
  CNIC?: string
  cnic?: string
  Operator?: string
  operator?: string
  Address?: string
  address?: string
}

export function UserDataDisplay({ user }: { user: UserData }) {
  const { t } = useTranslation()

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">{t("name")}:</span>
            {/* Check for both 'Name' and 'name' */}
            <span>{user.Name || user.name || t("notAvailable")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t("mobile")}:</span>
            {/* Check for both 'Mobile' and 'mobile' */}
            <span>{user.Mobile || user.mobile || t("notAvailable")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t("cnic")}:</span>
             {/* Check for both 'CNIC' and 'cnic' */}
            <span>{user.CNIC || user.cnic || t("notAvailable")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t("operator")}:</span>
            {/* Check for both 'Operator' and 'operator' */}
            <span>{user.Operator || user.operator || t("notAvailable")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t("address")}:</span>
             {/* Check for both 'Address' and 'address' */}
            <span className="text-right">{user.Address || user.address || t("notAvailable")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
