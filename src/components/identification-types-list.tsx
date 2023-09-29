import { FC } from "react";
import { useQuery } from "react-query";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { useIdentificationStore } from "@/stores/identification.ts";

export const IdentificationTypesList: FC = () => {
  const navigate = useNavigate();

  const { api } = useIdentificationStore();

  const { isLoading, data } = useQuery(["identification-types"], api.getIdentificationMethods);

  function onClick(id: string) {
    navigate(`/identification/${id}`);
  }

  if (isLoading) {
    return IdentificationTypesListLoading();
  }

  if (data) {
    return (
      <div className="flex flex-col gap-[18px]">
        {data.map((type) => (
          <Button
            variant="borderless"
            className="p-3 h-[72px]"
            key={type.identificationMethodId}
            onClick={() => onClick(type.identificationMethodId)}
          >
            <div className="flex flex-col items-start w-full">
              <h3 className="text-[18px]">{type.title}</h3>
              {/*<p className="text-sm text-gray-3">{type.description}</p>*/}
            </div>
          </Button>
        ))}
      </div>
    );
  }

  return <></>;
};

function IdentificationTypesListLoading() {
  return (
    <div className="flex flex-col gap-[18px]">
      <Skeleton className="h-[72px] w-full" />
      <Skeleton className="h-[72px] w-full" />
      <Skeleton className="h-[72px] w-full" />
      <Skeleton className="h-[72px] w-full" />
    </div>
  );
}
