import { FC } from "react";
import { Progress } from "@/components/ui/progress.tsx";

type IdentificationStepperType = {
  identificationId: number;
}

export const IdentificationStepper: FC<IdentificationStepperType> = () => {

  return (
    <div>
      <Progress />
    </div>
  )
}