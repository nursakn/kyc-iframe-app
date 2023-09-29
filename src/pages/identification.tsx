import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress.tsx";
import { useQuery } from "react-query";
import { identificationApi } from "@/api/identification";
import { IdentificationForm } from "@/components/identification-form.tsx";
import { useFormsStateStore } from "@/stores/forms-state.ts";
import { FormDataObject } from "@/stores/types.ts";

type Step = {
  id: string;
  index: number;
};

export const Identification: FC = () => {
  const params = useParams();
  const identificationId = useMemo(() => params.identificationId, [params]);

  const { data, isError, isLoading, isFetching } = useQuery(["identification-document", identificationId], () =>
    identificationApi.getIdentificationDocument(identificationId || "none"),
  );

  const [currentStep, setCurrentStep] = useState<Step>();

  useEffect(() => {
    if (data?.documents[0]) {
      setCurrentStep({
        id: data.documents[0].id,
        index: 0,
      });
    }
  }, [data?.documents]);

  const formsStateStore = useFormsStateStore();

  const currentDocument = useMemo(
    () => data?.documents[currentStep?.index ?? 0] ?? null,
    [currentStep, data?.documents],
  );

  const progress = useMemo(() => {
    if (!data?.documents || !currentStep) {
      return 0;
    }

    return ((currentStep.index + 1) / data.documents.length) * 100;
  }, [currentStep, data?.documents]);

  function nextStep() {
    if (!currentStep || !data || currentStep.index + 1 >= data.documents.length) {
      return;
    }

    const newIndex = currentStep.index + 1;

    setCurrentStep({
      id: data.documents[newIndex].id,
      index: newIndex,
    });
  }

  function prevStep() {
    if (!currentStep || !data || currentStep.index === 0) {
      return;
    }

    const newIndex = currentStep.index - 1;

    setCurrentStep({
      id: data.documents[newIndex].id,
      index: newIndex,
    });
  }

  function onNext(values: FormDataObject) {
    nextStep();
    console.log("next", values);
    formsStateStore.saveStep(identificationId ?? "none", currentStep?.id ?? "none", values);
  }

  function onPrev(values: FormDataObject) {
    prevStep();
    console.log("prev", values);
    formsStateStore.saveStep(identificationId ?? "none", currentStep?.id ?? "none", values);
  }

  function onSubmit(values: any) {
    console.log("submit", values);
  }

  if (!currentDocument || isError || !currentStep) {
    return <>Что то пошло не так</>;
  }

  return (
    <section className="py-14 px-6">
      <Progress value={progress} />
      {isLoading || isFetching ? (
        <h1 className="text-[1.375rem] font-bold">Загрузка</h1>
      ) : (
        <IdentificationForm
          identificationId={identificationId ?? "none"}
          stepId={currentStep.id}
          document={currentDocument}
          initialValues={formsStateStore.getStep(identificationId ?? "none", currentStep.id)}
          isFirst={false}
          isLast={false}
          onNext={onNext}
          onPrev={onPrev}
          onSubmit={onSubmit}
        />
      )}
    </section>
  );
};
