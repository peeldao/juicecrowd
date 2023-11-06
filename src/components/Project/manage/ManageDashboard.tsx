import { ManageHeader } from "./ManageHeader";

import { Button } from "@/components/ui/Button";
import { ManageProjectDetails } from "./ManageProjectDetails";

export function ManageDashboard() {
  return (
    <>
      <ManageHeader />
      <div className="mx-auto flex justify-between max-w-4xl">
        <ManageProjectDetails />
        {/* TODO: implement withdraw tx */}
        <Button className='h-11'>
          <span>Withdraw funds</span>
        </Button>
      </div>
    </>
  )
}
