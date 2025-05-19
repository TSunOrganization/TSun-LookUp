import { useTranslation } from "react-i18next"
import { Card, CardContent } from "@/components/ui/card"

interface UserData {
  Name?: string
  Mobile?: string
  CNIC?: string
  Operator?: string
  Address?: string
}

export function UserDataDisplay({ user }: { user: UserData }) {
  const { t } = useTranslation()

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">{t("name")}:</span>
            <span>{user.Name || t("notAvailable")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t("mobile")}:</span>
            <span>{user.Mobile || t("notAvailable")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t("cnic")}:</span>
            <span>{user.CNIC || t("notAvailable")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t("operator")}:</span>
            <span>{user.Operator || t("notAvailable")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{t("address")}:</span>
            <span className="text-right">{user.Address || t("notAvailable")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
