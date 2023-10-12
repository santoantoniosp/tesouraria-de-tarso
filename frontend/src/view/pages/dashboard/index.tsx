import { useAuth } from "../../../app/hooks/use-auth";
import { UserMenu } from "../../components/user-menu";
import { Accounts } from "./components/accounts";
import { DashboardContext, DashboardProvider } from "./components/dashboard-context";
import { Fab } from "./components/fab";
import { Transactions } from "./components/transactions";
import { EditAccountModal } from "./modals/edit-account-modal";
import { NewAccountModal } from "./modals/new-account-modal";
import { NewTransactionModal } from "./modals/new-transaction-modal";

export function Dashboard() {
  const { user } = useAuth()

  return (
    <DashboardProvider>
      <DashboardContext.Consumer>
        {({ accountBeingEdited }) => (
          <div className="h-full w-full p-4 md:px-8 md:pb-8 md:pt-6 flex flex-col gap-4">
            <header className="h-12 flex items-start justify-between">

              <div>
                <span className="h-6 text-teal-900 font-medium" >Tesouraria de Tarso</span>
                <span className="text-teal-700 tracking-[-0.5px] text-xs font-light block" >{user?.community.name}</span>
              </div>

              <UserMenu />
            </header>

            <main className="flex-1 flex flex-col md:flex-row gap-4 max-h-full">
              <div className="w-full md:w-1/2">
                <Accounts />
              </div>

              <div className="w-full md:w-1/2">
                <Transactions />
              </div>
            </main>

            <Fab />
            <NewAccountModal />
            <NewTransactionModal />
            {accountBeingEdited && <EditAccountModal />}
          </div>
        )}
      </DashboardContext.Consumer>
    </DashboardProvider>
  )
}
