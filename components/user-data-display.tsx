import { useTranslation } from "react-i18next"
import { Card, CardContent } from "@/components/ui/card"

// Interface to handle possible key casings from the API
interface UserData {
  Name?: string
  name?: string
  Mobile?: string
  mobile?: string
  CNIC?: string
  cnic?: string
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
            <span>{user.Name || user.name || t("notAvailable")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t("mobile")}:</span>
            <span>{user.Mobile || user.mobile || t("notAvailable")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t("cnic")}:</span>
            <span>{user.CNIC || user.cnic || t("notAvailable")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t("address")}:</span>
            <span className="text-right">{user.Address || user.address || t("notAvailable")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
