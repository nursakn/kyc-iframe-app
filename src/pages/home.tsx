import { FC } from "react";
import { IdentificationTypesList } from "@/components/identification-types-list.tsx";
import { useUrlToken } from "@/lib/hooks/use-url-token.ts";

export const Home: FC = () => {
  useUrlToken();

  return (
    <section className="py-14 px-6">
      <h1 className="text-[1.375rem] font-bold mb-7">Повысьте свои возможности удобным способов</h1>
      <IdentificationTypesList />
    </section>
  );
};
